export interface SongData {
  title: string;
  artist: string;
  album: string;
  lyrics: string[];
  albumArtUrl?: string;
}

export type BgType = "image" | "color" | "gradient";
export type VerticalAlign = "top" | "center" | "bottom";

export interface Artist {
  id: number;
  name: string;
  link: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  tracklist: string;
  type: string;
}

export interface Album {
  id: number;
  title: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  md5_image: string;
  tracklist: string;
  type: string;
}

export interface SongSuggestion {
  id: number;
  readable: boolean;
  title: string;
  title_short: string;
  title_version: string;
  link: string;
  duration: number;
  rank: number;
  explicit_lyrics: boolean;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  preview: string;
  md5_image: string;
  artist: Artist;
  album: Album;
  type: string;
}

export interface LyricsResponse {
  lyrics: string;
}

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
  overlayOpacityStart: number;
  overlayOpacityEnd: number;
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
