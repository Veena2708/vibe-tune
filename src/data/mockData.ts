import type { Song, Artist, Album, Playlist, ListeningRoom, ListeningInsightsData } from '../types';

export const MOCK_ARTISTS: Artist[] = [
  {
    id: 'art-1',
    name: 'Luna Eclipse',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    genre: 'Lo-Fi',
    followers: 142000,
    bio: 'Pioneer of atmospheric lo-fi beats, blending vinyl crackles with soothing piano textures for deep focus and late-night coding.',
    popularTrackIds: ['s1', 's2', 's3']
  },
  {
    id: 'art-2',
    name: 'Kaelen Vibe',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
    genre: 'Synthwave',
    followers: 289000,
    bio: 'Crafting retro-futuristic synth soundscapes driven by 80s arpeggios and neon pulse basslines.',
    popularTrackIds: ['s4', 's5', 's6']
  },
  {
    id: 'art-3',
    name: 'Aura Wave',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    genre: 'Chillhop',
    followers: 98000,
    bio: 'Warm organic guitar loops layered with gentle hip-hop grooves for rainy afternoons.',
    popularTrackIds: ['s7', 's8', 's9']
  },
  {
    id: 'art-4',
    name: 'CyberPulse',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    genre: 'Cyberpunk',
    followers: 350000,
    bio: 'High-octane industrial electronic beats designed for peak workout motivation and futuristic gaming.',
    popularTrackIds: ['s10', 's11', 's12']
  },
  {
    id: 'art-5',
    name: 'Serenade Sol',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80',
    genre: 'Neo-Classical',
    followers: 88000,
    bio: 'Minimalist solo piano compositions combined with subtle ambient string pads.',
    popularTrackIds: ['s13', 's14', 's15']
  },
  {
    id: 'art-6',
    name: 'Starlight Echo',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    genre: 'Ambient',
    followers: 175000,
    bio: 'Ethereal drone textures and cosmic reverb space music engineered for relaxation and meditation.',
    popularTrackIds: ['s16', 's17']
  },
  {
    id: 'art-7',
    name: 'Velvet Echoes',
    avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    genre: 'Indie Pop',
    followers: 210000,
    bio: 'Dreamy vocals over shimmering chorus guitars and groove-heavy bass rhythms.',
    popularTrackIds: ['s18', 's19', 's20']
  },
  {
    id: 'art-8',
    name: 'Neon Drift',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1200&q=80',
    genre: 'Synthwave',
    followers: 165000,
    bio: 'Driving midnight synth rhythms tailor-made for open highway night cruises.',
    popularTrackIds: ['s21', 's22']
  },
  {
    id: 'art-9',
    name: 'ZenITH',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    genre: 'Ambient',
    followers: 120000,
    bio: '432Hz harmonic soundscapes and Tibetan singing bowl resonances.',
    popularTrackIds: ['s23', 's24']
  },
  {
    id: 'art-10',
    name: 'Polaris Frequency',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    genre: 'Deep House',
    followers: 310000,
    bio: 'Hypnotic deep house grooves with warm analog basslines and subtle vocal chops.',
    popularTrackIds: ['s25', 's26']
  },
  {
    id: 'art-11',
    name: 'Solstice Glow',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    genre: 'Lo-Fi',
    followers: 79000,
    bio: 'Subtle jazzy chords and coffee shop ambiance.',
    popularTrackIds: ['s27']
  },
  {
    id: 'art-12',
    name: 'Astral Bloom',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    genre: 'Neo-Classical',
    followers: 64000,
    bio: 'Modern orchestral ambient soundscapes for contemplative study.',
    popularTrackIds: ['s28']
  },
  {
    id: 'art-13',
    name: 'Echo Realm',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    genre: 'Cyberpunk',
    followers: 190000,
    bio: 'Heavy glitch industrial electronic textures.',
    popularTrackIds: ['s29']
  },
  {
    id: 'art-14',
    name: 'Prism Phase',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    genre: 'Deep House',
    followers: 145000,
    bio: 'Melodic progressive deep house for sunset parties.',
    popularTrackIds: ['s30']
  },
  {
    id: 'art-15',
    name: 'Vapor Drift',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    genre: 'Chillhop',
    followers: 112000,
    bio: 'Retro cassette vibes meets modern laidback chillhop.',
    popularTrackIds: ['s31']
  }
];

export const MOCK_ALBUMS: Album[] = [
  {
    id: 'alb-1',
    title: 'Midnight Reflections',
    artist: 'Luna Eclipse',
    artistId: 'art-1',
    coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    releaseYear: 2024,
    trackIds: ['s1', 's2', 's3'],
    genre: 'Lo-Fi'
  },
  {
    id: 'alb-2',
    title: 'Neon Horizon',
    artist: 'Kaelen Vibe',
    artistId: 'art-2',
    coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80',
    releaseYear: 2024,
    trackIds: ['s4', 's5', 's6'],
    genre: 'Synthwave'
  },
  {
    id: 'alb-3',
    title: 'Rainy Afternoon Sessions',
    artist: 'Aura Wave',
    artistId: 'art-3',
    coverUrl: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=600&q=80',
    releaseYear: 2023,
    trackIds: ['s7', 's8', 's9'],
    genre: 'Chillhop'
  },
  {
    id: 'alb-4',
    title: 'Overclocked Reality',
    artist: 'CyberPulse',
    artistId: 'art-4',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
    releaseYear: 2024,
    trackIds: ['s10', 's11', 's12'],
    genre: 'Cyberpunk'
  },
  {
    id: 'alb-5',
    title: 'Quiet Sanctuary',
    artist: 'Serenade Sol',
    artistId: 'art-5',
    coverUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=600&q=80',
    releaseYear: 2023,
    trackIds: ['s13', 's14', 's15'],
    genre: 'Neo-Classical'
  },
  {
    id: 'alb-6',
    title: 'Cosmic Resonance',
    artist: 'Starlight Echo',
    artistId: 'art-6',
    coverUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    releaseYear: 2024,
    trackIds: ['s16', 's17'],
    genre: 'Ambient'
  },
  {
    id: 'alb-7',
    title: 'Shimmering Waves',
    artist: 'Velvet Echoes',
    artistId: 'art-7',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80',
    releaseYear: 2024,
    trackIds: ['s18', 's19', 's20'],
    genre: 'Indie Pop'
  },
  {
    id: 'alb-8',
    title: 'Highway 2:00 AM',
    artist: 'Neon Drift',
    artistId: 'art-8',
    coverUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80',
    releaseYear: 2024,
    trackIds: ['s21', 's22'],
    genre: 'Synthwave'
  },
  {
    id: 'alb-9',
    title: 'Mindfulness Symphony',
    artist: 'ZenITH',
    artistId: 'art-9',
    coverUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    releaseYear: 2023,
    trackIds: ['s23', 's24'],
    genre: 'Ambient'
  },
  {
    id: 'alb-10',
    title: 'Deep Midnight Horizon',
    artist: 'Polaris Frequency',
    artistId: 'art-10',
    coverUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
    releaseYear: 2024,
    trackIds: ['s25', 's26'],
    genre: 'Deep House'
  }
];

export const MOCK_SONGS: Song[] = [
  {
    id: 's1',
    title: 'Starlit Coffee Beats',
    artist: 'Luna Eclipse',
    artistId: 'art-1',
    album: 'Midnight Reflections',
    albumId: 'alb-1',
    coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    duration: 372,
    genre: 'Lo-Fi',
    mood: 'Focus',
    bpm: 82,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    moodScores: { energy: 38, happiness: 65, calmness: 88, focus: 94 },
    lyrics: [
      '[00:10] Steam rises gently from the ceramic cup',
      '[00:30] Soft rain outside, urban lights warming up',
      '[01:00] Piano chords lingering in midnight air',
      '[01:30] Focus deepens without a single care',
      '[02:30] Gentle vinyl crackle fades into quiet bliss'
    ],
    releaseDate: '2024-01-15',
    playCount: 489200,
    isLiked: true
  },
  {
    id: 's2',
    title: 'Subtle Rain & Vinyl',
    artist: 'Luna Eclipse',
    artistId: 'art-1',
    album: 'Midnight Reflections',
    albumId: 'alb-1',
    coverUrl: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=600&q=80',
    duration: 424,
    genre: 'Lo-Fi',
    mood: 'Rainy',
    bpm: 78,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    moodScores: { energy: 28, happiness: 52, calmness: 95, focus: 89 },
    lyrics: [
      '[00:15] Raindrops falling on the window pane',
      '[00:45] Whispers of melody washing off the strain',
      '[01:20] Low bass resonance, soft electric keys',
      '[02:10] Floating through thoughts like a summer breeze'
    ],
    releaseDate: '2024-02-01',
    playCount: 312000,
    isLiked: false
  },
  {
    id: 's3',
    title: 'Code at 3 AM',
    artist: 'Luna Eclipse',
    artistId: 'art-1',
    album: 'Midnight Reflections',
    albumId: 'alb-1',
    coverUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    duration: 350,
    genre: 'Lo-Fi',
    mood: 'Focus',
    bpm: 85,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    moodScores: { energy: 45, happiness: 58, calmness: 82, focus: 96 },
    lyrics: [
      '[00:20] Terminal glowing in a darkened room',
      '[00:50] Code lines flowing, dispelling all the gloom',
      '[01:30] Rhythmic pulse keeping time with the keystrokes',
      '[02:40] Eureka moment as the morning dawns'
    ],
    releaseDate: '2024-02-20',
    playCount: 654000,
    isLiked: true
  },
  {
    id: 's4',
    title: 'Cyberpunk Drive',
    artist: 'Kaelen Vibe',
    artistId: 'art-2',
    album: 'Neon Horizon',
    albumId: 'alb-2',
    coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80',
    duration: 302,
    genre: 'Synthwave',
    mood: 'Night Drive',
    bpm: 118,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    moodScores: { energy: 86, happiness: 72, calmness: 42, focus: 78 },
    lyrics: [
      '[00:15] Neon lights reflection on the wet highway',
      '[00:45] Speeding through the grid into the yesterday',
      '[01:15] Analog synths roaring through the night',
      '[02:00] Endless electric horizon shining bright'
    ],
    releaseDate: '2024-03-10',
    playCount: 890000,
    isLiked: true
  },
  {
    id: 's5',
    title: 'Retro Grid 1988',
    artist: 'Kaelen Vibe',
    artistId: 'art-2',
    album: 'Neon Horizon',
    albumId: 'alb-2',
    coverUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80',
    duration: 388,
    genre: 'Synthwave',
    mood: 'Energy',
    bpm: 124,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    moodScores: { energy: 91, happiness: 80, calmness: 30, focus: 68 },
    lyrics: [
      '[00:10] Laser pulses cut through vector space',
      '[00:40] Feel the voltage surge, accelerate the pace',
      '[01:20] Synth basslines throbbing in 16th notes',
      '[02:15] Electric dreams floating in retro boats'
    ],
    releaseDate: '2024-03-15',
    playCount: 420000,
    isLiked: false
  },
  {
    id: 's6',
    title: 'Neon Skyline',
    artist: 'Kaelen Vibe',
    artistId: 'art-2',
    album: 'Neon Horizon',
    albumId: 'alb-2',
    coverUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    duration: 320,
    genre: 'Synthwave',
    mood: 'Night Drive',
    bpm: 112,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    moodScores: { energy: 82, happiness: 75, calmness: 50, focus: 80 },
    lyrics: [
      '[00:12] High above the city towers glowing purple pink',
      '[00:50] Synthesizer arpeggios synchronized in sync',
      '[01:30] Cruising at midnight with nowhere to be',
      '[02:20] Pure electronic serenity setting us free'
    ],
    releaseDate: '2024-04-01',
    playCount: 512000,
    isLiked: true
  },
  {
    id: 's7',
    title: 'Lo-Fi Warmth',
    artist: 'Aura Wave',
    artistId: 'art-3',
    album: 'Rainy Afternoon Sessions',
    albumId: 'alb-3',
    coverUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
    duration: 295,
    genre: 'Chillhop',
    mood: 'Chill',
    bpm: 75,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    moodScores: { energy: 32, happiness: 78, calmness: 92, focus: 84 },
    lyrics: [
      '[00:10] Warm acoustic chords over a lazy snare',
      '[00:35] Sunshine slipping through the afternoon air',
      '[01:10] Sip hot tea and let the melody unwind',
      '[01:50] Peace of mind is the greatest gem to find'
    ],
    releaseDate: '2023-11-12',
    playCount: 230000,
    isLiked: false
  },
  {
    id: 's8',
    title: 'Autumn Leaves & Tea',
    artist: 'Aura Wave',
    artistId: 'art-3',
    album: 'Rainy Afternoon Sessions',
    albumId: 'alb-3',
    coverUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    duration: 360,
    genre: 'Chillhop',
    mood: 'Chill',
    bpm: 80,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    moodScores: { energy: 35, happiness: 82, calmness: 90, focus: 85 },
    lyrics: [
      '[00:15] Golden leaves rustling outside the porch',
      '[00:45] Acoustic vibes lighting up like a gentle torch',
      '[01:25] Soft rimshots keeping effortless rhythm',
      '[02:05] Wrapped in cozy soundscapes from within'
    ],
    releaseDate: '2023-11-20',
    playCount: 198000,
    isLiked: true
  },
  {
    id: 's9',
    title: 'Window Pane Reverie',
    artist: 'Aura Wave',
    artistId: 'art-3',
    album: 'Rainy Afternoon Sessions',
    albumId: 'alb-3',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    duration: 410,
    genre: 'Chillhop',
    mood: 'Rainy',
    bpm: 76,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    moodScores: { energy: 25, happiness: 60, calmness: 96, focus: 91 },
    lyrics: [
      '[00:10] Soft rain tapping a melancholy song',
      '[00:40] Warm fender rhodes chords carrying along',
      '[01:20] Watching droplets race down clear glass',
      '[02:00] Knowing every storm will eventually pass'
    ],
    releaseDate: '2023-12-05',
    playCount: 340000,
    isLiked: false
  },
  {
    id: 's10',
    title: 'Overclock Thrill',
    artist: 'CyberPulse',
    artistId: 'art-4',
    album: 'Overclocked Reality',
    albumId: 'alb-4',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
    duration: 375,
    genre: 'Cyberpunk',
    mood: 'Workout',
    bpm: 140,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    moodScores: { energy: 98, happiness: 65, calmness: 15, focus: 75 },
    lyrics: [
      '[00:15] Pushing limiters into red zone power',
      '[00:45] Pumping adrenaline hour after hour',
      '[01:30] Heavy distortion synth stabs hitting hard',
      '[02:30] Break every barrier, push through the guard'
    ],
    releaseDate: '2024-01-20',
    playCount: 940000,
    isLiked: true
  },
  {
    id: 's11',
    title: 'Hyperdrive Surge',
    artist: 'CyberPulse',
    artistId: 'art-4',
    album: 'Overclocked Reality',
    albumId: 'alb-4',
    coverUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    duration: 330,
    genre: 'Cyberpunk',
    mood: 'Energy',
    bpm: 138,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
    moodScores: { energy: 95, happiness: 70, calmness: 20, focus: 70 },
    lyrics: [
      '[00:10] System overload, ignition initiated',
      '[00:40] Maximum velocity state activated',
      '[01:20] Bass dropping like an electric shock wave',
      '[02:00] Victory belongs to the relentless and brave'
    ],
    releaseDate: '2024-02-14',
    playCount: 710000,
    isLiked: false
  },
  {
    id: 's12',
    title: 'Neon Warzone',
    artist: 'CyberPulse',
    artistId: 'art-4',
    album: 'Overclocked Reality',
    albumId: 'alb-4',
    coverUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    duration: 290,
    genre: 'Cyberpunk',
    mood: 'Workout',
    bpm: 145,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
    moodScores: { energy: 99, happiness: 55, calmness: 10, focus: 78 },
    lyrics: [
      '[00:20] Industrial kicks echoing down dark alleyways',
      '[01:00] Cybernetic enhancement powering up the blaze',
      '[01:45] Unstoppable energy driving every pulse',
      '[02:25] Leave defeat behind in zero gravity vaults'
    ],
    releaseDate: '2024-02-28',
    playCount: 830000,
    isLiked: true
  },
  {
    id: 's13',
    title: 'Silent Dawn Piano',
    artist: 'Serenade Sol',
    artistId: 'art-5',
    album: 'Quiet Sanctuary',
    albumId: 'alb-5',
    coverUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=600&q=80',
    duration: 440,
    genre: 'Neo-Classical',
    mood: 'Meditation',
    bpm: 65,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3',
    moodScores: { energy: 20, happiness: 75, calmness: 98, focus: 92 },
    lyrics: [
      '[00:20] First light of morning breaking soft and clear',
      '[01:00] Minimal piano notes echoing so near',
      '[01:50] Gentle cello backing holding peaceful ground',
      '[02:40] Silence transformed into sacred sound'
    ],
    releaseDate: '2023-09-10',
    playCount: 410000,
    isLiked: true
  },
  {
    id: 's14',
    title: 'Ethereal Sanctuary',
    artist: 'Serenade Sol',
    artistId: 'art-5',
    album: 'Quiet Sanctuary',
    albumId: 'alb-5',
    coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    duration: 390,
    genre: 'Neo-Classical',
    mood: 'Meditation',
    bpm: 60,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3',
    moodScores: { energy: 15, happiness: 70, calmness: 99, focus: 95 },
    lyrics: [
      '[00:30] Breathe in tranquility, release all tension',
      '[01:15] Harmony expanding into higher dimension',
      '[02:10] Soft felt piano keys floating softly away',
      '[03:30] Finding inner peace at the end of day'
    ],
    releaseDate: '2023-10-01',
    playCount: 290000,
    isLiked: false
  },
  {
    id: 's15',
    title: 'Nocturne in Purple',
    artist: 'Serenade Sol',
    artistId: 'art-5',
    album: 'Quiet Sanctuary',
    albumId: 'alb-5',
    coverUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    duration: 345,
    genre: 'Neo-Classical',
    mood: 'Focus',
    bpm: 70,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3',
    moodScores: { energy: 25, happiness: 65, calmness: 94, focus: 97 },
    lyrics: [
      '[00:15] Twilight hues settling on quiet keys',
      '[00:55] Soft arpeggios floating like autumn leaves',
      '[01:40] Solitude embraced in harmonic grace',
      '[02:20] Time slows down in this timeless space'
    ],
    releaseDate: '2023-10-20',
    playCount: 380000,
    isLiked: true
  },
  {
    id: 's16',
    title: 'Deep Space Drone',
    artist: 'Starlight Echo',
    artistId: 'art-6',
    album: 'Cosmic Resonance',
    albumId: 'alb-6',
    coverUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    duration: 412,
    genre: 'Ambient',
    mood: 'Meditation',
    bpm: 55,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3',
    moodScores: { energy: 10, happiness: 60, calmness: 100, focus: 90 },
    lyrics: [
      '[00:30] Drift beyond the stars into infinite void',
      '[01:30] Ambient warmth shielding from noise destroyed',
      '[02:40] Cosmic frequencies aligning heart and soul',
      '[04:00] Universal harmony making mind whole'
    ],
    releaseDate: '2024-01-05',
    playCount: 520000,
    isLiked: true
  },
  {
    id: 's17',
    title: 'Weightless Drift',
    artist: 'Starlight Echo',
    artistId: 'art-6',
    album: 'Cosmic Resonance',
    albumId: 'alb-6',
    coverUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    duration: 372,
    genre: 'Ambient',
    mood: 'Meditation',
    bpm: 50,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    moodScores: { energy: 12, happiness: 68, calmness: 98, focus: 88 },
    lyrics: [
      '[00:20] Floating light as air on cosmic waves',
      '[01:10] Sound bath washing away what stress craves',
      '[02:20] Soft shimmer of celestial reverberation',
      '[03:40] Deep restoration and peace manifestation'
    ],
    releaseDate: '2024-01-25',
    playCount: 275000,
    isLiked: false
  },
  {
    id: 's18',
    title: 'Midnight Call',
    artist: 'Velvet Echoes',
    artistId: 'art-7',
    album: 'Shimmering Waves',
    albumId: 'alb-7',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80',
    duration: 424,
    genre: 'Indie Pop',
    mood: 'Party',
    bpm: 115,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    moodScores: { energy: 85, happiness: 90, calmness: 35, focus: 60 },
    lyrics: [
      '[00:15] Ringing my phone at twelve past midnight',
      '[00:40] City lights flashing under purple neon light',
      '[01:10] Dancing in the living room till sun comes up',
      '[01:45] Pouring good vibes into every cup'
    ],
    releaseDate: '2024-02-10',
    playCount: 680000,
    isLiked: true
  },
  {
    id: 's19',
    title: 'Summer Glow',
    artist: 'Velvet Echoes',
    artistId: 'art-7',
    album: 'Shimmering Waves',
    albumId: 'alb-7',
    coverUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
    duration: 350,
    genre: 'Indie Pop',
    mood: 'Energy',
    bpm: 110,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    moodScores: { energy: 80, happiness: 92, calmness: 45, focus: 65 },
    lyrics: [
      '[00:12] Golden hour sunlight shining on your face',
      '[00:42] Catching golden memories in this magic space',
      '[01:15] Groovy bassline riding with a catchy chorus line',
      '[01:50] Everything is feeling exceptionally fine'
    ],
    releaseDate: '2024-02-25',
    playCount: 540000,
    isLiked: false
  },
  {
    id: 's20',
    title: 'Velvet Horizon',
    artist: 'Velvet Echoes',
    artistId: 'art-7',
    album: 'Shimmering Waves',
    albumId: 'alb-7',
    coverUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80',
    duration: 302,
    genre: 'Indie Pop',
    mood: 'Chill',
    bpm: 102,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    moodScores: { energy: 65, happiness: 85, calmness: 60, focus: 72 },
    lyrics: [
      '[00:14] Soft vocal harmonies floating over breeze',
      '[00:48] Watching ocean waves with tranquil ease',
      '[01:25] Electric guitar licks painting colors bright',
      '[02:05] Wrapped in velvet melody into the night'
    ],
    releaseDate: '2024-03-05',
    playCount: 390000,
    isLiked: true
  },
  {
    id: 's21',
    title: 'Midnight Cruiser',
    artist: 'Neon Drift',
    artistId: 'art-8',
    album: 'Highway 2:00 AM',
    albumId: 'alb-8',
    coverUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80',
    duration: 388,
    genre: 'Synthwave',
    mood: 'Night Drive',
    bpm: 116,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    moodScores: { energy: 84, happiness: 70, calmness: 48, focus: 82 },
    lyrics: [
      '[00:15] Tachometer climbing on empty interstate',
      '[00:50] Synthesizers weaving atmospheric fate',
      '[01:30] Cool night breeze blowing through open door',
      '[02:10] Music taking control forevermore'
    ],
    releaseDate: '2024-01-18',
    playCount: 620000,
    isLiked: true
  },
  {
    id: 's22',
    title: 'Coastline 101',
    artist: 'Neon Drift',
    artistId: 'art-8',
    album: 'Highway 2:00 AM',
    albumId: 'alb-8',
    coverUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80',
    duration: 320,
    genre: 'Synthwave',
    mood: 'Night Drive',
    bpm: 114,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    moodScores: { energy: 78, happiness: 74, calmness: 55, focus: 79 },
    lyrics: [
      '[00:12] Pacific breeze mixing with analog heat',
      '[00:45] Retro pulse guiding your driving beat',
      '[01:20] City lights dissolving in side mirrors far',
      '[02:00] Underneath a million shining silver stars'
    ],
    releaseDate: '2024-02-05',
    playCount: 470000,
    isLiked: false
  },
  {
    id: 's23',
    title: '432Hz Serenity',
    artist: 'ZenITH',
    artistId: 'art-9',
    album: 'Mindfulness Symphony',
    albumId: 'alb-9',
    coverUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    duration: 295,
    genre: 'Ambient',
    mood: 'Meditation',
    bpm: 48,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    moodScores: { energy: 10, happiness: 65, calmness: 100, focus: 92 },
    lyrics: [
      '[00:40] Tuning mind and body into golden ratio',
      '[01:40] Pure sine wave frequencies in steady flow',
      '[03:00] Deep breathing expanding inner sanctuary',
      '[04:30] Peace beyond words, serene and visionary'
    ],
    releaseDate: '2023-08-15',
    playCount: 780000,
    isLiked: true
  },
  {
    id: 's24',
    title: 'Tibetan Sound Bath',
    artist: 'ZenITH',
    artistId: 'art-9',
    album: 'Mindfulness Symphony',
    albumId: 'alb-9',
    coverUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    duration: 360,
    genre: 'Ambient',
    mood: 'Meditation',
    bpm: 52,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    moodScores: { energy: 14, happiness: 60, calmness: 99, focus: 88 },
    lyrics: [
      '[00:30] Singing bowls ringing over mountain air',
      '[01:30] Releasing all worries, doubts, and care',
      '[02:50] Resonance echoing through silent space',
      '[04:10] Grounded in presence and absolute grace'
    ],
    releaseDate: '2023-09-01',
    playCount: 430000,
    isLiked: false
  },
  {
    id: 's25',
    title: 'Deep Oasis Pulse',
    artist: 'Polaris Frequency',
    artistId: 'art-10',
    album: 'Deep Midnight Horizon',
    albumId: 'alb-10',
    coverUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
    duration: 410,
    genre: 'Deep House',
    mood: 'Party',
    bpm: 122,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    moodScores: { energy: 88, happiness: 85, calmness: 40, focus: 75 },
    lyrics: [
      '[00:20] Four-on-the-floor kick drumming steady deep',
      '[01:00] Hypnotic chords lulling worries into sleep',
      '[01:50] Vocal chop looping under amber lights',
      '[02:40] Lose track of time on euphoric club nights'
    ],
    releaseDate: '2024-01-30',
    playCount: 860000,
    isLiked: true
  },
  {
    id: 's26',
    title: 'Sunset Rooftop Groove',
    artist: 'Polaris Frequency',
    artistId: 'art-10',
    album: 'Deep Midnight Horizon',
    albumId: 'alb-10',
    coverUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    duration: 375,
    genre: 'Deep House',
    mood: 'Party',
    bpm: 120,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    moodScores: { energy: 84, happiness: 88, calmness: 45, focus: 70 },
    lyrics: [
      '[00:15] Warm sunset breeze over city roof tops',
      '[00:55] Rhythmic bass drop that never ever stops',
      '[01:40] Clapping hands together in unified rhythm',
      '[02:20] Pure summer happiness dwelling within'
    ],
    releaseDate: '2024-02-18',
    playCount: 590000,
    isLiked: false
  },
  {
    id: 's27',
    title: 'Café Morning Brew',
    artist: 'Solstice Glow',
    artistId: 'art-11',
    album: 'Midnight Reflections',
    albumId: 'alb-1',
    coverUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80',
    duration: 330,
    genre: 'Lo-Fi',
    mood: 'Chill',
    bpm: 76,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
    moodScores: { energy: 35, happiness: 80, calmness: 91, focus: 86 },
    lyrics: [
      '[00:10] Morning espresso and quiet newspaper pages',
      '[00:40] Jazzy guitar chords timeless through ages',
      '[01:15] Sunshine warming up the wooden floor',
      '[01:45] Ready for whatever life has in store'
    ],
    releaseDate: '2024-03-12',
    playCount: 210000,
    isLiked: true
  },
  {
    id: 's28',
    title: 'Constellation Suite',
    artist: 'Astral Bloom',
    artistId: 'art-12',
    album: 'Quiet Sanctuary',
    albumId: 'alb-5',
    coverUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    duration: 290,
    genre: 'Neo-Classical',
    mood: 'Focus',
    bpm: 68,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
    moodScores: { energy: 22, happiness: 65, calmness: 93, focus: 98 },
    lyrics: [
      '[00:30] Orchestral swells painting galaxies bright',
      '[01:20] Violins dancing in gentle starlight',
      '[02:20] Deep focus state unlocking new thought',
      '[03:40] Finding answers that were long sought'
    ],
    releaseDate: '2024-02-11',
    playCount: 315000,
    isLiked: false
  },
  {
    id: 's29',
    title: 'Glitch Matrix Overdrive',
    artist: 'Echo Realm',
    artistId: 'art-13',
    album: 'Overclocked Reality',
    albumId: 'alb-4',
    coverUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    duration: 440,
    genre: 'Cyberpunk',
    mood: 'Workout',
    bpm: 142,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3',
    moodScores: { energy: 97, happiness: 58, calmness: 12, focus: 80 },
    lyrics: [
      '[00:15] Glitch code executing through copper wire',
      '[00:45] Fueling the workout with inner electronic fire',
      '[01:30] Break through resistance, shatter the wall',
      '[02:10] Cybernetic power answering the call'
    ],
    releaseDate: '2024-03-01',
    playCount: 780000,
    isLiked: true
  },
  {
    id: 's30',
    title: 'Prismatic Horizon',
    artist: 'Prism Phase',
    artistId: 'art-14',
    album: 'Deep Midnight Horizon',
    albumId: 'alb-10',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    duration: 390,
    genre: 'Deep House',
    mood: 'Energy',
    bpm: 124,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3',
    moodScores: { energy: 87, happiness: 86, calmness: 38, focus: 74 },
    lyrics: [
      '[00:20] Colors refracting in crystal clear sound',
      '[01:00] Deep baseline shaking the open ground',
      '[01:50] Hands in the air as the melodies swell',
      '[02:35] Creating stories we will love to tell'
    ],
    releaseDate: '2024-03-08',
    playCount: 450000,
    isLiked: false
  },
  {
    id: 's31',
    title: 'Vapor Wave Dusk',
    artist: 'Vapor Drift',
    artistId: 'art-15',
    album: 'Rainy Afternoon Sessions',
    albumId: 'alb-3',
    coverUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    duration: 345,
    genre: 'Chillhop',
    mood: 'Rainy',
    bpm: 78,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3',
    moodScores: { energy: 30, happiness: 62, calmness: 94, focus: 88 },
    lyrics: [
      '[00:12] Cassette tape slowing in warm purple haze',
      '[00:42] Nostalgic memories of golden summer days',
      '[01:20] Relaxing beat easing every restless mind',
      '[01:50] Leave the stress of yesterday far behind'
    ],
    releaseDate: '2024-03-14',
    playCount: 395000,
    isLiked: true
  }
];

export const MOCK_PLAYLISTS: Playlist[] = [
  {
    id: 'pl-1',
    title: 'Deep Code Flow',
    description: 'Ultra-focused lo-fi and ambient beats tuned for intense programming and problem solving.',
    coverUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    mood: 'Focus',
    genre: 'Lo-Fi',
    trackIds: ['s1', 's3', 's15', 's28', 's2'],
    createdBy: 'VibeTune AI'
  },
  {
    id: 'pl-2',
    title: 'Night Drive Synth',
    description: 'High-octane synthwave and retro grid tracks for late night cruises under neon skies.',
    coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80',
    mood: 'Night Drive',
    genre: 'Synthwave',
    trackIds: ['s4', 's6', 's21', 's22', 's5'],
    createdBy: 'VibeTune Editorial'
  },
  {
    id: 'pl-3',
    title: 'Rainy Evening Chill',
    description: 'Cozy chillhop, acoustic loops, and vinyl warmth for rainy afternoons.',
    coverUrl: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=600&q=80',
    mood: 'Rainy',
    genre: 'Chillhop',
    trackIds: ['s2', 's7', 's9', 's31', 's8'],
    createdBy: 'Alex Vibe'
  },
  {
    id: 'pl-4',
    title: 'Cyberpunk Workout',
    description: 'Aggressive 140+ BPM industrial electro & dark synth for pushing your physical limits.',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
    mood: 'Workout',
    genre: 'Cyberpunk',
    trackIds: ['s10', 's11', 's12', 's29'],
    createdBy: 'VibeTune AI'
  },
  {
    id: 'pl-5',
    title: 'Ambient Sanctuary',
    description: '432Hz deep space soundscapes and solo piano for deep meditation and stress reduction.',
    coverUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    mood: 'Meditation',
    genre: 'Ambient',
    trackIds: ['s13', 's14', 's16', 's17', 's23', 's24'],
    createdBy: 'Zenith Labs'
  },
  {
    id: 'pl-6',
    title: 'Morning Euphoria',
    description: 'Upbeat indie pop and bright acoustic tunes to jumpstart your day with positivity.',
    coverUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
    mood: 'Energy',
    genre: 'Indie Pop',
    trackIds: ['s18', 's19', 's20', 's27'],
    createdBy: 'VibeTune Editorial'
  },
  {
    id: 'pl-7',
    title: 'Deep House Sunset',
    description: 'Melodic rooftop house grooves for sunset drinks and social gatherings.',
    coverUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
    mood: 'Party',
    genre: 'Deep House',
    trackIds: ['s25', 's26', 's30'],
    createdBy: 'Polaris Crew'
  },
  {
    id: 'pl-8',
    title: 'Lo-Fi Study Beats',
    description: 'Chilled beats to study, relax, and work to without any distracting lyrics.',
    coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    mood: 'Focus',
    genre: 'Lo-Fi',
    trackIds: ['s1', 's2', 's3', 's7', 's27'],
    createdBy: 'VibeTune AI'
  },
  {
    id: 'pl-9',
    title: 'Acoustic Sunset',
    description: 'Warm organic guitars and gentle ambient backing as golden hour turns to twilight.',
    coverUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    mood: 'Chill',
    genre: 'Chillhop',
    trackIds: ['s7', 's8', 's20', 's27'],
    createdBy: 'Alex Vibe'
  },
  {
    id: 'pl-10',
    title: 'Golden Hour Echoes',
    description: 'Warm synth pads and dreamy vocal echo lines for weekend relaxation.',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80',
    mood: 'Chill',
    genre: 'Indie Pop',
    trackIds: ['s18', 's20', 's6', 's1'],
    createdBy: 'VibeTune Editorial'
  }
];

export const MOCK_ROOMS: ListeningRoom[] = [
  {
    id: 'room-1',
    name: 'Late Night Lo-Fi Lounge',
    description: 'Join 142 developers and night owls coding together in silent sync.',
    coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    currentTrackId: 's3',
    activeListeners: 142,
    hostName: 'Luna Eclipse (Host)',
    hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    upcomingTrackIds: ['s1', 's2', 's7', 's28'],
    vibeTag: 'Deep Focus 96%',
    chatMessages: [
      { id: 'c1', user: 'DevMarcus', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', message: 'That piano loop on track #3 is incredible 🔥', timestamp: '12:14 AM' },
      { id: 'c2', user: 'SarahCode', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80', message: 'Debugging TypeScript bugs at 12 AM feels so cozy with this lounge', timestamp: '12:16 AM' },
      { id: 'c3', user: 'VibeMaster', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80', message: 'Smart queue transition coming up next!', timestamp: '12:18 AM' }
    ]
  },
  {
    id: 'room-2',
    name: 'Synthwave Highway 88',
    description: 'Midnight retro cruises across vector grids with live synthwave chat.',
    coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80',
    currentTrackId: 's4',
    activeListeners: 289,
    hostName: 'Kaelen Vibe (Host)',
    hostAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    upcomingTrackIds: ['s5', 's6', 's21'],
    vibeTag: 'Energy 88%',
    chatMessages: [
      { id: 'c4', user: 'NeonRider', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80', message: 'Pedal to the metal! 🏎️💨', timestamp: '12:10 AM' },
      { id: 'c5', user: 'CyberGirl88', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80', message: 'Best synthwave room on VibeTune hands down', timestamp: '12:15 AM' }
    ]
  },
  {
    id: 'room-3',
    name: 'Ambient Sanctuary 432Hz',
    description: 'Shared deep meditation space for stress relief and calm breathing.',
    coverUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    currentTrackId: 's16',
    activeListeners: 98,
    hostName: 'Starlight Echo (Host)',
    hostAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    upcomingTrackIds: ['s17', 's23', 's24'],
    vibeTag: 'Calmness 100%',
    chatMessages: [
      { id: 'c6', user: 'ZenSeeker', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80', message: 'Breathe in for 4 seconds, hold for 4, exhale for 4 🙏', timestamp: '11:58 PM' }
    ]
  },
  {
    id: 'room-4',
    name: 'Cyberpunk Workout Pit',
    description: 'High BPM industrial energy for late night gym sessions & high intensity training.',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
    currentTrackId: 's10',
    activeListeners: 312,
    hostName: 'CyberPulse (Host)',
    hostAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    upcomingTrackIds: ['s11', 's12', 's29'],
    vibeTag: 'Workout Energy 99%',
    chatMessages: [
      { id: 'c7', user: 'FitGeek', avatar: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80', message: 'Set 4 finished! The BPM surge on this track is insane', timestamp: '12:02 AM' }
    ]
  }
];

export const MOCK_INSIGHTS: ListeningInsightsData = {
  totalListeningHours: 142.5,
  songsPlayed: 843,
  artistsDiscovered: 64,
  activeTimeRange: '10:00 PM - 1:30 AM',
  topGenre: 'Synthwave & Lo-Fi',
  topMood: 'Deep Focus',
  listeningStreak: 14,
  weeklyActivity: [
    { day: 'Mon', hours: 4.2 },
    { day: 'Tue', hours: 5.5 },
    { day: 'Wed', hours: 6.8 },
    { day: 'Thu', hours: 7.1 },
    { day: 'Fri', hours: 8.4 },
    { day: 'Sat', hours: 6.0 },
    { day: 'Sun', hours: 5.2 }
  ],
  moodBreakdown: [
    { mood: 'Focus', percentage: 42, color: '#8b5cf6' },
    { mood: 'Night Drive', percentage: 24, color: '#ec4899' },
    { mood: 'Chill & Rainy', percentage: 18, color: '#3b82f6' },
    { mood: 'Workout', percentage: 11, color: '#f97316' },
    { mood: 'Meditation', percentage: 5, color: '#10b981' }
  ],
  personality: {
    title: 'THE NIGHT EXPLORER',
    tagline: 'Architect of Midnight Soundscapes',
    description: 'You thrive when the world goes quiet. Your music listening surges between 10 PM and 2 AM, blending high-focus lo-fi beats with driving neon synthwave soundscapes. You value deep concentration and atmospheric textures over mainstream hits.',
    traits: [
      '🌙 Nocturnal Peak Listener',
      '⚡ 94% Focus Optimization Index',
      '🔮 Synthwave & Cyberpunk Connoisseur',
      '🧠 25-Min Pomodoro Master'
    ]
  }
};
