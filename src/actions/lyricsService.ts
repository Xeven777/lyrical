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
    return data.data.slice(0, 15);
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
      const data = await res.json();
      // Check if the response contains the "No lyrics found" error
      if (data.lyrics && data.lyrics !== "No lyrics found") {
        return data;
      }
    }
  } catch (error) {
    console.error("Failed to fetch lyrics from lyrics.ovh:", error);
  }

  // If lyrics.ovh fails or returns "No lyrics found", fallback to Gemini API
  console.log("No lyrics found in lyrics.ovh, falling back to Gemini API...");
  return fallbackToGeminiLyrics(artist, title);
}

async function fallbackToGeminiLyrics(
  artist: string,
  title: string
): Promise<LyricsResponse | null> {
  console.log(`Attempting Gemini fallback for "${title}" by "${artist}"`);

  try {
    console.log("Calling Gemini fallback API endpoint...");
    const response = await fetch("/api/lyrics/fallback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ artist, title }),
    });

    if (!response.ok) {
      console.error("API request failed:", response.status);
      return null;
    }

    const data = await response.json();

    if (!data.lyrics) {
      console.log("API returned no lyrics");
      return null;
    }

    console.log("Successfully fetched lyrics from Gemini API");
    return { lyrics: data.lyrics };
  } catch (error) {
    console.error("Failed to call Gemini fallback API:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
    }
    return null;
  }
}
