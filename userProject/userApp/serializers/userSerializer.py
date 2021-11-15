from rest_framework import serializers
from userApp.models.user import User
class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ['id_user', 'name', 'document', 'email', 'password', 'birth_date','cellphone', 'gender']
    def create(self, validated_data):
    
        userInstance = User.objects.create(**validated_data)
        
        return userInstance
    def to_representation(self, obj):
        user = User.objects.get(id=obj.id)
    
        return {
            'id_user': user.id_user,
            'name': user.name,
            'document': user.document,
            'password': user.password,
            'birth_date':user.birth_date,
            'cellphone':user.cellphone,
            'gender':user.gender
            }