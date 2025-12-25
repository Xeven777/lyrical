import React, { useState, useRef } from 'react';
import { Search, Download, AlignLeft, AlignCenter, AlignRight, Loader2, Music, Sparkles, Upload, Layout, ChevronDown, RefreshCw, AlignStartVertical, AlignCenterVertical, AlignEndVertical } from 'lucide-react';
import { SongData, CardSettings } from '../types';
import * as htmlToImage from 'html-to-image';
import { fetchSongDetails } from '@/actions/geminiService';
import { LyricCard } from '@/components/LyricCard';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'content' | 'bg' | 'style'>('content');
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [isEditingLyrics, setIsEditingLyrics] = useState(false);
  const [lyricsText, setLyricsText] = useState('');

  const [song, setSong] = useState<SongData | null>(null);
  const [settings, setSettings] = useState<CardSettings>({
    bgType: 'image',
    backgroundImage: null,
    backgroundColor: '#18181b',
    gradientColor1: '#4f46e5',
    gradientColor2: '#ec4899',
    gradientAngle: 135,
    bgBlur: 0,
    bgBrightness: 100,
    bgGrayscale: 0,

    overlayOpacity: 0.6,
    overlayColor: 'black',

    fontFamily: 'Inter',
    fontSize: 28,
    textAlign: 'left',
    textColor: '#ffffff',
    textOpacity: 1,
    fontWeight: 'extrabold',
    fontStyle: 'normal',
    letterSpacing: 0,
    lineHeight: 1.2,

    titleColor: '#ffffff',
    titleOpacity: 1,
    artistColor: '#ffffff',
    artistOpacity: 0.7,

    verticalAlign: 'bottom',
    showAlbumArt: true,
    borderRadius: 16,
    selectedLyricIndices: [],
  });

  const previewRef = useRef<HTMLDivElement>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsLoading(true);
    const result = await fetchSongDetails(query);
    if (result) {
      const lyricsArray = result.lyrics.split('\n').filter((line: string) => line.trim().length > 0);
      setSong({
        ...result,
        lyrics: lyricsArray,
        albumArtUrl: `https://picsum.photos/seed/${encodeURIComponent(result.album)}/400/400`
      });
      setLyricsText(result.lyrics);
      setSettings(prev => ({ ...prev, selectedLyricIndices: [] }));
      setActiveTab('content');
    }
    setIsLoading(false);
  };

  const handleManualCreate = () => {
    const emptySong = {
      title: "Song Title",
      artist: "Artist Name",
      album: "Album Name",
      lyrics: ["I was born to love you", "With every single beat of my heart"],
      albumArtUrl: "https://picsum.photos/seed/manual/400/400"
    };
    setSong(emptySong);
    setLyricsText(emptySong.lyrics.join('\n'));
    setSettings(prev => ({ ...prev, selectedLyricIndices: [0, 1] }));
    setActiveTab('content');
  }

  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSettings(prev => ({ ...prev, bgType: 'image', backgroundImage: event.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadImage = async () => {
    if (previewRef.current === null) return;
    try {
      const dataUrl = await htmlToImage.toPng(previewRef.current, { quality: 0.95, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `LyricVibe-${song?.title || 'Cover'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Download failed', err);
    }
  };

  const FONT_OPTIONS = [
    'Inter', 'Montserrat', 'Poppins', 'Raleway', 'Playfair Display', 'Lora', 'Crimson Text', 'JetBrains Mono', 'Dancing Script', 'Caveat'
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 md:p-8 flex flex-col items-center font-sans">
      <header className="w-full max-w-7xl flex justify-between items-center mb-8">
        <div className="flex items-center gap-3 select-none">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl shadow-lg shadow-purple-500/20">
            <Music className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-black tracking-tighter uppercase italic bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">LyricVibe</h1>
        </div>
        <button onClick={downloadImage} className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-full font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-white/10">
          <Download className="w-4 h-4" /> <span className="hidden md:inline">Export</span>
        </button>
      </header>

      <main className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 flex flex-col gap-6 order-2 lg:order-1">
          <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl flex gap-2">
            <form onSubmit={handleSearch} className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-zinc-500" />
              <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search song..." className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 focus:border-indigo-500 transition-colors outline-none text-sm" />
            </form>
            <button onClick={handleSearch} disabled={isLoading || !query} className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 rounded-xl font-medium transition-colors flex items-center justify-center min-w-[44px]">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>

          {!song ? (
            <div className="bg-zinc-900 border border-zinc-800 border-dashed rounded-2xl p-12 text-center flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center"><Sparkles className="w-8 h-8 text-zinc-500" /></div>
              <div><h3 className="text-xl font-bold">Start creating</h3><p className="text-zinc-400 text-sm mt-1">Search for a song or create manually.</p></div>
              <button onClick={handleManualCreate} className="text-sm font-semibold text-indigo-400 hover:text-indigo-300">Create Manually &rarr;</button>
            </div>
          ) : (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl flex flex-col h-full min-h-[600px]">
              <div className="flex border-b border-zinc-800">
                {(['content', 'bg', 'style'] as const).map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-4 text-sm font-semibold capitalize transition-all ${activeTab === tab ? 'bg-zinc-800 text-white border-b-2 border-indigo-500' : 'text-zinc-400 hover:text-white'}`}>
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
                {activeTab === 'content' && (
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Metadata Details</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" value={song.title} onChange={e => setSong({ ...song, title: e.target.value })} className="col-span-1 bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-sm outline-none focus:border-indigo-500" placeholder="Title" />
                        <input type="text" value={song.artist} onChange={e => setSong({ ...song, artist: e.target.value })} className="col-span-1 bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-sm outline-none focus:border-indigo-500" placeholder="Artist" />
                        <div className="col-span-2 flex gap-2">
                          <input type="text" value={song.album} onChange={e => setSong({ ...song, album: e.target.value })} className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-sm outline-none focus:border-indigo-500" placeholder="Album" />
                          <label className="bg-zinc-800 px-3 flex items-center rounded-lg cursor-pointer hover:bg-zinc-700">
                            <Upload className="w-4 h-4" /><input type="file" className="hidden" accept="image/*" onChange={e => {
                              const f = e.target.files?.[0];
                              if (f) { const r = new FileReader(); r.onload = ev => setSong({ ...song, albumArtUrl: ev.target?.result as string }); r.readAsDataURL(f); }
                            }} />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center"><h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Lyric Selection</h3><button onClick={() => setIsEditingLyrics(!isEditingLyrics)} className="text-xs text-indigo-400">{isEditingLyrics ? 'Save' : 'Edit Source'}</button></div>
                      {isEditingLyrics ? (
                        <textarea value={lyricsText} onChange={e => {
                          setLyricsText(e.target.value);
                          const l = e.target.value.split('\n').filter(x => x.trim());
                          setSong({ ...song, lyrics: l });
                        }} className="w-full h-64 bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm font-mono outline-none" />
                      ) : (
                        <div className="h-64 overflow-y-auto space-y-1 bg-zinc-950/30 rounded-xl p-2 border border-zinc-800">
                          {song.lyrics.map((line, idx) => (
                            <button key={idx} onClick={() => {
                              setSettings(s => ({ ...s, selectedLyricIndices: s.selectedLyricIndices.includes(idx) ? s.selectedLyricIndices.filter(i => i !== idx) : [...s.selectedLyricIndices, idx].sort((a, b) => a - b) }));
                            }} className={`w-full text-left p-2 rounded text-xs transition-colors ${settings.selectedLyricIndices.includes(idx) ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/50' : 'text-zinc-500 hover:bg-zinc-900 border border-transparent'}`}>
                              {line}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'bg' && (
                  <div className="space-y-8">
                    <div className="flex bg-zinc-950 p-1 rounded-xl">
                      {(['image', 'gradient', 'color'] as const).map(t => (
                        <button key={t} onClick={() => setSettings(s => ({ ...s, bgType: t }))} className={`flex-1 py-2 text-xs font-bold uppercase rounded-lg transition-all ${settings.bgType === t ? 'bg-zinc-800 text-white' : 'text-zinc-500'}`}>{t}</button>
                      ))}
                    </div>

                    {settings.bgType === 'image' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <label className="h-24 border-2 border-dashed border-zinc-700 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-900 transition-colors">
                            <Upload className="w-5 h-5 text-zinc-500" /><span className="text-[10px] mt-2">Upload</span>
                            <input type="file" className="hidden" accept="image/*" onChange={handleBgUpload} />
                          </label>
                          <button onClick={() => setSettings(s => ({ ...s, backgroundImage: `https://picsum.photos/seed/${Math.random()}/800/1200` }))} className="h-24 bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col items-center justify-center">
                            <RefreshCw className="w-5 h-5 text-zinc-500" /><span className="text-[10px] mt-2">Random</span>
                          </button>
                        </div>
                        <div className="space-y-4 pt-4 border-t border-zinc-800">
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs text-zinc-500">Blur</div>
                            <input type="range" min="0" max="40" value={settings.bgBlur} onChange={e => setSettings(s => ({ ...s, bgBlur: +e.target.value }))} className="w-full accent-indigo-500" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs text-zinc-500">Brightness</div>
                            <input type="range" min="0" max="200" value={settings.bgBrightness} onChange={e => setSettings(s => ({ ...s, bgBrightness: +e.target.value }))} className="w-full accent-indigo-500" />
                          </div>
                        </div>
                      </div>
                    )}

                    {settings.bgType === 'gradient' && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs text-zinc-500">Color 1</label>
                            <input type="color" value={settings.gradientColor1} onChange={e => setSettings(s => ({ ...s, gradientColor1: e.target.value }))} className="w-full h-10 rounded bg-transparent cursor-pointer" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs text-zinc-500">Color 2</label>
                            <input type="color" value={settings.gradientColor2} onChange={e => setSettings(s => ({ ...s, gradientColor2: e.target.value }))} className="w-full h-10 rounded bg-transparent cursor-pointer" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs text-zinc-500">Angle: {settings.gradientAngle}°</div>
                          <input type="range" min="0" max="360" value={settings.gradientAngle} onChange={e => setSettings(s => ({ ...s, gradientAngle: +e.target.value }))} className="w-full accent-indigo-500" />
                        </div>
                      </div>
                    )}

                    {settings.bgType === 'color' && (
                      <div className="space-y-2">
                        <label className="text-xs text-zinc-500">Background Color</label>
                        <div className="flex gap-2 items-center">
                          <input type="color" value={settings.backgroundColor} onChange={e => setSettings(s => ({ ...s, backgroundColor: e.target.value }))} className="w-12 h-12 rounded bg-transparent cursor-pointer" />
                          <input type="text" value={settings.backgroundColor} onChange={e => setSettings(s => ({ ...s, backgroundColor: e.target.value }))} className="bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-xs flex-1 font-mono outline-none" />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'style' && (
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Typography Library</h3>
                      <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                        {FONT_OPTIONS.map(f => (
                          <button key={f} onClick={() => setSettings(s => ({ ...s, fontFamily: f }))} className={`p-2 text-xs rounded border text-left transition-all ${settings.fontFamily === f ? 'bg-indigo-600 border-indigo-500' : 'bg-zinc-950 border-zinc-800 text-zinc-500'}`} style={{ fontFamily: f }}>{f}</button>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2"><div className="flex justify-between text-xs text-zinc-500">Size</div><input type="range" min="12" max="72" value={settings.fontSize} onChange={e => setSettings(s => ({ ...s, fontSize: +e.target.value }))} className="w-full accent-indigo-500" /></div>
                        <div className="space-y-2"><div className="flex justify-between text-xs text-zinc-500">Opacity</div><input type="range" min="0" max="1" step="0.1" value={settings.textOpacity} onChange={e => setSettings(s => ({ ...s, textOpacity: +e.target.value }))} className="w-full accent-indigo-500" /></div>
                        <div className="space-y-2"><div className="flex justify-between text-xs text-zinc-500">Spacing</div><input type="range" min="-0.1" max="0.5" step="0.01" value={settings.letterSpacing} onChange={e => setSettings(s => ({ ...s, letterSpacing: +e.target.value }))} className="w-full accent-indigo-500" /></div>
                        <div className="space-y-2"><div className="flex justify-between text-xs text-zinc-500">Line Height</div><input type="range" min="0.8" max="2" step="0.1" value={settings.lineHeight} onChange={e => setSettings(s => ({ ...s, lineHeight: +e.target.value }))} className="w-full accent-indigo-500" /></div>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-zinc-800">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Metadata Styling</h3>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex justify-between text-[10px] text-zinc-500 uppercase font-bold">Title Color</div>
                          <input type="color" value={settings.titleColor} onChange={e => setSettings(s => ({ ...s, titleColor: e.target.value }))} className="w-full h-8 rounded bg-transparent cursor-pointer" />
                          <input type="range" min="0" max="1" step="0.1" value={settings.titleOpacity} onChange={e => setSettings(s => ({ ...s, titleOpacity: +e.target.value }))} className="w-full accent-indigo-500" />
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between text-[10px] text-zinc-500 uppercase font-bold">Artist Color</div>
                          <input type="color" value={settings.artistColor} onChange={e => setSettings(s => ({ ...s, artistColor: e.target.value }))} className="w-full h-8 rounded bg-transparent cursor-pointer" />
                          <input type="range" min="0" max="1" step="0.1" value={settings.artistOpacity} onChange={e => setSettings(s => ({ ...s, artistOpacity: +e.target.value }))} className="w-full accent-indigo-500" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-zinc-800">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Alignment & Layout</h3>
                      <div className="flex gap-2">
                        {(['top', 'center', 'bottom'] as const).map(a => (
                          <button key={a} onClick={() => setSettings(s => ({ ...s, verticalAlign: a }))} className={`flex-1 py-2 rounded border flex items-center justify-center transition-all ${settings.verticalAlign === a ? 'bg-indigo-600 border-indigo-500' : 'bg-zinc-950 border-zinc-800 text-zinc-500'}`}>
                            {a === 'top' ? <AlignStartVertical className="w-4 h-4" /> : a === 'center' ? <AlignCenterVertical className="w-4 h-4" /> : <AlignEndVertical className="w-4 h-4" />}
                          </button>
                        ))}
                      </div>
                      <div className="flex gap-2 bg-zinc-950 p-1 rounded-lg">
                        {(['left', 'center', 'right'] as const).map(a => (
                          <button key={a} onClick={() => setSettings(s => ({ ...s, textAlign: a }))} className={`flex-1 py-1.5 rounded flex items-center justify-center ${settings.textAlign === a ? 'bg-zinc-800 text-white' : 'text-zinc-500'}`}>
                            {a === 'left' ? <AlignLeft className="w-4 h-4" /> : a === 'center' ? <AlignCenter className="w-4 h-4" /> : <AlignRight className="w-4 h-4" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-5 flex flex-col items-center order-1 lg:order-2 lg:sticky lg:top-8">
          <div className="w-full space-y-4">
            <div className="flex justify-center lg:justify-start items-center gap-2 mb-2"><Layout className="w-4 h-4 text-zinc-500" /><h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Live Preview</h2></div>
            <div className="flex justify-center w-full"><LyricCard song={song} settings={settings} previewRef={previewRef} /></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;