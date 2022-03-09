import { Client, Message, decryptMedia } from "@open-wa/wa-automate";
import { writeFile } from "fs/promises";
import { getAudioTranscription } from "./utils";

export async function handleAudioTranscription(
  client: Client,
  message: Message
) {
  if (message?.body?.startsWith("!sousurdo")) {
    try {
      const timestamp = new Date().getTime();
      const quotedMsg = await client.getMessageById(
        message?.quotedMsg?.id || ""
      );
      const decrypted = await decryptMedia(quotedMsg);
      const buffer: Buffer = decrypted;
      await saveAudioFile(buffer, timestamp);

      const text = await getAudioTranscription(timestamp);

      await client.reply(message.chatId, text, message?.quotedMsg?.id);
    } catch (error) {
      client.sendText(message.chatId, "Error: " + error);
    }
  }
}

async function saveAudioFile(buffer: Buffer, timestamp: number) {
  return await writeFile(`${timestamp}.opus`, buffer.toString("base64"), {
    encoding: "base64",
  }).catch((err) => console.log(err));
}
