import django_filters
from django_filters import rest_framework as filters

from core import models


class PositionFilter(filters.FilterSet):
    function = filters.CharFilter(field_name='function', lookup_expr='icontains')
    salary_min = filters.NumberFilter(field_name='salary_min', lookup_expr='gte')
    salary_max = filters.NumberFilter(field_name='salary_max', lookup_expr='lte')

    class Meta:
        model = models.Position
        fields = ["function", "salary_min", "salary_max"]

class EmployeeFilter(filters.FilterSet):
    class Meta:
        model = models.Employee
        fields = {
            "name": ["icontains"],        # busca por parte do nome
            "cpf": ["exact"],             # cpf exato
            "dt_birth": ["year__gte"],    # por ano de nascimento
            "salary": ["gte", "lte"],     # faixa salarial
            "position__title": ["icontains"], # busca pelo título da posição
        }