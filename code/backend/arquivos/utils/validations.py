ALLOWED_TYPES = [
'application/zip',
'application/x-zip-compressed',
'application/pdf',
'audio/mpeg'
]

def validar_tipo_dado(serializer):
    for key, file in serializer.validated_data.items():
        if file.content_type not in ALLOWED_TYPES:
            return False
    return True