from django.db import models

class Cities(models.Model):
    id_city = models.AutoField(primary_key=True)
    name_city = models.CharField(max_length=45, verbose_name='City', null=False)