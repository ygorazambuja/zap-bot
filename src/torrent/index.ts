import { Client, Message } from "@open-wa/wa-automate";

import torrentSearchApi from "torrent-search-api";

torrentSearchApi.enableProvider("ThePirateBay");

export async function searchTorrent(client: Client, message: Message) {
  if (message?.body?.startsWith("!torrent")) {
    const query = message.body.split("!torrent ")[1];
    const torrents = await torrentSearchApi.search(query, "All", 1);

    const createResponseMessage = (torrent) =>
      `${torrent?.title}\n\n${torrent?.magnet}`;

    client.sendText(message.chatId, createResponseMessage(torrents[0]));
  }
}
