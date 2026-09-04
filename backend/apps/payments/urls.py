from django.urls import path

from .views import (
CreateContributionOrderView,
VerifyContributionPaymentView,
CreateSubscriptionView,
ConfirmSubscriptionPaymentView,
SubscriptionStatusView,
SubscriptionUsageView,
)

urlpatterns = [


# CONTRIBUTIONS

path(
    "create-order/",
    CreateContributionOrderView.as_view(),
    name="create-contribution-order"
),

path(
    "verify/",
    VerifyContributionPaymentView.as_view(),
    name="verify-contribution-payment"
),


# DEMO SUBSCRIPTIONS

path(
    "subscription/create/",
    CreateSubscriptionView.as_view(),
    name="create-subscription"
),

path(
    "subscription/confirm/",
    ConfirmSubscriptionPaymentView.as_view(),
    name="confirm-subscription-payment"
),

path(
"subscription/status/",
SubscriptionStatusView.as_view(),
name="subscription-status"
),

path(
    "subscription/usage/",
    SubscriptionUsageView.as_view(),
    name="subscription-usage"
),

]
