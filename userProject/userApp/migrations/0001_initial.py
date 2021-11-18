# Generated by Django 3.2.7 on 2021-11-13 17:48

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('user_id', models.BigAutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=20, verbose_name='Name')),
                ('document', models.CharField(max_length=20, unique=True, verbose_name='Document')),
                ('email', models.EmailField(max_length=30, unique=True, verbose_name='Email')),
                ('password', models.CharField(max_length=40, verbose_name='Password')),
                ('birth_date', models.DateTimeField(null=True, verbose_name='Birth Date')),
                ('cellphone', models.CharField(max_length=20, verbose_name='Phone Number')),
                ('gender', models.CharField(choices=[('F', 'Femenino'), ('M', 'Masculino')], default='F', max_length=1, verbose_name='Gender')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'User',
                'verbose_name_plural': 'Users',
                'db_table': 'user',
                'ordering': ['user_id'],
            },
        ),
    ]
