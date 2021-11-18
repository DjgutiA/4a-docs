from carApp.models import Category
from carApp.serializers import CategorySerializer
from rest_framework import generics


class CategoryListView(generics.ListAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all().order_by('name_category')
