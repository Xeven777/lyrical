# LyricsVibe 🎵 — Lyrical cover card builder

LyricsVibe (repo: **lyrical**) is a small Next.js app for creating beautiful lyric cards from songs. Search for songs, fetch or edit lyrics, customize the look (background, overlay, typography), and export a shareable PNG — all in the browser. ✨

---

## 🚀 Features

- 🎧 Search songs with suggestions (powered by lyrics.ovh)
- 🧠 Fallback to Google Gemini (GenAI) for song details & lyrics when needed
- 🖼️ Background types: image, solid color, gradient
- 🎨 Overlay controls (solid or gradient) and filters (blur, brightness, grayscale)
- ✍️ Edit lyrics inline or select specific lines to display
- 🔠 Full typography controls (font size, weight, style, letter spacing, alignment)
- 🖼️ Show/hide album art and set cover radius
- 📸 Export a high-quality PNG of the lyric card (html-to-image)
- ✨ Live preview while customizing
- 🛠️ Manual song creation for testing and placeholders

---

## 🧩 Tech stack

- Next.js 16 (App Router)
- React 19
- Google GenAI (@google/genai) — optional, for improved song details and prompts
- html-to-image for export
- Tailwind / shadcn UI primitives

---

## 🛠️ Getting started (development)

> This project uses bun as the recommended package manager. If you prefer another package manager the scripts in `package.json` will still work.

1. Install dependencies

```bash
bun install
```

2. Create a `.env.local` file and add your Google GenAI API key (optional — only needed for Gemini features):

```bash
API_KEY=your_google_genai_api_key_here
```

3. Run the dev server

```bash
bun dev
# or
npm run dev
```

Open http://localhost:3000 in your browser.

---

## ⚙️ Environment variables

- `API_KEY` — (optional) Google GenAI API key. When present, LyricsVibe can use Gemini to fetch song details and provide richer fallback lyrics or image prompts.

> ⚠️ If `API_KEY` is not set the app will still work using lyrics.ovh for suggestions/lyrics and local placeholder data.

---

## 🧭 How to use

1. Type a query (song, artist or both) in the search box.
2. Pick a suggestion or press Enter to fetch details.
3. Edit or select lyric lines in the Content tab.
4. Tweak Background and Style tabs to customize the card.
5. Click Export to download a high-quality PNG.

---

## 📌 Roadmap / Future ideas

- [x] Basic search & suggestions via lyrics.ovh
- [x] Gemini fallback for richer data & prompt generation
- [x] Live preview + export to PNG
- [ ] Add social share options (Twitter, Mastodon, etc.)
- [ ] Add user presets & templates
- [ ] Allow upload of custom background images
- [ ] Add keyboard shortcuts for quick selection

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or PRs. A few ideas:

- Improve Gemini prompts and error handling
- Add more styling options or fonts
- Add tests and CI

---

If you find the project useful or have feature suggestions, please open an issue — I'd love to hear your ideas! 💡

Happy lyric-ing! 🎶
