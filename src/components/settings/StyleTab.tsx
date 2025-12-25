import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CardSettings, VerticalAlign } from "@/types";
import { SliderInput } from "./SliderInput";
import { ColorInput } from "./ColorInput";
import {
  AlignBottomIcon,
  AlignCenterHorizontalSimpleIcon,
  AlignCenterVerticalIcon,
  AlignLeftIcon,
  AlignRightIcon,
  AlignTopIcon,
} from "@phosphor-icons/react/dist/ssr";

interface StyleTabProps {
  settings: CardSettings;
  onSettingsChange: (settings: CardSettings) => void;
}

const FONT_OPTIONS = [
  "Inter",
  "Montserrat",
  "Poppins",
  "Raleway",
  "Playfair Display",
  "Lora",
  "Crimson Text",
  "JetBrains Mono",
  "Dancing Script",
  "Caveat",
];

export const StyleTab = React.memo(
  ({ settings, onSettingsChange }: StyleTabProps) => {
    const handleFontFamilyChange = useCallback(
      (family: string) => {
        onSettingsChange({ ...settings, fontFamily: family });
      },
      [settings, onSettingsChange],
    );

    const handleFontSizeChange = useCallback(
      (size: number) => {
        onSettingsChange({ ...settings, fontSize: size });
      },
      [settings, onSettingsChange],
    );

    const handleTextOpacityChange = useCallback(
      (opacity: number) => {
        onSettingsChange({ ...settings, textOpacity: opacity });
      },
      [settings, onSettingsChange],
    );

    const handleLetterSpacingChange = useCallback(
      (spacing: number) => {
        onSettingsChange({ ...settings, letterSpacing: spacing });
      },
      [settings, onSettingsChange],
    );

    const handleLineHeightChange = useCallback(
      (height: number) => {
        onSettingsChange({ ...settings, lineHeight: height });
      },
      [settings, onSettingsChange],
    );

    const handleTitleColorChange = useCallback(
      (color: string) => {
        onSettingsChange({ ...settings, titleColor: color });
      },
      [settings, onSettingsChange],
    );

    const handleTitleOpacityChange = useCallback(
      (opacity: number) => {
        onSettingsChange({ ...settings, titleOpacity: opacity });
      },
      [settings, onSettingsChange],
    );

    const handleArtistColorChange = useCallback(
      (color: string) => {
        onSettingsChange({ ...settings, artistColor: color });
      },
      [settings, onSettingsChange],
    );

    const handleArtistOpacityChange = useCallback(
      (opacity: number) => {
        onSettingsChange({ ...settings, artistOpacity: opacity });
      },
      [settings, onSettingsChange],
    );

    const handleVerticalAlignChange = useCallback(
      (align: VerticalAlign) => {
        onSettingsChange({ ...settings, verticalAlign: align });
      },
      [settings, onSettingsChange],
    );

    const handleTextAlignChange = useCallback(
      (align: "left" | "center" | "right") => {
        onSettingsChange({ ...settings, textAlign: align });
      },
      [settings, onSettingsChange],
    );

    return (
      <div className="space-y-8">
        {/* Typography */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Typography Library
          </h3>
          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-2">
            {FONT_OPTIONS.map((f) => (
              <Button
                key={f}
                variant={settings.fontFamily === f ? "default" : "outline"}
                onClick={() => handleFontFamilyChange(f)}
                className="text-xs text-left justify-start h-auto py-2"
                style={{ fontFamily: f }}
              >
                {f}
              </Button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <SliderInput
              label="Size"
              value={settings.fontSize}
              onChange={handleFontSizeChange}
              min={12}
              max={72}
              step={1}
              showValue
            />
            <SliderInput
              label="Opacity"
              value={settings.textOpacity}
              onChange={handleTextOpacityChange}
              min={0}
              max={1}
              step={0.1}
              showValue
            />
            <SliderInput
              label="Spacing"
              value={settings.letterSpacing}
              onChange={handleLetterSpacingChange}
              min={-0.1}
              max={0.5}
              step={0.01}
            />
            <SliderInput
              label="Line Height"
              value={settings.lineHeight}
              onChange={handleLineHeightChange}
              min={0.8}
              max={2}
              step={0.1}
            />
          </div>
        </div>

        <Separator />

        {/* Metadata Styling */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Metadata Styling
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="text-[10px] uppercase font-bold text-muted-foreground">
                Title Color
              </Label>
              <ColorInput
                label=""
                value={settings.titleColor}
                onChange={handleTitleColorChange}
              />
              <SliderInput
                label="Opacity"
                value={settings.titleOpacity}
                onChange={handleTitleOpacityChange}
                min={0}
                max={1}
                step={0.1}
              />
            </div>
            <div className="space-y-3">
              <Label className="text-[10px] uppercase font-bold text-muted-foreground">
                Artist Color
              </Label>
              <ColorInput
                label=""
                value={settings.artistColor}
                onChange={handleArtistColorChange}
              />
              <SliderInput
                label="Opacity"
                value={settings.artistOpacity}
                onChange={handleArtistOpacityChange}
                min={0}
                max={1}
                step={0.1}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Alignment & Layout */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Alignment & Layout
          </h3>
          <div className="flex gap-2">
            {(["top", "center", "bottom"] as const).map((a) => (
              <Button
                key={a}
                variant={settings.verticalAlign === a ? "default" : "outline"}
                onClick={() => handleVerticalAlignChange(a)}
                className="flex-1"
              >
                {a === "top" ? (
                  <AlignTopIcon className="w-4 h-4" />
                ) : a === "center" ? (
                  <AlignCenterVerticalIcon className="w-4 h-4" />
                ) : (
                  <AlignBottomIcon className="w-4 h-4" />
                )}
              </Button>
            ))}
          </div>
          <div className="flex gap-2 bg-muted p-1 rounded-lg">
            {(["left", "center", "right"] as const).map((a) => (
              <Button
                key={a}
                variant={settings.textAlign === a ? "secondary" : "ghost"}
                onClick={() => handleTextAlignChange(a)}
                className="flex-1"
              >
                {a === "left" ? (
                  <AlignLeftIcon className="w-4 h-4" />
                ) : a === "center" ? (
                  <AlignCenterHorizontalSimpleIcon className="w-4 h-4" />
                ) : (
                  <AlignRightIcon className="w-4 h-4" />
                )}
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  },
);

StyleTab.displayName = "StyleTab";
