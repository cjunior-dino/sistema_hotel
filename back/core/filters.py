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

class ReservationFilter(filters.FilterSet):
    id = filters.NumberFilter(lookup_expr=EQUALS)
    daily_value_min = filters.NumberFilter(field_name='daily_value',lookup_expr=LTE)
    daily_value_max = filters.NumberFilter(field_name='daily_value',lookup_expr=GTE)
    dt_begin = filters.DateFilter(lookup_expr=GTE)
    dt_end = filters.DateFilter(lookup_expr=LTE)
    client = filters.CharFilter(field_name='client__name',lookup_expr=LIKE)
    room = filters.ChoiceFilter(field_name='room__type_room',lookup_expr=EQUALS)


    class Meta:
        model = models.Reservation
        fields = ['id', 'daily_value_min', 'daily_value_max', 'dt_begin', 'dt_end', 'client', 'room']

class PaymentFilter(filters.FilterSet):
    total_payment_min = filters.NumberFilter(field_name='total_payment',lookup_expr=LTE)
    total_payment_max = filters.NumberFilter(field_name='total_payment',lookup_expr=GTE)
    employee = filters.CharFilter(field_name='employee__user__name',lookup_expr=LIKE)
    type = filters.ChoiceFilter(field_name='type',lookup_expr=EQUALS)
    payment_method = filters.ChoiceFilter(field_name='payment_method',lookup_expr=EQUALS)
    reservation = filters.NumberFilter(lookup_expr=EQUALS)
    created_at_max = filters.DateFilter(lookup_expr=LTE)
    created_at_min = filters.DateFilter(lookup_expr=GTE)

    class Meta:
        model = models.Payment
        fields = ['total_payment_min', 'total_payment_max', 'employee', 'type', 'payment_method', 'reservation']

class EmployeeFilter(filters.FilterSet):
    user = filters.CharFilter(field_name='user__name', lookup_expr=LIKE)
    salary_min = filters.NumberFilter(field_name='salary', lookup_expr=GTE)
    salary_max = filters.NumberFilter(field_name='salary', lookup_expr=LTE)
    level = filters.NumberFilter(lookup_expr=EQUALS)
    position = filters.CharFilter(field_name='position__function', lookup_expr=IN)


    class Meta:
        model = models.Employee
        fields = ["user", "salary_min", "salary_max", "level", "position"]
