from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Resume
from .serializers import ResumeSerializer
from .utils import extract_text_from_pdf

from apps.payments.services.subscription_service import (
    can_use_feature,
    record_feature_usage
)


# ==================================================
# RESUME UPLOAD
# ==================================================

class ResumeUploadView(generics.CreateAPIView):

    serializer_class = ResumeSerializer

    permission_classes = [IsAuthenticated]

    parser_classes = [MultiPartParser, FormParser]


    def create(self, request, *args, **kwargs):

        # ==========================================
        # CHECK SUBSCRIPTION LIMIT
        # ==========================================

        if not can_use_feature(
            request.user,
            "RESUME_ANALYSIS",
            "resume_analyses"
        ):

            return Response(
                {
                    "error": (
                        "You have reached your monthly resume "
                        "analysis limit. Please upgrade your plan."
                    )
                },
                status=status.HTTP_403_FORBIDDEN
            )


        # Continue with normal upload process

        return super().create(
            request,
            *args,
            **kwargs
        )


    def perform_create(self, serializer):

        uploaded_file = self.request.FILES.get("file")


        # ==========================================
        # VALIDATE FILE
        # ==========================================

        if not uploaded_file:

            raise ValidationError({
                "file": "Please upload a resume."
            })


        if not uploaded_file.name.lower().endswith(".pdf"):

            raise ValidationError({
                "file": "Only PDF resumes are allowed."
            })


        # ==========================================
        # EXTRACT PDF TEXT
        # ==========================================

        extracted_text = extract_text_from_pdf(
            uploaded_file
        )


        # ==========================================
        # MAKE OLD RESUMES INACTIVE
        # ==========================================

        Resume.objects.filter(

            user=self.request.user,

            is_active=True

        ).update(

            is_active=False

        )


        # ==========================================
        # SAVE NEW RESUME
        # ==========================================

        serializer.save(

            user=self.request.user,

            original_filename=uploaded_file.name,

            extracted_text=extracted_text,

            is_active=True,

        )


        # ==========================================
        # RECORD FEATURE USAGE
        # Only after successful resume upload
        # ==========================================

        record_feature_usage(

            self.request.user,

            "RESUME_ANALYSIS"

        )


# ==================================================
# RESUME LIST
# ==================================================

class ResumeListView(generics.ListAPIView):

    serializer_class = ResumeSerializer

    permission_classes = [IsAuthenticated]


    def get_queryset(self):

        return Resume.objects.filter(

            user=self.request.user

        ).order_by(

            "-uploaded_at"

        )


# ==================================================
# RESUME DETAIL
# ==================================================

class ResumeDetailView(generics.RetrieveAPIView):

    serializer_class = ResumeSerializer

    permission_classes = [IsAuthenticated]


    def get_queryset(self):

        return Resume.objects.filter(

            user=self.request.user

        )


# ==================================================
# SET ACTIVE RESUME
# ==================================================

class SetActiveResumeView(APIView):

    permission_classes = [IsAuthenticated]


    def post(self, request, pk):

        try:

            resume = Resume.objects.get(

                id=pk,

                user=request.user

            )

        except Resume.DoesNotExist:

            return Response(

                {
                    "error": "Resume not found"
                },

                status=status.HTTP_404_NOT_FOUND

            )


        # Disable all active resumes

        Resume.objects.filter(

            user=request.user

        ).update(

            is_active=False

        )


        # Activate selected resume

        resume.is_active = True

        resume.save()


        return Response({

            "message": "Resume set as active",

            "resume_id": resume.id

        })


# ==================================================
# DELETE RESUME
# ==================================================

class ResumeDeleteView(generics.DestroyAPIView):

    serializer_class = ResumeSerializer

    permission_classes = [IsAuthenticated]


    def get_queryset(self):

        return Resume.objects.filter(

            user=self.request.user

        )


    def perform_destroy(self, instance):

        # Delete physical PDF file

        if instance.file:

            instance.file.delete(
                save=False
            )


        instance.delete()


# ==================================================
# ACTIVE RESUME
# ==================================================

class ActiveResumeView(generics.RetrieveAPIView):

    serializer_class = ResumeSerializer

    permission_classes = [IsAuthenticated]


    def get_object(self):

        try:

            return Resume.objects.get(

                user=self.request.user,

                is_active=True

            )

        except Resume.DoesNotExist:

            raise ValidationError({

                "detail": "No active resume found."

            })