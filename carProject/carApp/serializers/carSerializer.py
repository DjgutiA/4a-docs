from rest_framework import serializers
from carApp.models.car import Car


class CarsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Car
        fields = ['id_car', 'licence_plate', 'passengers', 'transmission',
                  'air_conditioning', 'suitcase', 'category_id', 'city_id', 'price', 'brand', 'model']

    def create(self, validated_data):
        carsInstance = Car.objects.create(**validated_data)
        return carsInstance
