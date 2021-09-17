import { Client, decryptMedia, Message } from "@open-wa/wa-automate";
import fs from "fs";

export async function imgToSticker(client: Client, message: Message) {
  if (message?.caption === "!sticker" && message.mimetype) {
    try {
      const mediaData = await decryptMedia(message);
      const imageBase64 = `data:${message.mimetype};base64,${mediaData.toString(
        "base64"
      )}`;

      client.sendImageAsSticker(message.from, imageBase64, {
        author: "ybot",
        pack: "ybot",
        keepScale: true,
      });
    } catch (err) {
      throw new Error("Error");
    }
  }
}

export async function saveStickersAsWebp(client: Client, message: Message) {
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
}

export async function sendGifAsSticker(client: Client, message: Message) {
  if (message.caption === "!gif") {
    if (message.mimetype === "video/mp4") {
      try {
        const decripted = await decryptMedia(message);
        client.sendMp4AsSticker(message.from, decripted, { crop: false });
      } catch (error) {
        console.error(error);
      }
    }
  }
}
