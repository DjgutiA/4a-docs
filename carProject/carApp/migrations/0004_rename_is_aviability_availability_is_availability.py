# Generated by Django 3.2.7 on 2021-11-20 16:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('carApp', '0003_availability_is_aviability'),
    ]

    operations = [
        migrations.RenameField(
            model_name='availability',
            old_name='is_aviability',
            new_name='is_availability',
        ),
    ]