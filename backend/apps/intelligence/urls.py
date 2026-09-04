from django.urls import path

from .views import AnalyzeActiveResumeView


urlpatterns = [
    path("analyze/",AnalyzeActiveResumeView.as_view(),name="analyze-active-resume"),
]