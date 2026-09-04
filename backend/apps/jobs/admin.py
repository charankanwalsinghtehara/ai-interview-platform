from django.contrib import admin

from .models import Job


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):

    list_display = (
        "title",
        "company",
        "location",
        "job_type",
        "is_active",
    )

    search_fields = (
        "title",
        "company",
        "description",
    )

    list_filter = (
        "is_active",
        "job_type",
        "experience_level",
    )