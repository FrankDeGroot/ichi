---
applyTo: "game/**/*.ts"
description: "Use when editing Uno game domain code, card rules, dealing, turn logic, and player behavior"
---

# Game domain instructions

- Keep rule logic explicit and colocated with existing domain files.
- Prefer extending existing functions before creating parallel rule engines.
- Preserve the card union style used in deck.ts (color/digit/specialCard/wildcard).
- Keep discard legality checks in discardable.ts unless there is a strong reason not to.
- Avoid hidden side effects in domain methods.
- Maintain deterministic behavior for a given deck/order.

## Code style in this repo
- Use existing import style with .ts extensions.
- Follow current naming and file granularity patterns.
- Keep methods small and readable.

## Validation
- Run npm test after changes that affect game behavior.
