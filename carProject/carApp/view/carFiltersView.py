from rest_framework import generics, response, status
from rest_framework.views import APIView
from carApp.models import Car, Availability
from carApp.serializers import CarSerializer, AvailabilitySerializer
from django.http import JsonResponse
from carApp.utils import RangeDate


class CarFilterView(generics.ListAPIView):
    serializer_class = CarSerializer

    def post(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def get_queryset(self):
        queryset = Car.objects.filter(
            **self.request.data)
        return queryset


class AvailabilityCarFilterCarView(generics.ListAPIView):
    serializer_class = CarSerializer

    def post(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def get_queryset(self):
        list_date = RangeDate(
            self.request.data['start_date'], self.request.data['end_date']).data
        cars = self.request.data['car']

        data = []
        days = 0
        for date in list_date:
            days += 1
            for car in cars:
                data.append('{}-{}'.format(car, date))

        availabilities = Availability.objects.filter(
            key_field__in=data, is_availability=True)
        data = {}
        for row in availabilities:
            if data.get(row.car.id_car, False):
                data[row.car.id_car] += 1
            else:
                data[row.car.id_car] = 1
        data_ok = []
        for key, value in data.items():
            if value == days:
                data_ok.append(key)

        queryset = Car.objects.filter(id_car__in=data_ok)
        return queryset
