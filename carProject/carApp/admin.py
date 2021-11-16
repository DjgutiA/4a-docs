from django.contrib import admin
from .models import Car
from .models.category import Category
from .models import City

# Register your models here.
admin.site.register(Car)
admin.site.register(Category)
admin.site.register(City)
