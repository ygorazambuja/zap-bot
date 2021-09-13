const wa = require("@open-wa/wa-automate");
const { jaoPimpao, calabocaPalestrinha, paixaoGod } = require("./random");
const {
  imgToSticker,
  saveStickersAsWebp,
  sendGifAsSticker,
  meImgToSticker,
} = require("./sticker");
const { searchTorrent } = require("./torrent");
const { commands } = require("./utils");

wa.create().then((client) => start(client));

function start(client) {
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
}
