from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.contrib.auth.hashers import make_password


class UserManager(BaseUserManager):

    def create_user(self, document, password):
        if not document:
            raise ValueError('El usuario debe tener un documento')
        user = self.model(document=document)
        if password:
            user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, document, password):
        user = self.create_user(
            document=document,
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):

    id_user = models.BigAutoField(primary_key=True)
    first_name = models.CharField('First Name', max_length=40)
    last_name = models.CharField('Last Name', max_length=40)
    document = models.CharField('Document', max_length=20, unique=True)
    email = models.EmailField('Email', max_length=100, unique=True)
    password = models.CharField('Password', max_length=256)
    birth_date = models.DateTimeField('Birth Date', null=True)
    cellphone = models.CharField('Phone Number', max_length=20)
    gender_list = [('F', 'Femenino'), ('M', 'Masculino')]
    gender = models.CharField(
        'Gender', max_length=1,
        choices=gender_list, default='F'
    )

    def save(self, **kwargs):
        something = 'mMUj0DrIK6vgtdIYepkIxN'
        self.password = make_password(self.password, something)
        super().save(**kwargs)

    class Meta:
        db_table = "users"
        verbose_name = "User"
        verbose_name_plural = "Users"
        ordering = ["id_user"]

    objects = UserManager()
    USERNAME_FIELD = 'document'
    USER_ID_FIELD = 'id_user'
