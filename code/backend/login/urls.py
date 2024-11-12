from .views.check_email_views import CheckEmailView
from .views.logout_views import LogoutView
from .views.user_views import CustomTokenObtainPairView
from .views.reset_password_email_views import CustomPasswordResetView
from .views.reset_password_confirm_views import PasswordChangeConfirmView

from django.urls import path,include


urlpatterns = [
    path('', include('djoser.urls')),
    path('', include('djoser.urls.jwt')),
    # path('', include('djoser.urls.authtoken')),
    path('login/', CustomTokenObtainPairView.as_view(), name='custom_login'),
    path('logout/', LogoutView.as_view(), name='custom_logout'),
    path('check-email/', CheckEmailView.as_view(), name='check_email'),
    path('password/email/', CustomPasswordResetView.as_view(), name='password_reset_email'),
    path('password/confirm/', PasswordChangeConfirmView.as_view(), name='password_reset_confirm')
]

