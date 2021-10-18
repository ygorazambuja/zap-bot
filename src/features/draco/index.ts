import axios from "axios";
import { Client, Message } from "@open-wa/wa-automate";
import { IClientMessageResponse } from "../../interfaces/IClientMessageResponse";
import getDolarCotation from "../../utils/coins";

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
    if (this.message.body === "!draco") {
      const { USD } = await this.fetchDracoUSDRate();
      const dolarCotation = await getDolarCotation();

      const buildMessage = `
        Cotação do Draco em Dolar (USD): R$${Number(USD).toFixed(
          2
        )}\nCotação do Dolar em Real (BRL): R$${Number(
        dolarCotation * USD
      ).toFixed(2)}
      `;

      await this.client.sendText(this.message.chatId, buildMessage);
    }
    if (this.message.body?.startsWith("!draco ")) {
      const dracos = this.message.body.split(" ")[1];
      const { USD } = await this.fetchDracoUSDRate();
      const dolarCotation = await getDolarCotation();

      const dracoInBrl = dolarCotation * USD * Number(dracos);

      await this.client.sendText(
        this.message.chatId,
        `Draco em BRL: R$${dracoInBrl.toFixed(2)}`
      );
    }
  }
}
