import {
  AlignBottomIcon,
  AlignCenterHorizontalSimpleIcon,
  AlignCenterVerticalIcon,
  AlignLeftIcon,
  AlignRightIcon,
  AlignTopIcon,
  TextAaIcon,
  PaletteIcon,
  SlidersIcon,
} from "@phosphor-icons/react/dist/ssr";
import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
      [settings, onSettingsChange]
    );

    const handleTextOpacityChange = useCallback(
      (opacity: number) => {
        onSettingsChange({ ...settings, textOpacity: opacity });
      },
      [settings, onSettingsChange]
    );

    const handleLetterSpacingChange = useCallback(
      (spacing: number) => {
        onSettingsChange({ ...settings, letterSpacing: spacing });
      },
      [settings, onSettingsChange]
    );

    const handleLineHeightChange = useCallback(
      (height: number) => {
        onSettingsChange({ ...settings, lineHeight: height });
      },
      [settings, onSettingsChange]
    );

    const handleTitleColorChange = useCallback(
      (color: string) => {
        onSettingsChange({ ...settings, titleColor: color });
      },
      [settings, onSettingsChange]
    );

    const handleTitleOpacityChange = useCallback(
      (opacity: number) => {
        onSettingsChange({ ...settings, titleOpacity: opacity });
      },
      [settings, onSettingsChange]
    );

    const handleArtistColorChange = useCallback(
      (color: string) => {
        onSettingsChange({ ...settings, artistColor: color });
      },
      [settings, onSettingsChange]
    );

    const handleArtistOpacityChange = useCallback(
      (opacity: number) => {
        onSettingsChange({ ...settings, artistOpacity: opacity });
      },
      [settings, onSettingsChange]
    );

    const handleVerticalAlignChange = useCallback(
      (align: VerticalAlign) => {
        onSettingsChange({ ...settings, verticalAlign: align });
      },
      [settings, onSettingsChange]
    );

    const handleTextAlignChange = useCallback(
      (align: "left" | "center" | "right") => {
        onSettingsChange({ ...settings, textAlign: align });
      },
      [settings, onSettingsChange]
    );

    const handleBorderRadiusChange = useCallback(
      (radius: number) => {
        onSettingsChange({ ...settings, borderRadius: radius });
      },
      [settings, onSettingsChange]
    );

    const handleOverlayTypeChange = useCallback(
      (type: "solid" | "gradient") => {
        onSettingsChange({ ...settings, overlayType: type });
      },
      [settings, onSettingsChange]
    );

    const handleOverlayColorChange = useCallback(
      (color: string) => {
        onSettingsChange({ ...settings, overlayColor: color });
      },
      [settings, onSettingsChange]
    );

    const handleOverlayGradientColor1Change = useCallback(
      (color: string) => {
        onSettingsChange({ ...settings, overlayGradientColor1: color });
      },
      [settings, onSettingsChange]
    );

    const handleOverlayGradientColor2Change = useCallback(
      (color: string) => {
        onSettingsChange({ ...settings, overlayGradientColor2: color });
      },
      [settings, onSettingsChange]
    );

    const handleOverlayGradientAngleChange = useCallback(
      (angle: number) => {
        onSettingsChange({ ...settings, overlayGradientAngle: angle });
      },
      [settings, onSettingsChange]
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
      <div className="space-y-4">
        {/* Typography Card */}
        <Card className="p-4 bg-muted/20 border-muted/30">
          <div className="flex items-center gap-2 mb-4">
            <TextAaIcon className="size-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Typography</h3>
          </div>
          <div className="space-y-4">
            <SliderInput
              label="Font Size"
              value={settings.fontSize}
              onChange={handleFontSizeChange}
              min={12}
              max={72}
              step={1}
              showValue
            />
            <SliderInput
              label="Line Height"
              value={settings.lineHeight}
              onChange={handleLineHeightChange}
              min={0.8}
              max={2}
              step={0.1}
            />
            <div className="grid grid-cols-2 gap-3">
              <SliderInput
                label="Letter Spacing"
                value={settings.letterSpacing}
                onChange={handleLetterSpacingChange}
                min={-0.1}
                max={0.5}
                step={0.01}
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
            </div>
          </div>
        </Card>

        {/* Colors Card */}
        <Card className="p-4 bg-muted/20 border-muted/30">
          <div className="flex items-center gap-2 mb-4">
            <PaletteIcon className="size-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Colors</h3>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground">
                  Title
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
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground">
                  Artist
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
        </Card>

        {/* Alignment Card */}
        <Card className="p-4 bg-muted/20 border-muted/30">
          <div className="flex items-center gap-2 mb-4">
            <SlidersIcon className="size-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Alignment & Layout</h3>
          </div>
          <div className="space-y-4">
            <div>
              <Label className="text-xs font-medium text-muted-foreground mb-2 block">
                Vertical
              </Label>
              <div className="flex gap-2 bg-muted/40 p-1 rounded-lg">
                {(["top", "center", "bottom"] as const).map((a) => (
                  <Button
                    key={a}
                    variant={
                      settings.verticalAlign === a ? "secondary" : "ghost"
                    }
                    onClick={() => handleVerticalAlignChange(a)}
                    className="flex-1"
                    size="sm"
                  >
                    {a === "top" ? (
                      <AlignTopIcon className="size-4" />
                    ) : a === "center" ? (
                      <AlignCenterVerticalIcon className="size-4" />
                    ) : (
                      <AlignBottomIcon className="size-4" />
                    )}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-xs font-medium text-muted-foreground mb-2 block">
                Horizontal
              </Label>
              <div className="flex gap-2 bg-muted/40 p-1 rounded-lg">
                {(["left", "center", "right"] as const).map((a) => (
                  <Button
                    key={a}
                    variant={settings.textAlign === a ? "secondary" : "ghost"}
                    onClick={() => handleTextAlignChange(a)}
                    className="flex-1"
                    size="sm"
                  >
                    {a === "left" ? (
                      <AlignLeftIcon className="size-4" />
                    ) : a === "center" ? (
                      <AlignCenterHorizontalSimpleIcon className="size-4" />
                    ) : (
                      <AlignRightIcon className="size-4" />
                    )}
                  </Button>
                ))}
              </div>
            </div>
            <SliderInput
              label="Corner Radius"
              value={settings.borderRadius}
              onChange={handleBorderRadiusChange}
              min={0}
              max={64}
              step={1}
            />
          </div>
        </Card>

        {/* Overlay Card */}
        <Card className="p-4 bg-muted/20 border-muted/30">
          <div className="flex items-center gap-2 mb-4">
            <PaletteIcon className="size-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Overlay</h3>
          </div>
          <div className="space-y-4">
            <div>
              <Label className="text-xs font-medium text-muted-foreground mb-2 block">
                Type
              </Label>
              <div className="flex gap-2 bg-muted/40 p-1 rounded-lg">
                {(["solid", "gradient"] as const).map((t) => (
                  <Button
                    key={t}
                    variant={settings.overlayType === t ? "secondary" : "ghost"}
                    onClick={() => handleOverlayTypeChange(t)}
                    className="flex-1 capitalize text-xs"
                    size="sm"
                  >
                    {t}
                  </Button>
                ))}
              </div>
            </div>

            {settings.overlayType === "solid" ? (
              <ColorInput
                label="Color"
                value={settings.overlayColor}
                onChange={handleOverlayColorChange}
              />
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
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
                </div>
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

            <Separator />

            <div className="grid grid-cols-2 gap-3">
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
          </div>
        </Card>
      </div>
    );
  }
);

StyleTab.displayName = "StyleTab";
