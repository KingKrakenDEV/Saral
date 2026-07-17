"""
Retrieval layer: loads all act JSON files from /corpus, indexes each section
with TF-IDF, and returns the top-k most relevant sections for a query.

Swap this for a proper embedding model (sentence-transformers, Voyage, etc.)
post-hackathon if you want semantic (not just keyword) matching.
"""
import json
import glob
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


class LegalRetriever:
    def __init__(self, corpus_dir="corpus"):
        self.sections = []  # flat list of {act_name, act_short, section_number, title, text}
        self._load_corpus(corpus_dir)
        self._build_index()

    def _load_corpus(self, corpus_dir):
        for filepath in glob.glob(os.path.join(corpus_dir, "*.json")):
            with open(filepath, "r", encoding="utf-8") as f:
                act = json.load(f)
            for sec in act["sections"]:
                self.sections.append({
                    "act_name": act["act_name"],
                    "act_short": act["act_short"],
                    "section_number": sec["section_number"],
                    "title": sec["title"],
                    "text": sec["text"],
                })
        if not self.sections:
            raise ValueError(f"No corpus files found in {corpus_dir}")

    def _build_index(self):
        # combine title + text for indexing so titles boost relevance too
        corpus_texts = [f"{s['title']}. {s['text']}" for s in self.sections]
        self.vectorizer = TfidfVectorizer(stop_words="english")
        self.matrix = self.vectorizer.fit_transform(corpus_texts)

    def retrieve(self, query, k=4):
        query_vec = self.vectorizer.transform([query])
        scores = cosine_similarity(query_vec, self.matrix)[0]
        ranked_idx = scores.argsort()[::-1][:k]
        results = []
        for idx in ranked_idx:
            if scores[idx] <= 0:
                continue
            item = dict(self.sections[idx])
            item["score"] = float(scores[idx])
            results.append(item)
        return results

    def format_for_prompt(self, results):
        """Format retrieved sections as a context block for the LLM prompt."""
        blocks = []
        for r in results:
            blocks.append(
                f"[{r['act_short']} - Section {r['section_number']}: {r['title']}]\n{r['text']}"
            )
        return "\n\n".join(blocks)


if __name__ == "__main__":
    retriever = LegalRetriever(corpus_dir=os.path.join(os.path.dirname(__file__), "..", "corpus"))
    test_queries = [
        "government office is not responding to my information request",
        "shopkeeper sold me a defective product and refuses refund",
    ]
    for q in test_queries:
        print(f"\nQUERY: {q}")
        results = retriever.retrieve(q, k=3)
        for r in results:
            print(f"  [{r['score']:.3f}] {r['act_short']} Sec {r['section_number']}: {r['title']}")
