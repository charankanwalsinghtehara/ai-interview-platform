from django.urls import path

from .views import (
    AnalyticsDashboardView,
    PowerBIDataView,
    CareerAnalyticsView,
    PowerBICareerDataView,
)


urlpatterns = [

    path("dashboard/",AnalyticsDashboardView.as_view(),name="analytics-dashboard"),

    path("powerbi-data/",PowerBIDataView.as_view(),name="powerbi-data"),

    path("career-analysis/",CareerAnalyticsView.as_view(),name="career-analysis"),

    path("powerbi-career-data/",PowerBICareerDataView.as_view(),name="powerbi-career-data"),
]