from rest_framework import routers

from core import viewsets

router = routers.DefaultRouter()
router.register('reservartion', viewsets.ReservationViewSet)
router.register('payment',viewsets.PaymentViewSet)

router.register('Employee', viewsets.EmployeeViewSet)

router.register('Position', viewsets.PositionViewSet)


urlpatterns = router.urls