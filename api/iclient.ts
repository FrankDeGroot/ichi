import { BroadcastMessage } from "./broadcast-message.ts";
import { ServerMessage } from "./server-message.ts";

/**
 * Interface for individual client.
 */
export default interface IClient {
  /**
   * Send message to this client.
   */
  send(message: ServerMessage): void;
  /**
   * Send broadcasted message to this client.
   */
  broadcast(message: BroadcastMessage): void;
}