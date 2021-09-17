import { Client, Message } from "@open-wa/wa-automate";
import ytdl from "ytdl-core";
import { createWriteStream, unlinkSync } from "fs";

export async function handleDownloadVideo(client: Client, message: Message) {
  if (message?.body?.startsWith("!video")) {
    try {
      console.log("[*] Start handleDownloadVideo");

      const url = message.body.split(" ")[1];

      const videoInfo = await getVideoInfo(url);
      client.sendText(message.from, "Baixando video: " + videoInfo.title);
      const timestamp = await downloadVideoAsMp4(url);
      await client.sendFile(
        message.from,
        `${timestamp}.mp4`,
        `${timestamp}.mp4`,
        `${timestamp}.mp4`
      );
      unlinkSync(`${timestamp}.mp4`);
    } catch (error) {
      console.error(error);
    }
  }
}

async function downloadVideoAsMp4(url: string) {
  return new Promise<number>((resolve, reject) => {
    const timestamp = new Date().getTime();
    const video = ytdl(url, {
      filter: "audioandvideo",
      quality: "lowestvideo",
    });
    const file = createWriteStream(`${timestamp}.mp4`);

    video.pipe(file);
    video.on("end", () => {
      console.log("[*] Download finished");
      resolve(timestamp);
    });

    video.on("error", reject);
  });
}

async function getVideoInfo(url: string) {
  const video = await ytdl.getInfo(url);
  return video.videoDetails;
}
