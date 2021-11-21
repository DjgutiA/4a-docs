from rest_framework import serializers
from carApp.models import Car, Availability
from .carSerializer import Car
from .citySerializer import CitySerializer


class ListAvailabilitySerializer(serializers.ListSerializer):
    def update(self, instance, validated_data):
        availabilities_mapping = {
            availability.id_availability: availability for availability in instance}
        data_mapping = {item['id_availability']: item for item in validated_data}

        values = []
        for id_availability, data in data_mapping.items():
            availability = availabilities_mapping.get(id_availability, None)
            if availability is None:
                values.append(self.child.create(data))
            else:
                values.append(self.child.update(availability, data))

        for id_availability, availability in availabilities_mapping.items():
            if id_availability not in data_mapping:
                availability.delete()

        return values


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
