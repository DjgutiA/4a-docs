from rest_framework import serializers
from carApp.models.cars import Cars
class CarsSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Cars
        fields = ['id_car', 'licence_plate', 'passengers', 'transmission', 'air_conditioning', 'suitcase','category_id', 'city_id', 'price', 'brand', 'model']
    def create(self, validated_data):
    
        carsInstance = Cars.objects.create(**validated_data)
        
        return carsInstance
    