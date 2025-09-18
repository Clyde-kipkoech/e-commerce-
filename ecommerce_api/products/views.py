from django.shortcuts import render

# Create your views here.


from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Q

from .models import Product
from .serializers import ProductSerializer, UserSerializer
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework_simplejwt.tokens import RefreshToken



class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]  # allow anyone to register

    def get_permissions(self):
        # Allow anyone to create (register). Only admin can list/delete in production.
        if self.action in ["create"]:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # ✅ Generate tokens for auto-login
        refresh = RefreshToken.for_user(user)
        access = refresh.access_token

        headers = self.get_success_headers(serializer.data)
        return Response(
            {
                "message": "Signup successful!",
                "user": serializer.data,
                "refresh": str(refresh),
                "access": str(access),
            },
            status=status.HTTP_201_CREATED,
            headers=headers,
        )

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name", "description", "category"]
    ordering_fields = ["price", "created_at", "name"]

    def perform_create(self, serializer):
        # Attach the creating user
        user = self.request.user if self.request.user.is_authenticated else None
        serializer.save(created_by=user)

    @action(detail=False, methods=["get"])
    def search(self, request):
        """
        Search endpoint supporting:
        ?q=term  (search name or description)
        ?category=category_name
        """
        q = request.query_params.get("q", None)
        category = request.query_params.get("category", None)
        qs = Product.objects.filter(is_active=True)
        if q:
            qs = qs.filter(Q(name__icontains=q) | Q(description__icontains=q))
        if category:
            qs = qs.filter(category__iexact=category)
        page = self.paginate_queryset(qs)
        if page is not None:
            serializer = ProductSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = ProductSerializer(qs, many=True)
        return Response(serializer.data)
