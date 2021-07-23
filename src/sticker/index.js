const { decryptMedia } = require("@open-wa/wa-automate");
const mime = require("mime-types");

module.exports = {
  imgToSticker: async (client, message) => {
    if (message?.caption === "!sticker" && message.mimetype) {
      try {
        const mediaData = await decryptMedia(message);
        const imageBase64 = `data:${
          message.mimetype
        };base64,${mediaData.toString("base64")}`;

        client.sendImageAsSticker(message.from, imageBase64);
      } catch (err) {
        throw new Error(err.message);
      }
    }
  },
};
