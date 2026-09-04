import re


def clean_resume_text(text):
    """
    Clean extracted resume text for analysis.
    """

    if not text:
        return ""

    # Convert to lowercase
    text = text.lower()

    # Replace multiple spaces with one space
    text = re.sub(r"\s+", " ", text)

    # Remove unwanted characters but keep useful symbols
    text = re.sub(r"[^\w\s+#.\-]", " ", text)

    # Remove extra spaces again
    text = re.sub(r"\s+", " ", text)

    return text.strip()