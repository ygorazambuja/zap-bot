import speech from "@google-cloud/speech";
import { google } from "@google-cloud/speech/build/protos/protos";
import fs from "fs";
import { convertOpusToWavUsingFFMPEG } from "../utils/ffmpeg";

export async function getAudioTranscription(timestamp: number) {
  const speechClient = new speech.SpeechClient();

  const languageCode = "pt-BR";

  await convertOpusToWavUsingFFMPEG(`${timestamp}.opus`);

  const audio: google.cloud.speech.v1.IRecognitionAudio = {
    content: fs.readFileSync(`${timestamp}.wav`),
  };

  const config: google.cloud.speech.v1.IRecognitionConfig = {
    encoding: "LINEAR16",
    languageCode: languageCode,
  };

  const request: google.cloud.speech.v1.IRecognizeRequest = {
    audio,
    config,
  };

  const [response] = await speechClient.recognize(request);

  const result = response.results[0];

  return result?.alternatives[0]?.transcript;
}
