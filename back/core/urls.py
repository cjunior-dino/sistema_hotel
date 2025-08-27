from rest_framework import routers

from core import viewsets

router = routers.DefaultRouter()
router.register('reservartion', viewsets.ReservationViewSet)
router.register('payment',viewsets.PaymentViewSet)

urlpatterns = router.urls