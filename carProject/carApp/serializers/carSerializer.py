from rest_framework import serializers
from carApp.models import Car, Category, City
from .categorySerializer import CategorySerializer
from .citySerializer import CitySerializer


class CarSerializer(serializers.ModelSerializer):

    class Meta:
        model = Car
        fields = ['id_car', 'licence_plate', 'passengers', 'transmission',
                  'air_conditioning', 'suitcase', 'category', 'city', 'price', 'brand', 'model']

    def create(self, validated_data):
        car_instance = Car.objects.create(
            **validated_data)
        return car_instance

    def to_representation(self, obj):
        car = Car.objects.get(id_car=obj.id_car)
        category = Category.objects.get(id_category=obj.category_id)
        city = City.objects.get(id_city=obj.city_id)
        return {
            'id_car': car.id_car,
            'licence_plate': car.licence_plate,
            'passengers': car.passengers,
            'transmission': car.transmission,
            'air_conditioning': car.air_conditioning,
            'suitcase': car.suitcase,
            'category_id': CategorySerializer().to_representation(category),
            'city_id': CitySerializer().to_representation(city),
            'price': car.price,
            'brand': car.brand,
            'model': car.model
        }
