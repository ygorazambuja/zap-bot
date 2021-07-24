const torrentSearchApi = require("torrent-search-api");
torrentSearchApi.enableProvider("ThePirateBay");

module.exports = {
  searchTorrent: async (client, message) => {
    if (message?.body?.startsWith("!torrent")) {
      const query = message.body.split("!torrent ")[1];
      const torrents = await torrentSearchApi.search(query, "All", 1);

      const createResponseMessage = (torrent) =>
        `${torrent?.title}\n\n${torrent?.magnet}`;

      client.sendText(message.to, createResponseMessage(torrents[0]));
    }
  },
};
