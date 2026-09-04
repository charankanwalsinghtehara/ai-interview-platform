from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("admin/", admin.site.urls),

    # Authentication
    path("api/auth/", include("apps.accounts.urls")),

    # JWT
    path("api/auth/login/", TokenObtainPairView.as_view(), name="login"),
    path("api/auth/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    # Resume APIs
    path("api/resumes/", include("apps.resumes.urls")),

#intelligence
    path("api/intelligence/",include("apps.intelligence.urls")),

#analytics
path("api/analytics/",include("apps.analytics.urls")),

#interviews
path("api/interviews/",include("apps.interviews.urls")),

#evaluation
path("api/evaluation/",include("apps.evaluation.urls")),

#reports
path("api/reports/",include("apps.reports.urls")),

#jobs
path("api/jobs/",include("apps.jobs.urls")),

#payments
path("api/payments/",include("apps.payments.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)