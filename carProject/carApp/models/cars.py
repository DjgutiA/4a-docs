from django.db import models
from .cities import Cities
from .category import Category

class Cars(models.Model):
    id_car = models.AutoField(primary_key=True)
    licence_plate = models.CharField(max_length=6, verbose_name='Placa', null=False)
    passengers = models.IntegerField(verbose_name='Pasajeros', null=False)
    transmission_list = [('A', 'Automatica'), ('M','Mecanica')]
    transmission = models.CharField(
        max_length=1, choices=transmission_list, default='A', verbose_name='Transmisión', null=False)
    air_conditioning = models.SmallIntegerField(verbose_name="Aire acondicionado", null=False)
    suitcase_list = [('P','Pequeña'), ('M','Mediana'), ('G','Grande')]
    suitcase = models.CharField(
        max_length=1, choices=suitcase_list, default='P', verbose_name='Baul', null=False)
    category_id = models.ForeignKey(Category, on_delete=models.CASCADE, null=False)
    city_id = models.ForeignKey(Cities, on_delete=models.CASCADE, null=False)
    price = models.IntegerField(null=False, verbose_name='Precio')
    brand = models.CharField(max_length=45, verbose_name='Marca', null=False)
    model = models.CharField(max_length=45, verbose_name='Modelo', null=False) 
    