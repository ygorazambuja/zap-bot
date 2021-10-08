import axios from "axios";
import { Client, Message } from "@open-wa/wa-automate";
import { IClientMessageResponse } from "../../interfaces/IClientMessageResponse";

const DRACO_URL = "https://api.mir4global.com/wallet/prices/draco/lastest";

export class Draco extends IClientMessageResponse {
  constructor(readonly client: Client, readonly message: Message) {
    super(client, message);
  }

  async fetchDracoUSDRate() {
    const response = await axios.post(DRACO_URL);
    const { Data } = await response.data;

    return {
      USD: Data.USDDracoRate,
    };
  }

  async handleMessage() {
    if (this.message.body.startsWith("!draco")) {
      const draco = await this.fetchDracoUSDRate();
      await this.client.sendText(
        this.message.chatId,
        `Cotação do DRACO em Dolar: ${draco.USD}`
      );
    }
  }
}
