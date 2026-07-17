"""
Feature 1: Document / situation explainer.

Flow:
  user_text -> retrieve relevant sections -> LLM explains in plain language,
  grounded ONLY in the retrieved sections, with citations and a clear
  "not legal advice" boundary.
"""
from retrieval import LegalRetriever
from llm_client import call_claude

SYSTEM_PROMPT = """You are a legal explainer for Indian citizens with no legal background.
Rules you must follow strictly:
1. Only use the LEGAL CONTEXT provided below. Do not use any other knowledge of Indian law you may have, since it may be outdated or incomplete.
2. Every legal claim you make must cite the specific Act and Section it comes from, using the format (Act name, Section X).
3. If the provided context does not clearly cover the user's situation, say so explicitly rather than guessing.
4. Write in simple, plain English (or Hindi if the user writes in Hindi), avoiding legal jargon. Explain any unavoidable legal term in one short phrase.
5. Structure your answer as:
   - What this means (2-3 sentences)
   - Relevant law (bullet points with citations)
   - Suggested next steps (bullet points)
6. End with exactly one line: "This is general information, not legal advice. For anything with real stakes, please consult a lawyer."
"""


def explain(user_text, retriever, k=4):
    results = retriever.retrieve(user_text, k=k)
    context = retriever.format_for_prompt(results)

    if not results:
        return {
            "answer": (
                "I couldn't find relevant sections in the current legal database for this. "
                "This prototype only covers a few sample acts (RTI Act, Consumer Protection Act). "
                "This is general information, not legal advice. For anything with real stakes, please consult a lawyer."
            ),
            "sources": [],
        }

    user_prompt = f"""LEGAL CONTEXT:
{context}

USER'S SITUATION / DOCUMENT:
{user_text}

Explain this to the user following the rules above."""

    answer = call_claude(SYSTEM_PROMPT, user_prompt)
    return {"answer": answer, "sources": results}


if __name__ == "__main__":
    import os
    retriever = LegalRetriever(corpus_dir=os.path.join(os.path.dirname(__file__), "..", "corpus"))
    sample = "I filed an RTI request 45 days ago and the government office hasn't replied at all. What can I do?"
    result = explain(sample, retriever)
    print(result["answer"])
