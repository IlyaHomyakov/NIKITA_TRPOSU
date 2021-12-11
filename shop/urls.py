from django.conf.urls.static import static
from django.urls import path

from NIKITA_TRPOSU import settings
from .views import *


urlpatterns = [
    path('', catalog, name='catalog'),
    path('<int:category_id>/', products_catalog, name='products_catalog'),
    path('confirm-order/', confirm_order, name='products_catalog'),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
