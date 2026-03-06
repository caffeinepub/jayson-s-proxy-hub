import { useState } from "react";
import type { Game } from "../backend.d";
import { useGetGames } from "../hooks/useQueries";

const FALLBACK_GAMES: Game[] = [
  {
    id: 1n,
    name: "2048",
    description: "Combine tiles to reach 2048. A classic number puzzle.",
    category: "Puzzle",
    url: "https://play2048.co/",
  },
  {
    id: 2n,
    name: "Snake",
    description: "Classic snake game. Eat, grow, survive.",
    category: "Arcade",
    url: "https://www.google.com/fbx?fbx=snake_arcade",
  },
  {
    id: 3n,
    name: "Tetris",
    description: "Stack blocks, clear lines, keep calm.",
    category: "Puzzle",
    url: "https://tetris.com/play-tetris",
  },
  {
    id: 4n,
    name: "Pac-Man",
    description: "Original Google Pac-Man doodle. Eat dots, avoid ghosts.",
    category: "Arcade",
    url: "https://www.google.com/logos/2010/pacman10-i.html",
  },
  {
    id: 5n,
    name: "Chess",
    description: "Play chess against the computer. Any skill level.",
    category: "Strategy",
    url: "https://www.chess.com/play/computer",
  },
  {
    id: 6n,
    name: "Flappy Bird",
    description: "Tap to fly. Avoid the pipes. Infuriating fun.",
    category: "Arcade",
    url: "https://flappybird.io/",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Puzzle: "oklch(75% 0.28 200)",
  Arcade: "oklch(80% 0.28 145)",
  Strategy: "oklch(78% 0.25 80)",
  Action: "oklch(65% 0.28 25)",
};

interface GameModalProps {
  game: Game;
  onClose: () => void;
}

function GameModal({ game, onClose }: GameModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: "rgba(0,0,0,0.97)" }}
      data-ocid="games.modal"
    >
      {/* Modal header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b shrink-0"
        style={{
          borderColor: "oklch(30% 0.2 145)",
          background: "rgba(0, 10, 0, 0.95)",
        }}
      >
        <div className="flex items-center gap-3">
          <span
            className="text-xs px-2 py-1 border"
            style={{
              color: "oklch(40% 0.15 145)",
              borderColor: "oklch(25% 0.12 145)",
            }}
          >
            GAME://
          </span>
          <span
            className="font-bold tracking-wider text-sm"
            style={{
              color: "oklch(85% 0.3 145)",
              textShadow: "0 0 8px oklch(85% 0.3 145 / 0.5)",
            }}
          >
            {game.name.toUpperCase()}
          </span>
        </div>
        <button
          type="button"
          data-ocid="games.close_button"
          onClick={onClose}
          className="terminal-btn px-4 py-1 text-xs"
        >
          [ CLOSE ]
        </button>
      </div>

      {/* iframe */}
      <iframe
        src={game.url}
        title={game.name}
        className="w-full flex-1 border-0"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
        allowFullScreen
      />
    </div>
  );
}

export function GamesTab() {
  const { data: backendGames, isLoading } = useGetGames();
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const games =
    backendGames && backendGames.length > 0 ? backendGames : FALLBACK_GAMES;

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center py-20"
        data-ocid="games.loading_state"
      >
        <div
          className="text-sm tracking-widest animate-pulse"
          style={{ color: "oklch(55% 0.22 145)" }}
        >
          &gt; LOADING GAMES DATABASE...
        </div>
      </div>
    );
  }

  const gameOcids = [
    "games.item.1",
    "games.item.2",
    "games.item.3",
    "games.item.4",
    "games.item.5",
    "games.item.6",
  ];

  return (
    <>
      {selectedGame && (
        <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />
      )}

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
              ls ./games/
            </h2>
          </div>
          <p className="text-xs ml-5" style={{ color: "oklch(40% 0.15 145)" }}>
            {games.length} entries found — click to launch
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map((game, idx) => (
            <button
              type="button"
              key={String(game.id)}
              data-ocid={gameOcids[idx] ?? `games.item.${idx + 1}`}
              onClick={() => setSelectedGame(game)}
              className="terminal-card terminal-glow-hover text-left p-4 w-full cursor-pointer group"
              style={{ outline: "none" }}
            >
              {/* Card header */}
              <div className="flex items-start justify-between mb-3">
                <div
                  className="text-base font-bold tracking-wider group-hover:text-shadow-glow transition-all"
                  style={{ color: "oklch(85% 0.3 145)" }}
                >
                  {game.name}
                </div>
                <span
                  className="text-xs px-2 py-0.5 border ml-2 shrink-0"
                  style={{
                    color:
                      CATEGORY_COLORS[game.category] || "oklch(60% 0.22 145)",
                    borderColor:
                      CATEGORY_COLORS[game.category] || "oklch(40% 0.18 145)",
                    background: "rgba(0,0,0,0.4)",
                  }}
                >
                  {game.category}
                </span>
              </div>

              <p
                className="text-xs leading-relaxed mb-4"
                style={{ color: "oklch(50% 0.18 145)" }}
              >
                {game.description}
              </p>

              <div
                className="text-xs tracking-wider group-hover:tracking-[0.2em] transition-all duration-200"
                style={{ color: "oklch(65% 0.26 145)" }}
              >
                &gt; ./launch.sh
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
