from django.db import models

class Ata(models.Model):
    id = models.AutoField(primary_key=True)
    ata_name = models.CharField(null=False, max_length=100)

    def __str__(self):
        return self.ata_name
class Audio(models.Model):
    id = models.AutoField(primary_key=True)
    attendant_name = models.CharField(null=False, default="Não encontrado", max_length=100)
    payment_method = models.CharField(null=False, default="Não encontrado", max_length=100)
    effected = models.BooleanField(null=False)
    audio_name = models.CharField(null=False, max_length=100)
    id_ata = models.ForeignKey(Ata, on_delete=models.CASCADE, related_name="audios")

    def __str__(self):
        return self.audio_name