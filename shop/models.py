from django.db import models


class Category(models.Model):
    category = models.CharField(max_length=255, verbose_name='Категория')
    category_image = models.ImageField(blank=True, null=True, verbose_name='Изображение')

    class Meta:
        verbose_name = 'Категорию'
        verbose_name_plural = 'Категория'

    def __str__(self):
        return self.category


class Product(models.Model):
    class Meta:
        verbose_name = 'Товары'
        verbose_name_plural = 'Товары'

    category = models.ForeignKey('Category', on_delete=models.CASCADE, verbose_name='Категория')
    specification = models.CharField(max_length=255, verbose_name='Спецификация')
    price = models.FloatField('Стоимость')

    def __str__(self):
        return f'{self.category.category} - {self.specification} - {self.price}'


class Order(models.Model):

    class Meta:
        verbose_name = 'Заказы'
        verbose_name_plural = 'Заказы'

    customer = models.CharField('Заказчик', max_length=255)
    customer_phone = models.CharField('Номер телефона', max_length=255)
    customer_address = models.CharField('Адрес', max_length=255)
    items = models.TextField('Заказ')
    date = models.DateTimeField('Дата заказа', auto_now_add=True)

    def __str__(self):
        return f'{self.customer} - {self.customer_phone} - {self.date}'
