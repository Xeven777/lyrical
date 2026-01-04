"use server";

import type { LyricsResponse, SongSuggestion } from "@/types";

export async function fetchSongSuggestions(
  query: string
): Promise<SongSuggestion[]> {
  if (!query) return [];
  try {
    const res = await fetch(`https://api.lyrics.ovh/suggest/${query}`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.data.slice(0, 5); // Return top 5 suggestions
  } catch (error) {
    console.error("Failed to fetch song suggestions:", error);
    return [];
  }
}

export async function fetchLyrics(
  artist: string,
  title: string
): Promise<LyricsResponse | null> {
  try {
    const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Failed to fetch lyrics:", error);
    return null;
  }
}
