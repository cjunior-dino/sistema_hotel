from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import AbstractUser, PermissionsMixin, Group
from django.db import models

class BaseModel(models.Model):
    created_at = models.DateTimeField(
        db_column='dt_created_at',
        auto_now_add=True,
        null=False,
    )
    modified_at = models.DateTimeField(
        db_column='dt_modified_at',
        auto_now=True,
        null=False,
    )

    class Meta:
        abstract = True
        managed = True


class User(AbstractUser, BaseModel):
    name = models.CharField(
        db_column='tx_name',
        null=False,
        max_length=140,
        blank=False,
    )
    dt_birth = models.DateField(
        db_column='dt_birth',
        null=False,
        blank=False,
    )
    cpf = models.CharField(
        db_column='tx_cpf',
        null=False,
        unique=True,
        max_length=11,
    )
    phone = models.CharField(
        db_column='tx_phone',
        null=False,
        max_length=11,
    )
    email = models.EmailField(
        db_column='tx_email',
        null=False,
        unique=True,
        max_length=254,
    )

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['name', 'cpf','dt_birth']  # ou os que você quiser obrigatórios
