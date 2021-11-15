from django.db import models

class Category(models.Model):
    id_category = models.AutoField(primary_key=True)
    name_category = models.CharField(max_length=45, verbose_name='Category', null=False)