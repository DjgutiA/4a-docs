"""carProject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from carApp.view import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('cars/', CarsDetailView.as_view()),
    path('car/', CarCreateView.as_view()),
    path('car/<str:license_plate>', CarDetailView.as_view()),
    path('car/delete/<int:pk>', CarDeleteView.as_view()),
    path('car/update/<int:pk>', CarUpdateView.as_view()),
    path('cars/filter/', CarFilterView.as_view()),
    path('cars/filter/availability/', AvailabilityCarFilterCarView.as_view()),
    path('categories/', CategoryListView.as_view()),
    path('cities/', CityListView.as_view()),
    path('brands/', BrandListView.as_view()),
    path('models/<str:brand>/', ModelListView.as_view()),
    path('availability/', AvailabilityCreateView.as_view()),
    path('availabilities/', AvailabilitiesDetailView.as_view()),
    path('availability/<int:car>', AvailabilityDetailforCarView.as_view()),
    path('availability/update/', AvailabilityUpdateView.as_view()),
]
