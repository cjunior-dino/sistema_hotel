from rest_framework import routers

from accounts import viewsets

router = routers.DefaultRouter()
router.register(r'users', viewsets.UserViewSet)

urlpatterns = router.urls