module.exports = {
  commands: async (client, message) => {
    if (message?.body?.startsWith("!comando")) {
      await client.sendText(
        message.from,
        "*!comandos*: lista de comandos disponíveis \n\n" +
          "*!joao X*: spama X vezes 'João Gordo Nojento !'\t (No maximo de 10 spam porque os amigos não sabem brincar)" +
          "\n\n*!sticker* na legenda da foto para converter a imagem em sticker\n\n *!torrent* busca: busca qualquer coisa de torrent *(teste)*\n\n" +
          "*!calaboca*: manda o Tchesco ficar quieto\n\n*!paixao*: manda um sticker do paixão\n\n*!gif* url: converte uma gif da internet para sticker animado"
      );
    }
  },
};
