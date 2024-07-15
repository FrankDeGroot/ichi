import { Message } from "./message.ts";

export default interface IClient {
  send(message: Message): void;
  broadcast(message: Message): void;
}