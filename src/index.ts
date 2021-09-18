import { create, Client, NotificationLanguage } from "@open-wa/wa-automate";
import { jaoPimpao, calabocaPalestrinha, paixaoGod } from "./random";
import { handleAudioTranscription } from "./speechToText";
import { imgToSticker, saveStickersAsWebp, sendGifAsSticker } from "./sticker";
import { handledTextToSpeech } from "./textToSpeech";
import { searchTorrent } from "./torrent";

import { commands } from "./utils";
import { handleDownloadMp3, handleDownloadVideo } from "./youtube";

create({
  hostNotificationLang: NotificationLanguage.PTBR,
  useChrome: true,
}).then((client) => start(client));

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
  });
}
