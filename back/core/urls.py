from rest_framework import routers

from core import viewsets

router = routers.DefaultRouter()
router.register('rooms', viewsets.RoomViewSet)
router.register('services', viewsets.ServiceViewSet)
router.register('reservation', viewsets.ReservationViewSet)
router.register('payment',viewsets.PaymentViewSet)

router.register('Employee', viewsets.EmployeeViewSet)

router.register('Position', viewsets.PositionViewSet)


urlpatterns = router.urls