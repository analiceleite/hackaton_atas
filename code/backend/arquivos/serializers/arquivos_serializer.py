from rest_framework import serializers

class InputFilesSerializer(serializers.Serializer):
    pdf_ata_file = serializers.FileField()
    audio_ata_file = serializers.FileField()