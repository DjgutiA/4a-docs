from django.db import models
from .car import Car


class Availability(models.Model):
    id_availability = models.AutoField(primary_key=True)
    car = models.ForeignKey(Car, on_delete=models.CASCADE)
    date = models.DateField("Date", null=False)
    is_availability = models.BooleanField(default=True, null=False)
    key_field = models.CharField(
        'Key Field', max_length=20, null=False, unique=True)
    created = models.DateTimeField("Created", auto_now_add=True)
    modified = models.DateTimeField("Modified", auto_now=True)

    def save(self, **kwargs):
        self.key_field = '{}-{}'.format(self.car.id_car, self.date)
        return super().save(**kwargs)

    class Meta:
        db_table = "availabilities"
        verbose_name = "Availability"
        verbose_name_plural = "Availabilities"
        ordering = ["id_availability"]
