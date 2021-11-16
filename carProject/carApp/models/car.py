from django.db import models
from .cities import Cities
from .category import Category


class Car(models.Model):
    id_car = models.AutoField(primary_key=True)
    licence_plate = models.CharField('Licence Plate', max_length=6, null=False)
    passengers = models.IntegerField('Passengers', null=False)
    transmission_list = [('A', 'Automatic'), ('M', 'Mechanical')]
    transmission = models.CharField('Transmission',
                                    max_length=1, choices=transmission_list, default='A', null=False)
    air_conditioning = models.SmallIntegerField("Air Conditioning", null=False)
    suitcase_list = [('S', 'Small'), ('M', 'Medium'), ('B', 'Big')]
    suitcase = models.CharField('Suitcase',
                                max_length=1, choices=suitcase_list, default='S', null=False)
    category_id = models.ForeignKey('Category ID',
                                    Category, on_delete=models.CASCADE, null=False)
    city_id = models.ForeignKey(
        'City ID', Cities, on_delete=models.CASCADE, null=False)
    price = models.IntegerField('Price', null=False)
    brand = models.CharField('Brand', max_length=45, null=False)
    model = models.CharField('model', max_length=45, null=False)

    class Meta:
        db_table = "cars"
        verbose_name = "Car"
        verbose_name_plural = "Cars"
        ordering = ["id_car"]
