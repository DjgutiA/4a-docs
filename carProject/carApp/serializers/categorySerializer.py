from rest_framework import serializers
from carApp.models.category import Category


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ['id_category', 'name_category']

    def create(self, validated_data):
        category_instance = Category.objects.create(**validated_data)
        return category_instance
