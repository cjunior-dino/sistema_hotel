from django_filters import rest_framework as filters

from core import models


class ReservationFilter(filters.FilterSet):
    class Meta:
        model = models.Reservation
        fields = ['id', 'client', 'room']