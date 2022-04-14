import { create, Client, NotificationLanguage } from "@open-wa/wa-automate";
import { Draco } from "./features/draco";
import { jaoPimpao, calabocaPalestrinha, paixaoGod } from "./random";
import { handleAudioTranscription } from "./speechToText";
import { imgToSticker, saveStickersAsWebp, sendGifAsSticker } from "./sticker";
import { handledTextToSpeech } from "./textToSpeech";
import { searchTorrent } from "./torrent";
import { searchCorreio } from "./features/correio";

import { commands } from "./utils";
import { handleDownloadMp3, handleDownloadVideo } from "./youtube";

import { join } from "path";

create({
  hostNotificationLang: NotificationLanguage.PTBR,
  multiDevice: true,
  useChrome: true,
  // executablePath: "/usr/bin/google-chrome",
  sessionDataPath: join(__dirname, ".."),
})
  .then((client) => start(client))
  .catch((err) => console.error(err));

function start(client: Client) {
  client.onAnyMessage(async (message) => {
    commands(client, message);
    jaoPimpao(client, message);
    imgToSticker(client, message);
    searchTorrent(client, message);
    calabocaPalestrinha(client, message);
    paixaoGod(client, message);
    saveStickersAsWebp(client, message);
    sendGifAsSticker(client, message);
    handleDownloadVideo(client, message);
    handleDownloadMp3(client, message);
    handleAudioTranscription(client, message);
    handledTextToSpeech(client, message);
    searchCorreio(client, message);

    new Draco(client, message).handleMessage();
  });
}
