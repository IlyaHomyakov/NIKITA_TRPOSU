# Generated by Django 3.2.9 on 2021-12-11 15:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0003_order'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='customer_address',
            field=models.CharField(default='', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='order',
            name='customer_phone',
            field=models.CharField(default='', max_length=255),
            preserve_default=False,
        ),
    ]