from django.contrib import admin

# Register your models here.

#Karen -----------------------------
from django.contrib import admin
from .models import Position, Employee

@admin.register(Position)
class PositionAdmin(admin.ModelAdmin):
    list_display = ("id", "function", "salary_min", "salary_max")

@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "cpf", "dt_birth" , "salary", "position")
    search_fields = ("name", "cpf")
    list_filter = ("position",)