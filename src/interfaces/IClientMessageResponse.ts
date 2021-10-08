import { Client, Message } from "@open-wa/wa-automate";

export abstract class IClientMessageResponse {
  constructor(readonly client: Client, readonly message: Message) {
    this.client = client;
    this.message = message;
  }

  abstract handleMessage(): Promise<void>;
}
