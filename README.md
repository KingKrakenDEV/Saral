# NyaySimple (working name) — AI for the Indian legal system

Hackathon theme: *complexity resolved by simplicity*. India's legal system is
fragmented across dozens of acts, written in dense language, and expensive to
access. This prototype uses retrieval-grounded AI (not free-form generation)
to make two things simple: **understanding** a legal document/situation, and
**producing** one.

## How it works

```
corpus/*.json          -> plain-text sections of specific Acts, tagged by section number
src/retrieval.py        -> TF-IDF search over the corpus (swap for embeddings later)
src/llm_client.py       -> thin Claude API wrapper
src/explain.py          -> Feature 1: explain a document/situation, grounded + cited
src/generate.py         -> Feature 2: fill a legal document template from user's words
templates/*.txt         -> fixed legal document skeletons with {{placeholders}}
demo_cli.py              -> run both features from the command line
```

**Why retrieval + templates instead of just asking an LLM to "know Indian law"
and "write a legal notice"?** Because hallucinated section numbers or invented
clauses in a legal tool are actively dangerous, not just wrong. Grounding
every claim in retrieved text, and keeping document *structure* fixed while
only letting the LLM fill in facts, is what makes this safe enough to demo
(and to build on for real).

## Setup

```bash
pip install -r requirements.txt
export ANTHROPIC_API_KEY=sk-ant-...   # required for explain/generate, not for retrieval test
```

Test retrieval alone (no API key needed):
```bash
python3 src/retrieval.py
```

Run the explainer:
```bash
python3 demo_cli.py explain "I filed an RTI 45 days ago and got no reply"
```

Run the document generator:
```bash
python3 demo_cli.py generate rti_application "I am Ramesh Kumar living in Bengaluru. I want to ask BBMP for details of road repair spending on my street in 2025."
```

## IMPORTANT before your demo

The JSON files in `corpus/` contain **paraphrased summaries**, not verbatim
statutory text — clearly marked with a `_note` field. Before you demo this
live, replace them with **exact text copied from the official source**
(https://indiacode.nic.in) for whichever acts/sections you're covering.
Do not present paraphrased text as if it were the actual law — for a legal
tool, that's the one place accuracy really matters, both for your own
credibility with judges and for the tool's actual usefulness.

## Next steps to extend

1. **Add more acts/sections** to `corpus/` as JSON files — the retriever picks
   them up automatically, no code changes needed.
2. **Add more templates** to `templates/` — legal notice for landlord disputes,
   employment dispute notice, consumer complaint draft, etc.
3. **Swap TF-IDF for embeddings** (sentence-transformers or a hosted embedding
   API) once you have more sections — TF-IDF is keyword-based and will miss
   paraphrased queries that don't share vocabulary with the statute text.
4. **Add a conversational intake loop**: right now `generate_document` returns
   `missing_fields` in one shot; wire this into a chat loop that asks the user
   for exactly those fields, one at a time, then re-fills the template.
5. **Wrap in a simple UI** — even a single-page form (description in, document/
   explanation out) demos far better live than a CLI.
6. **Add a disclaimer + scope-boundary layer**: for situations outside your
   corpus's coverage, make sure the system says so explicitly rather than
   answering from the LLM's general (unverified) legal knowledge — this is
   already built into `explain.py`'s system prompt, extend the same pattern
   everywhere.
