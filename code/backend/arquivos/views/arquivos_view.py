from rest_framework import status,viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from ..serializers.arquivos_serializer import InputFilesSerializer
from ..utils.validations import validar_tipo_dado
from ..utils.arquivos_utils import extrair_texto_pdf, retornar_lista_nomes, extrair_arquivos_zip, convert_audio, transpose_audio_for_text, extract_datas_from_audio


class ArquivosViewSets(viewsets.ViewSet):
    serializer_class = InputFilesSerializer
    permission_classes = [AllowAny]
    
    def create(self, request):
        pdf_text = None
        try:
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid():
                if not validar_tipo_dado(serializer):
                    return Response({'message': 'invalid format!'}, status= status.HTTP_400_BAD_REQUEST)
                
                ata_file = request.FILES['ata_file']


                if ata_file.content_type == 'application/zip' or ata_file.content_type == 'application/x-zip-compressed':
                    pdf_list = extrair_arquivos_zip(ata_file)
                    
                if ata_file.content_type == 'application/pdf':
                    pdf_text = extrair_texto_pdf(request,ata_file)
                    names = retornar_lista_nomes(request,pdf_text)

                audio_file = request.FILES['audio_file']

                audio_convert = convert_audio(audio_file)
                audio_transcription = transpose_audio_for_text(audio_convert)

                purchase_has_been_completed, payment_method = extract_datas_from_audio(audio_transcription)

                for name in names.keys():
                    if name == "Amanda":
                        my_name = name

                calls = {
                    "nome" : my_name,
                    "avaliação_atendimento" : names[my_name],
                    "metodo_de_pagamento" : payment_method,
                    "finalizada" : purchase_has_been_completed
                }

                # if audio_file.content_type == 'application/zip' or audio_file.content_type == 'application/x-zip-compressed':
                #     audio_list = extrair_arquivos_zip(audio_file)

                # [
                #     {
                #         id_ata: ""
                #         id_audio: ""
                #         nome: "amanda"
                #         avaliacao_atendimento : ""
                #         metodo de pagamento: "cartao de credito",
                #         finalizada: True
                #     }
                # ]

                return Response({"calls":calls}, status=status.HTTP_200_OK)

            return Response({'message': 'null fields!'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return Response({'message': 'internal error!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)