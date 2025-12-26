export interface SongData {
  title: string;
  artist: string;
  album: string;
  lyrics: string[];
  albumArtUrl?: string;
}

export type BgType = "image" | "color" | "gradient";
export type VerticalAlign = "top" | "center" | "bottom";

export interface CardSettings {
  // Background
  bgType: BgType;
  backgroundImage: string | null;
  backgroundColor: string;
  gradientColor1: string;
  gradientColor2: string;
  gradientAngle: number;

  // Image Filters
  bgBlur: number;
  bgBrightness: number;
  bgGrayscale: number;

  // Overlay
  overlayOpacity: number;
  overlayColor: string;
  overlayType: "solid" | "gradient";
  overlayGradientColor1: string;
  overlayGradientColor2: string;
  overlayGradientAngle: number;

  // Typography - General
  fontFamily: string;
  fontSize: number;
  textAlign: "left" | "center" | "right";
  textColor: string;
  textOpacity: number;
  fontWeight: "normal" | "bold" | "extrabold";
  fontStyle: "normal" | "italic";
  letterSpacing: number;
  lineHeight: number;

  // Metadata Specific Styling
  titleColor: string;
  titleOpacity: number;
  artistColor: string;
  artistOpacity: number;

  // Layout
  verticalAlign: VerticalAlign;
  showAlbumArt: boolean;
  borderRadius: number;

  // Data
  selectedLyricIndices: number[];
}

export interface GeminiLyricResponse {
  title: string;
  artist: string;
  album?: string;
  lyrics: string;
}
