from carApp.models import City
from carApp.serializers import CitySerializer
from rest_framework import generics


class CityListView(generics.ListAPIView):
    serializer_class = CitySerializer
    queryset = City.objects.all().order_by('name_city')
