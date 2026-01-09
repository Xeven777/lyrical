"use client";

import {
  CalendarIcon,
  ClockIcon,
  PauseIcon,
  PlayIcon,
  UserIcon,
  DiscIcon,
  XIcon,
} from "@phosphor-icons/react/dist/ssr";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { SongSuggestion } from "@/types";

interface SongDetailsCardProps {
  songData: SongSuggestion | null;
}

export function SongDetailsCard({ songData }: SongDetailsCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setCurrentTime(0);
      setIsExpanded(false);
    }
  }, [songData]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const time = Number.parseFloat(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!songData) {
    return null;
  }

  const {
    artist,
    album,
    preview,
    explicit_lyrics,
    duration: trackDuration,
    title,
  } = songData;

  return (
    <>
      {/* Dynamic Island Audio Preview */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
          >
            <motion.div
              layout
              className="relative z-200 backdrop-blur-3xl bg-white/40 dark:bg-white/10 border border-white/30 shadow-2xl overflow-hidden transition-all duration-300 ease-out"
              style={{
                borderRadius: isExpanded ? "24px" : "999px",
              }}
              animate={{
                width: isExpanded ? "400px" : "60px",
                height: isExpanded ? "auto" : "60px",
              }}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
            >
              {/* Compact State - Spinning Disc */}
              {!isExpanded && (
                <motion.button
                  type="button"
                  onClick={() => setIsExpanded(true)}
                  className="w-full h-full p-2 flex items-center justify-center group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="relative size-11 rounded-full overflow-hidden ring-2 ring-white/30"
                    animate={{
                      rotate: isPlaying ? 360 : 0,
                    }}
                    transition={{
                      rotate: {
                        duration: 3,
                        repeat: isPlaying ? Number.POSITIVE_INFINITY : 0,
                        ease: "linear",
                      },
                    }}
                  >
                    <img
                      src={album.cover_small}
                      alt={album.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-black/50" />
                    </div>
                  </motion.div>
                </motion.button>
              )}

              {/* Expanded State */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-4 space-y-4"
                  >
                    {/* Header with close button */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <motion.div
                          className="relative size-12 shrink-0 rounded-full overflow-hidden ring-2 ring-white/30 shadow-lg"
                          animate={{
                            rotate: isPlaying ? 360 : 0,
                          }}
                          transition={{
                            rotate: {
                              duration: 3,
                              repeat: isPlaying ? Number.POSITIVE_INFINITY : 0,
                              ease: "linear",
                            },
                          }}
                        >
                          <img
                            src={album.cover_medium}
                            alt={album.title}
                            className="size-full object-cover saturate-110"
                          />
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <motion.p
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="font-bold text-sm text-foreground/80 truncate"
                          >
                            {title}
                          </motion.p>
                          <motion.p
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.25 }}
                            className="text-xs text-foreground/60 truncate"
                          >
                            {artist.name}
                          </motion.p>
                        </div>
                      </div>
                      <motion.button
                        type="button"
                        onClick={() => setIsExpanded(false)}
                        className="w-6 h-6 rounded-full bg-foreground/10 hover:bg-foreground/20 flex items-center justify-center transition-colors shrink-0"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <XIcon
                          className="w-3 h-3 text-muted-foreground"
                          weight="bold"
                        />
                      </motion.button>
                    </div>

                    {/* Player Controls */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center gap-3">
                        <motion.button
                          type="button"
                          onClick={togglePlay}
                          className="size-10 rounded-full bg-background/50 hover:bg-background flex items-center justify-center transition-all shadow-lg"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {isPlaying ? (
                            <PauseIcon
                              className="size-4 text-foreground"
                              weight="fill"
                            />
                          ) : (
                            <PlayIcon
                              className="size-4 text-foreground ml-0.5"
                              weight="fill"
                            />
                          )}
                        </motion.button>

                        <div className="flex-1 space-y-1">
                          <div className="relative h-1 bg-foreground/20 rounded-full overflow-hidden">
                            <motion.div
                              className="absolute inset-y-0 left-0 bg-linear-to-r from-primary to-primary/80 rounded-full"
                              initial={{ width: 0 }}
                              animate={{
                                width: `${
                                  (currentTime / (duration || 30)) * 100
                                }%`,
                              }}
                              transition={{ duration: 0.1 }}
                            />
                            <input
                              type="range"
                              min="0"
                              max={duration || 30}
                              step="0.1"
                              value={currentTime}
                              onChange={handleSeek}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                          </div>
                          <div className="flex justify-between text-[10px] text-foreground/60 font-mono">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration || 30)}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    <audio
                      ref={audioRef}
                      src={preview}
                      onTimeUpdate={handleTimeUpdate}
                      onLoadedMetadata={handleLoadedMetadata}
                      onEnded={() => setIsPlaying(false)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Song Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring", damping: 25 }}
      >
        <Card className="shadow-xl overflow-hidden pb-0">
          <CardHeader className="border-b">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2"
            >
              <DiscIcon className="size-5 text-primary" weight="fill" />
              <h3 className="text-sm font-bold uppercase tracking-wider">
                Song Details
              </h3>
            </motion.div>
          </CardHeader>

          <CardContent className="p-0">
            {/* Artist Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 border-b space-y-4"
            >
              <div className="flex items-start gap-4">
                <motion.div
                  className="relative shrink-0 group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", damping: 20 }}
                >
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <img
                    src={artist.picture_medium}
                    alt={artist.name}
                    className="size-20 rounded-full object-cover ring-2 ring-border relative"
                  />
                </motion.div>
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center gap-2">
                    <UserIcon className="size-4 text-muted-foreground shrink-0" />
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Artist
                    </h4>
                  </div>
                  <p className="text-xl font-bold truncate">{artist.name}</p>
                  <motion.a
                    href={artist.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1 hover:underline"
                    whileHover={{ x: 2 }}
                    transition={{ type: "spring", damping: 20 }}
                  >
                    View on Deezer
                    <motion.span
                      className="text-xs"
                      animate={{ y: [0, -2, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      ↗
                    </motion.span>
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Album Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 border-b space-y-4"
            >
              <div className="flex items-start gap-4">
                <motion.div
                  className="relative shrink-0 group"
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ type: "spring", damping: 20 }}
                >
                  <div className="absolute inset-0 bg-primary/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <img
                    src={album.cover_medium}
                    alt={album.title}
                    className="size-20 rounded-lg object-cover ring-2 ring-border relative shadow-lg"
                  />
                </motion.div>
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="size-4 text-muted-foreground shrink-0" />
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Album
                    </h4>
                  </div>
                  <p className="text-lg font-bold truncate">{album.title}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {explicit_lyrics && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          damping: 15,
                          delay: 0.6,
                        }}
                      >
                        <Badge
                          variant="destructive"
                          className="text-xs h-4 px-1.5"
                        >
                          explicit
                        </Badge>
                      </motion.div>
                    )}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        damping: 15,
                        delay: 0.65,
                      }}
                      className="flex items-center gap-1 text-xs text-muted-foreground"
                    >
                      <ClockIcon className="size-3" />
                      <span>{formatTime(trackDuration)}</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}
