# 4. Solution Strategy
<!-- Explain the fundamental decisions and technology choices for solving the key problems -->

## Technology Choices
- Cloud-native architecture using Microsoft Azure services (SWA, Functions/API, Cosmos DB, PubSub)
- TypeScript for type-safe game logic and consistency across frontend and backend
- Deterministic, testable game engine as the core
- [Gea](https://geajs.com/) for frontend, reference for agents:
  - [Skill](https://raw.githubusercontent.com/dashersw/gea/refs/heads/main/.cursor/skills/gea-framework/SKILL.md)
  - [Docs](https://geajs.com/docs/)

## Development Milestones

- __Terminal Version__: For development offline version using only node, terminal-only of one player vs computer. No persistent storage, no authentication.
- __Offline Version__: For development offline version using only node, connected web browsers. No persistent storage, no authentication.
- __Online version__: using Azure Resources mentioned in Deployment View including storage and authentication.