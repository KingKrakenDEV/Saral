"""
Quick CLI to demo both features end to end.
Usage:
  export ANTHROPIC_API_KEY=sk-ant-...
  python3 demo_cli.py explain "I filed an RTI 45 days ago and got no reply"
  python3 demo_cli.py generate rti_application "I am Ramesh Kumar in Bengaluru..."
"""
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "src"))

from retrieval import LegalRetriever
from explain import explain
from generate import generate_document

CORPUS_DIR = os.path.join(os.path.dirname(__file__), "corpus")


def main():
    if len(sys.argv) < 3:
        print(__doc__)
        return

    mode = sys.argv[1]
    retriever = LegalRetriever(corpus_dir=CORPUS_DIR)

    if mode == "explain":
        text = sys.argv[2]
        result = explain(text, retriever)
        print("\n--- EXPLANATION ---\n")
        print(result["answer"])
        print("\n--- SOURCES USED ---")
        for s in result["sources"]:
            print(f"  {s['act_short']} Section {s['section_number']}: {s['title']}")

    elif mode == "generate":
        template_name = sys.argv[2]
        description = sys.argv[3]
        result = generate_document(template_name, description, retriever=retriever)
        print("\n--- GENERATED DOCUMENT ---\n")
        print(result["document"])
        if result["missing_fields"]:
            print("\n--- STILL NEED FROM USER ---")
            for f in result["missing_fields"]:
                print(f"  - {f}")

    else:
        print(f"Unknown mode: {mode}. Use 'explain' or 'generate'.")


if __name__ == "__main__":
    main()
