from django.contrib import admin
from .models.cars import Cars
from .models.category import Category
from .models.cities import Cities

# Register your models here.
admin.site.register(Cars)
admin.site.register(Category)
admin.site.register(Cities)