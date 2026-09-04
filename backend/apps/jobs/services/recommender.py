from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from apps.intelligence.models import ResumeAnalysis
from apps.reports.models import CandidateReport
from apps.jobs.models import Job


def normalize_skill(skill):
    return str(skill).strip().lower()


def get_candidate_skills(user):
    analysis = (
        ResumeAnalysis.objects
        .filter(resume__user=user)
        .order_by("-analyzed_at")
        .first()
    )

    if not analysis:
        return []

    skills = []

    # Main extracted skills
    skills.extend(analysis.skills or [])

    # Categorized skills
    categorized_skills = analysis.categorized_skills or {}

    for category, skill_list in categorized_skills.items():
        if isinstance(skill_list, list):
            skills.extend(skill_list)

    # Remove duplicates
    unique_skills = []
    seen = set()

    for skill in skills:
        normalized = normalize_skill(skill)

        if normalized and normalized not in seen:
            seen.add(normalized)
            unique_skills.append(str(skill).strip())

    return unique_skills


def build_candidate_profile(user):
    skills = get_candidate_skills(user)
    return " ".join(str(skill) for skill in skills)


def build_job_profile(job):
    profile_parts = []

    if job.title:
        profile_parts.append(job.title)

    if job.description:
        profile_parts.append(job.description)

    required_skills = job.required_skills or []
    profile_parts.extend(str(skill) for skill in required_skills)

    return " ".join(profile_parts)


def calculate_skill_match(candidate_skills, required_skills):
    candidate_skill_map = {
        normalize_skill(skill): str(skill).strip()
        for skill in candidate_skills
    }

    matched_skills = []
    missing_skills = []

    for required_skill in required_skills:
        normalized_required = normalize_skill(required_skill)

        if normalized_required in candidate_skill_map:
            matched_skills.append(candidate_skill_map[normalized_required])
        else:
            missing_skills.append(str(required_skill).strip())

    return matched_skills, missing_skills


def get_candidate_scores(user):
    report = (
        CandidateReport.objects
        .filter(user=user)
        .first()
    )

    if not report:
        return {
            "interview_score": 0,
            "candidate_score": 0,
        }

    return {
        "interview_score": report.interview_score,
        "candidate_score": report.final_score,
    }


def calculate_final_match_score(similarity_score, interview_score, candidate_score):
    final_score = (
        similarity_score * 0.50
        + interview_score * 0.25
        + candidate_score * 0.25
    )
    return round(final_score, 2)


def get_job_recommendations(user):
    candidate_skills = get_candidate_skills(user)
    candidate_profile = " ".join(candidate_skills)

    if not candidate_profile.strip():
        return []

    jobs = Job.objects.filter(is_active=True)

    if not jobs.exists():
        return []

    job_list = list(jobs)
    job_profiles = [build_job_profile(job) for job in job_list]
    documents = [candidate_profile] + job_profiles

    # TF-IDF Vectorization
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(documents)

    # Candidate vector
    candidate_vector = tfidf_matrix[0]

    # Job vectors
    job_vectors = tfidf_matrix[1:]

    # Cosine Similarity
    similarity_scores = cosine_similarity(candidate_vector, job_vectors)[0]

    # Candidate performance scores
    candidate_scores = get_candidate_scores(user)
    interview_score = candidate_scores["interview_score"]
    candidate_score = candidate_scores["candidate_score"]

    recommendations = []

    for index, job in enumerate(job_list):
        # Resume ↔ Job similarity
        similarity_score = round(similarity_scores[index] * 100, 2)

        # Skill matching
        required_skills = job.required_skills or []
        matched_skills, missing_skills = calculate_skill_match(
            candidate_skills,
            required_skills,
        )

        # Final smart matching score
        final_match_score = calculate_final_match_score(
            similarity_score,
            interview_score,
            candidate_score,
        )

        recommendations.append(
            {
                "job": job,
                "similarity_score": similarity_score,
                "interview_score": interview_score,
                "candidate_score": candidate_score,
                "match_score": final_match_score,
                "matched_skills": matched_skills,
                "missing_skills": missing_skills,
            }
        )

    # Sort highest match first
    recommendations.sort(key=lambda item: item["match_score"], reverse=True)

    return recommendations

