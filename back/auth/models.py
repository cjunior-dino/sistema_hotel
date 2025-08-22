from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    class Role(models.TextChoices):
        CLIENT = "CLIENT", "Cliente"
        EMPLOYEE = "EMPLOYEE", "Funcionário"

    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.CLIENT,
    )

    def is_client(self):
        return self.role == self.Role.CLIENT

    def is_employee(self):
        return self.role == self.Role.EMPLOYEE