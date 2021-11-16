# Generated by Django 3.2.7 on 2021-11-13 20:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id_category', models.AutoField(primary_key=True, serialize=False)),
                ('name_category', models.CharField(max_length=45, verbose_name='Category')),
            ],
        ),
        migrations.CreateModel(
            name='Cities',
            fields=[
                ('id_city', models.AutoField(primary_key=True, serialize=False)),
                ('name_city', models.CharField(max_length=45, verbose_name='City')),
            ],
        ),
        migrations.CreateModel(
            name='Cars',
            fields=[
                ('id_car', models.AutoField(primary_key=True, serialize=False)),
                ('licence_plate', models.CharField(max_length=6, verbose_name='Placa')),
                ('passengers', models.IntegerField(verbose_name='Pasajeros')),
                ('transmission', models.CharField(choices=[('A', 'Automatica'), ('M', 'Mecanica')], default='A', max_length=1, verbose_name='Transmisión')),
                ('air_conditioning', models.SmallIntegerField(verbose_name='Aire acondicionado')),
                ('suitcase', models.CharField(choices=[('P', 'Pequeña'), ('M', 'Mediana'), ('G', 'Grande')], default='P', max_length=1, verbose_name='Baul')),
                ('price', models.IntegerField(verbose_name='Precio')),
                ('brand', models.CharField(max_length=45, verbose_name='Marca')),
                ('model', models.CharField(max_length=45, verbose_name='Modelo')),
                ('category_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='carApp.category')),
                ('city_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='carApp.cities')),
            ],
        ),
    ]