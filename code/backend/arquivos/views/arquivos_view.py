from rest_framework import status,viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from ..serializers.arquivos_serializer import InputFilesSerializer
from ..utils.validations import validar_tipo_dado
from ..utils.arquivos_utils import *

import os

from ..models import *

class ArquivosViewSets(viewsets.ViewSet):
    serializer_class = InputFilesSerializer
    permission_classes = [AllowAny]

    def create(self, request):
        pdf_text = None
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():

            if not validar_tipo_dado(serializer):
                return Response({'message': 'invalid format!'}, status= status.HTTP_400_BAD_REQUEST)

            calls = []

            ata_file = request.FILES['ata_file']
            ata = Ata(ata_name=ata_file.name)
            ata.save()

            if ata_file.content_type == 'application/pdf':
                pdf_text = extrair_texto_pdf(request,ata_file)
                names = retornar_lista_nomes(request,pdf_text)

            audio_file = request.FILES['audio_file']
            attendant_name = ''

            if audio_file.content_type == 'application/zip' or audio_file.content_type == 'application/x-zip-compressed':

                audio_list = extrair_arquivos_zip(request, audio_file)

                print(audio_list)

                for name in names:

                    for audio in audio_list:
                        audio_filename = os.path.basename(audio)
                        print(audio_filename)

                        people_in_file = audio_filename.split('-')[0]

                        if people_in_file.lower() == name.lower():
                            attendant_name = name
                            audio_convert = convert_audio(audio)
                            audio_transcription = transpose_audio_for_text(audio_convert)
                            purchase_has_been_completed, payment_method = extract_datas_from_audio(audio_transcription)

                            if payment_method == "peixes":
                                payment_method = "pix"
                                
                            audio = Audio(
                                attendant_name=name,
                                payment_method=payment_method,
                                effected=purchase_has_been_completed,
                                audio_name=audio_filename,
                                id_ata=ata
                            )
                            audio.save()

                            calls.append({
                                "nome" : attendant_name,
                                # "avaliação_atendimento" : names.get(attendant_name),
                                "metodo_de_pagamento" : payment_method,
                                "finalizada" : purchase_has_been_completed,
                                "ATA" : ata_file.name,
                                "audio" : audio_filename
                            })
            else:
                audio_convert = convert_audio(audio)
                audio_transcription = transpose_audio_for_text(audio_convert)

                purchase_has_been_completed, payment_method = extract_datas_from_audio(audio_transcription)
                audio_filename = os.path.splitext(audio_file.name)[0]
                audio_name = audio_filename.split('-')[0]

                for name in names:
                    if audio_name == name:
                        attendant_name = name

                calls.append({
                    "nome" : attendant_name,
                    "avaliação_atendimento" : names[attendant_name],
                    "metodo_de_pagamento" : payment_method,
                    "finalizada" : purchase_has_been_completed
                })

            return Response({"calls":calls}, status=status.HTTP_200_OK)

        return Response({'message': 'null fields!'}, status=status.HTTP_400_BAD_REQUEST)