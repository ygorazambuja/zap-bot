const fs = require("fs");
module.exports = {
  jaoPimpao: async (client, message) => {
    if (message?.body?.startsWith("!joao")) {
      const n = Number(message.body.substring(6));
      // for (let i = 0; i < n && i < 10; i++) {
      await client.sendText(
        message.from,
        "João Gordo Nojento !\n\n para de spam tchesco otarios"
      );
      // }
    }
  },
  calabocaPalestrinha: async (client, message) => {
    if (message?.body?.startsWith("!calaboca")) {
      const n = Number(message.body.substring(10));
      for (let i = 0; i < n && i < 100; i++) {
        await client.sendText(message.from, "Calaboca Palestrinha !");
      }
    }
  },
  paixaoGod: async (client, message) => {
    if (message?.body?.startsWith("!paixao")) {
      fs.readFile(
        "paixaogod.webp",
        { encoding: "base64" },
        async (err, data) => {
          if (err) throw err;
          const image = data.toString();
          await client.sendImageAsSticker(message.from, image);
        }
      );
    }
  },
};
