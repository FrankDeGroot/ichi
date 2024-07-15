import IClient from "./iclient.ts";
import { Message } from "./message.ts";

/**
 * Interface expected by a client to have it removed from the list.
 */
export default interface IClients {
  /**
   * Remove client from list.
   * @param client Client to remove.
   */
  remove(client: IClient): void;
  /**
   * Broadcast message to all connected clients.
   */
  broadcast(message: Message): void;
}