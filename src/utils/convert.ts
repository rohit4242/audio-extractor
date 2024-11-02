import { FFmpeg } from "@ffmpeg/ffmpeg";
import { VideoInputSettings } from "./types";
import { fetchFile } from "@ffmpeg/util";
import { extractAudioCommand } from "./ffmpegCommands";

export function getFileExtension(fileName: string) {
  const regex = /(?:\.([^.]+))?$/;
  const match = regex.exec(fileName);
  if (match && match[1]) {
    return match[1];
  }

  return "";
}

export default async function convertFile(
  ffmpeg: FFmpeg,
  input: File,
  videoSettings: VideoInputSettings
): Promise<any> {
  try {
    const outputExt = videoSettings.audioType || "mp3";
    let outputFileName: string;

    outputFileName = `audio_${input.name.split(".")[0]}.${outputExt}`;

    // Directly write the file to FFmpeg
    await ffmpeg.writeFile(
      input.name,
      await fetchFile(input)
    );

    const ffmpegCommand = await extractAudioCommand(
      input,
      outputFileName,
      videoSettings
    );
    await ffmpeg.exec(ffmpegCommand);

    const data = await ffmpeg.readFile(outputFileName);
    const blob = new Blob([data], { type: `audio/${outputExt}` });
    const url = URL.createObjectURL(blob);

    return { url, output: outputFileName, outputBlob: blob };
  } catch (error) {
    console.error("Error converting file:", error);
    throw error;
  }
}

export const formatTime = (seconds: number): string => {
  seconds = Math.round(seconds);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  let formattedTime = "";

  if (hours > 0) {
    formattedTime += hours + "hr";
    if (minutes > 0 || remainingSeconds > 0) {
      formattedTime += " ";
    }
  }

  if (minutes > 0) {
    formattedTime += `${minutes.toString()} min`;
    if (remainingSeconds > 0) {
      formattedTime += " ";
    }
  }

  if (remainingSeconds > 0 || formattedTime === "") {
    formattedTime += `${remainingSeconds} sec`;
  }

  return formattedTime;
};
