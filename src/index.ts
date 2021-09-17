import { create, Client, NotificationLanguage } from "@open-wa/wa-automate";
import { jaoPimpao, calabocaPalestrinha, paixaoGod } from "./random";
import { imgToSticker, saveStickersAsWebp, sendGifAsSticker } from "./sticker";
import { searchTorrent } from "./torrent";

import { commands } from "./utils";
import { handleDownloadMp3, handleDownloadVideo } from "./youtube";

create({
  hostNotificationLang: NotificationLanguage.PTBR,
  useChrome: true,
  headless: false,
}).then((client) => start(client));

function start(client: Client) {
  client.onMessage(async (message) => {
    commands(client, message);
    jaoPimpao(client, message);
    imgToSticker(client, message);
    searchTorrent(client, message);
    calabocaPalestrinha(client, message);
    paixaoGod(client, message);
    saveStickersAsWebp(client, message);
    sendGifAsSticker(client, message);
  });
  client.onAnyMessage(async (message) => {
    handleDownloadVideo(client, message);
    handleDownloadMp3(client, message);
  });
}
