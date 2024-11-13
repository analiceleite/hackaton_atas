from rest_framework import serializers

class InputFilesSerializer(serializers.Serializer):
    ata_file = serializers.FileField()
    audio_file = serializers.FileField()