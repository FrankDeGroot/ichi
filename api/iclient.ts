import { BroadcastMessage } from "./broadcast-message.ts";
import { ServerMessage } from "./server-message.ts";

export default interface IClient {
  send(message: ServerMessage): void;
  broadcast(message: BroadcastMessage): void;
}