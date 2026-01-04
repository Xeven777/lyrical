import {
  AlignBottomIcon,
  AlignCenterHorizontalSimpleIcon,
  AlignCenterVerticalIcon,
  AlignLeftIcon,
  AlignRightIcon,
  AlignTopIcon,
} from "@phosphor-icons/react/dist/ssr";
import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { CardSettings, VerticalAlign } from "@/types";
import { ColorInput } from "./ColorInput";
import { SliderInput } from "./SliderInput";

interface StyleTabProps {
  settings: CardSettings;
  onSettingsChange: (settings: CardSettings) => void;
}

export const StyleTab = React.memo(
  ({ settings, onSettingsChange }: StyleTabProps) => {
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

    const handleBorderRadiusChange = useCallback(
      (radius: number) => {
        onSettingsChange({ ...settings, borderRadius: radius });
      },
      [settings, onSettingsChange],
    );

    const handleOverlayTypeChange = useCallback(
      (type: "solid" | "gradient") => {
        onSettingsChange({ ...settings, overlayType: type });
      },
      [settings, onSettingsChange],
    );

    const handleOverlayColorChange = useCallback(
      (color: string) => {
        onSettingsChange({ ...settings, overlayColor: color });
      },
      [settings, onSettingsChange],
    );

    const handleOverlayGradientColor1Change = useCallback(
      (color: string) => {
        onSettingsChange({ ...settings, overlayGradientColor1: color });
      },
      [settings, onSettingsChange],
    );

    const handleOverlayGradientColor2Change = useCallback(
      (color: string) => {
        onSettingsChange({ ...settings, overlayGradientColor2: color });
      },
      [settings, onSettingsChange],
    );

    const handleOverlayGradientAngleChange = useCallback(
      (angle: number) => {
        onSettingsChange({ ...settings, overlayGradientAngle: angle });
      },
      [settings, onSettingsChange],
    );

    const handleOverlayOpacityStartChange = useCallback(
      (opacity: number) => {
        onSettingsChange({ ...settings, overlayOpacityStart: opacity });
      },
      [settings, onSettingsChange]
    );

    const handleOverlayOpacityEndChange = useCallback(
      (opacity: number) => {
        onSettingsChange({ ...settings, overlayOpacityEnd: opacity });
      },
      [settings, onSettingsChange]
    );

    return (
      <div className="space-y-8">
        {/* Typography */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Typography
          </h3>
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

        {/* Overlay */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Overlay
          </h3>
          <div className="flex gap-2 bg-muted p-1 rounded-lg">
            {(["solid", "gradient"] as const).map((t) => (
              <Button
                key={t}
                variant={settings.overlayType === t ? "secondary" : "ghost"}
                onClick={() => handleOverlayTypeChange(t)}
                className="flex-1 capitalize"
              >
                {t}
              </Button>
            ))}
          </div>
          {settings.overlayType === "solid" ? (
            <ColorInput
              label="Color"
              value={settings.overlayColor}
              onChange={handleOverlayColorChange}
            />
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <ColorInput
                label="Color 1"
                value={settings.overlayGradientColor1}
                onChange={handleOverlayGradientColor1Change}
              />
              <ColorInput
                label="Color 2"
                value={settings.overlayGradientColor2}
                onChange={handleOverlayGradientColor2Change}
              />
              <SliderInput
                label="Angle"
                value={settings.overlayGradientAngle}
                onChange={handleOverlayGradientAngleChange}
                min={0}
                max={360}
                step={1}
              />
            </div>
          )}
          <SliderInput
            label="Opacity Start"
            value={settings.overlayOpacityStart}
            onChange={handleOverlayOpacityStartChange}
            min={0}
            max={1}
            step={0.1}
            showValue
          />
          <SliderInput
            label="Opacity End"
            value={settings.overlayOpacityEnd}
            onChange={handleOverlayOpacityEndChange}
            min={0}
            max={1}
            step={0.1}
            showValue
          />
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
          <SliderInput
            label="Roundness"
            value={settings.borderRadius}
            onChange={handleBorderRadiusChange}
            min={0}
            max={64}
            step={1}
          />
        </div>
      </div>
    );
  },
);

StyleTab.displayName = "StyleTab";
