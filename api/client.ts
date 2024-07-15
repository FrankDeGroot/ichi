import IClient from './iclient.ts';
import IClients from './iclients.ts';
import { Message } from "./message.ts";

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
      console.log(`received ${e.data}`);
      this.#webSocket.send(`echoing ${e.data}`);
    };
    this.#webSocket.onerror = (e) => {
      console.warn("socket errored:", e);
      this.#clients.remove(this);
    };
    this.#webSocket.onclose = () => this.#clients.remove(this);
  }

  send(message: Message): void {
    this.#webSocket.send(JSON.stringify(message));
  }

  broadcast(message: Message): void {
    this.#clients.broadcast(message);
  }
}