module.exports = {
  commands: async (client, message) => {
    if (message?.body?.startsWith("!comando")) {
      await client.sendText(
        message.from,
        "*!comandos*: lista de comandos disponíveis \n" +
          "!joao X: spama X vezes 'João Gordo Nojento !' (No maximo de 10 spam porque os amigos não sabem brincar)" +
          "\n*!sticker* na legenda da foto\n *!torrent* busca: busca qualquer coisa de torrent (teste)*"
      );
    }
  },
};
