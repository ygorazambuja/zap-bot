import { Client, Message } from "@open-wa/wa-automate";

import torrentSearchApi from "torrent-search-api";

torrentSearchApi.enableProvider("ThePirateBay");

export async function searchTorrent(client: Client, message: Message) {
  if (message?.body?.startsWith("!torrent ")) {
    const query = message.body.split("!torrent ")[1];
    const torrents = (await torrentSearchApi.search(query, "All", 1)) as any;
    const [torrent] = torrents;

    if (torrent.numFiles === 0) {
      return client.sendText(message.from, "Não foram encontrados resultados");
    }

    const createTorrentInfo = (torrent: any) => {
      return `
        Título: ${torrent.title}
        Tamanho: ${torrent.size}
        Provider: ${torrent.provider}
        Seeds: ${torrent.seeds}
        Peers: ${torrent.peers}
      `;
    };

    await client.sendText(message.chatId, createTorrentInfo(torrent));

    return await client.sendText(message.chatId, torrent.magnet);
  }
}
