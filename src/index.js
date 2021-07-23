const wa = require("@open-wa/wa-automate");
const { jaoPimpao, calabocaPalestrinha } = require("./random");
const { imgToSticker } = require("./sticker");
const { searchTorrent } = require("./torrent");
const { commands } = require("./utils");

wa.create().then((client) => start(client));

function start(client) {
  client.onAnyMessage(async (message) => {
    commands(client, message);
    jaoPimpao(client, message);
    imgToSticker(client, message);
    searchTorrent(client, message);
    calabocaPalestrinha(client, message);
  });
}
