from django.contrib import admin
from .models import Car, Category, City, Availability


# Register your models here.
admin.site.register(Car)
admin.site.register(Category)
admin.site.register(City)
admin.site.register(Availability)
