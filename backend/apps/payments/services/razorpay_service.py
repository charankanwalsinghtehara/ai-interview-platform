import razorpay

from django.conf import settings


client = razorpay.Client(
    auth=(
        settings.RAZORPAY_KEY_ID,
        settings.RAZORPAY_KEY_SECRET
    )
)


def create_razorpay_order(amount, receipt):

    amount_in_paise = int(
        amount * 100
    )

    data = {
        "amount": amount_in_paise,
        "currency": "INR",
        "receipt": receipt,
    }

    order = client.order.create(
        data=data
    )

    return order


def verify_payment_signature(
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
):

    parameters = {
        "razorpay_order_id": razorpay_order_id,
        "razorpay_payment_id": razorpay_payment_id,
        "razorpay_signature": razorpay_signature,
    }

    return client.utility.verify_payment_signature(
        parameters
    )