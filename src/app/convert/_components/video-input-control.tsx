import React from "react";
import {
  AudioFormats,
  AudioQuality,
  VideoInputSettings,
} from "../../../utils/types";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type VideoInputControlProps = {
  videoSettings: VideoInputSettings;
  onVideoSettingsChange: (value: VideoInputSettings) => void;
  disable: boolean;
};

export const VideoInputControl = ({
  videoSettings,
  onVideoSettingsChange,
  disable,
}: VideoInputControlProps) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.8, opacity: 0 }}
    key={"drag"}
    transition={{ type: "tween" }}
    className="rounded-2xl px-4 py-3 h-fit bg-gray-100 border border-gray-200"
  >
    <div className="text-sm">
      <div className="flex justify-between items-center border-b mb-2 pb-2">
        <p>Remove Audio</p>
        <Switch
          disabled={disable}
          onCheckedChange={(value: boolean) =>
            onVideoSettingsChange({ ...videoSettings, removeAudio: value })
          }
          checked={videoSettings.removeAudio}
        />
      </div>

      <>
        <div className="flex justify-between items-center border-b mb-2 pb-2">
          <p>Quality</p>
          <Select
            disabled={disable}
            value={videoSettings.audioQuality}
            onValueChange={(value: string) => {
              const audioQuality = value as AudioQuality;
              onVideoSettingsChange({ ...videoSettings, audioQuality });
            }}
          >
            <SelectTrigger className="w-[100px] text-sm">
              <SelectValue placeholder="Select Quality" />
            </SelectTrigger>
            <SelectContent>
              {quality.map(({ label, value }) => (
                <SelectItem value={value} key={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-between items-center border-b mb-2 pb-2">
          <p>Format</p>
          <Select
            disabled={disable}
            value={videoSettings.audioType}
            onValueChange={(value: string) => {
              const audioType = value as AudioFormats;
              onVideoSettingsChange({ ...videoSettings, audioType });
            }}
          >
            <SelectTrigger className="w-[150px] text-sm">
              <SelectValue placeholder="Select Format" />
            </SelectTrigger>
            <SelectContent>
              {format.map(({ label, value }) => (
                <SelectItem value={value} key={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </>
    </div>
  </motion.div>
);

const quality: { label: string; value: AudioQuality }[] = [
  { label: "High", value: AudioQuality.High },
  { label: "Medium", value: AudioQuality.Medium },
  { label: "Low", value: AudioQuality.Low },
];

const format: { label: string; value: AudioFormats }[] = [
  { label: "MP3 (.mp3)", value: AudioFormats.MP3 },
  { label: "WAV (.wav)", value: AudioFormats.WAV },
  { label: "AAC (.aac)", value: AudioFormats.AAC },
  { label: "OGG (.ogg)", value: AudioFormats.OGG },
  { label: "M4A (.m4a)", value: AudioFormats.M4A },
  { label: "FLAC (.flac)", value: AudioFormats.FLAC },
  { label: "WMA (.wma)", value: AudioFormats.WMA },
];
