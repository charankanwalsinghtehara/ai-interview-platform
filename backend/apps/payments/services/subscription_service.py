from django.utils import timezone

from apps.payments.models import Subscription
from apps.payments.models import (
    Subscription,
    FeatureUsage
)
from django.utils import timezone

PLAN_LIMITS = {

    "FREE": {
        "resume_analyses": 2,
        "interviews": 2,
        "job_matches": 5,
        "advanced_reports": False,
        "full_analytics": False,
    },

    "PRO": {
        "resume_analyses": 10,
        "interviews": 10,
        "job_matches": 20,
        "advanced_reports": True,
        "full_analytics": True,
    },

    "PREMIUM": {
        "resume_analyses": -1,
        "interviews": -1,
        "job_matches": -1,
        "advanced_reports": True,
        "full_analytics": True,
    },

}


def get_user_subscription(user):

    subscription = Subscription.objects.filter(
        user=user,
        status="ACTIVE"
    ).order_by(
        "-created_at"
    ).first()


    if not subscription:

        return None


    if subscription.expires_at:

        if subscription.expires_at < timezone.now():

            subscription.status = "EXPIRED"

            subscription.save()

            return None


    return subscription


def get_user_plan(user):

    subscription = get_user_subscription(user)


    if subscription:

        return subscription.plan


    return "FREE"


def get_plan_limits(user):

    plan = get_user_plan(user)

    return PLAN_LIMITS.get(
        plan,
        PLAN_LIMITS["FREE"]
    )


def can_access_feature(user, feature):

    limits = get_plan_limits(user)

    return limits.get(feature)


def has_feature_access(user, feature):

    limits = get_plan_limits(user)

    value = limits.get(feature)

    if value is None:

        return False

    if isinstance(value, bool):

        return value

    return True

def get_feature_usage_count(user, feature):

    today = timezone.now().date()


    return FeatureUsage.objects.filter(

        user=user,

        feature=feature,

        usage_date__year=today.year,

        usage_date__month=today.month

    ).count()


def can_use_feature(user, feature, limit_name):

    limits = get_plan_limits(user)

    limit = limits.get(limit_name)


    # Unlimited access

    if limit == -1:

        return True


    # Feature not available

    if limit is None:

        return False


    usage_count = get_feature_usage_count(

        user,

        feature

    )


    return usage_count < limit

def record_feature_usage(user, feature):

    FeatureUsage.objects.create(

        user=user,

        feature=feature

    )

