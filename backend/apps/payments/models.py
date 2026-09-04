from django.conf import settings
from django.db import models


class Contribution(models.Model):

    STATUS_CHOICES = (
        ("PENDING", "Pending"),
        ("SUCCESS", "Success"),
        ("FAILED", "Failed"),
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="contributions"
    )

    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    currency = models.CharField(
        max_length=10,
        default="INR"
    )

    razorpay_order_id = models.CharField(
        max_length=255,
        unique=True,
        blank=True,
        null=True
    )

    razorpay_payment_id = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    razorpay_signature = models.TextField(
        blank=True,
        null=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="PENDING"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):

        return (
            f"{self.user.username} - "
            f"₹{self.amount} - {self.status}"
        )


class Subscription(models.Model):

    PLAN_CHOICES = (
        ("PRO", "Pro"),
        ("PREMIUM", "Premium"),
    )

    STATUS_CHOICES = (
        ("PENDING", "Pending"),
        ("ACTIVE", "Active"),
        ("FAILED", "Failed"),
        ("EXPIRED", "Expired"),
    )

    PAYMENT_METHOD_CHOICES = (
        ("UPI", "UPI"),
        ("CARD", "Card"),
        ("DEMO", "Demo Payment"),
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="subscriptions"
    )

    plan = models.CharField(
        max_length=20,
        choices=PLAN_CHOICES
    )

    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    currency = models.CharField(
        max_length=10,
        default="INR"
    )

    payment_method = models.CharField(
        max_length=20,
        choices=PAYMENT_METHOD_CHOICES,
        default="DEMO"
    )

    transaction_id = models.CharField(
        max_length=100,
        unique=True,
        blank=True,
        null=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="PENDING"
    )

    started_at = models.DateTimeField(
        blank=True,
        null=True
    )

    expires_at = models.DateTimeField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return (
            f"{self.user.username} - "
            f"{self.plan} - "
            f"{self.status}"
        )

class FeatureUsage(models.Model):

    FEATURE_CHOICES = (

        ("RESUME_ANALYSIS", "Resume Analysis"),

        ("INTERVIEW", "Interview"),

        ("JOB_MATCH", "Job Match"),

    )


    user = models.ForeignKey(

        settings.AUTH_USER_MODEL,

        on_delete=models.CASCADE,

        related_name="feature_usage"

    )


    feature = models.CharField(

        max_length=50,

        choices=FEATURE_CHOICES

    )


    usage_date = models.DateField(

        auto_now_add=True

    )


    created_at = models.DateTimeField(

        auto_now_add=True

    )


    def __str__(self):

        return (

            f"{self.user.username} - "

            f"{self.feature}"

        )