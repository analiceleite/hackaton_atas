ALLOWED_TYPES = [
'application/zip',
'application/x-zip-compressed',
'application/pdf',
]

def validateTypeOfData(serializer):
    for key, file in serializer.validated_data.items():
        print(file.content_type)
        if file.content_type not in ALLOWED_TYPES:
            return False
    return True