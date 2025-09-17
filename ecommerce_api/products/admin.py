from django.contrib import admin

# Register your models here.
# products/admin.py

from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "price", "stock", "is_active", "created_at")
    search_fields = ("name", "description", "slug")
    list_filter = ("category", "is_active")
