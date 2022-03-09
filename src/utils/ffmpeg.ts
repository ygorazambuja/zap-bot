import { spawn } from "child_process";
import { join } from "path";
import { tmpdir } from "os";

export async function convertMp4ToMp3UsingFFMPEG(mp4Path: string) {
  console.log("[*] Start convertMp4ToMp3UsingFFMPEG");
  return new Promise<void>((resolve, reject) => {
    const mp4RealPath = join(tmpdir(), mp4Path);

    const mp3Path = mp4Path.replace(".mp4", ".mp3");

    const mp3RealPath = join(tmpdir(), mp3Path);

    const command = `ffmpeg -i ${mp4RealPath} -b:a 192k -vn ${mp3RealPath}`;

    const spawned = spawn("bash", ["-c", command]);

    spawned.on("close", () => resolve());
    spawned.on("error", (err) => reject());
  });
}

export async function convertOpusToWavUsingFFMPEG(opusPath: string) {
  console.log(" [*] Start convertOpusToWavUsingFFMPEG");

  return new Promise<void>((resolve, reject) => {
    const wavPath = opusPath.replace(".opus", ".wav");
    const command = `ffmpeg -i ${opusPath} ${wavPath}`;
    const spawned = spawn("bash", ["-c", command]);

    spawned.on("close", () => resolve());
    spawned.on("error", (err) => reject());
  });
}
