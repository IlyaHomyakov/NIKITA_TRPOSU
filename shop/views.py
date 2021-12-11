import json

from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404, redirect
from .models import *


def catalog(request):
    context = {'category': Category.objects.all(),
               'items': Product.objects.all()}

    return render(request, 'shop/catalog.html', context)


def products_catalog(request, category_id):
    context = {'category': Category.objects.all(),
               'items': Product.objects.filter(category_id=category_id)}
    return render(request, 'shop/catalog.html', context)


def confirm_order(request):
    if request.method == 'POST':
        request_body = request.body.decode()
        request_body_json = json.loads(request_body)
        coats_from_json = request_body_json['cart']
        actual_items = []
        order_string = ''
        for coat_from_json in coats_from_json:
            if coat_from_json['itemAmount'] != 0:
                actual_items.append(coat_from_json)

        print(request_body_json)

        for actual_item in actual_items:
            actual_coat_id = actual_item["itemId"]
            got_item_title = get_object_or_404(Product, pk=actual_coat_id).specification
            got_item_price = get_object_or_404(Product, pk=actual_coat_id).price
            order_string += f'Товар {got_item_title} — ({got_item_price}) — {actual_item["itemAmount"]}шт.\n'

        Order.objects.create(customer=request_body_json['customer']['name'],
                             customer_phone=request_body_json['customer']['phone'],
                             customer_address=request_body_json['customer']['address'],
                             items=order_string).save()

        return HttpResponse(status=200)

    return redirect('http://127.0.0.1:8000')