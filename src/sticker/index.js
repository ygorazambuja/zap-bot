const { decryptMedia } = require("@open-wa/wa-automate");
const fs = require("fs");
module.exports = {
  imgToSticker: async (client, message) => {
    if (message?.caption === "!sticker" && message.mimetype) {
      try {
        const mediaData = await decryptMedia(message);
        const imageBase64 = `data:${
          message.mimetype
        };base64,${mediaData.toString("base64")}`;

        client.sendImageAsSticker(message.to, imageBase64);
      } catch (err) {
        throw new Error(err.message);
      }
    }
  },
  saveStickersAsWebp: async (client, message) => {
    if (message.mimetype === "image/webp") {
      try {
        const fileName = `${Date.now()}.webp`;
        const filePath = `./stickers/uploads/${fileName}`;
        const decripted = await decryptMedia(message);
        fs.writeFileSync(filePath, decripted, { encoding: "base64" });
      } catch (error) {
        console.error(error);
      }
    }
  },
  sendGifAsSticker: async (client, message) => {
    if (message?.body?.startsWith("!gif")) {
      const gifLink = message.body.split("!gif ")[1];

      await client.sendGiphyAsSticker(message.to, gifLink);
    }
  },
};
