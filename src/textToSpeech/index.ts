import { Client, Message } from "@open-wa/wa-automate";
import textToSpeech, { protos } from "@google-cloud/text-to-speech";
import util from "util";

import fs from "fs";

type ISynthesizeSpeechRequest =
  protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest;

export async function handledTextToSpeech(client: Client, message: Message) {
  if (message?.body?.startsWith("!naoseiler")) {
    try {
      const timestamp = new Date().getTime();
      const messageContent = await client.getMessageById(message.quotedMsg.id);

      await convertTextToSpeech(messageContent.body, timestamp);
      await client.sendAudio(message.chatId, `${timestamp}.mp3`);
    } catch (error) {
      console.error(error);
    }
  }
}

export async function convertTextToSpeech(text: string, timestamp: number) {
  const client = new textToSpeech.TextToSpeechClient();

  const request: ISynthesizeSpeechRequest = {
    input: { text: text },
    voice: {
      languageCode: "pt-BR",
      ssmlGender: "SSML_VOICE_GENDER_UNSPECIFIED",
    },
    audioConfig: { audioEncoding: "MP3" },
  };

  const writeFile = util.promisify(fs.writeFile);
  const [response] = await client.synthesizeSpeech(request);

  await writeFile(`${timestamp}.mp3`, response.audioContent, "binary");
}
