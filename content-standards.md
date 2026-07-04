# apexvoid-trading — Content, Research & Visualization Standards (SHARED)

> Referenced by every topic brief (`antigravity-trading-docs-brief.md`, `antigravity-dow-theory-brief.md`, and future modules). These are **hard requirements**. A page that states a definition and moves on is a FAIL. Every concept must be *researched, taught, exemplified, and visualized*.

---

## 1. Research standard

- Research each topic from **authoritative / primary sources**, not SEO blog rehashes. Prefer original texts, foundational authors, and reputable references; cross-check facts across ≥2 sources.
- **Cite inline.** Every source-based factual claim (dates, attributions, statistics, "X invented Y") carries a citation — per-page reference list or footnotes.
- **Intellectual honesty:** distinguish (a) established fact, (b) contested/debated claims, (c) popular myth. Never present a marketing repackage as an original discovery. Where a concept is renamed folklore (common in ICT/SMC), say so and trace the lineage.
- **No fabrication.** Never invent quotes, dates, price figures, or "backtest" numbers to fill space. If a figure can't be verified, say so or use a clearly-labeled *idealized illustration* instead of fake precise data.
- Quotes are short and mostly paraphrased; attribute correctly.

---

## 2. Content depth standard (per concept page)

Every concept page is a full lesson with these blocks, in order:

1. **Hook** — 1–2 sentences: why this matters to a real trader.
2. **Plain-language definition** — one sentence a beginner understands.
3. **Deep explanation** — several paragraphs: mechanism, market psychology, edge cases, nuance. This is the core — do not skimp.
4. **Visuals** — see §4 (≥2 per page; core pages 3–4).
5. **How to see it on a chart** — explicit step-by-step.
6. **Worked examples** — see §3 (≥2 per concept).
7. **`Callout type="trap"`** — the most common misreading / beginner mistake.
8. **Modern restatement / cross-links** — how other frameworks on the site express the same idea; link them.
9. **FAQ** — ≥3 real learner questions, answered.
10. **`KeyTakeaways`** — 3–5 bullets.

**Word-count floors by page type** (real content, not padding):
- Core concept page: **900–1,300 words.**
- Overview / origins / meta page: **1,000–1,400 words.**
- Case-study page: **1,200+ words.**
- Each topic module total: **≥ 8,000–9,000 words.**

Tone: authoritative but accessible. Teach, don't lecture. No hype, no profit promises. **Educational-only framing on every page** (this is knowledge, not investment advice / not signals).

---

## 3. Example standard (every concept)

Each concept ships with **≥2 worked examples**, and at least one of each kind:
- **Grounded example** — tied to real market behavior / history where possible (label sources; if exact data is uncertain, use a clearly-idealized annotated chart, don't fake numbers).
- **Idealized annotated example** — a clean textbook instance with the structure marked step-by-step.
Where useful, add a **counter-example** ("this looks like X but isn't, because…") — the fastest way learners internalize a pattern.

Examples must be *walked through*, not just shown: narrate what to look at, in what order, and why the conclusion follows.

---

## 4. Visualization standard (the part prior drafts failed)

**Minimum 2 visuals per concept page; core mechanic pages need 3–4.** Every claim that has a spatial/price shape should be drawn, not only described.

Rules for all visuals:
- Reuse the site's typed components (`AnnotatedChart`, `CompareTable`, `StepFlow`, `ConfluenceMeter`, etc.). Add **new reusable typed SVG/React components** when needed — never one-off inline blobs.
- Dark-first. **Semantic colors, always consistent:** bull = blue `#3B82F6`, bear = orange `#F97316`, EMA200 = red `#EF4444`, warn/trap = amber `#F59E0B`, ok = green `#22C55E`. Meaning must be inferable from color alone.
- Monospace labels; mobile-legible; sensible `viewBox`, no clipped text on narrow screens.

**Two tiers of visuals, both required across a module:**

**(a) Static diagrams (SVG components)** — the illustrations. Each topic brief lists its own required set. Typical kinds: annotated candlestick charts, before/after sequences, side-by-side comparisons (confirming vs diverging, real vs fake), overlays (zones/levels), and process flows.

**(b) Interactive widgets (lazy-loaded React islands)** — the "learn by manipulating" layer. **Each topic module ships ≥1 interactive widget** so learners can explore, not just read. Patterns to reuse:
- **Explorer** — toggle/overlay layers on one chart to see how pieces relate.
- **Classifier / quiz** — show a scenario, learner guesses, reveal the reasoning.
- **Calculator / plotter** — learner sets inputs (a range, levels), widget computes and labels (premium/discount, OTE zone, confluence grade).
- **Walkthrough** — step through a marking process (HTF→LTF), one action at a time.

Interactive requirements: keyboard-accessible, touch-friendly, **code-split** (never bloats initial load), and each **degrades to a static SVG fallback** if JS is off. May use `lightweight-charts` where a real chart helps; keep it lazy.

---

## 5. Definition of Done (applies to every topic module)

- [ ] Every concept page follows the full §2 ten-block structure and meets its word-count floor.
- [ ] Module total meets the word floor with real content (no filler).
- [ ] Every concept has ≥2 worked examples per §3; grounded examples are sourced or clearly idealized.
- [ ] Every concept page has ≥2 visuals (core pages 3–4); all required static diagrams for the topic render correctly with consistent semantic colors.
- [ ] Module ships ≥1 interactive widget meeting §4(b) (a11y, touch, code-split, static fallback).
- [ ] All factual claims cited; fact/contested/myth distinguished; nothing fabricated.
- [ ] All pages + widget host pages registered in sidebar + Fuse.js search.
- [ ] `npm run build` green (TS strict); fully responsive; educational-only framing preserved.
