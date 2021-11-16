from rest_framework import serializers
from carApp.models.category import Category


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ['id_category', 'name_category']

    def create(self, validated_data):
        categoryInstance = Category.objects.create(**validated_data)
        return categoryInstance
