from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny

from accounts import models, serializers, filters


class UserViewSet(viewsets.ModelViewSet):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer
    filterset_class = filters.UserFilter
    permission_classes = [AllowAny]
