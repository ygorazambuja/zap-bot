module.exports = {
  jaoPimpao: async (client, message) => {
    if (message?.body?.startsWith("!joao")) {
      const n = Number(message.body.substring(6));
      for (let i = 0; i < n && i < 10; i++) {
        await client.sendText(message.from, "João Gordo Nojento !");
      }
    }
  },
  calabocaPalestrinha: async (client, message) => {
    if (message?.body?.startsWith("!calaboca")) {
      await client.sendText(message.from, "Calaboca Palestrinha !");
    }
  },
};
