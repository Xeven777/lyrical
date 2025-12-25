"use client";

import React, { useState, useRef } from "react";
import {
  Search,
  Download,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Loader2,
  Music,
  Sparkles,
  Upload,
  Layout,
  ChevronDown,
  RefreshCw,
  AlignStartVertical,
  AlignCenterVertical,
  AlignEndVertical,
} from "lucide-react";
import { SongData, CardSettings } from "../types";
import * as htmlToImage from "html-to-image";
import { fetchSongDetails } from "@/actions/geminiService";
import { LyricCard } from "@/components/LyricCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"content" | "bg" | "style">(
    "content"
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

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsLoading(true);
    const result = await fetchSongDetails(query);
    if (result) {
      const lyricsArray = result.lyrics
        .split("\n")
        .filter((line: string) => line.trim().length > 0);
      setSong({
        ...result,
        lyrics: lyricsArray,
        albumArtUrl: `https://picsum.photos/seed/${encodeURIComponent(
          result.album
        )}/400/400`,
      });
      setLyricsText(result.lyrics);
      setSettings((prev) => ({ ...prev, selectedLyricIndices: [] }));
      setActiveTab("content");
    }
    setIsLoading(false);
  };

  const handleManualCreate = () => {
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
  };

  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSettings((prev) => ({
          ...prev,
          bgType: "image",
          backgroundImage: event.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadImage = async () => {
    if (previewRef.current === null) return;
    try {
      const dataUrl = await htmlToImage.toPng(previewRef.current, {
        quality: 0.95,
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.download = `LyricVibe-${song?.title || "Cover"}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Download failed", err);
    }
  };

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

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 flex flex-col items-center font-sans">
      <header className="w-full max-w-7xl flex justify-between items-center mb-8">
        <div className="flex items-center gap-3 select-none">
          <div className="p-2 bg-linear-to-br from-primary to-primary/80 rounded-xl shadow-lg shadow-primary/20">
            <Music className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-black tracking-tighter uppercase italic bg-clip-text text-transparent bg-linear-to-r from-foreground to-muted-foreground">
            LyricVibe
          </h1>
        </div>
        <Button onClick={downloadImage} size="lg" className="shadow-lg">
          <Download className="w-4 h-4" />{" "}
          <span className="hidden md:inline">Export</span>
        </Button>
      </header>

      <main className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 flex flex-col gap-6 order-2 lg:order-1">
          <Card className="p-4 flex gap-2">
            <form onSubmit={handleSearch} className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search song..."
                className="pl-10"
              />
            </form>
            <Button
              onClick={handleSearch}
              disabled={isLoading || !query}
              className="min-w-[44px]"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </Button>
          </Card>

          {!song ? (
            <Card className="border-dashed p-12 text-center flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-muted-foreground" />
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
            <Card className="overflow-hidden shadow-xl flex flex-col h-full min-h-[600px]">
              <Tabs
                value={activeTab}
                onValueChange={(v) =>
                  setActiveTab(v as "content" | "bg" | "style")
                }
                className="flex flex-col h-full"
              >
                <TabsList className="w-full justify-start rounded-none border-b">
                  <TabsTrigger value="content" className="flex-1">
                    Content
                  </TabsTrigger>
                  <TabsTrigger value="bg" className="flex-1">
                    Background
                  </TabsTrigger>
                  <TabsTrigger value="style" className="flex-1">
                    Style
                  </TabsTrigger>
                </TabsList>

                <div className="p-6 flex-1 overflow-y-auto">
                  <TabsContent value="content" className="space-y-8 mt-0">
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Metadata Details
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          type="text"
                          value={song.title}
                          onChange={(e) =>
                            setSong({ ...song, title: e.target.value })
                          }
                          placeholder="Title"
                        />
                        <Input
                          type="text"
                          value={song.artist}
                          onChange={(e) =>
                            setSong({ ...song, artist: e.target.value })
                          }
                          placeholder="Artist"
                        />
                        <div className="col-span-2 flex gap-2">
                          <Input
                            type="text"
                            value={song.album}
                            onChange={(e) =>
                              setSong({ ...song, album: e.target.value })
                            }
                            placeholder="Album"
                            className="flex-1"
                          />
                          <Label className="bg-muted px-3 flex items-center rounded-lg cursor-pointer hover:bg-muted/80">
                            <Upload className="w-4 h-4" />
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) {
                                  const r = new FileReader();
                                  r.onload = (ev) =>
                                    setSong({
                                      ...song,
                                      albumArtUrl: ev.target?.result as string,
                                    });
                                  r.readAsDataURL(f);
                                }
                              }}
                            />
                          </Label>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Lyric Selection
                        </h3>
                        <Button
                          onClick={() => setIsEditingLyrics(!isEditingLyrics)}
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
                          onChange={(e) => {
                            setLyricsText(e.target.value);
                            const l = e.target.value
                              .split("\n")
                              .filter((x) => x.trim());
                            setSong({ ...song, lyrics: l });
                          }}
                          className="w-full h-64 bg-input border border-border rounded-xl p-4 text-sm font-mono outline-none focus:ring-2 focus:ring-ring"
                        />
                      ) : (
                        <div className="h-64 overflow-y-auto space-y-1 bg-muted/30 rounded-xl p-2 border border-border">
                          {song.lyrics.map((line, idx) => (
                            <Button
                              key={idx}
                              variant={
                                settings.selectedLyricIndices.includes(idx)
                                  ? "default"
                                  : "ghost"
                              }
                              onClick={() => {
                                setSettings((s) => ({
                                  ...s,
                                  selectedLyricIndices:
                                    s.selectedLyricIndices.includes(idx)
                                      ? s.selectedLyricIndices.filter(
                                          (i) => i !== idx
                                        )
                                      : [...s.selectedLyricIndices, idx].sort(
                                          (a, b) => a - b
                                        ),
                                }));
                              }}
                              className={cn(
                                "w-full text-left p-2 text-xs justify-start h-auto font-normal",
                                settings.selectedLyricIndices.includes(idx) &&
                                  "bg-primary/20 text-primary hover:bg-primary/30"
                              )}
                            >
                              {line}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="bg" className="space-y-8 mt-0">
                    <div className="flex bg-muted p-1 rounded-xl">
                      {(["image", "gradient", "color"] as const).map((t) => (
                        <Button
                          key={t}
                          variant={
                            settings.bgType === t ? "secondary" : "ghost"
                          }
                          onClick={() =>
                            setSettings((s) => ({ ...s, bgType: t }))
                          }
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
                            <Upload className="w-5 h-5 text-muted-foreground" />
                            <span className="text-[10px] mt-2">Upload</span>
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={handleBgUpload}
                            />
                          </Label>
                          <Button
                            variant="outline"
                            onClick={() =>
                              setSettings((s) => ({
                                ...s,
                                backgroundImage: `https://picsum.photos/seed/${Math.random()}/800/1200`,
                              }))
                            }
                            className="h-24 flex flex-col items-center justify-center"
                          >
                            <RefreshCw className="w-5 h-5" />
                            <span className="text-[10px] mt-2">Random</span>
                          </Button>
                        </div>
                        <Separator />
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground">
                              Blur
                            </Label>
                            <Slider
                              min={0}
                              max={40}
                              step={1}
                              value={[settings.bgBlur]}
                              onValueChange={([v]) =>
                                setSettings((s) => ({ ...s, bgBlur: v }))
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground">
                              Brightness
                            </Label>
                            <Slider
                              min={0}
                              max={200}
                              step={1}
                              value={[settings.bgBrightness]}
                              onValueChange={([v]) =>
                                setSettings((s) => ({ ...s, bgBrightness: v }))
                              }
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {settings.bgType === "gradient" && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground">
                              Color 1
                            </Label>
                            <input
                              type="color"
                              value={settings.gradientColor1}
                              onChange={(e) =>
                                setSettings((s) => ({
                                  ...s,
                                  gradientColor1: e.target.value,
                                }))
                              }
                              className="w-full h-10 rounded bg-transparent cursor-pointer"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground">
                              Color 2
                            </Label>
                            <input
                              type="color"
                              value={settings.gradientColor2}
                              onChange={(e) =>
                                setSettings((s) => ({
                                  ...s,
                                  gradientColor2: e.target.value,
                                }))
                              }
                              className="w-full h-10 rounded bg-transparent cursor-pointer"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground">
                            Angle: {settings.gradientAngle}°
                          </Label>
                          <Slider
                            min={0}
                            max={360}
                            step={1}
                            value={[settings.gradientAngle]}
                            onValueChange={([v]) =>
                              setSettings((s) => ({ ...s, gradientAngle: v }))
                            }
                          />
                        </div>
                      </div>
                    )}

                    {settings.bgType === "color" && (
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">
                          Background Color
                        </Label>
                        <div className="flex gap-2 items-center">
                          <input
                            type="color"
                            value={settings.backgroundColor}
                            onChange={(e) =>
                              setSettings((s) => ({
                                ...s,
                                backgroundColor: e.target.value,
                              }))
                            }
                            className="w-12 h-12 rounded bg-transparent cursor-pointer"
                          />
                          <Input
                            type="text"
                            value={settings.backgroundColor}
                            onChange={(e) =>
                              setSettings((s) => ({
                                ...s,
                                backgroundColor: e.target.value,
                              }))
                            }
                            className="flex-1 font-mono"
                          />
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="style" className="space-y-8 mt-0">
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Typography Library
                      </h3>
                      <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-2">
                        {FONT_OPTIONS.map((f) => (
                          <Button
                            key={f}
                            variant={
                              settings.fontFamily === f ? "default" : "outline"
                            }
                            onClick={() =>
                              setSettings((s) => ({ ...s, fontFamily: f }))
                            }
                            className="text-xs text-left justify-start h-auto py-2"
                            style={{ fontFamily: f }}
                          >
                            {f}
                          </Button>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground">
                            Size
                          </Label>
                          <Slider
                            min={12}
                            max={72}
                            step={1}
                            value={[settings.fontSize]}
                            onValueChange={([v]) =>
                              setSettings((s) => ({ ...s, fontSize: v }))
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground">
                            Opacity
                          </Label>
                          <Slider
                            min={0}
                            max={1}
                            step={0.1}
                            value={[settings.textOpacity]}
                            onValueChange={([v]) =>
                              setSettings((s) => ({ ...s, textOpacity: v }))
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground">
                            Spacing
                          </Label>
                          <Slider
                            min={-0.1}
                            max={0.5}
                            step={0.01}
                            value={[settings.letterSpacing]}
                            onValueChange={([v]) =>
                              setSettings((s) => ({ ...s, letterSpacing: v }))
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground">
                            Line Height
                          </Label>
                          <Slider
                            min={0.8}
                            max={2}
                            step={0.1}
                            value={[settings.lineHeight]}
                            onValueChange={([v]) =>
                              setSettings((s) => ({ ...s, lineHeight: v }))
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Metadata Styling
                      </h3>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label className="text-[10px] uppercase font-bold text-muted-foreground">
                            Title Color
                          </Label>
                          <input
                            type="color"
                            value={settings.titleColor}
                            onChange={(e) =>
                              setSettings((s) => ({
                                ...s,
                                titleColor: e.target.value,
                              }))
                            }
                            className="w-full h-8 rounded bg-transparent cursor-pointer"
                          />
                          <Slider
                            min={0}
                            max={1}
                            step={0.1}
                            value={[settings.titleOpacity]}
                            onValueChange={([v]) =>
                              setSettings((s) => ({ ...s, titleOpacity: v }))
                            }
                          />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-[10px] uppercase font-bold text-muted-foreground">
                            Artist Color
                          </Label>
                          <input
                            type="color"
                            value={settings.artistColor}
                            onChange={(e) =>
                              setSettings((s) => ({
                                ...s,
                                artistColor: e.target.value,
                              }))
                            }
                            className="w-full h-8 rounded bg-transparent cursor-pointer"
                          />
                          <Slider
                            min={0}
                            max={1}
                            step={0.1}
                            value={[settings.artistOpacity]}
                            onValueChange={([v]) =>
                              setSettings((s) => ({ ...s, artistOpacity: v }))
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Alignment & Layout
                      </h3>
                      <div className="flex gap-2">
                        {(["top", "center", "bottom"] as const).map((a) => (
                          <Button
                            key={a}
                            variant={
                              settings.verticalAlign === a
                                ? "default"
                                : "outline"
                            }
                            onClick={() =>
                              setSettings((s) => ({ ...s, verticalAlign: a }))
                            }
                            className="flex-1"
                          >
                            {a === "top" ? (
                              <AlignStartVertical className="w-4 h-4" />
                            ) : a === "center" ? (
                              <AlignCenterVertical className="w-4 h-4" />
                            ) : (
                              <AlignEndVertical className="w-4 h-4" />
                            )}
                          </Button>
                        ))}
                      </div>
                      <div className="flex gap-2 bg-muted p-1 rounded-lg">
                        {(["left", "center", "right"] as const).map((a) => (
                          <Button
                            key={a}
                            variant={
                              settings.textAlign === a ? "secondary" : "ghost"
                            }
                            onClick={() =>
                              setSettings((s) => ({ ...s, textAlign: a }))
                            }
                            className="flex-1"
                          >
                            {a === "left" ? (
                              <AlignLeft className="w-4 h-4" />
                            ) : a === "center" ? (
                              <AlignCenter className="w-4 h-4" />
                            ) : (
                              <AlignRight className="w-4 h-4" />
                            )}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </Card>
          )}
        </div>

        <div className="lg:col-span-5 flex flex-col items-center order-1 lg:order-2 lg:sticky lg:top-8">
          <div className="w-full space-y-4">
            <div className="flex justify-center lg:justify-start items-center gap-2 mb-2">
              <Layout className="w-4 h-4 text-muted-foreground" />
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
