from rest_framework import routers

from core import viewsets

router = routers.DefaultRouter()
router.register('reservation', viewsets.ReservationViewSet)
router.register('payment',viewsets.PaymentViewSet)

router.register('employee', viewsets.EmployeeViewSet)

router.register('position', viewsets.PositionViewSet)

router.register('room', viewsets.RoomViewSet)

router.register('service', viewsets.ServiceViewSet)

router.register('check', viewsets.CheckViewSet)

router.register('paymentmethod', viewsets.PaymentMethodViewSet)


urlpatterns = router.urls