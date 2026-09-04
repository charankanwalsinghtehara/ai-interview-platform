from django.urls import path

from .views import (
    GenerateCandidateReportView
)


urlpatterns = [

    path(
        "generate/",
        GenerateCandidateReportView.as_view(),
        name="generate-candidate-report"
    ),
]