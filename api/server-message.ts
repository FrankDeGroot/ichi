import { BroadcastMessage } from "./broadcast-message.ts";
import { Card } from "../game/deck.ts";

export type ServerMessage = { deal: Card[] } | BroadcastMessage;
