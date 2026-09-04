
from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [

    # =========================
    # DJANGO ADMIN
    # =========================

    path(
        "admin/",
        admin.site.urls
    ),


    # =========================
    # AUTHENTICATION
    # =========================

    path(
        "api/auth/",
        include("apps.accounts.urls")
    ),


    # =========================
    # JWT AUTHENTICATION
    # =========================

    path(
        "api/auth/login/",
        TokenObtainPairView.as_view(),
        name="login"
    ),

    path(
        "api/auth/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh"
    ),


    # =========================
    # RESUME
    # =========================

    path(
        "api/resumes/",
        include("apps.resumes.urls")
    ),


    # =========================
    # INTELLIGENCE
    # =========================

    path(
        "api/intelligence/",
        include("apps.intelligence.urls")
    ),


    # =========================
    # ANALYTICS
    # =========================

    path(
        "api/analytics/",
        include("apps.analytics.urls")
    ),


    # =========================
    # INTERVIEWS
    # =========================

    path(
        "api/interviews/",
        include("apps.interviews.urls")
    ),


    # =========================
    # EVALUATION
    # =========================

    path(
        "api/evaluation/",
        include("apps.evaluation.urls")
    ),


    # =========================
    # REPORTS
    # =========================

    path(
        "api/reports/",
        include("apps.reports.urls")
    ),


    # =========================
    # JOB MATCHES
    # =========================

    path(
        "api/jobs/",
        include("apps.jobs.urls")
    ),


    # =========================
    # PAYMENTS / SUBSCRIPTIONS
    # =========================

    path(
        "api/payments/",
        include("apps.payments.urls")
    ),

]


# =========================
# DEVELOPMENT MEDIA FILES
# =========================

if settings.DEBUG:

    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )

