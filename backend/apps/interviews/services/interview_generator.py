from apps.interviews.data.questions import INTERVIEW_QUESTIONS


def get_questions_for_role(role):

    questions = INTERVIEW_QUESTIONS.get(role, [])

    return questions