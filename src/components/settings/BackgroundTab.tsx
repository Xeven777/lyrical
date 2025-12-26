import {
  ArrowsClockwiseIcon,
  UploadSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";
import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { CardSettings } from "@/types";
import { ColorInput } from "./ColorInput";
import { SliderInput } from "./SliderInput";

interface BackgroundTabProps {
  settings: CardSettings;
  onSettingsChange: (settings: CardSettings) => void;
}

export const BackgroundTab = React.memo(
  ({ settings, onSettingsChange }: BackgroundTabProps) => {
    const handleBgTypeChange = useCallback(
      (bgType: "image" | "gradient" | "color") => {
        onSettingsChange({ ...settings, bgType });
      },
      [settings, onSettingsChange],
    );

    const handleBgUpload = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            onSettingsChange({
              ...settings,
              bgType: "image",
              backgroundImage: event.target?.result as string,
            });
          };
          reader.readAsDataURL(file);
        }
      },
      [settings, onSettingsChange],
    );

    const handleRandomBackground = useCallback(() => {
      onSettingsChange({
        ...settings,
        backgroundImage: `https://picsum.photos/seed/${Math.random()}/800/1200`,
      });
    }, [settings, onSettingsChange]);

    const handleBlurChange = useCallback(
      (bgBlur: number) => {
        onSettingsChange({ ...settings, bgBlur });
      },
      [settings, onSettingsChange],
    );

    const handleBrightnessChange = useCallback(
      (bgBrightness: number) => {
        onSettingsChange({ ...settings, bgBrightness });
      },
      [settings, onSettingsChange],
    );

    const handleGradientColor1Change = useCallback(
      (color: string) => {
        onSettingsChange({ ...settings, gradientColor1: color });
      },
      [settings, onSettingsChange],
    );

    const handleGradientColor2Change = useCallback(
      (color: string) => {
        onSettingsChange({ ...settings, gradientColor2: color });
      },
      [settings, onSettingsChange],
    );

    const handleGradientAngleChange = useCallback(
      (angle: number) => {
        onSettingsChange({ ...settings, gradientAngle: angle });
      },
      [settings, onSettingsChange],
    );

    const handleBgColorChange = useCallback(
      (color: string) => {
        onSettingsChange({ ...settings, backgroundColor: color });
      },
      [settings, onSettingsChange],
    );

    return (
      <div className="space-y-8">
        <div className="flex bg-muted p-1 rounded-xl">
          {(["image", "gradient", "color"] as const).map((t) => (
            <Button
              key={t}
              variant={settings.bgType === t ? "secondary" : "ghost"}
              onClick={() => handleBgTypeChange(t)}
              className="flex-1 text-xs font-bold uppercase"
            >
              {t}
            </Button>
          ))}
        </div>

        {settings.bgType === "image" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Label className="h-24 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-muted transition-colors">
                <UploadSimpleIcon className="size-5 text-muted-foreground" />
                <span className="text-xs mt-2">Upload</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleBgUpload}
                  aria-label="Upload background image"
                />
              </Label>
              <Button
                variant="outline"
                onClick={handleRandomBackground}
                className="h-24 flex flex-col items-center justify-center"
              >
                <ArrowsClockwiseIcon className="size-5" />
                <span className="text-xs mt-2">Random</span>
              </Button>
            </div>
            <Separator />
            <div className="space-y-4">
              <SliderInput
                label="Blur"
                value={settings.bgBlur}
                onChange={handleBlurChange}
                min={0}
                max={40}
                step={1}
                showValue
              />
              <SliderInput
                label="Brightness"
                value={settings.bgBrightness}
                onChange={handleBrightnessChange}
                min={0}
                max={200}
                step={1}
                showValue
              />
            </div>
          </div>
        )}

        {settings.bgType === "gradient" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <ColorInput
                label="Color 1"
                value={settings.gradientColor1}
                onChange={handleGradientColor1Change}
              />
              <ColorInput
                label="Color 2"
                value={settings.gradientColor2}
                onChange={handleGradientColor2Change}
              />
            </div>
            <SliderInput
              label={`Angle: ${settings.gradientAngle}°`}
              value={settings.gradientAngle}
              onChange={handleGradientAngleChange}
              min={0}
              max={360}
              step={1}
            />
          </div>
        )}

        {settings.bgType === "color" && (
          <ColorInput
            label="Background Color"
            value={settings.backgroundColor}
            onChange={handleBgColorChange}
            showInput
          />
        )}
      </div>
    );
  },
);

BackgroundTab.displayName = "BackgroundTab";
