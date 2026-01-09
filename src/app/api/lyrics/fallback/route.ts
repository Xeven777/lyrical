import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { artist, title } = await request.json();

    if (!artist || !title) {
      return NextResponse.json(
        { error: "Missing artist or title" },
        { status: 400 }
      );
    }

    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      console.error("No API key found");
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    console.log(`[API] Fetching lyrics for "${title}" by "${artist}"`);

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: `Find and return the complete, accurate lyrics for the song "${title}" by "${artist}". 

IMPORTANT:
- Return ONLY the actual song lyrics
- Do NOT include any headers, titles, or explanations
- Do NOT include "Verse", "Chorus", "[Verse]", "[Chorus]" labels
- Each line of lyrics should be on a new line
- If you cannot find the lyrics, return "LYRICS_NOT_FOUND"`,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.3,
      },
    });

    const lyrics = response.text?.trim() || null;

    if (
      !lyrics ||
      lyrics === "LYRICS_NOT_FOUND" ||
      lyrics.includes("cannot find") ||
      lyrics.length < 20
    ) {
      console.log("[API] Gemini could not find valid lyrics");
      return NextResponse.json({ lyrics: null }, { status: 200 });
    }

    console.log("[API] Successfully fetched lyrics from Gemini");
    return NextResponse.json({ lyrics }, { status: 200 });
  } catch (error) {
    console.error("[API] Failed to fetch lyrics:", error);
    if (error instanceof Error) {
      console.error("[API] Error details:", error.message);
    }
    return NextResponse.json(
      { error: "Failed to fetch lyrics" },
      { status: 500 }
    );
  }
}
