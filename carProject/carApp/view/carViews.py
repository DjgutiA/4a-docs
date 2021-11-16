from django.conf import settings
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.backends import TokenBackend
from rest_framework.permissions import IsAuthenticated
from carApp.models import Car, City, Category
from carApp.serializers import CarSerializer


class CarsDetailView(generics.ListAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer


class CarCreateView(generics.CreateAPIView):
    serializer_class = CarSerializer

    def post(self, request, *args, **kwargs):
        car_serializer = CarSerializer(data=request.data)
        car_serializer.is_valid(raise_exception=True)
        car_serializer.save()
        return Response('Vehiculo con placa {}, creado en el sistema'.format(car_serializer.data['licence_plate']), status=status.HTTP_201_CREATED)
