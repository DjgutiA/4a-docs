from django.http.response import JsonResponse
from rest_framework import generics, status
from carApp.models import Availability
from carApp.serializers import AvailabilitySerializer


class AvailabilitiesDetailView(generics.ListAPIView):
    queryset = Availability.objects.all()
    serializer_class = AvailabilitySerializer


class AvailabilityCreateView(generics.CreateAPIView):
    serializer_class = AvailabilitySerializer

    def post(self, request, *args, **kwargs):
        availability_serializer = AvailabilitySerializer(data=request.data)
        availability_serializer.is_valid(raise_exception=True)
        availability_serializer.save()
        print(availability_serializer.data)

        return JsonResponse(availability_serializer.data)
