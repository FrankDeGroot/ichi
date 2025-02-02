import { BroadcastMessage } from "./broadcast-message.ts";
import IClient from "./iclient.ts";

/**
 * Interface expected by a client to have it removed from the list.
 */
export default interface IClients {
  /**
   * Remove client from list.
   */
  remove(client: IClient): void;
  /**
   * Broadcast message to all connected clients.
   */
  broadcast(message: BroadcastMessage): void;
}
