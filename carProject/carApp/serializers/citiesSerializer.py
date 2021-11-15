from rest_framework import serializers
from carApp.models.cities import Cities

class CitiesSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Cities
        fields = ['id_city', 'name_city']
    def create(self, validated_data):
    
        citiesInstance = Cities.objects.create(**validated_data)
        
        return citiesInstance