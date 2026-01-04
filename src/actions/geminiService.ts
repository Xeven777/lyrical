"use server";

import { GoogleGenAI, Type } from "@google/genai";
import type { GeminiLyricResponse } from "@/types";

export const fetchSongDetails = async (
  query: string
): Promise<GeminiLyricResponse | null> => {
  "use cache";
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Search for song details and full lyrics for: "${query}". Provide the response in valid JSON format. try to find in https://www.azlyrics.com/ or https://genius.com/ if possible.`,
      config: {
        tools: [{ urlContext: {} }, { googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            artist: { type: Type.STRING },
            album: { type: Type.STRING },
            lyrics: {
              type: Type.STRING,
              description:
                "The full lyrics of the song, separated by newlines.",
            },
          },
          required: ["title", "artist", "lyrics"],
        },
      },
    });

    const data = JSON.parse(response.text || "{}");
    return data as GeminiLyricResponse;
  } catch (error) {
    console.error("Error fetching song details from Gemini:", error);
    return null;
  }
};

export const generateImagePrompt = async (songInfo: {
  title: string;
  artist: string;
}): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a short, vivid aesthetic image description for a background of a lyric card based on the song "${songInfo.title}" by "${songInfo.artist}". Focus on mood and style. Keep it under 50 words.`,
    });
    return response.text || `Abstract aesthetic mood for ${songInfo.title}`;
  } catch (_e) {
    return `Aesthetic background for ${songInfo.title}`;
  }
};
