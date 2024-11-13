ALLOWED_TYPES = [
'application/zip',
'application/x-zip-compressed',
'application/pdf',
]

def validar_tipo_dado(serializer):
    for key, file in serializer.validated_data.items():
        if file.content_type not in ALLOWED_TYPES:
            return False
    return True