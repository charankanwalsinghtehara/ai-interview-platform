from django.urls import path

from .views import (
    ResumeUploadView,
    ResumeListView,
    ResumeDetailView,
    SetActiveResumeView,
    ResumeDeleteView,
    ActiveResumeView,
)


urlpatterns = [
    path("upload/", ResumeUploadView.as_view(), name="resume-upload"),

    path("", ResumeListView.as_view(), name="resume-list"),

    path("<int:pk>/", ResumeDetailView.as_view(), name="resume-detail"),

    path("<int:pk>/set-active/",SetActiveResumeView.as_view(),name="set-active-resume"),

    path("<int:pk>/delete/",ResumeDeleteView.as_view(),name="resume-delete"),

    path("active/",ActiveResumeView.as_view(),name="active-resume"),
]