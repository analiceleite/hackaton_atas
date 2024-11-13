from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views.arquivos_view import ArquivosViewSets

router = DefaultRouter()

router.register(r'form',ArquivosViewSets, basename='arquivos')

urlpatterns = [
    path('', include(router.urls)),
]