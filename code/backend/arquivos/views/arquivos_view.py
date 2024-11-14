from django.shortcuts import render
from rest_framework import status,viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
import os

from ..serializers.arquivos_serializer import InputFilesSerializer
from ..utils.validations import validar_tipo_dado
from ..utils.arquivos_utils import extrair_texto_pdf, retornar_lista_nomes, extrair_arquivos_zip


class ArquivosViewSets(viewsets.ViewSet):
    serializer_class = InputFilesSerializer
    permission_classes = [AllowAny]
    
    def create(self, request):
        
        pdf_text = None
        converted_audios = []
        converted_audios_transposed = []
        try:
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid():
                if not validar_tipo_dado(serializer):
                    return Response({'message': 'invalid format!'}, status= status.HTTP_400_BAD_REQUEST)
                
                ata_file = request.FILES['ata_file']
                audio_file =  request.FILES['audio_file']

                pdf_text = extrair_texto_pdf(request,ata_file)                    
                names = retornar_lista_nomes(pdf_text)
                
                audio_list = extrair_arquivos_zip(request, audio_file)
                print("1")
                for audio_file_path in audio_list:
                    print("2")
                    wav_io = convert_audio(audio_file_path)
                    if wav_io:
                        print("3")
                        converted_audios.append(wav_io)
                        print("4")
                        output_path = os.path.splitext(audio_file_path)[0] + '.wav'
                
                print(f"Nome dos atendentes: {names}")
                
                for wave_audio in converted_audios:
                    print("adfjsadasdkasjhdkasjd")
                    converted_audios_transposed.append(transpose_audio_for_text(wave_audio))
                
                print(converted_audios_transposed)
                return Response({"names": names}, status=status.HTTP_200_OK)
            
            return Response({'message': 'null fields!'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return Response({'message': 'internal error!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)