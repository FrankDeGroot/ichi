# 5. Building Block View
<!-- Describe the static structure: components, modules, and their relationships -->

## Infrastructure Components
- **Azure Single Web App (SWA)**: Hosts the user interface for each player
- **SWA API**: Executes the game engine logic and handles game orchestration
- **Cosmos DB**: Stores and retrieves persistent game state
- **PubSub**: Real-time event distribution mechanism to notify each player of game changes

## Code Components

- `/swa` source of Azure Single Web App (SWA)
- `/game` shared game logic
- `/term` Terminal Version of game (see Solution Strategy)

## Card Zones
- **Draw pile** (`draw-pile.ts`): cards available to draw; auto-refills from discard pile when empty.
- **Hand** (`hand.ts`): cards held by a player during a game.
- **Discard pile** (`discard-pile.ts`): the top card defines what can be legally played next.
