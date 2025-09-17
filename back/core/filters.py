# from django_filters import rest_framework as df_filters
#
# from core import models

import django_filters as df_filters
from core import models

# Filtros de pesquisa
LIKE = 'unaccent__icontains'  # Usando unaccent para ignorar acentos e trazer palavras semelhantes
ICONTAINS = 'icontains'  # Usando icontains para trazer palavras semelhantes
UNACCENT_IEXACT = 'unaccent__iexact'  # Usando unaccent para ignorar acentos e trazer palavras exatas
EQUALS = 'exact'  # Usando exact para trazer o campo exatas
STARTS_WITH = 'startswith'  # Usando startswith para trazer palavras que começam com o termo pesquisado
GT = 'gt'  # maior que
LT = 'lt'  # menor que
GTE = 'gte'  # maior ou igual a
LTE = 'lte'  # menor ou igual a
IN = 'in'  # Usando in para trazer palavras que estão na lista


class PositionFilter(df_filters.FilterSet):
    function = df_filters.CharFilter(field_name='function', lookup_expr=ICONTAINS)
    salary_min = df_filters.NumberFilter(field_name='salary_min', lookup_expr=GTE)
    salary_max = df_filters.NumberFilter(field_name='salary_max', lookup_expr=LTE)

    class Meta:
        model = models.Position
        fields = ["function", "salary_min", "salary_max"]


class ReservationFilter(df_filters.FilterSet):
    id = df_filters.NumberFilter(lookup_expr=EQUALS)
    daily_value_min = df_filters.NumberFilter(field_name='daily_value', lookup_expr=LTE)
    daily_value_max = df_filters.NumberFilter(field_name='daily_value', lookup_expr=GTE)
    dt_begin = df_filters.DateFilter(lookup_expr=GTE)
    dt_end = df_filters.DateFilter(lookup_expr=LTE)
    client = df_filters.CharFilter(field_name='client__name', lookup_expr=LIKE)
    room = df_filters.ChoiceFilter(field_name='room__type_room', lookup_expr=EQUALS)

    class Meta:
        model = models.Reservation
        fields = ['id', 'daily_value_min', 'daily_value_max', 'dt_begin', 'dt_end', 'client', 'room']


class PaymentFilter(df_filters.FilterSet):
    total_payment_min = df_filters.NumberFilter(field_name='total_payment', lookup_expr=LTE)
    total_payment_max = df_filters.NumberFilter(field_name='total_payment', lookup_expr=GTE)
    employee = df_filters.CharFilter(field_name='employee__user__name', lookup_expr=LIKE)
    type = df_filters.ChoiceFilter(field_name='type', lookup_expr=EQUALS)
    payment_method = df_filters.ChoiceFilter(field_name='payment_method', lookup_expr=EQUALS)
    reservation = df_filters.NumberFilter(lookup_expr=EQUALS)
    created_at_max = df_filters.DateFilter(lookup_expr=LTE)
    created_at_min = df_filters.DateFilter(lookup_expr=GTE)

    class Meta:
        model = models.Payment
        fields = ['total_payment_min', 'total_payment_max', 'employee', 'type', 'payment_method', 'reservation']


class EmployeeFilter(df_filters.FilterSet):
    user = df_filters.CharFilter(field_name='user__name', lookup_expr=LIKE)
    salary_min = df_filters.NumberFilter(field_name='salary', lookup_expr=GTE)
    salary_max = df_filters.NumberFilter(field_name='salary', lookup_expr=LTE)
    level = df_filters.NumberFilter(lookup_expr=EQUALS)
    position = df_filters.CharFilter(field_name='position__function', lookup_expr=IN)

    class Meta:
        model = models.Employee
        fields = ["user", "salary_min", "salary_max", "level", "position"]


class RoomFilter(df_filters.FilterSet):
    id = df_filters.NumberFilter(lookup_expr=EQUALS)
    description = df_filters.CharFilter(field_name='description', lookup_expr=LIKE)
    type_room = df_filters.ChoiceFilter(field_name='type_room', lookup_expr=EQUALS)
    capacity = df_filters.NumberFilter(field_name='capacity', lookup_expr=GTE)
    daily_rate_min = df_filters.NumberFilter(field_name='daily_rate', lookup_expr=GTE)
    daily_rate_max = df_filters.NumberFilter(field_name='daily_rate', lookup_expr=LTE)

    class Meta:
        model = models.Room
        fields = ['id', 'description', 'type_room', 'capacity', 'daily_rate_min', 'daily_rate_max']


class ServiceFilter(df_filters.FilterSet):
    type = df_filters.NumberFilter(lookup_expr=EQUALS)
    type_in = df_filters.BaseInFilter(field_name='type', lookup_expr=IN)

    value = df_filters.NumberFilter(lookup_expr=EQUALS)
    value_lte = df_filters.NumberFilter(field_name='value', lookup_expr=LTE)
    value_gte = df_filters.NumberFilter(field_name='value', lookup_expr=GTE)

    description_service = df_filters.CharFilter(field_name='Service__description', lookup_expr=LIKE)
    description_startswith = df_filters.CharFilter(field_name='Service__description', lookup_expr=ICONTAINS)

    employee_id = df_filters.CharFilter(field_name='employee_id', lookup_expr=IN)

    reservation_id = df_filters.CharFilter(field_name='reservation_id', lookup_expr=EQUALS)
    reservation_dt_begin = df_filters.DateFilter(field_name='reservation_dt', lookup_expr=EQUALS)
    reservation_dt_end = df_filters.DateFilter(field_name='reservation_dt', lookup_expr=EQUALS)

    class Meta:
        model = models.Service
        fields = ['type', 'type_in', 'value', 'value_lte', 'value_gte']


class CheckFilter(df_filters.FilterSet):
    id = df_filters.NumberFilter(lookup_expr=EQUALS)
    type = df_filters.ChoiceFilter(lookup_expr=EQUALS)
    employee = df_filters.CharFilter(field_name='employee__user__name', lookup_expr=LIKE)
    reservation = df_filters.NumberFilter(field_name='reservation__id', lookup_expr=EQUALS)

    class Meta:
        model = models.Check
        fields = ['id', 'type', 'employee', 'reservation']


class PaymentMethodFilter(df_filters.FilterSet):
    name = df_filters.CharFilter(lookup_expr=LIKE)

    class Meta:
        model = models.PaymentMethod
        fields = ['name']
