import { ImageIcon, UploadSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SongData } from "@/types";

interface ContentTabProps {
  song: SongData | null;
  onSongChange: (song: SongData) => void;
  isEditingLyrics: boolean;
  onEditingChange: (editing: boolean) => void;
  lyricsText: string;
  onLyricsTextChange: (text: string) => void;
  selectedLyricIndices: number[];
  onSelectedIndicesChange: (indices: number[]) => void;
}

export const ContentTab = React.memo(
  ({
    song,
    onSongChange,
    isEditingLyrics,
    onEditingChange,
    lyricsText,
    onLyricsTextChange,
    selectedLyricIndices,
    onSelectedIndicesChange,
  }: ContentTabProps) => {
    const handleTitleChange = useCallback(
      (title: string) => {
        if (song) onSongChange({ ...song, title });
      },
      [song, onSongChange]
    );

    const handleArtistChange = useCallback(
      (artist: string) => {
        if (song) onSongChange({ ...song, artist });
      },
      [song, onSongChange]
    );

    const handleAlbumArtUpload = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && song) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            onSongChange({
              ...song,
              albumArtUrl: ev.target?.result as string,
            });
          };
          reader.readAsDataURL(file);
        }
      },
      [song, onSongChange]
    );

    const handleLyricsChange = useCallback(
      (text: string) => {
        onLyricsTextChange(text);
        if (song) {
          const lyrics = text.split("\n").filter((x) => x.trim());
          onSongChange({ ...song, lyrics });
        }
      },
      [song, onSongChange, onLyricsTextChange]
    );

    const toggleLyricSelection = useCallback(
      (idx: number) => {
        const newIndices = selectedLyricIndices.includes(idx)
          ? selectedLyricIndices.filter((i) => i !== idx)
          : [...selectedLyricIndices, idx].sort((a, b) => a - b);
        onSelectedIndicesChange(newIndices);
      },
      [selectedLyricIndices, onSelectedIndicesChange]
    );

    if (!song) return null;

    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Metadata Details
          </h3>
          <div className="grid grid-cols-5 gap-4 items-center">
            <div className="col-span-3 flex flex-col gap-4">
              <Input
                type="text"
                value={song.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Title"
              />
              <Input
                type="text"
                value={song.artist}
                onChange={(e) => handleArtistChange(e.target.value)}
                placeholder="Artist"
              />
            </div>
            <div className="col-span-2">
              <Label className="aspect-square bg-muted rounded-xl flex items-center justify-center cursor-pointer group overflow-hidden relative">
                {song.albumArtUrl ? (
                  <>
                    <img
                      src={song.albumArtUrl}
                      alt="Album Art"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <UploadSimpleIcon className="size-6 text-white" />
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <ImageIcon className="size-6" />
                    <span className="text-xs">Upload Art</span>
                  </div>
                )}
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleAlbumArtUpload}
                  aria-label="Upload album art"
                />
              </Label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Lyric Selection ({selectedLyricIndices.length})
            </h3>
            <Button
              onClick={() => onEditingChange(!isEditingLyrics)}
              variant="link"
              size="sm"
              className="text-xs h-auto p-0"
            >
              {isEditingLyrics ? "Save" : "Edit Source"}
            </Button>
          </div>
          {isEditingLyrics ? (
            <textarea
              value={lyricsText}
              onChange={(e) => handleLyricsChange(e.target.value)}
              className="w-full h-64 bg-input border border-border rounded-xl p-4 text-sm font-mono outline-none focus:ring-2 focus:ring-ring"
              placeholder="Enter lyrics (one per line)"
              aria-label="Edit lyrics"
            />
          ) : (
            <div className="h-64 overflow-y-auto space-y-1 bg-muted/30 rounded-xl p-2 border border-border">
              {song.lyrics.map((line, idx) => (
                <Button
                  key={idx}
                  variant={
                    selectedLyricIndices.includes(idx) ? "default" : "ghost"
                  }
                  onClick={() => toggleLyricSelection(idx)}
                  className={`w-full text-left p-2 text-xs justify-start h-auto font-normal ${
                    selectedLyricIndices.includes(idx)
                      ? "bg-primary/20 text-primary hover:bg-primary/30"
                      : ""
                  }`}
                >
                  {line}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
);

ContentTab.displayName = "ContentTab";
