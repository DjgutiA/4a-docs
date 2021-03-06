# Generated by Django 3.2.7 on 2021-11-20 15:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('carApp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Availability',
            fields=[
                ('id_availability', models.AutoField(primary_key=True, serialize=False)),
                ('date', models.DateField(verbose_name='Date')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Created')),
                ('modified', models.DateTimeField(auto_now=True, verbose_name='Modified')),
                ('car', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='carApp.car')),
            ],
            options={
                'verbose_name': 'Availability',
                'verbose_name_plural': 'Availabilities',
                'db_table': 'availabilities',
                'ordering': ['id_availability'],
            },
        ),
    ]
