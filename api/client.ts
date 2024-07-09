/**
 * Wraps a websocket for RPC-features.
 */
export class Client {
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
}

/**
 * Interface expected by a client to have it removed from the list.
 */
export interface IClients {
  /**
   * Remove client from list.
   * @param client Client to remove.
   */
  remove(client: Client): void;
}