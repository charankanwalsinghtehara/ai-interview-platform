from django.urls import path

from .views import (
    CreateContributionOrderView,
    VerifyContributionPaymentView
)


urlpatterns = [

    path("create-order/",CreateContributionOrderView.as_view(),name="create-contribution-order"),

    path("verify/",VerifyContributionPaymentView.as_view(),name="verify-contribution-payment"),
]