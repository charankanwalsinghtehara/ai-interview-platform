import random

from apps.interviews.data.questions import INTERVIEW_QUESTIONS


def select_personalized_questions(
    role,
    user_skills,
    number_of_questions=5
):

    questions = INTERVIEW_QUESTIONS.get(role, [])

    if not questions:
        return []

    # Normalize user skills
    user_skills = [
        skill.lower().strip()
        for skill in user_skills
    ]

    # Questions matching user's skills
    matching_questions = []

    # Other role-related questions
    other_questions = []

    for question in questions:

        question_skill = question["skill"].lower()

        if question_skill in user_skills:
            matching_questions.append(question)

        else:
            other_questions.append(question)

    selected_questions = []

    # First priority: user's skills
    selected_questions.extend(
        matching_questions
    )

    # Shuffle matching questions
    random.shuffle(selected_questions)

    # Fill remaining slots
    if len(selected_questions) < number_of_questions:

        random.shuffle(other_questions)

        remaining = (
            number_of_questions
            - len(selected_questions)
        )

        selected_questions.extend(
            other_questions[:remaining]
        )

    # Limit number of questions
    return selected_questions[:number_of_questions]