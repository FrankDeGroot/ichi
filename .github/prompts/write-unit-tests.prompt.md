---
agent: ask
description: "Generate focused unit tests for game behavior using node:test and node:assert"
---

Write or update unit tests for the requested behavior in game/.

Inputs:
- Target file or symbol
- Intended behavior
- Any known edge cases

Requirements:
- Match existing test style in game/*.test.ts
- Keep fixtures explicit and small
- Include at least one edge case when relevant
- Do not add unnecessary mocking

Output:
1. Proposed test cases list
2. Test code
3. Brief rationale for each case
