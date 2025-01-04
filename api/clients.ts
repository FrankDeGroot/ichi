import Client from "./client.ts";
import IClient from "./iclient.ts";
import IClients from "./iclients.ts";
import { BroadcastMessage } from "./broadcast-message.ts";

/**
 * Manages websocket connections to each client.
 */
export default class Clients implements IClients {
  readonly #clients: IClient[] = [];

  connect(socket: WebSocket) {
    const client = new Client(socket, this);
    this.#add(client);
  }

  #add(client: IClient) {
    this.#clients.push(client);
  }

  remove(client: IClient) {
    this.#clients.splice(this.#clients.indexOf(client), 1);
  }

  broadcast(message: BroadcastMessage): void {
    for(const client of this.#clients) {
      client.send(message);
    }
  }
}
