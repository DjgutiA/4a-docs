from rest_framework import generics, response, status
from rest_framework.views import APIView
from carApp.models import Car
from carApp.serializers import CarSerializer
from django.http import JsonResponse


class CarFilterView(generics.ListAPIView):
    serializer_class = CarSerializer

    def post(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def get_queryset(self):
        queryset = Car.objects.filter(
            **self.request.data)
        return queryset
