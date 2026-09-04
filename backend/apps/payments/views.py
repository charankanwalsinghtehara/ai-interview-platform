from decimal import Decimal, InvalidOperation
from datetime import timedelta

from django.conf import settings
from django.utils import timezone

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from razorpay.errors import SignatureVerificationError

from .models import Contribution, Subscription
import uuid
from .services.subscription_service import (
    get_user_plan,
    get_plan_limits,
    get_feature_usage_count
)


# ==================================================

# CONTRIBUTION PAYMENT

# ==================================================

class CreateContributionOrderView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        amount = request.data.get("amount")

        try:

            amount = Decimal(str(amount))

            if amount <= 0:

                return Response(
                    {"error": "Amount must be greater than zero"},
                    status=status.HTTP_400_BAD_REQUEST
                )

        except (InvalidOperation, TypeError):

            return Response(
                {"error": "Invalid amount"},
                status=status.HTTP_400_BAD_REQUEST
            )

        contribution = Contribution.objects.create(

            user=request.user,
            amount=amount,
            status="PENDING"

        )

        try:

            order = create_razorpay_order(

                amount=amount,
                receipt=f"contribution_{contribution.id}"

            )

            contribution.razorpay_order_id = order["id"]

            contribution.save()

        except Exception as error:

            print(
                "CONTRIBUTION ORDER ERROR:",
                repr(error)
            )

            contribution.status = "FAILED"

            contribution.save()

            return Response(
                {
                    "error": str(error)
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return Response(
            {

                "message":
                    "Payment order created successfully",

                "contribution_id":
                    contribution.id,

                "razorpay_order_id":
                    order["id"],

                "amount":
                    int(amount * 100),

                "currency":
                    "INR",

                "razorpay_key":
                    settings.RAZORPAY_KEY_ID

                },
                status=status.HTTP_201_CREATED
            )


class VerifyContributionPaymentView(APIView):


    permission_classes = [IsAuthenticated]

    def post(self, request):

        razorpay_order_id = request.data.get(
            "razorpay_order_id"
        )

        razorpay_payment_id = request.data.get(
            "razorpay_payment_id"
        )

        razorpay_signature = request.data.get(
            "razorpay_signature"
        )

        if not all([

            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature

        ]):

            return Response(
                {
                    "error":
                        "Payment verification data is incomplete"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        try:

            contribution = Contribution.objects.get(

                razorpay_order_id=razorpay_order_id,
                user=request.user

            )

        except Contribution.DoesNotExist:

            return Response(
                {
                    "error":
                        "Contribution not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )

        try:

            verify_payment_signature(

                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature

            )

            contribution.razorpay_payment_id = (
                razorpay_payment_id
            )

            contribution.razorpay_signature = (
                razorpay_signature
            )

            contribution.status = "SUCCESS"

            contribution.save()

            return Response(
            {

                "message":
                    "Payment verified successfully",

                "contribution_id":
                    contribution.id,

                "status":
                    contribution.status

            }
        )

        except SignatureVerificationError:

            contribution.status = "FAILED"

            contribution.save()

            return Response(
                {
                    "error":
                        "Payment verification failed"
                },
                status=status.HTTP_400_BAD_REQUEST
            )


# ==================================================

# DEMO SUBSCRIPTION PAYMENT

# ==================================================

class CreateSubscriptionView(APIView):


    permission_classes = [IsAuthenticated]

    def post(self, request):

        plan = request.data.get("plan")

        PLAN_PRICES = {
            "PRO": Decimal("499.00"),
            "PREMIUM": Decimal("999.00"),
        }

        if not plan:

            return Response(
                {
                    "error": "Please select a plan."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        plan = plan.upper().strip()

        if plan not in PLAN_PRICES:

            return Response(
                {
                    "error": "Invalid subscription plan."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        amount = PLAN_PRICES[plan]

        subscription = Subscription.objects.create(
            user=request.user,
            plan=plan,
            amount=amount,
            status="PENDING"
        )

        return Response(
            {
                "message": "Subscription created successfully.",
                "subscription_id": subscription.id,
                "plan": subscription.plan,
                "amount": str(subscription.amount),
                "currency": subscription.currency,
                "status": subscription.status
            },
            status=status.HTTP_201_CREATED
        )


# ==================================================

# CONFIRM DEMO PAYMENT

# ==================================================

class ConfirmSubscriptionPaymentView(APIView):


    permission_classes = [IsAuthenticated]

    def post(self, request):

        subscription_id = request.data.get(
            "subscription_id"
        )

        payment_method = request.data.get(
            "payment_method",
            "DEMO"
        )

        if not subscription_id:

            return Response(
                {
                    "error": "Subscription ID is required."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        try:

            subscription = Subscription.objects.get(
                id=subscription_id,
                user=request.user
            )

        except Subscription.DoesNotExist:

            return Response(
                {
                    "error": "Subscription not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        if subscription.status == "ACTIVE":

            return Response(
                {
                    "message": "Subscription is already active."
                },
                status=status.HTTP_200_OK
            )

        subscription.payment_method = payment_method

        subscription.transaction_id = (
            f"DEMO_{uuid.uuid4().hex[:12].upper()}"
        )

        subscription.status = "ACTIVE"

        subscription.started_at = timezone.now()

        subscription.expires_at = (
            timezone.now() +
            timedelta(days=30)
        )

        subscription.save()

        return Response(
            {
                "message":
                    "Demo payment successful! Subscription activated.",

                "subscription_id":
                    subscription.id,

                "plan":
                    subscription.plan,

                "status":
                    subscription.status,

                "payment_method":
                    subscription.payment_method,

                "transaction_id":
                    subscription.transaction_id,

                "expires_at":
                    subscription.expires_at
            },
            status=status.HTTP_200_OK
        )


# ==================================================

# SUBSCRIPTION STATUS

# ==================================================

class SubscriptionStatusView(APIView):


    permission_classes = [IsAuthenticated]

    def get(self, request):

        subscription = Subscription.objects.filter(
            user=request.user,
            status="ACTIVE"
        ).order_by(
            "-created_at"
        ).first()

        if not subscription:

            return Response(
                {
                    "has_subscription": False,
                    "message":
                        "No active subscription found."
                },
                status=status.HTTP_200_OK
            )

        return Response(
            {
                "has_subscription": True,
                "subscription": {
                    "id": subscription.id,
                    "plan": subscription.plan,
                    "amount": str(subscription.amount),
                    "currency": subscription.currency,
                    "payment_method": subscription.payment_method,
                    "transaction_id": subscription.transaction_id,
                    "status": subscription.status,
                    "started_at": subscription.started_at,
                    "expires_at": subscription.expires_at,
                }
            },
            status=status.HTTP_200_OK
        )

# ==================================================
# SUBSCRIPTION USAGE
# ==================================================

class SubscriptionUsageView(APIView):

    permission_classes = [IsAuthenticated]


    def get(self, request):

        plan = get_user_plan(
            request.user
        )


        limits = get_plan_limits(
            request.user
        )


        # ==========================================
        # RESUME ANALYSIS USAGE
        # ==========================================

        resume_used = get_feature_usage_count(

            request.user,

            "RESUME_ANALYSIS"

        )


        resume_limit = limits.get(
            "resume_analyses",
            0
        )


        if resume_limit == -1:

            resume_remaining = "Unlimited"

            resume_limit_display = "Unlimited"

        else:

            resume_remaining = max(
                0,
                resume_limit - resume_used
            )

            resume_limit_display = resume_limit


        # ==========================================
        # INTERVIEW USAGE
        # ==========================================

        interview_used = get_feature_usage_count(

            request.user,

            "INTERVIEW"

        )


        interview_limit = limits.get(
            "interviews",
            0
        )


        if interview_limit == -1:

            interview_remaining = "Unlimited"

            interview_limit_display = "Unlimited"

        else:

            interview_remaining = max(
                0,
                interview_limit - interview_used
            )

            interview_limit_display = interview_limit


        # ==========================================
        # RESPONSE
        # ==========================================

        return Response(

            {

                "plan": plan,


                "resume_analyses": {

                    "used": resume_used,

                    "limit": resume_limit_display,

                    "remaining": resume_remaining

                },


                "interviews": {

                    "used": interview_used,

                    "limit": interview_limit_display,

                    "remaining": interview_remaining

                }

            },

            status=status.HTTP_200_OK

        )