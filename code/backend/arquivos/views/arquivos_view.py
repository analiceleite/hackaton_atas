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
                audio_zip = request.FILES['audio_file']
                                  
                if ata_file.content_type == 'application/pdf':
                    pdf_text = extrair_texto_pdf(ata_file)
                                        
                    names = retornar_lista_nomes(pdf_text)
                    
                    audios = extrair_arquivos_zip(request, audio_zip)
                    
                    


                    return Response({"names": names}, status=status.HTTP_200_OK)
            
            return Response({'message': 'null fields!'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return Response({'message': 'internal error!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)