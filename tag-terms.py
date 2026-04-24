#!/usr/bin/env python3
"""
tag-terms.py — Auto-tag first occurrences of glossary terms in a .qmd file.

For each term in glossary.js, finds the FIRST occurrence in the prose of
the given .qmd file and wraps it as [**term**]{.term} (bold + hover tooltip).
All subsequent occurrences are left as plain text.

Safe zones (never modified):
  - YAML front matter
  - Fenced code blocks  (``` ... ```)
  - Raw HTML blocks     (```{=html} ... ```)
  - Already-tagged terms ([**term**]{.term})
  - Lines in the Readings section (## Readings onwards)

Usage:
  python tag-terms.py session-notes/week03-science-public-good.qmd
  python tag-terms.py --dry-run session-notes/week03-science-public-good.qmd

Works for the Bowles & Halliday textbook too — point it at any .qmd file.
"""

import re
import sys
import difflib
from pathlib import Path


# ── Config ─────────────────────────────────────────────────────────────────
GLOSSARY_JS = Path(__file__).parent / "glossary.js"


# ── Parse glossary.js ───────────────────────────────────────────────────────
def load_terms(glossary_path: Path) -> list[str]:
    """Extract term keys from glossary.js (single-quoted dictionary keys)."""
    content = glossary_path.read_text()
    # Match the opening key of each entry: '  term': '...'
    terms = re.findall(r"^\s+'([^']+)':", content, re.MULTILINE)
    # Sort longest first so "public good" is matched before "good"
    return sorted(terms, key=len, reverse=True)


# ── Line classifier ─────────────────────────────────────────────────────────
def tag_first_occurrences(body: str, terms: list[str]) -> tuple[str, dict]:
    """
    Walk through prose lines and tag the first occurrence of each term.
    Returns (new_body, {term: line_number_tagged}).
    """
    lines = body.split("\n")
    result = []
    seen: set[str] = set()          # terms already tagged
    tagged_at: dict[str, int] = {}  # term → line number (1-based)

    in_code  = False
    in_html  = False
    in_readings = False  # stop tagging after ## Readings

    for lineno, line in enumerate(lines, start=1):

        # ── Detect section boundaries ──────────────────────────────────────
        if re.match(r"^#{1,3}\s+Readings", line, re.IGNORECASE):
            in_readings = True

        # ── Detect block boundaries ────────────────────────────────────────
        if line.strip().startswith("```{=html}"):
            in_html = True
            result.append(line)
            continue
        if in_html:
            if line.strip() == "```":
                in_html = False
            result.append(line)
            continue
        if re.match(r"^```", line.strip()):
            in_code = not in_code
            result.append(line)
            continue
        if in_code:
            result.append(line)
            continue

        # ── Skip Readings section ──────────────────────────────────────────
        if in_readings:
            result.append(line)
            continue

        # ── Process prose line ─────────────────────────────────────────────
        for term in terms:
            if term in seen:
                continue

            # Already tagged on this or a previous line?
            # Catches both [term]{.term} and [**term**]{.term}
            already = re.search(
                r"\[(?:\*{0,2})" + re.escape(term) + r"(?:\*{0,2})\]\{\.term\}",
                line, re.IGNORECASE,
            )
            if already:
                seen.add(term)
                continue

            pattern = re.compile(r"\b" + re.escape(term) + r"\b", re.IGNORECASE)
            m = pattern.search(line)
            if m:
                original = m.group(0)
                replacement = f"[**{original}**]{{.term}}"
                line = line[: m.start()] + replacement + line[m.end() :]
                seen.add(term)
                tagged_at[term] = lineno

        result.append(line)

    return "\n".join(result), tagged_at


# ── Main ────────────────────────────────────────────────────────────────────
def main():
    dry_run = "--dry-run" in sys.argv
    paths = [a for a in sys.argv[1:] if not a.startswith("--")]

    if not paths:
        print(__doc__)
        sys.exit(1)

    terms = load_terms(GLOSSARY_JS)
    print(f"Loaded {len(terms)} glossary terms.")

    for qmd_path in paths:
        path = Path(qmd_path)
        if not path.exists():
            print(f"ERROR: {qmd_path} not found.")
            continue

        original = path.read_text()

        # Split off YAML front matter
        if original.startswith("---"):
            end = original.find("\n---", 3)
            if end != -1:
                yaml  = original[: end + 4]
                body  = original[end + 4 :]
            else:
                yaml, body = "", original
        else:
            yaml, body = "", original

        new_body, tagged_at = tag_first_occurrences(body, terms)
        new_content = yaml + new_body

        print(f"\n{path.name}")
        if tagged_at:
            for term, lineno in sorted(tagged_at.items(), key=lambda x: x[1]):
                print(f"  ✓  line {lineno:>3}: [{term}]")
        else:
            print("  (no new terms found)")

        if dry_run:
            diff = list(difflib.unified_diff(
                original.splitlines(),
                new_content.splitlines(),
                fromfile=f"{path.name} (before)",
                tofile=f"{path.name} (after)",
                lineterm="",
            ))
            if diff:
                print("\n" + "\n".join(diff[:60]))
            print("\nDry run — no files written.")
        else:
            if new_content != original:
                path.write_text(new_content)
                print(f"  Saved.")
            else:
                print(f"  No changes needed.")


if __name__ == "__main__":
    main()
