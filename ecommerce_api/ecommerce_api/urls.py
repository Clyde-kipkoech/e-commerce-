from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from products.views import ProductViewSet, UserViewSet, EmailLoginView
from rest_framework_simplejwt.views import TokenRefreshView

# Routers for viewsets
router = routers.DefaultRouter()
router.register(r"products", ProductViewSet, basename="product")
router.register(r"users", UserViewSet, basename="user")

# User creation view (signup)
user_create = UserViewSet.as_view({"post": "create"})

urlpatterns = [
    path("admin/", admin.site.urls),
    
    # API routes
    path("api/", include(router.urls)),

    # Signup
    path("api/signup/", user_create, name="signup"),

    # Login using email/password → returns JWT tokens
    path("api/login/", EmailLoginView.as_view(), name="email-login"),

    # Token refresh
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
