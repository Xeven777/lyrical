import { GoogleGenAI } from "@google/genai";
import type { LyricsResponse, SongSuggestion } from "@/types";

export async function fetchSongSuggestions(
  query: string
): Promise<SongSuggestion[]> {
  if (!query) return [];
  try {
    const res = await fetch(`https://api.lyrics.ovh/suggest/${query}`, {
      cache: "force-cache",
      next: {
        revalidate: 86400 * 2,
      },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data.slice(0, 12);
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
    const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`, {
      cache: "force-cache",
      next: {
        revalidate: 86400 * 2,
      },
    });
    if (res.ok) {
      return res.json();
    }
  } catch (error) {
    console.error("Failed to fetch lyrics from lyrics.ovh:", error);
  }

  // If lyrics.ovh fails, fallback to Gemini API
  console.log("Falling back to Gemini API for lyrics...");
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Get the full lyrics for the song "${title}" by "${artist}". Return only the lyrics in plain text format without any additional information.`,
      config: {
        tools: [{ urlContext: {} }, { googleSearch: {} }],
      },
    });

    const lyrics = response.text || null;
    if (lyrics) {
      return { lyrics };
    }
  } catch (error) {
    console.error("Failed to fetch lyrics from Gemini API:", error);
  }

  return null;
}
