from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Product

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, min_length=6)

    class Meta:
        model = User
        fields = ("id", "email", "password", "first_name", "last_name")

    def create(self, validated_data):
        email = validated_data.get("email")
        password = validated_data.pop("password")
        first_name = validated_data.get("first_name", "")
        last_name = validated_data.get("last_name", "")

        user = User(
            username=email,  # username is auto-set as email
            email=email,
            first_name=first_name,
            last_name=last_name
        )
        user.set_password(password)
        user.save()
        return user


class EmailLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid credentials.")

        user = authenticate(username=user.username, password=password)
        if not user:
            raise serializers.ValidationError("Invalid credentials.")

        data["user"] = user
        return data


class ProductSerializer(serializers.ModelSerializer):
    created_by = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Product
        fields = "__all__"
        read_only_fields = ("id", "created_at", "updated_at", "created_by")
