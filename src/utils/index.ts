import { Client, Message } from "@open-wa/wa-automate";

export async function commands(client: Client, message: Message) {
  if (message?.body?.startsWith("!comando")) {
    await client.sendText(
      message.chatId,
      "*!comandos*: lista de comandos disponíveis \n\n" +
        "*!joao X*: spama X vezes 'João Gordo Nojento !'\t (No maximo de 10 spam porque os amigos não sabem brincar)\n\n" +
        "*!sticker* na legenda da foto para converter a imagem em sticker\n\n" +
        "*!torrent* busca: busca qualquer coisa de torrent *(teste)*\n\n" +
        "*!calaboca*: manda o Tchesco ficar quieto\n\n" +
        "*!paixao*: manda um sticker do paixão\n\n" +
        "*!gif* url: converte uma gif da internet para sticker animado\n\n" +
        "*!audio* youtubeLink: converte videos do youtube para MP3\n\n" +
        "*!video* youtubeLink: baixa e envia video do YouTube\n\n" +
        "*!sousurdo* como resposta ao Audio para Transformar em Texto\n\n" +
        "*!naoseiler* como resposta ao Texto para Transformar em Audio"
    );
  }
}
