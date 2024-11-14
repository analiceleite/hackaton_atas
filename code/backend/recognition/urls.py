from django.urls import path
from .views import FaceDetectionView

urlpatterns = [
    path('detect-face/', FaceDetectionView.as_view(), name='detect-face'),
]
