from django.urls import path

from .views import (
    StartInterviewView,
    SubmitAnswerView,
    CompleteInterviewView,
)


urlpatterns = [

    path(
        "start/",
        StartInterviewView.as_view(),
        name="start-interview"
    ),

    path(
        "questions/<int:question_id>/answer/",
        SubmitAnswerView.as_view(),
        name="submit-answer"
    ),

    path(
        "<int:interview_id>/complete/",
        CompleteInterviewView.as_view(),
        name="complete-interview"
    ),
]