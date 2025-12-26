"use client";

import {
  DownloadIcon,
  FilesIcon,
  ImageIcon,
  LayoutIcon,
  MagnifyingGlassIcon,
  MusicNoteIcon,
  PaletteIcon,
  SparkleIcon,
  SpinnerIcon,
} from "@phosphor-icons/react/dist/ssr";
import * as htmlToImage from "html-to-image";
import type React from "react";
import { useCallback, useRef, useState } from "react";
import { fetchSongDetails } from "@/actions/geminiService";
import { LyricCard } from "@/components/LyricCard";
import { BackgroundTab } from "@/components/settings/BackgroundTab";
import { ContentTab } from "@/components/settings/ContentTab";
import { StyleTab } from "@/components/settings/StyleTab";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CardSettings, SongData } from "../types";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"content" | "bg" | "style">(
    "content",
  );
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isEditingLyrics, setIsEditingLyrics] = useState(false);
  const [lyricsText, setLyricsText] = useState("");

  const [song, setSong] = useState<SongData | null>(null);
  const [settings, setSettings] = useState<CardSettings>({
    bgType: "image",
    backgroundImage: null,
    backgroundColor: "#18181b",
    gradientColor1: "#4f46e5",
    gradientColor2: "#ec4899",
    gradientAngle: 135,
    bgBlur: 0,
    bgBrightness: 100,
    bgGrayscale: 0,

    overlayOpacity: 0.6,
    overlayColor: "black",
    overlayType: "gradient",
    overlayGradientColor1: "rgba(0,0,0,0.8)",
    overlayGradientColor2: "rgba(0,0,0,0)",
    overlayGradientAngle: 0,

    fontFamily: "Inter",
    fontSize: 28,
    textAlign: "left",
    textColor: "#ffffff",
    textOpacity: 1,
    fontWeight: "extrabold",
    fontStyle: "normal",
    letterSpacing: 0,
    lineHeight: 1.2,

    titleColor: "#ffffff",
    titleOpacity: 1,
    artistColor: "#ffffff",
    artistOpacity: 0.7,

    verticalAlign: "bottom",
    showAlbumArt: true,
    borderRadius: 16,
    selectedLyricIndices: [],
  });

  const previewRef = useRef<HTMLDivElement>(null);

  const handleSearch = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!query.trim()) return;
      setIsLoading(true);
      const result = await fetchSongDetails(query);
      if (result) {
        const lyricsArray = result.lyrics
          .split("\n")
          .filter((line: string) => line.trim().length > 0);
        setSong({
          title: result.title,
          artist: result.artist,
          album: result.album ?? "Unknown Album",
          lyrics: lyricsArray,
          albumArtUrl: `https://picsum.photos/seed/${encodeURIComponent(
            result.album ?? "Unknown Album",
          )}/400/400`,
        });
        setLyricsText(result.lyrics);
        setSettings((prev) => ({ ...prev, selectedLyricIndices: [] }));
        setActiveTab("content");
      }
      setIsLoading(false);
    },
    [query],
  );

  const handleManualCreate = useCallback(() => {
    const emptySong = {
      title: "Song Title",
      artist: "Artist Name",
      album: "Album Name",
      lyrics: ["I was born to love you", "With every single beat of my heart"],
      albumArtUrl: "https://picsum.photos/seed/manual/400/400",
    };
    setSong(emptySong);
    setLyricsText(emptySong.lyrics.join("\n"));
    setSettings((prev) => ({ ...prev, selectedLyricIndices: [0, 1] }));
    setActiveTab("content");
  }, []);

  const downloadImage = useCallback(async () => {
    if (previewRef.current === null) return;
    try {
      // Wait for fonts to load
      if (document.fonts) {
        await document.fonts.ready;
      }

      // Small delay to ensure everything is rendered
      await new Promise((resolve) => setTimeout(resolve, 100));

      const dataUrl = await htmlToImage.toPng(previewRef.current, {
        quality: 1,
        pixelRatio: 2.5,
        cacheBust: true,
        fontEmbedCSS: "",
        skipFonts: false,
        filter: (_node) => {
          // Filter out any problematic nodes if needed
          return true;
        },
        style: {
          fontFamily: settings.fontFamily || "Inter",
        },
      });
      const link = document.createElement("a");
      link.download = `LyricVibe-${song?.title || "Cover"}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Download failed", err);
      // Try alternative method without font embedding
      try {
        const dataUrl = await htmlToImage.toPng(previewRef.current, {
          quality: 1,
          pixelRatio: 2,
          cacheBust: true,
          skipFonts: true,
        });
        const link = document.createElement("a");
        link.download = `LyricVibe-${song?.title || "Cover"}.png`;
        link.href = dataUrl;
        link.click();
      } catch (fallbackErr) {
        console.error("Fallback download also failed", fallbackErr);
        alert("Failed to download image. Please try again.");
      }
    }
  }, [song?.title, settings.fontFamily]);

  const handleSongChange = useCallback((updatedSong: SongData) => {
    setSong(updatedSong);
  }, []);

  const handleLyricsTextChange = useCallback((text: string) => {
    setLyricsText(text);
  }, []);

  const handleSelectedIndicesChange = useCallback((indices: number[]) => {
    setSettings((prev) => ({ ...prev, selectedLyricIndices: indices }));
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 flex flex-col items-center">
      <header className="w-full max-w-7xl flex justify-between items-center mb-8">
        <div className="flex items-center gap-3 select-none">
          <div className="p-2 bg-linear-to-br from-primary to-primary/80 rounded-xl shadow-xl shadow-primary/20">
            <MusicNoteIcon
              className="w-6 h-6 text-primary-foreground"
              weight="fill"
            />
          </div>
          <h1 className="text-2xl font-black tracking-tighter uppercase italic bg-clip-text text-transparent bg-linear-to-r from-foreground to-muted-foreground pr-2">
            LyricVibe
          </h1>
        </div>
        <Button onClick={downloadImage} size="lg" className="shadow-lg">
          <DownloadIcon className="w-4 h-4" />{" "}
          <span className="hidden md:inline">Export</span>
        </Button>
      </header>

      <main className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 flex flex-col gap-6 order-2 lg:order-1">
          <Card className="p-4 flex gap-2 flex-row">
            <form onSubmit={handleSearch} className="flex-1 relative">
              <MusicNoteIcon
                weight="fill"
                className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground"
              />
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="type Song, artist ..."
                className="pl-10"
              />
            </form>
            <Button onClick={handleSearch} disabled={isLoading || !query}>
              {isLoading ? (
                <SpinnerIcon className="size-5 animate-spin" />
              ) : (
                <MagnifyingGlassIcon className="size-5" />
              )}
            </Button>
          </Card>

          {!song ? (
            <Card className="border-dashed p-12 text-center flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                <SparkleIcon className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Start creating</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Search for a song or create manually.
                </p>
              </div>
              <Button
                onClick={handleManualCreate}
                variant="link"
                className="text-sm font-semibold"
              >
                Create Manually &rarr;
              </Button>
            </Card>
          ) : (
            <Card className="overflow-hidden shadow-xl flex flex-col h-full min-h-150 pt-0!">
              <Tabs
                value={activeTab}
                onValueChange={(v) =>
                  setActiveTab(v as "content" | "bg" | "style")
                }
                className="flex flex-col h-full"
              >
                <TabsList className="w-full justify-start rounded-none border-b">
                  <TabsTrigger value="content" className="flex-1">
                    <FilesIcon className="size-4 text-muted-foreground" />{" "}
                    Content
                  </TabsTrigger>
                  <TabsTrigger value="bg" className="flex-1">
                    <ImageIcon className="size-4 text-muted-foreground" />{" "}
                    Background
                  </TabsTrigger>
                  <TabsTrigger value="style" className="flex-1">
                    <PaletteIcon className="size-4 text-muted-foreground" />{" "}
                    Style
                  </TabsTrigger>
                </TabsList>

                <div className="p-6 flex-1 overflow-y-auto">
                  <TabsContent value="content" className="space-y-8 mt-0">
                    <ContentTab
                      song={song}
                      onSongChange={handleSongChange}
                      isEditingLyrics={isEditingLyrics}
                      onEditingChange={setIsEditingLyrics}
                      lyricsText={lyricsText}
                      onLyricsTextChange={handleLyricsTextChange}
                      selectedLyricIndices={settings.selectedLyricIndices}
                      onSelectedIndicesChange={handleSelectedIndicesChange}
                    />
                  </TabsContent>

                  <TabsContent value="bg" className="space-y-8 mt-0">
                    <BackgroundTab
                      settings={settings}
                      onSettingsChange={setSettings}
                    />
                  </TabsContent>

                  <TabsContent value="style" className="space-y-8 mt-0">
                    <StyleTab
                      settings={settings}
                      onSettingsChange={setSettings}
                    />
                  </TabsContent>
                </div>
              </Tabs>
            </Card>
          )}
        </div>

        <div className="lg:col-span-5 flex flex-col items-center order-1 lg:order-2 lg:sticky lg:top-8">
          <div className="w-full space-y-4">
            <div className="flex justify-center lg:justify-start items-center gap-2 mb-2">
              <LayoutIcon className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Live Preview
              </h2>
            </div>
            <div className="flex justify-center w-full">
              <LyricCard
                song={song}
                settings={settings}
                previewRef={previewRef}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
