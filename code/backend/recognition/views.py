from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .face_detection import detect_face

class FaceDetectionView(APIView):
    def get(self, request):
        # Chama a função de detecção de rosto
        face_detected = detect_face()
        
        # Retorna `true` se o rosto for detectado, caso contrário `false`
        return Response({'face_detected': face_detected}, status=status.HTTP_200_OK)
