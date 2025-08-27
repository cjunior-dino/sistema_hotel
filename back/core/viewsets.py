from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from core import models, serializers, filters


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = models.Service.objects.all()
    serializer_class = serializers.ServiceSerializer
    filterset_class = filters.ServiceFilter
    permission_classes = [IsAuthenticated]


class RoomViewSet(viewsets.ModelViewSet):
    queryset = models.Room.objects.all()
    serializer_class = serializers.RoomSerializer
    filterset_class = filters.RoomFilter
    permission_classes = [IsAuthenticated]

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

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = models.Employee.objects.all()
    serializer_class = serializers.EmployeeSerializer
    filterset_class = filters.EmployeeFilter
    permission_classes = [IsAuthenticated]

class PositionViewSet(viewsets.ModelViewSet):
    queryset = models.Position.objects.all()
    serializer_class = serializers.PositionSerializer
    filterset_class = filters.PositionFilter
    permission_classes = [IsAuthenticated]