import { Client, Message } from "@open-wa/wa-automate";
import { createWriteStream, unlinkSync } from "fs";
import ytdl from "ytdl-core";
import { join } from "path";

import { tmpdir } from "os";

import { convertMp4ToMp3UsingFFMPEG } from "../utils/ffmpeg";

export async function handleDownloadVideo(client: Client, message: Message) {
  if (message?.body?.startsWith("!video")) {
    try {
      console.log("[*] Start handleDownloadVideo");

      const url = message.body.split(" ")[1];

      const videoInfo = await getVideoInfo(url);

      await client.sendText(
        message.chatId,
        "Baixando video: " + videoInfo.title
      );

      const timestamp = await downloadVideoAsMp4(url);

      await client.sendFile(
        message.chatId,
        join(tmpdir(), `${timestamp}.mp4`),
        `${timestamp}.mp4`,
        `${timestamp}.mp4`
      );

      unlinkSync(join(tmpdir(), `${timestamp}.mp4`));
    } catch (error) {
      await client.sendText(message.chatId, "Erro ao Baixar o Video ");
      console.error(error);
    }
  }
}

export async function handleDownloadMp3(client: Client, message: Message) {
  if (message?.body?.startsWith("!audio")) {
    try {
      console.log("[*] Start handleDownloadMp3");
      const url = message.body.split(" ")[1];
      const videoInfo = await getVideoInfo(url);
      client.sendText(message.chatId, "Baixando audio: " + videoInfo.title);
      const timestamp = await downloadVideoAsMp3(url);

      await convertMp4ToMp3UsingFFMPEG(`${timestamp}.mp4`);

      const mp3RealPath = join(tmpdir(), `${timestamp}.mp3`);

      await client.sendAudio(message.chatId, mp3RealPath, message.id);
      unlinkSync(join(tmpdir(), `${timestamp}.mp3`));
      unlinkSync(join(tmpdir(), `${timestamp}.mp4`));
    } catch (error) {
      console.error(error);
    }
  }
}

async function downloadVideoAsMp4(url: string) {
  console.log("[*] Start downloadVideoAsMp4");
  return new Promise<number>((resolve, reject) => {
    const timestamp = new Date().getTime();
    const video = ytdl(url, {
      filter: "audioandvideo",
      quality: "lowestvideo",
    });
    const file = createWriteStream(join(tmpdir(), `${timestamp}.mp4`));

    video.pipe(file);
    video.on("end", () => {
      console.log("[*] Download finished");
      resolve(timestamp);
    });

    video.on("error", reject);
  });
}

async function downloadVideoAsMp3(url: string) {
  console.log("[*] Start downloadVideoAsMp3");
  return new Promise<number>((resolve, reject) => {
    const timestamp = new Date().getTime();
    const audio = ytdl(url, {
      filter: "audioonly",
      quality: "highestaudio",
    });
    const file = createWriteStream(`${tmpdir()}/${timestamp}.mp4`);

    audio.pipe(file);
    audio.on("end", () => {
      console.log("[*] Download finished");
      resolve(timestamp);
    });

    audio.on("error", reject);
  });
}

async function getVideoInfo(url: string) {
  console.log("[*] Start getVideoInfo");
  const video = await ytdl.getInfo(url);
  return video.videoDetails;
}
