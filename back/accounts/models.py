from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import AbstractUser, PermissionsMixin, Group
from django.db import models


class User(AbstractUser):
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
#Karen criou tabela position

class Position(models.Model):
        function = models.CharField(max_length=100)
        salary_min = models.DecimalField(max_digits=10, decimal_places=2)
        salary_max = models.DecimalField(max_digits=10, decimal_places=2)

        def __str__(self):
            return f"{self.function} (R$ {self.salary_min} - R$ {self.salary_max})"
#Karen criou tabela employee
class Employee(models.Model):
    name = models.CharField(max_length=150)
    dt_birth = models.DateField()
    cpf = models.CharField(max_length=11, unique=True)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    position = models.ForeignKey(Position, on_delete=models.CASCADE, related_name="employees")

    def __str__(self):
        return f"{self.name} ({self.cpf}) - {self.position.function}"

    def save(self, *args, **kwargs):
        """
        Valida se o salário do funcionário está dentro do intervalo da posição.
        """
        if self.salary < self.position.salary_min or self.salary > self.position.salary_max:
            raise ValueError("O salário deve estar entre o mínimo e o máximo da posição.")
        super().save(*args, **kwargs)