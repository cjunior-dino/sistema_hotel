from django_filters import rest_framework as df_filters

from accounts import models

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

class UserFilter(df_filters.FilterSet):
    name = df_filters.CharFilter(lookup_expr=LIKE)
    id = df_filters.NumberFilter(lookup_expr=EQUALS)
    dt_birth = df_filters.DateFilter(lookup_expr=IN)
    email = df_filters.CharFilter(lookup_expr=ICONTAINS)
    phone = df_filters.CharFilter(lookup_expr=ICONTAINS)
    cpf = df_filters.CharFilter(lookup_expr=ICONTAINS)
    active = df_filters.BooleanFilter(lookup_expr=EQUALS)
    created_at = df_filters.DateFilter(lookup_expr=GTE)
    modified_at = df_filters.DateFilter(lookup_expr=GTE)

    class Meta:
        model = models.User
        fields = ['id', 'name', 'dt_birth', 'email', 'phone', 'cpf', 'active', 'created_at', 'modified_at']