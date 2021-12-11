from django.contrib import admin
from django.contrib.auth.models import Group, User

from .models import *

admin.site.site_header = "НЕЧИПДИП"
admin.site.site_title = ""
admin.site.index_title = "Панель управления"
admin.site.unregister(Group)
admin.site.unregister(User)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'category')


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('category', 'specification', 'price')


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('customer', 'customer_phone', 'customer_address', 'items', 'date')
    readonly_fields = ('customer', 'customer_phone', 'customer_address', 'items', 'date')
