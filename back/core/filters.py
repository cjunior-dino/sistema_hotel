from django_filters import rest_framework as filters

from core import models

# Filtros de pesquisa
LIKE = 'unaccent__icontains' # Usando unaccent para ignorar acentos e trazer palavras semelhantes
ICONTAINS = 'icontains' # Usando icontains para trazer palavras semelhantes
UNACCENT_IEXACT = 'unaccent__iexact' # Usando unaccent para ignorar acentos e trazer palavras exatas
EQUALS = 'exact' # Usando exact para trazer o campo exatas
STARTS_WITH = 'startswith' # Usando startswith para trazer palavras que começam com o termo pesquisado
GT = 'gt' # maior que
LT = 'lt' # menor que
GTE = 'gte' # maior ou igual a
LTE = 'lte' # menor ou igual a
IN = 'in' # Usando in para trazer palavras que estão na lista

class PositionFilter(filters.FilterSet):
    function = filters.CharFilter(field_name='function', lookup_expr= ICONTAINS)
    salary_min = filters.NumberFilter(field_name='salary_min', lookup_expr= GTE)
    salary_max = filters.NumberFilter(field_name='salary_max', lookup_expr= LTE)


    class Meta:
        model = models.Position
        fields = ["function", "salary_min", "salary_max"]

class EmployeeFilter(filters.FilterSet):
    user = filters.CharFilter(field_name='user__name', lookup_expr=LIKE)
    salary_min = filters.NumberFilter(field_name='salary', lookup_expr=GTE)
    salary_max = filters.NumberFilter(field_name='salary', lookup_expr=LTE)
    level = filters.NumberFilter(lookup_expr=EQUALS)
    position = filters.CharFilter(field_name='position__function', lookup_expr=IN)


    class Meta:
        model = models.Employee
        fields = ["user", "salary_min", "salary_max", "level", "position"]
