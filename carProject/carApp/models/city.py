from django.db import models


class City(models.Model):
    id_city = models.AutoField(primary_key=True)
    name_city = models.CharField('City', max_length=45, null=False)

    class Meta:
        db_table = "Cities"
        verbose_name = "City"
        verbose_name_plural = "cities"
        ordering = ["id_city"]
