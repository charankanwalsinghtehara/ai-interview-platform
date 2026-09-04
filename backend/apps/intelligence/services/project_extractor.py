import re


PROJECT_KEYWORDS = [
    "project",
    "projects",
    "developed",
    "built",
    "created",
    "implemented",
]


def detect_projects(text):

    detected = []

    lines = text.split("\n")

    for line in lines:

        line_lower = line.lower()

        if any(keyword in line_lower for keyword in PROJECT_KEYWORDS):

            detected.append(line.strip())

    return detected[:10]