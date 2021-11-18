from django.conf import settings
from rest_framework import generics, status
from carApp.models import Car
from carApp.serializers import CarSerializer
from django.http import JsonResponse


class CarsDetailView(generics.ListAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer


class CarCreateView(generics.CreateAPIView):
    serializer_class = CarSerializer

    def post(self, request, *args, **kwargs):
        car_serializer = CarSerializer(data=request.data)
        car_serializer.is_valid(raise_exception=True)
        car_serializer.save()
        data = {
            'response': 'Vehiculo con placa {}, creado en el sistema'.format(car_serializer.data['license_plate']),
        }
        return JsonResponse(data, status=status.HTTP_201_CREATED)


class CarDetailView(generics.RetrieveAPIView):
    serializer_class = CarSerializer
    queryset = Car.objects.all()
    lookup_field = 'license_plate'


class CarDeleteView(generics.DestroyAPIView):
    serializer_class = CarSerializer
    queryset = Car.objects.all()

    def delete(self, request, *args, **kwargs):
        license_plate = self.get_object().license_plate
        super().destroy(request, *args, **kwargs)
        data = {
            'response': 'Vehiculo con placa {}, Eliminadó'.format(license_plate)
        }
        return JsonResponse(data, status=status.HTTP_201_CREATED)


class CarUpdateView(generics.UpdateAPIView):
    serializer_class = CarSerializer
    queryset = Car.objects.all()


class BrandListView(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        queryset = Car.objects.all()
        brand_list = []
        for car in queryset:
            if car.brand not in brand_list:
                brand_list.append(car.brand)
        data = {
            'brands': brand_list
        }

        return JsonResponse(data, status=status.HTTP_200_OK)


class ModelListView(generics.GenericAPIView):
    serializer_class = CarSerializer

    def get(self, request, *args, **kwargs):
        queryset = Car.objects.filter(brand=kwargs['brand'])
        model_list = []
        for car in queryset:
            if car.model not in model_list:
                model_list.append(car.model)
        data = {
            'models': model_list
        }

        return JsonResponse(data, status=status.HTTP_200_OK)
