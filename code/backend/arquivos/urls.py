from rest_framework.routers import DefaultRouter

from .views.arquivos_view import ArquivosViewSets

router = DefaultRouter()

router.register(r'form',ArquivosViewSets, basename='arquivos')