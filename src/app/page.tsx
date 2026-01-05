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
import { motion, AnimatePresence } from "motion/react";
import * as htmlToImage from "html-to-image";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { fetchSongDetails } from "@/actions/geminiService";
import { fetchLyrics, fetchSongSuggestions } from "@/actions/lyricsService";
import { LyricCard } from "@/components/LyricCard";
import { SongDetailsCard } from "@/components/SongDetailsCard";
import { BackgroundTab } from "@/components/settings/BackgroundTab";
import { ContentTab } from "@/components/settings/ContentTab";
import { StyleTab } from "@/components/settings/StyleTab";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CardSettings, SongData, SongSuggestion } from "../types";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"content" | "bg" | "style">(
    "content"
  );
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SongSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSong, setSelectedSong] = useState<SongSuggestion | null>(null);

  const [isEditingLyrics, setIsEditingLyrics] = useState(false);
  const [lyricsText, setLyricsText] = useState("");

  const [song, setSong] = useState<SongData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [processingState, setProcessingState] = useState<string | null>(null);
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

    overlayOpacityStart: 0.8,
    overlayOpacityEnd: 0,
    overlayColor: "black",
    overlayType: "gradient",
    overlayGradientColor1: "rgba(0,0,0,0.8)",
    overlayGradientColor2: "rgba(0,0,0,0)",
    overlayGradientAngle: 0,

    fontFamily: "Geist",
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
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (query.trim().length > 2) {
        setShowSuggestions(true);
        const fetchedSuggestions = await fetchSongSuggestions(query);
        setSuggestions(fetchedSuggestions);
      } else {
        setShowSuggestions(false);
      }
    }, 300); // 300ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  // Close suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    if (showSuggestions) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showSuggestions]);

  const handleSuggestionSelect = useCallback(
    async (suggestion: SongSuggestion) => {
      try {
        setQuery(`${suggestion.artist.name} - ${suggestion.title}`);
        setShowSuggestions(false);
        setIsLoading(true);
        setProcessingState("Fetching lyrics...");
        setErrorMessage(null);
        setSelectedSong(suggestion);

        const lyricsData = await fetchLyrics(
          suggestion.artist.name,
          suggestion.title
        );

        if (lyricsData?.lyrics) {
          setProcessingState("Processing lyrics...");
          const lyricsArray = lyricsData.lyrics
            .split("\n")
            .filter((line: string) => line.trim().length > 0);
          setSong({
            title: suggestion.title,
            artist: suggestion.artist.name,
            album: suggestion.album.title ?? "Unknown Album",
            lyrics: lyricsArray,
            albumArtUrl: suggestion.album.cover_big,
          });
          setLyricsText(lyricsData.lyrics);
          setSettings((prev) => ({ ...prev, selectedLyricIndices: [] }));
          setActiveTab("content");
          setProcessingState(null);
        } else {
          setProcessingState("Loading placeholder lyrics...");
          const title = suggestion.title;
          const artist = suggestion.artist.name;
          const emptySong = {
            title,
            artist,
            album: suggestion.album.title ?? "Unknown Album",
            lyrics: [
              "I was born to love you",
              "With every single beat of my heart",
            ],
            albumArtUrl: suggestion.album.cover_big,
          };
          setSong(emptySong);
          setLyricsText(emptySong.lyrics.join("\n"));
          setSettings((prev) => ({ ...prev, selectedLyricIndices: [0, 1] }));
          setActiveTab("content");
          setProcessingState(null);
        }

        setIsLoading(false);
      } catch (error) {
        const errorMsg =
          error instanceof Error ? error.message : "Failed to load song";
        setErrorMessage(errorMsg);
        setProcessingState(null);
        setIsLoading(false);
      }
    },
    []
  );

  const handleSearch = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!query.trim()) return;
      setIsLoading(true);
      setShowSuggestions(false);
      setErrorMessage(null);
      setProcessingState("Fetching song suggestions...");

      // First, try to get suggestions from lyrics API
      const songSuggestions = await fetchSongSuggestions(query);

      if (songSuggestions.length > 0) {
        const firstSuggestion = songSuggestions[0];
        setSelectedSong(firstSuggestion);
        setProcessingState("Fetching lyrics...");

        const lyricsData = await fetchLyrics(
          firstSuggestion.artist.name,
          firstSuggestion.title
        );

        if (lyricsData?.lyrics) {
          setProcessingState("Processing lyrics...");
          const lyricsArray = lyricsData.lyrics
            .split("\n")
            .filter((line: string) => line.trim().length > 0);
          setSong({
            title: firstSuggestion.title,
            artist: firstSuggestion.artist.name,
            album: firstSuggestion.album.title ?? "Unknown Album",
            lyrics: lyricsArray,
            albumArtUrl: firstSuggestion.album.cover_big,
          });
          setLyricsText(lyricsData.lyrics);
          setSettings((prev) => ({ ...prev, selectedLyricIndices: [] }));
          setActiveTab("content");
          setProcessingState(null);
          setIsLoading(false);
          return;
        }
      }

      setProcessingState("Fetching from Gemini API...");
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
            result.album ?? "Unknown Album"
          )}/400/400`,
        });
        setLyricsText(result.lyrics);
        setSettings((prev) => ({ ...prev, selectedLyricIndices: [] }));
        setActiveTab("content");
      } else {
        setErrorMessage("Could not find lyrics for this song.");
      }

      setProcessingState(null);
      setIsLoading(false);
    },
    [query]
  );

  const handleManualCreate = useCallback(
    (
      titleOrEvent: string | React.MouseEvent = "Song Title",
      artist = "Artist Name"
    ) => {
      const title =
        typeof titleOrEvent === "string" ? titleOrEvent : "Song Title";

      const emptySong = {
        title,
        artist,
        album: "Album Name",
        lyrics: [
          "I was born to love you",
          "With every single beat of my heart",
        ],
        albumArtUrl: "https://picsum.photos/seed/manual/400/400",
      };
      setSong(emptySong);
      setLyricsText(emptySong.lyrics.join("\n"));
      setSettings((prev) => ({ ...prev, selectedLyricIndices: [0, 1] }));
      setActiveTab("content");
    },
    []
  );

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
      link.download = `LyricsVibe-${song?.title || "Cover"}.png`;
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
        link.download = `LyricsVibe-${song?.title || "Cover"}.png`;
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
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 25 }}
        className="w-full max-w-7xl flex justify-between items-center mb-8"
      >
        <div className="flex items-center gap-3 select-none">
          <motion.div
            className="p-2 bg-linear-to-br from-primary to-primary/80 rounded-xl shadow-xl shadow-primary/20"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", damping: 15 }}
          >
            <MusicNoteIcon
              className="w-6 h-6 text-primary-foreground"
              weight="fill"
            />
          </motion.div>
          <motion.h1
            className="text-2xl font-black tracking-tighter uppercase italic bg-clip-text text-transparent bg-linear-to-r from-foreground to-muted-foreground pr-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, type: "spring", damping: 25 }}
          >
            LyricsVibe
          </motion.h1>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, type: "spring", damping: 25 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button onClick={downloadImage} size="lg" className="shadow-lg">
            <DownloadIcon className="w-4 h-4" />{" "}
            <span className="hidden md:inline">Export</span>
          </Button>
        </motion.div>
      </motion.header>

      <main className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 flex flex-col gap-6 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: "spring", damping: 25 }}
          >
            <Card className="p-4 flex gap-2 flex-row overflow-visible">
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
                  autoComplete="off"
                />
                {showSuggestions && suggestions.length > 0 && (
                  <div
                    ref={suggestionsRef}
                    className="absolute top-full mt-1 left-0 right-0 bg-background/40 backdrop-blur-2xl border border-border rounded-2xl shadow-xl z-50 max-h-96 overflow-y-auto"
                  >
                    {suggestions.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => handleSuggestionSelect(s)}
                        className="w-full px-3 py-2 transition-all flex items-center gap-3 text-left border-b border-border/50 last:border-b-0 group hover:pl-5 duration-300 hover:bg-primary/5"
                      >
                        <div className="shrink-0">
                          <img
                            src={s.album.cover_small}
                            alt={s.album.title}
                            className="size-12 rounded-lg object-cover shadow-sm"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm truncate">
                            {s.title}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {s.artist.name}
                          </p>
                        </div>
                        <div className="text-xs text-muted-foreground shrink-0">
                          {s.album.title}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </form>
              <Button onClick={handleSearch} disabled={isLoading || !query}>
                {isLoading || processingState ? (
                  <SpinnerIcon className="size-5 animate-spin" />
                ) : (
                  <MagnifyingGlassIcon className="size-5" />
                )}
              </Button>
            </Card>
          </motion.div>
          <AnimatePresence mode="wait">
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: "spring", damping: 25 }}
                className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 flex items-start gap-3"
              >
                <div className="size-2 rounded-full bg-destructive mt-2 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-destructive">Error:</p>
                  <p className="text-xs text-destructive/80 mt-1">
                    {errorMessage}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setErrorMessage(null)}
                  className="text-destructive/60 hover:text-destructive text-lg"
                >
                  ×
                </motion.button>
              </motion.div>
            )}
            {processingState && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: "spring", damping: 25 }}
                className="bg-primary/10 border border-primary/30 rounded-lg p-4 flex items-center gap-3"
              >
                <SpinnerIcon className="size-4 text-primary animate-spin shrink-0" />
                <p className="text-sm text-primary font-medium">
                  {processingState}
                </p>
              </motion.div>
            )}
          </AnimatePresence>{" "}
          {!song ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring", damping: 25 }}
            >
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
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, type: "spring", damping: 25 }}
            >
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
            </motion.div>
          )}
        </div>

        <div className="lg:col-span-5 flex flex-col items-center order-1 lg:order-2 lg:sticky lg:top-8">
          <div className="w-full space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, type: "spring", damping: 25 }}
              className="flex justify-center lg:justify-start items-center gap-2 mb-2"
            >
              <LayoutIcon className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Live Preview
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", damping: 25 }}
              className="flex justify-center w-full"
            >
              <LyricCard
                song={song}
                settings={settings}
                previewRef={previewRef}
              />
            </motion.div>

            <AnimatePresence mode="wait">
              {selectedSong && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ type: "spring", damping: 25 }}
                  className="w-full"
                >
                  <SongDetailsCard songData={selectedSong} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
