from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.exceptions import ValidationError

from .models import Resume
from .serializers import ResumeSerializer
from .utils import extract_text_from_pdf
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class ResumeUploadView(generics.CreateAPIView):
    serializer_class = ResumeSerializer
    permission_classes = [IsAuthenticated]

    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        uploaded_file = self.request.FILES.get("file")

        if not uploaded_file:
            raise ValidationError({
                "file": "Please upload a resume."
            })

        if not uploaded_file.name.lower().endswith(".pdf"):
            raise ValidationError({
                "file": "Only PDF resumes are allowed."
            })

        extracted_text = extract_text_from_pdf(uploaded_file)

        # Make previously active resumes inactive
        Resume.objects.filter(
            user=self.request.user,
            is_active=True
        ).update(is_active=False)

        serializer.save(
            user=self.request.user,
            original_filename=uploaded_file.name,
            extracted_text=extracted_text,
            is_active=True,
        )


class ResumeListView(generics.ListAPIView):
    serializer_class = ResumeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Resume.objects.filter(
            user=self.request.user
        ).order_by("-uploaded_at")

class ResumeDetailView(generics.RetrieveAPIView):
    serializer_class = ResumeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Resume.objects.filter(
            user=self.request.user
        )

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
                {"error": "Resume not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        # Disable all active resumes
        Resume.objects.filter(
            user=request.user
        ).update(is_active=False)

        # Activate selected resume
        resume.is_active = True
        resume.save()

        return Response({
            "message": "Resume set as active",
            "resume_id": resume.id
        })

class ResumeDeleteView(generics.DestroyAPIView):
    serializer_class = ResumeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Resume.objects.filter(
            user=self.request.user
        )

    def perform_destroy(self, instance):
        # Delete the physical PDF file
        if instance.file:
            instance.file.delete(save=False)

        instance.delete()

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