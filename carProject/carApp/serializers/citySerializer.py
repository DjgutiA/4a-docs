from rest_framework import serializers
from carApp.models.city import City


class CitySerializer(serializers.ModelSerializer):

    class Meta:
        model = City
        fields = ['id_city', 'name_city']

    def create(self, validated_data):
        city_instance = City.objects.create(**validated_data)
        return city_instance
