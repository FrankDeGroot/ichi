# 2. Constraints
<!-- Document technical, organizational, and regulatory constraints -->

## Technical

- Prefer TypeScript
- Prefer Test-Driven Development
- Prefer Agentic-Driven Suitable Development

## Infrastructure

- An existing Azure Cosmos DB account must be present in the target resource group before deployment (passed as `shared_name` parameter to the Bicep template).

## Rules Source of Truth

- Executable truth lives in `game/` tests, not in docs or `swa/index.js`.
- The Uno rules summary in section 8 is paraphrased; if it conflicts with tests, update tests first, then code and docs.
- Where the official rulebook is ambiguous (e.g. first-discard action card behavior), codify one policy in tests and treat tests as authoritative.
