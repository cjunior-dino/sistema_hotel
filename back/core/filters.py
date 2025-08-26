import django_filters
from django_filters import rest_framework as filters

class PositionFilter(filters.FilterSet):
  function = filters.CharFilter(field_name='function', lookup_expr='icontains')
  salary_min = filters.CharFilter(field_name='salary_min', lookup_expr='icontains')
  salary_max = filters.CharFilter(field_name='salary_max', lookup_expr='icontains')

    class Meta:
        model = Position
        fields = {
            "function": ["icontains"],       # busca por parte do título
            "salary_min": ["gte", "lte"], # maior/menor ou igual
            "salary_max": ["gte", "lte"],
        }

class EmployeeFilter(filters.FilterSet):
    class Meta:
        model = Employee
        fields = {
            "name": ["icontains"],        # busca por parte do nome
            "cpf": ["exact"],             # cpf exato
            "dt_birth": ["year__gte"],    # por ano de nascimento
            "salary": ["gte", "lte"],     # faixa salarial
            "position__title": ["icontains"], # busca pelo título da posição
        }