import { Client, Message } from "@open-wa/wa-automate";
import axios from "axios";

export async function searchCorreio(client: Client, message: Message) {
  if (message?.body?.startsWith("!correio ")) {
    const query = message.body.split("!correio ")[1];
    const { data } = await axios.get(
      `https://rastreamento.correios.com.br/app/resultado.php?objeto=${query}&mqs=S`
    );

    const buildResponseText = () => {
      const { eventos } = data;

      return `${eventos.map((evento) => {
        return `
      Descricao: ${evento.descricao}
      Cidade Atual: ${evento.unidade.endereco.cidade}
      Cidade Destino: ${evento.unidadeDestino?.endereco?.cidade}
      UF Atual: ${evento.unidade.endereco.uf}
      UF Destino: ${evento.unidadeDestino?.endereco?.uf}
      Horario: ${evento.dtHrCriado};
      Unidade: ${evento.unidade.nome}\n`;
      })}`.replace(",", "");
    };

    const buildAlgumaCoisa = () => {
      return `
        Data Prevista: ${data.dtPrevista}
        ${buildResponseText()}
      `;
    };

    return await client.sendText(message.chatId, buildAlgumaCoisa());
  }
}
