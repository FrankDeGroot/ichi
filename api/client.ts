import { BroadcastMessage } from "./broadcast-message.ts";
import { ClientMessage } from "./client-message.ts";
import IClient from "./iclient.ts";
import IClients from "./iclients.ts";
import { ServerMessage } from "./server-message.ts";

/**
 * Wraps a websocket for RPC-features.
 */
export default class Client implements IClient {
  readonly #webSocket: WebSocket;
  readonly #clients: IClients;

  constructor(webSocket: WebSocket, clients: IClients) {
    this.#webSocket = webSocket;
    this.#clients = clients;
    this.#webSocket.onmessage = (e: MessageEvent<string>) => {
      console.debug(`received ${e.data}`);
      const message = JSON.parse(e.data) as ClientMessage;
      if (message == "start") {
        this.send({ deal: [{ color: "Red", digit: 1 }] });
      }
    };
    this.#webSocket.onerror = (e) => {
      console.warn("socket errored:", e);
      this.#clients.remove(this);
    };
    this.#webSocket.onclose = () => this.#clients.remove(this);
  }

  send(message: ServerMessage): void {
    this.#webSocket.send(JSON.stringify(message));
  }

  broadcast(message: BroadcastMessage): void {
    this.#clients.broadcast(message);
  }
}
