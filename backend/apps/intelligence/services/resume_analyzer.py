from .text_cleaner import clean_resume_text
from .skill_extractor import extract_skills
from .skill_categorizer import categorize_skills
from .education_extractor import extract_education
from .experience_extractor import extract_experience
from .project_extractor import detect_projects
from .resume_scorer import calculate_resume_scores


def analyze_resume(resume_text):

    # Clean text
    cleaned_text = clean_resume_text(resume_text)

    # Extract skills
    skills = extract_skills(cleaned_text)

    # Categorize skills
    categorized_skills = categorize_skills(skills)

    # Extract education
    education = extract_education(resume_text)

    # Extract experience
    experience = extract_experience(resume_text)

    # Detect projects
    projects = detect_projects(resume_text)

    # Calculate scores
    scores = calculate_resume_scores(
        categorized_skills,
        education,
        experience,
        projects
    )

    return {
        "skills": skills,
        "categorized_skills": categorized_skills,
        "education": education,
        "experience": experience,
        "projects": projects,
        "scores": scores,
    }