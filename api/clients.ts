import { Client, IClients } from "./client.ts";

/**
 * Manages websocket connections to each client.
 */
export default class Clients implements IClients {
  readonly #clients: Client[] = [];

  connect(socket: WebSocket) {
    const client = new Client(socket, this);
    this.#add(client);
  }

  #add(client: Client) {
    this.#clients.push(client);
  }

  remove(client: Client) {
    this.#clients.splice(this.#clients.indexOf(client), 1);
  }
}
