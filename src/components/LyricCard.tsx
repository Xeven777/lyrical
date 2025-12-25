import { CardSettings, SongData } from "@/types";
import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

interface LyricCardProps {
  song: SongData | null;
  settings: CardSettings;
  previewRef: React.RefObject<HTMLDivElement | null>;
}

const LyricCardComponent: React.FC<LyricCardProps> = ({
  song,
  settings,
  previewRef,
}) => {
  const selectedLyrics = useMemo(
    () =>
      song && settings.selectedLyricIndices.length > 0
        ? settings.selectedLyricIndices
            .map((i) => song.lyrics[i])
            .filter(Boolean)
        : ["I been an OG since I was younger", "Everything I do is elite"],
    [song, settings.selectedLyricIndices],
  );

  const artist = useMemo(() => song?.artist || "Artist Name", [song?.artist]);
  const title = useMemo(() => song?.title || "Song Title", [song?.title]);
  const albumArt = useMemo(
    () => song?.albumArtUrl || "https://picsum.photos/seed/music/400/400",
    [song?.albumArtUrl],
  );

  const getBackgroundStyle = useMemo(() => {
    if (settings.bgType === "color") {
      return { backgroundColor: settings.backgroundColor };
    }
    if (settings.bgType === "gradient") {
      return {
        backgroundImage: `linear-gradient(${settings.gradientAngle}deg, ${settings.gradientColor1}, ${settings.gradientColor2})`,
      };
    }
    const bgImage =
      settings.backgroundImage ||
      "https://picsum.photos/seed/aesthetic/800/1200";
    return {
      backgroundImage: `url(${bgImage})`,
      filter: `blur(${settings.bgBlur}px) brightness(${settings.bgBrightness}%) grayscale(${settings.bgGrayscale}%)`,
    };
  }, [settings]);

  const verticalAlignClass = useMemo(
    () =>
      ({
        top: "justify-start",
        center: "justify-center",
        bottom: "justify-end",
      })[settings.verticalAlign],
    [settings.verticalAlign],
  );

  return (
    <div
      ref={previewRef}
      className={cn(
        "relative w-full aspect-4/5 max-w-125 overflow-hidden shadow-2xl bg-card group select-none flex flex-col",
        verticalAlignClass,
      )}
      style={{
        borderRadius: `${settings.borderRadius}px`,
        fontFamily: settings.fontFamily,
      }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            "absolute inset-0 bg-cover bg-center transition-all duration-300",
            settings.bgType === "image" && "scale-105",
          )}
          style={getBackgroundStyle}
        />
      </div>

      <div
        className={cn(
          "absolute inset-0 bg-linear-to-t to-transparent",
          settings.overlayColor === "white"
            ? "from-background/90 via-background/40"
            : "from-card/90 via-card/40",
        )}
        style={{ opacity: settings.overlayOpacity }}
      />

      <div className="absolute top-6 left-6 flex items-center gap-2 opacity-60 z-10">
        <div
          className={cn(
            "w-6 h-6 rounded-full flex items-center justify-center backdrop-blur-sm",
            settings.overlayColor === "white"
              ? "bg-foreground/10"
              : "bg-background/20",
          )}
        >
          <span
            className={cn(
              "text-[10px] font-bold",
              settings.overlayColor === "white"
                ? "text-foreground"
                : "text-background",
            )}
          >
            L
          </span>
        </div>
        <span
          className={cn(
            "text-xs font-bold tracking-widest uppercase",
            settings.overlayColor === "white"
              ? "text-foreground/80"
              : "text-background/80",
          )}
        >
          LyricVibe
        </span>
      </div>

      <div
        className={cn(
          "relative z-10 p-8 flex flex-col gap-6 w-full",
          settings.verticalAlign === "top" && "pt-16",
        )}
      >
        <div className="flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {settings.showAlbumArt && (
            <img
              src={albumArt}
              alt="Album Art"
              className="w-16 h-16 rounded-lg shadow-lg object-cover border border-border/10 shrink-0"
            />
          )}
          <div className="flex flex-col min-w-0">
            <h3
              className="text-xl font-bold leading-tight truncate w-full drop-shadow-sm"
              style={{
                color: settings.titleColor,
                opacity: settings.titleOpacity,
              }}
            >
              {title}
            </h3>
            <p
              className="text-sm font-medium drop-shadow-sm truncate w-full"
              style={{
                color: settings.artistColor,
                opacity: settings.artistOpacity,
              }}
            >
              {artist}
            </p>
          </div>
        </div>

        <div
          className="animate-in fade-in slide-in-from-bottom-6 duration-700"
          style={{
            textAlign: settings.textAlign,
            color: settings.textColor,
            opacity: settings.textOpacity,
            fontSize: `${settings.fontSize}px`,
            fontWeight:
              settings.fontWeight === "extrabold"
                ? 800
                : settings.fontWeight === "bold"
                  ? 700
                  : 400,
            fontStyle: settings.fontStyle,
            letterSpacing: `${settings.letterSpacing}em`,
            lineHeight: settings.lineHeight,
          }}
        >
          {selectedLyrics.map((line: string, idx: number) => (
            <p
              key={idx}
              className="drop-shadow-lg wrap-break-word"
              style={{ marginBottom: "0.25em" }}
            >
              {line}
            </p>
          ))}
          {selectedLyrics.length === 0 && (
            <p className="italic opacity-50 text-base font-normal">
              Select lyrics to display...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export const LyricCard = React.memo(LyricCardComponent);
