from django_filters import rest_framework as filters

from core.models import ModelBase, Room, Service

# # Filtros de pesquisa
#     LIKE = 'unaccent__icontains' # Usando unaccent para ignorar acentos e trazer palavras semelhantes
#     ICONTAINS = 'icontains' # Usando icontains para trazer palavras semelhantes
#     UNACCENT_IEXACT = 'unaccent__iexact' # Usando unaccent para ignorar acentos e trazer palavras exatas
#     EQUALS = 'exact' # Usando exact para trazer o campo exatas
#     STARTS_WITH = 'startswith' # Usando startswith para trazer palavras que começam com o termo pesquisado
#     GT = 'gt' # maior que
#     LT = 'lt' # menor que
#     GTE = 'gte' # maior ou igual a
#     LTE = 'lte' # menor ou igual a
#     IN = 'in' # Usando in para trazer palavras que estão na lista



class RoomFilter(filters.FilterSet):
    type_room = filters.NumberFilter(lookup_expr=EQUALS)
    type_room_in = filters.BaseInFilter(field_name='type_room', lookup_expr=IN)

    description = filters.CharFilter(lookup_expr=LIKE)
    description_startswith = filters.CharFilter(field_name='description', lookup_expr=ICONTAINS)

    capacity = filters.NumberFilter(lookup_expr=GTE)
    capacity_in = filters.NumberFilter(field_name='capacity',lookup_expr=LTE)

    daily_rate = filters.NumberFilter(lookup_expr=GTE)
    daily_rate_lte = filters.NumberFilter(field_name='daily_rate',lookup_expr=LTE)

    class Meta:
        model = Room
        fields = ['type_room', 'type_room_in', 'description', 'description_startswith', 'capacity', 'capacity_in','daily_rate', 'daily_rate_lte']


class ServiceFilter(filters.FilterSet):
    type = filters.NumberFilter(lookup_expr=EQUALS)
    type_in = filters.BaseInFilter(field_name='type', lookup_expr=IN)

    value = filters.NumberFilter(lookup_expr=EQUALS)
    value_lte = filters.NumberFilter(field_name='value', lookup_expr=LTE)
    value_gte = filters.NumberFilter(field_name='value', lookup_expr=GTE)

    description_service = filters.CharFilter(field_name='Service__description', lookup_expr=LIKE)
    description_startswith = filters.CharFilter(field_name='Service__description', lookup_expr=ICONTAINS)

    employee_id = filters.CharFilter(field_name='employee_id', lookup_expr=IN)

    reservation_id = filters.CharFilter(field_name='reservation_id', lookup_expr=EQUALS)
    reservation_dt_begin = filters.DateFilter(field_name='reservation_dt', lookup_expr=EQUALS)
    reservation_dt_end = filters.DateFilter(field_name='reservation_dt', lookup_expr=EQUALS)


    class Meta:
        model = Service
        fields = ['type', 'type_in', 'value', 'value_lte', 'value_gte','description_service', 'description_startswith','employee_id', 'reservation_id', 'reservation_dt_begin', 'reservation_dt_end']








