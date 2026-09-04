from django.urls import path

from .views import (
    EvaluateAnswerView,
    GenerateInterviewReportView,
)


urlpatterns = [

    path("answers/<int:answer_id>/evaluate/",EvaluateAnswerView.as_view(),name="evaluate-answer"),

    path("interviews/<int:interview_id>/report/",GenerateInterviewReportView.as_view(),name="generate-interview-report"),
]