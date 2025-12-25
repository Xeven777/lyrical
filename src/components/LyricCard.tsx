import { CardSettings, SongData } from '@/types';
import React from 'react';

interface LyricCardProps {
  song: SongData | null;
  settings: CardSettings;
  previewRef: React.RefObject<HTMLDivElement | null>;
}

export const LyricCard: React.FC<LyricCardProps> = ({ song, settings, previewRef }) => {
  const selectedLyrics = song && settings.selectedLyricIndices.length > 0
    ? settings.selectedLyricIndices.map(i => song.lyrics[i]).filter(Boolean)
    : ["I been an OG since I was younger", "Everything I do is elite"];

  const artist = song?.artist || "Artist Name";
  const title = song?.title || "Song Title";
  const albumArt = song?.albumArtUrl || "https://picsum.photos/seed/music/400/400";

  const getBackgroundStyle = () => {
    if (settings.bgType === 'color') {
      return { backgroundColor: settings.backgroundColor };
    }
    if (settings.bgType === 'gradient') {
      return { backgroundImage: `linear-gradient(${settings.gradientAngle}deg, ${settings.gradientColor1}, ${settings.gradientColor2})` };
    }
    const bgImage = settings.backgroundImage || "https://picsum.photos/seed/aesthetic/800/1200";
    return {
      backgroundImage: `url(${bgImage})`,
      filter: `blur(${settings.bgBlur}px) brightness(${settings.bgBrightness}%) grayscale(${settings.bgGrayscale}%)`,
    };
  };

  const verticalAlignClass = {
    top: 'justify-start',
    center: 'justify-center',
    bottom: 'justify-end'
  }[settings.verticalAlign];

  return (
    <div
      ref={previewRef}
      className={`relative w-full aspect-4/5 max-w-[500px] overflow-hidden shadow-2xl bg-zinc-900 group select-none flex flex-col ${verticalAlignClass}`}
      style={{
        borderRadius: `${settings.borderRadius}px`,
        fontFamily: settings.fontFamily
      }}
    >
      {/* Background Layer */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute inset-0 bg-cover bg-center transition-all duration-300 ${settings.bgType === 'image' ? 'scale-105' : ''}`}
          style={getBackgroundStyle()}
        />
      </div>

      {/* Gradient Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t ${settings.overlayColor === 'white' ? 'from-white/90 via-white/40' : 'from-black/90 via-black/40'} to-transparent`}
        style={{ opacity: settings.overlayOpacity }}
      />

      {/* Brand Watermark */}
      <div className="absolute top-6 left-6 flex items-center gap-2 opacity-60 z-10">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center backdrop-blur-sm ${settings.overlayColor === 'white' ? 'bg-black/10' : 'bg-white/20'}`}>
          <span className={`text-[10px] font-bold ${settings.overlayColor === 'white' ? 'text-black' : 'text-white'}`}>L</span>
        </div>
        <span className={`text-xs font-bold tracking-widest uppercase ${settings.overlayColor === 'white' ? 'text-black/80' : 'text-white/80'}`}>LyricVibe</span>
      </div>

      {/* Content Container */}
      <div className={`relative z-10 p-8 flex flex-col gap-6 w-full ${settings.verticalAlign === 'top' ? 'pt-16' : ''}`}>
        {/* Metadata Section */}
        <div className="flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {settings.showAlbumArt && (
            <img
              src={albumArt}
              alt="Album Art"
              className="w-16 h-16 rounded-lg shadow-lg object-cover border border-white/10 shrink-0"
            />
          )}
          <div className="flex flex-col min-w-0">
            <h3
              className="text-xl font-bold leading-tight truncate w-full drop-shadow-sm"
              style={{ color: settings.titleColor, opacity: settings.titleOpacity }}
            >
              {title}
            </h3>
            <p
              className="text-sm font-medium drop-shadow-sm truncate w-full"
              style={{ color: settings.artistColor, opacity: settings.artistOpacity }}
            >
              {artist}
            </p>
          </div>
        </div>

        {/* Lyrics Section */}
        <div
          className="animate-in fade-in slide-in-from-bottom-6 duration-700"
          style={{
            textAlign: settings.textAlign,
            color: settings.textColor,
            opacity: settings.textOpacity,
            fontSize: `${settings.fontSize}px`,
            fontWeight: settings.fontWeight === 'extrabold' ? 800 : settings.fontWeight === 'bold' ? 700 : 400,
            fontStyle: settings.fontStyle,
            letterSpacing: `${settings.letterSpacing}em`,
            lineHeight: settings.lineHeight
          }}
        >
          {selectedLyrics.map((line: string, idx: number) => (
            <p
              key={idx}
              className="drop-shadow-lg break-words"
              style={{ marginBottom: '0.25em' }}
            >
              {line}
            </p>
          ))}
          {selectedLyrics.length === 0 && (
            <p className="italic opacity-50 text-base font-normal">Select lyrics to display...</p>
          )}
        </div>
      </div>
    </div>
  );
};