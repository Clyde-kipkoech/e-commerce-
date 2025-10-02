from rest_framework import viewsets, permissions, filters, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User

from .models import Product
from .serializers import ProductSerializer, UserSerializer, EmailLoginSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser

# ---------------- SIGNUP ----------------
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == "create":  # signup
            return [AllowAny()]
        return [permissions.IsAdminUser()]  # only admins can view/delete users

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"message": "Account created successfully! Please log in."},
            status=status.HTTP_201_CREATED,
        )

# ---------------- LOGIN ----------------
class EmailLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = EmailLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data["user"]

            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "is_staff": user.is_staff,        # True if admin
                    "is_superuser": user.is_superuser # True if super admin
                }
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ---------------- PRODUCT ----------------
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name", "description", "category"]
    ordering_fields = ["price", "created_at", "name"]

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:  # anyone can view
            return [IsAuthenticatedOrReadOnly()]
        return [IsAdminUser()]  # only admins can create/update/delete

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)