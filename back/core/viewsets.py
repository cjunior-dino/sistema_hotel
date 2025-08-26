from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from core import models, serializers, filters


class ReservationViewSet(viewsets.ModelViewSet):
    queryset = models.Reservation.objects.all()
    serializer_class = serializers.ReservationSerializer
    filterset_class = filters.ReservationFilter
    permission_classes = [IsAuthenticated]

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = models.Payment.objects.all()
    serializer_class = serializers.PaymentSerializer
    filterset_class = filters.PaymentFilter
    permission_classes = [IsAuthenticated]