import { AudioFormats, AudioQuality, VideoInputSettings } from "./types";
export const extractAudioCommand = async (
  input: File,
  output: string,
  videoSettings: VideoInputSettings
): Promise<string[]> => {

  const inputPath = input.name; // Assuming input.source is a local file path

  const baseCommand = [
    "-i",
    inputPath,
    "-vn", // Remove video stream
  ];

  // Get bitrate based on quality setting
  const getBitrate = () => {
    switch (videoSettings.audioQuality) {
      case AudioQuality.Low:
        return "96k";
      case AudioQuality.High:
        return "320k";
      default:
        return "192k"; // Medium quality default
    }
  };

  // Get sample rate based on quality
  const getSampleRate = () => {
    switch (videoSettings.audioQuality) {
      case AudioQuality.Low:
        return "22050"; // CD quality halved
      case AudioQuality.High:
        return "48000"; // Studio quality
      default:
        return "44100"; // CD quality
    }
  };

  // Add time trimming if specified
  if (videoSettings.customStartTime > 0 || videoSettings.customEndTime > 0) {
    baseCommand.push(
      "-ss",
      videoSettings.customStartTime.toString(),
      "-to",
      videoSettings.customEndTime.toString()
    );
  }

  const bitrate = getBitrate();
  const sampleRate = getSampleRate();

  switch (videoSettings.audioType) {
    case AudioFormats.MP3:
      return [
        ...baseCommand,
        "-acodec",
        "libmp3lame",
        "-ab",
        bitrate,
        "-ar",
        sampleRate,
        // MP3-specific quality settings
        "-q:a",
        videoSettings.audioQuality === AudioQuality.High
          ? "0"
          : videoSettings.audioQuality === AudioQuality.Low
          ? "4"
          : "2",
        output,
      ];

    case AudioFormats.WAV:
      return [
        ...baseCommand,
        "-acodec",
        "pcm_s16le",
        "-ar",
        sampleRate,
        // WAV bit depth based on quality
        "-sample_fmt",
        "s16",
        output,
      ];

    case AudioFormats.AAC:
      return [
        ...baseCommand,
        "-acodec",
        "aac",
        "-b:a",
        bitrate,
        "-ar",
        sampleRate,
        // AAC quality profile
        "-profile:a",
        videoSettings.audioQuality === AudioQuality.High
          ? "aac_he_v2"
          : "aac_low",
        output,
      ];

    case AudioFormats.OGG:
      return [
        ...baseCommand,
        "-acodec",
        "libvorbis",
        "-ab",
        bitrate,
        "-ar",
        sampleRate,
        // Vorbis quality setting
        "-q:a",
        videoSettings.audioQuality === AudioQuality.High
          ? "8"
          : videoSettings.audioQuality === AudioQuality.Low
          ? "3"
          : "5",
        output,
      ];

    case AudioFormats.FLAC:
      return [
        ...baseCommand,
        "-acodec",
        "flac",
        "-ar",
        sampleRate,
        // FLAC compression level
        "-compression_level",
        videoSettings.audioQuality === AudioQuality.High
          ? "12"
          : videoSettings.audioQuality === AudioQuality.Low
          ? "0"
          : "5",
        output,
      ];

    case AudioFormats.M4A:
      return [
        ...baseCommand,
        "-acodec",
        "aac",
        "-b:a",
        bitrate,
        "-ar",
        sampleRate,
        // AAC quality profile
        "-profile:a",
        videoSettings.audioQuality === AudioQuality.High
          ? "aac_he_v2"
          : "aac_low",
        "-f",
        "mp4",
        output,
      ];

    default:
      return [
        ...baseCommand,
        "-acodec",
        "libmp3lame",
        "-ab",
        bitrate,
        "-ar",
        sampleRate,
        output,
      ];
  }
};
