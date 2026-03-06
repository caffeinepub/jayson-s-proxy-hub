import type { Movie } from "../backend.d";
import { useGetMovies } from "../hooks/useQueries";

const FALLBACK_MOVIES: Movie[] = [
  {
    id: 1n,
    title: "Nosferatu (1922)",
    description:
      "The original vampire horror film. Silent masterpiece of shadow and dread.",
    genre: "Horror",
    url: "https://archive.org/details/Nosferatu_201410",
  },
  {
    id: 2n,
    title: "The General (1926)",
    description:
      "Buster Keaton's greatest comedy — a train chase through the Civil War.",
    genre: "Comedy",
    url: "https://archive.org/details/TheGeneral_201410",
  },
  {
    id: 3n,
    title: "Metropolis (1927)",
    description:
      "Fritz Lang's dystopian sci-fi epic. Robots. Cities. Revolution.",
    genre: "Sci-Fi",
    url: "https://archive.org/details/Metropolis_1927",
  },
  {
    id: 4n,
    title: "Hackers (1995) Trailer",
    description:
      "Hack the planet. Young hackers uncover corporate conspiracy. Iconic 90s aesthetic.",
    genre: "Thriller",
    url: "https://www.youtube.com/watch?v=8wOaFMMHmtk",
  },
  {
    id: 5n,
    title: "WarGames (1983) Trailer",
    description:
      "A teenager hacks into a military supercomputer. Shall we play a game?",
    genre: "Thriller",
    url: "https://www.youtube.com/watch?v=hbqMuvnx5SU",
  },
  {
    id: 6n,
    title: "The Matrix (1999) Trailer",
    description:
      "There is no spoon. Take the red pill. Welcome to the real world.",
    genre: "Sci-Fi",
    url: "https://www.youtube.com/watch?v=vKQi3bBA1y8",
  },
];

const GENRE_STYLES: Record<
  string,
  { color: string; border: string; bg: string }
> = {
  Horror: {
    color: "oklch(65% 0.28 25)",
    border: "oklch(45% 0.22 25)",
    bg: "oklch(65% 0.28 25 / 0.1)",
  },
  Comedy: {
    color: "oklch(80% 0.2 80)",
    border: "oklch(60% 0.18 80)",
    bg: "oklch(80% 0.2 80 / 0.1)",
  },
  "Sci-Fi": {
    color: "oklch(75% 0.28 200)",
    border: "oklch(55% 0.22 200)",
    bg: "oklch(75% 0.28 200 / 0.1)",
  },
  Thriller: {
    color: "oklch(78% 0.22 300)",
    border: "oklch(55% 0.18 300)",
    bg: "oklch(78% 0.22 300 / 0.1)",
  },
};

const MOVIE_OCIDS = [
  "movies.item.1",
  "movies.item.2",
  "movies.item.3",
  "movies.item.4",
  "movies.item.5",
  "movies.item.6",
];

export function MoviesTab() {
  const { data: backendMovies, isLoading } = useGetMovies();
  const movies =
    backendMovies && backendMovies.length > 0 ? backendMovies : FALLBACK_MOVIES;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div
          className="text-sm tracking-widest animate-pulse"
          style={{ color: "oklch(55% 0.22 145)" }}
        >
          &gt; SCANNING MEDIA ARCHIVE...
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
            ls ./movies/
          </h2>
        </div>
        <p className="text-xs ml-5" style={{ color: "oklch(40% 0.15 145)" }}>
          {movies.length} files found — click to stream
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map((movie, idx) => {
          const genreStyle = GENRE_STYLES[movie.genre] || {
            color: "oklch(65% 0.22 145)",
            border: "oklch(40% 0.18 145)",
            bg: "oklch(65% 0.22 145 / 0.1)",
          };

          return (
            <a
              key={String(movie.id)}
              data-ocid={MOVIE_OCIDS[idx] ?? `movies.item.${idx + 1}`}
              href={movie.url}
              target="_blank"
              rel="noopener noreferrer"
              className="terminal-card terminal-glow-hover p-4 block group no-underline"
            >
              {/* Top: genre badge */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className="text-xs px-2 py-0.5 border font-bold tracking-wider"
                  style={{
                    color: genreStyle.color,
                    borderColor: genreStyle.border,
                    background: genreStyle.bg,
                  }}
                >
                  [{movie.genre}]
                </span>
                <span
                  className="text-xs"
                  style={{ color: "oklch(30% 0.12 145)" }}
                >
                  .mov
                </span>
              </div>

              {/* Title */}
              <h3
                className="text-sm font-bold tracking-wide mb-2 leading-snug group-hover:underline"
                style={{ color: "oklch(85% 0.3 145)" }}
              >
                {movie.title}
              </h3>

              {/* Description */}
              <p
                className="text-xs leading-relaxed mb-4"
                style={{ color: "oklch(50% 0.18 145)" }}
              >
                {movie.description}
              </p>

              {/* Stream link indicator */}
              <div
                className="text-xs tracking-wider flex items-center gap-2"
                style={{ color: "oklch(65% 0.26 145)" }}
              >
                <span>&gt; open_stream.sh</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                  ↗
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
