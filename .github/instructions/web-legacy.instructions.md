---
applyTo: "swa/**/*.{js,html,css}"
description: "Use when touching legacy web files; do not treat web JavaScript as source of truth for game rules"
---

# Web legacy instructions

- Assume swa/index.js is outdated relative to intended architecture.
- Do not move rule authority into swa/.
- Keep game rules and turn logic in game/.
- If UI changes require new behavior, define and test that behavior in game/ first.

## Safe edits in swa/
- Wiring and event handling updates.
- Display-only improvements.
- Lightweight integration changes that call into tested game logic.

## Avoid
- Re-implementing discard rules in swa/.
- Encoding win conditions only in browser code.
