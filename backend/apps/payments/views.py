from decimal import Decimal, InvalidOperation

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from razorpay.errors import SignatureVerificationError

from .models import Contribution

from .services.razorpay_service import (
    create_razorpay_order,
    verify_payment_signature
)
from django.conf import settings

class CreateContributionOrderView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        amount = request.data.get("amount")

        try:

            amount = Decimal(str(amount))

            if amount <= 0:

                return Response(
                    {
                        "error":
                            "Amount must be greater than zero"
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

        except (InvalidOperation, TypeError):

            return Response(
                {
                    "error":
                        "Invalid amount"
                },
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

            contribution.status = "FAILED"

            contribution.save()

            return Response(
                {
                    "error":
                        "Unable to create payment order"
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

                "razorpay_key": settings.RAZORPAY_KEY_ID
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


