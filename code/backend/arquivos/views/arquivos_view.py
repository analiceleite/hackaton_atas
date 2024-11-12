from django.shortcuts import render
from rest_framework import status,viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from ..serializers.arquivos_serializer import InputFilesSerializer
from ..utils.arquivos_utils import validateTypeOfData


class ArquivosViewSets(viewsets.ViewSet):
    serializer_class = InputFilesSerializer
    permission_classes = [AllowAny]
    
    def create(self, request):
        try:
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid():
                if not validateTypeOfData(serializer):
                    return Response({'message': 'invalid format!'}, status= status.HTTP_400_BAD_REQUEST)
                
                return Response({'message': 'done!'}, status=status.HTTP_200_OK)
            
            return Response({'message': 'null fields!'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return Response({'message': 'internal error!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)