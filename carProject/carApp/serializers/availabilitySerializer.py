from rest_framework import serializers
from carApp.models import Car, Availability
from .carSerializer import Car
from .citySerializer import CitySerializer


class ListAvailabilitySerializer(serializers.ListSerializer):
    def create(self, validated_data):
        list_availabilities = [Availability(**row) for row in validated_data]
        availabilities = Availability.objects.bulk_create(list_availabilities)
        return availabilities


class AvailabilitySerializer(serializers.ModelSerializer):

    class Meta:
        model = Availability
        fields = ['id_availability', 'car', 'date', 'is_availability']
        list_serializer_class = ListAvailabilitySerializer

    def create(self, validated_data):
        availability_instance = Availability.objects.create(
            **validated_data)
        return availability_instance

    def to_representation(self, obj):
        availability = Availability.objects.get(
            id_availability=obj.id_availability)
        #car = Car.objects.get(id_car=obj.car)
        return {
            'id_availability': availability.id_availability,
            'car': availability.car.id_car,
            'date': availability.date,
            'is_availability': availability.is_availability,
            'created': availability.created,
            'modified': availability.modified
        }
