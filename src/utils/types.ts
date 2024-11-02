export type FileActions = {
  file: File;
  fileName: string;
  fileSize: number;
  from: string;
  fileType: string;
  isError?: boolean;
  url?: string;
  output?: any;
  outputBlob?: Blob;
};


export enum AudioQuality {
  Low = "96k",      // Low quality, smaller file size
  Medium = "192k",  // Standard quality
  High = "320k",    // High quality, larger file size
}

export enum VideoFormats {
  MP4 = "mp4",
  MKV = "mkv",
  MOV = "mov",
  AVI = "avi",
  FLV = "flv",
  WEBM = "webm",
}

export enum AudioFormats {
  MP3 = "mp3",
  WAV = "wav",
  AAC = "aac",
  OGG = "ogg",
  M4A = "m4a",
  FLAC = "flac",
  WMA = "wma",
}

// Combined formats type for when you need both video and audio formats
export type MediaFormat = VideoFormats | AudioFormats;

export type VideoInputSettings = {
  audioQuality: AudioQuality;
  audioType: AudioFormats;  // Added audio format option
  customEndTime: number;
  customStartTime: number;
  removeAudio: boolean;
  extractAudio?: boolean;    // Added option to extract audio
  
};