import { spawn } from "child_process";

export async function convertMp4ToMp3UsingFFMPEG(mp4Path: string) {
  return new Promise<void>((resolve, reject) => {
    const mp3Path = mp4Path.replace(".mp4", ".mp3");
    const command = `ffmpeg -i ${mp4Path} -b:a 192k -vn ${mp3Path}`;
    const spawned = spawn("bash", ["-c", command]);

    spawned.on("close", () => resolve());
    spawned.on("error", (err) => reject());
  });
}

export async function convertOpusToWavUsingFFMPEG(opusPath: string) {
  return new Promise<void>((resolve, reject) => {
    const wavPath = opusPath.replace(".opus", ".wav");
    const command = `ffmpeg -i ${opusPath} ${wavPath}`;
    const spawned = spawn("bash", ["-c", command]);

    spawned.on("close", () => resolve());
    spawned.on("error", (err) => reject());
  });
}
