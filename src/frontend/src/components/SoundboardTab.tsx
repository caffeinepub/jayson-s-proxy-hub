import { useState } from "react";
import type { Meme } from "../backend.d";
import { useGetMemes } from "../hooks/useQueries";

const FALLBACK_MEMES: Meme[] = [
  {
    id: 1n,
    name: "We're In",
    emoji: "🖥️",
    audioUrl: "https://www.myinstants.com/media/sounds/were-in.mp3",
  },
  {
    id: 2n,
    name: "Access Granted",
    emoji: "✅",
    audioUrl: "https://www.myinstants.com/media/sounds/access-granted.mp3",
  },
  {
    id: 3n,
    name: "Access Denied",
    emoji: "❌",
    audioUrl: "https://www.myinstants.com/media/sounds/access-denied_1.mp3",
  },
  {
    id: 4n,
    name: "Error Beep",
    emoji: "🔴",
    audioUrl: "https://www.myinstants.com/media/sounds/error.mp3",
  },
  {
    id: 5n,
    name: "Windows XP Error",
    emoji: "💀",
    audioUrl: "https://www.myinstants.com/media/sounds/windows-xp-error.mp3",
  },
  {
    id: 6n,
    name: "MLG Air Horn",
    emoji: "📯",
    audioUrl: "https://www.myinstants.com/media/sounds/mlg-airhorn.mp3",
  },
  {
    id: 7n,
    name: "Dramatic Dun Dun Dun",
    emoji: "🎵",
    audioUrl: "https://www.myinstants.com/media/sounds/dun-dun-duuun.mp3",
  },
  {
    id: 8n,
    name: "Keyboard Typing",
    emoji: "⌨️",
    audioUrl:
      "https://www.myinstants.com/media/sounds/keyboard-typing-sound.mp3",
  },
  {
    id: 9n,
    name: "Matrix Theme",
    emoji: "💊",
    audioUrl: "https://www.myinstants.com/media/sounds/matrix.mp3",
  },
  {
    id: 10n,
    name: "404 Not Found",
    emoji: "🚫",
    audioUrl: "https://www.myinstants.com/media/sounds/404-sound-effect.mp3",
  },
];

const SOUNDBOARD_OCIDS = [
  "soundboard.item.1",
  "soundboard.item.2",
  "soundboard.item.3",
  "soundboard.item.4",
  "soundboard.item.5",
  "soundboard.item.6",
  "soundboard.item.7",
  "soundboard.item.8",
  "soundboard.item.9",
  "soundboard.item.10",
];

export function SoundboardTab() {
  const { data: backendMemes, isLoading } = useGetMemes();
  const [playingId, setPlayingId] = useState<string | null>(null);

  const memes =
    backendMemes && backendMemes.length > 0 ? backendMemes : FALLBACK_MEMES;

  const playSound = (meme: Meme) => {
    const id = String(meme.id);

    // Stop if already playing same
    if (playingId === id) {
      setPlayingId(null);
      return;
    }

    const audio = new Audio(meme.audioUrl);
    audio.crossOrigin = "anonymous";

    setPlayingId(id);

    audio.play().catch((err) => {
      console.warn("Audio play failed:", err);
      setPlayingId(null);
    });

    audio.addEventListener("ended", () => {
      setPlayingId(null);
    });

    audio.addEventListener("error", () => {
      setPlayingId(null);
    });
  };

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center py-20"
        data-ocid="soundboard.loading_state"
      >
        <div
          className="text-sm tracking-widest animate-pulse"
          style={{ color: "oklch(55% 0.22 145)" }}
        >
          &gt; LOADING AUDIO SAMPLES...
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Section header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span style={{ color: "oklch(55% 0.22 145)" }}>$</span>
          <h2
            className="text-lg font-bold tracking-widest"
            style={{
              color: "oklch(85% 0.3 145)",
              textShadow: "0 0 8px oklch(85% 0.3 145 / 0.4)",
            }}
          >
            ./soundboard --memes
          </h2>
        </div>
        <p className="text-xs ml-5" style={{ color: "oklch(40% 0.15 145)" }}>
          {memes.length} audio samples loaded — click to trigger
        </p>
      </div>

      {/* Playing indicator */}
      {playingId && (
        <div
          className="mb-4 px-4 py-2 border text-xs tracking-widest flex items-center gap-2"
          style={{
            color: "oklch(85% 0.3 145)",
            borderColor: "oklch(50% 0.25 145)",
            background: "oklch(85% 0.3 145 / 0.05)",
            boxShadow: "0 0 10px oklch(85% 0.3 145 / 0.2)",
          }}
        >
          <span
            className="inline-block w-2 h-2 rounded-full animate-pulse"
            style={{ background: "oklch(85% 0.3 145)" }}
          />
          PLAYING...
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {memes.map((meme, idx) => {
          const id = String(meme.id);
          const isPlaying = playingId === id;

          return (
            <button
              type="button"
              key={id}
              data-ocid={SOUNDBOARD_OCIDS[idx] ?? `soundboard.item.${idx + 1}`}
              onClick={() => playSound(meme)}
              className="terminal-card terminal-glow-hover p-4 flex flex-col items-center justify-center gap-2 cursor-pointer group transition-all duration-200"
              style={{
                minHeight: "100px",
                borderColor: isPlaying ? "oklch(85% 0.3 145)" : undefined,
                boxShadow: isPlaying
                  ? "0 0 15px oklch(85% 0.3 145 / 0.5), 0 0 30px oklch(85% 0.3 145 / 0.3), inset 0 0 20px oklch(85% 0.3 145 / 0.05)"
                  : undefined,
                outline: "none",
              }}
            >
              {/* Emoji */}
              <span
                className="text-3xl transition-transform duration-200 group-hover:scale-110"
                style={{
                  filter: isPlaying
                    ? "drop-shadow(0 0 8px oklch(85% 0.3 145))"
                    : "none",
                }}
              >
                {meme.emoji}
              </span>

              {/* Name */}
              <span
                className="text-xs text-center tracking-wide leading-snug"
                style={{
                  color: isPlaying
                    ? "oklch(92% 0.35 145)"
                    : "oklch(65% 0.25 145)",
                  textShadow: isPlaying
                    ? "0 0 8px oklch(85% 0.3 145 / 0.8)"
                    : "none",
                }}
              >
                {meme.name}
              </span>

              {/* Playing wave indicator */}
              {isPlaying && (
                <div className="flex gap-0.5 items-end h-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-1 rounded-sm animate-pulse"
                      style={{
                        height: `${((i % 3) + 1) * 4}px`,
                        background: "oklch(85% 0.3 145)",
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom tip */}
      <div className="mt-8 text-xs" style={{ color: "oklch(25% 0.1 145)" }}>
        <span>&gt; </span>
        <span>
          Click a button again to stop playback. Audio requires browser
          permissions.
        </span>
      </div>
    </div>
  );
}
