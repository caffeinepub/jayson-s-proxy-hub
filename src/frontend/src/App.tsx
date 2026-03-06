import { useEffect, useState } from "react";
import { GamesTab } from "./components/GamesTab";
import { LockScreen } from "./components/LockScreen";
import { MoviesTab } from "./components/MoviesTab";
import { ProxyTab } from "./components/ProxyTab";
import { SoundboardTab } from "./components/SoundboardTab";

type Tab = "games" | "movies" | "proxy" | "soundboard";

function Header({
  activeTab,
  onTabChange,
}: { activeTab: Tab; onTabChange: (t: Tab) => void }) {
  const tabs: { id: Tab; label: string }[] = [
    { id: "games", label: "GAMES" },
    { id: "movies", label: "MOVIES" },
    { id: "proxy", label: "PROXY" },
    { id: "soundboard", label: "SOUNDBOARD" },
  ];

  const tabOcids: Record<Tab, string> = {
    games: "nav.games.tab",
    movies: "nav.movies.tab",
    proxy: "nav.proxy.tab",
    soundboard: "nav.soundboard.tab",
  };

  return (
    <header
      className="sticky top-0 z-40 border-b"
      style={{
        background: "rgba(0, 3, 0, 0.97)",
        borderColor: "oklch(25% 0.15 145)",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Top status bar */}
      <div
        className="flex items-center justify-between px-4 py-1 border-b text-xs"
        style={{
          borderColor: "oklch(15% 0.08 145)",
          color: "oklch(30% 0.12 145)",
        }}
      >
        <span>root@jph:~#</span>
        <span className="flex items-center gap-4">
          <span>
            <span
              className="inline-block w-2 h-2 rounded-full mr-1"
              style={{
                background: "oklch(70% 0.28 145)",
                boxShadow: "0 0 4px oklch(70% 0.28 145)",
              }}
            />
            ONLINE
          </span>
          <span>
            {new Date().toLocaleTimeString("en-US", { hour12: false })}
          </span>
        </span>
      </div>

      {/* Logo + nav row */}
      <div className="flex items-center gap-0 flex-wrap">
        {/* Logo */}
        <div
          className="px-4 py-3 border-r shrink-0"
          style={{ borderColor: "oklch(25% 0.15 145)" }}
        >
          <span
            className="text-sm font-bold tracking-[0.25em] glitch-title terminal-text-glow"
            style={{ color: "oklch(85% 0.3 145)" }}
          >
            [JPH]
          </span>
        </div>

        {/* Tab navigation */}
        <nav className="flex">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                type="button"
                key={tab.id}
                data-ocid={tabOcids[tab.id]}
                onClick={() => onTabChange(tab.id)}
                className="px-5 py-3 text-xs font-bold tracking-[0.18em] border-r transition-all duration-150"
                style={{
                  borderColor: "oklch(25% 0.15 145)",
                  background: isActive ? "oklch(85% 0.3 145)" : "transparent",
                  color: isActive ? "#000" : "oklch(55% 0.22 145)",
                  boxShadow: isActive
                    ? "0 0 15px oklch(85% 0.3 145 / 0.5)"
                    : "none",
                  cursor: "pointer",
                  outline: "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "oklch(85% 0.3 145)";
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "oklch(85% 0.3 145 / 0.1)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "oklch(55% 0.22 145)";
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "transparent";
                  }
                }}
              >
                {`[ ${tab.label} ]`}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const utmUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer
      className="border-t mt-auto px-6 py-4"
      style={{ borderColor: "oklch(15% 0.08 145)" }}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
        <div style={{ color: "oklch(25% 0.1 145)" }}>
          <span style={{ color: "oklch(40% 0.15 145)" }}>&gt; </span>
          root@jph:~# uptime {new Date().toLocaleDateString()}
        </div>
        <div style={{ color: "oklch(25% 0.1 145)" }}>
          © {year}.{" "}
          <a
            href={utmUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "oklch(45% 0.2 145)" }}
            className="hover:underline"
          >
            Built with ♥ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return sessionStorage.getItem("jph_unlocked") === "true";
  });
  const [activeTab, setActiveTab] = useState<Tab>("games");

  // Listen for storage changes (tab sync)
  useEffect(() => {
    const handleStorage = () => {
      const unlocked = sessionStorage.getItem("jph_unlocked") === "true";
      setIsUnlocked(unlocked);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  if (!isUnlocked) {
    return <LockScreen onUnlock={() => setIsUnlocked(true)} />;
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#000000" }}
    >
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1">
        {activeTab === "games" && <GamesTab />}
        {activeTab === "movies" && <MoviesTab />}
        {activeTab === "proxy" && <ProxyTab />}
        {activeTab === "soundboard" && <SoundboardTab />}
      </main>

      <Footer />
    </div>
  );
}
