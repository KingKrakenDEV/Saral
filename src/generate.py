"""
Feature 2: Document generator.

Approach: template + slot-filling (NOT free-form generation of legal boilerplate).
The LLM's job is only to (a) extract slot values from the user's plain-language
description, and (b) flag which required slots are still missing so the app
can ask follow-up questions. The legal structure itself is fixed in the
template, which keeps output reliable and demoable.
"""
import os
import re
import json
from llm_client import call_claude
from retrieval import LegalRetriever

TEMPLATE_DIR = os.path.join(os.path.dirname(__file__), "..", "templates")

TEMPLATES = {
    "legal_notice": "legal_notice_template.txt",
    "rti_application": "rti_application_template.txt",
}

EXTRACTION_SYSTEM_PROMPT = """You extract structured field values from a user's plain-language
description of their situation, to fill into a legal document template.

Rules:
1. Only output valid JSON, nothing else - no preamble, no markdown fences.
2. Output a flat JSON object mapping each placeholder name (given to you) to a value.
3. If the user's description does not contain enough information for a placeholder,
   set its value to null - do NOT invent facts, names, dates, or amounts.
4. Keep values concise and in formal document language where appropriate.
"""


def _extract_placeholders(template_text):
    return sorted(set(re.findall(r"{{(.*?)}}", template_text)))


def _fill_template(template_text, values):
    filled = template_text
    for key, val in values.items():
        placeholder = "{{" + key + "}}"
        filled = filled.replace(placeholder, val if val else f"[MISSING: {key}]")
    return filled


def generate_document(template_name, user_description, retriever=None, k=3):
    if template_name not in TEMPLATES:
        raise ValueError(f"Unknown template: {template_name}. Options: {list(TEMPLATES.keys())}")

    with open(os.path.join(TEMPLATE_DIR, TEMPLATES[template_name]), "r", encoding="utf-8") as f:
        template_text = f.read()

    placeholders = _extract_placeholders(template_text)

    # Optionally ground the legal_basis_paragraph in retrieved law
    legal_context = ""
    if retriever is not None:
        results = retriever.retrieve(user_description, k=k)
        legal_context = retriever.format_for_prompt(results)

    user_prompt = f"""PLACEHOLDERS TO FILL: {json.dumps(placeholders)}

RELEVANT LAW (use only this if citing legal basis, do not invent citations):
{legal_context if legal_context else "(none retrieved)"}

USER'S DESCRIPTION OF THEIR SITUATION:
{user_description}

Return a JSON object with every placeholder as a key."""

    raw_response = call_claude(EXTRACTION_SYSTEM_PROMPT, user_prompt, max_tokens=1200)
    raw_response = raw_response.strip().strip("```").replace("json\n", "", 1) if raw_response.startswith("```") else raw_response
    values = json.loads(raw_response)

    filled_doc = _fill_template(template_text, values)
    missing = [k for k, v in values.items() if not v]

    return {
        "document": filled_doc,
        "missing_fields": missing,
        "values": values,
    }


if __name__ == "__main__":
    retriever = LegalRetriever(corpus_dir=os.path.join(os.path.dirname(__file__), "..", "corpus"))
    description = (
        "I am Ramesh Kumar living in Bengaluru. I filed an RTI request with the "
        "Bengaluru Municipal Corporation asking for details of road repair spending "
        "on my street in 2025, 45 days ago, and got no reply."
    )
    result = generate_document("rti_application", description, retriever=retriever)
    print(result["document"])
    print("\nMISSING FIELDS:", result["missing_fields"])
