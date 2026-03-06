import { useRef, useState } from "react";

export function ProxyTab() {
  const [url, setUrl] = useState("");
  const [loadedUrl, setLoadedUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleConnect = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!url.trim()) return;

    setError(null);

    let finalUrl = url.trim();

    // Auto-prepend https:// if missing
    if (!/^https?:\/\//i.test(finalUrl)) {
      finalUrl = `https://${finalUrl}`;
    }

    // Validate URL
    try {
      new URL(finalUrl);
    } catch {
      setError("INVALID URL FORMAT");
      return;
    }

    setIsLoading(true);
    setLoadedUrl(finalUrl);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setError("CONNECTION FAILED — Site may block iframe embedding.");
  };

  const handleClear = () => {
    setLoadedUrl(null);
    setUrl("");
    setError(null);
    setIsLoading(false);
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div className="p-6 flex flex-col gap-4">
      {/* Section header */}
      <div className="mb-2">
        <div className="flex items-center gap-2 mb-1">
          <span style={{ color: "oklch(55% 0.22 145)" }}>$</span>
          <h2
            className="text-lg font-bold tracking-widest"
            style={{
              color: "oklch(85% 0.3 145)",
              textShadow: "0 0 8px oklch(85% 0.3 145 / 0.4)",
            }}
          >
            ./proxy.sh --connect
          </h2>
        </div>
        <p className="text-xs ml-5" style={{ color: "oklch(40% 0.15 145)" }}>
          Route traffic through Jayson's Proxy Hub secure tunnel
        </p>
      </div>

      {/* Warning banner */}
      <div
        className="px-4 py-3 border text-xs"
        style={{
          color: "oklch(80% 0.2 80)",
          borderColor: "oklch(60% 0.18 80)",
          background: "oklch(80% 0.2 80 / 0.05)",
        }}
      >
        <span className="font-bold">&gt; WARNING:</span> Many sites block iframe
        embedding. Use direct URL for best results.
      </div>

      {/* URL Input form */}
      <form onSubmit={handleConnect} className="flex gap-2">
        <div className="flex-1">
          <input
            ref={inputRef}
            data-ocid="proxy.input"
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError(null);
            }}
            placeholder="https://example.com"
            className="terminal-input w-full"
            spellCheck={false}
            autoComplete="url"
          />
        </div>
        <button
          type="submit"
          data-ocid="proxy.submit_button"
          disabled={!url.trim() || isLoading}
          className="terminal-btn px-6 shrink-0"
          style={{
            opacity: !url.trim() || isLoading ? 0.5 : 1,
            cursor: !url.trim() || isLoading ? "not-allowed" : "pointer",
          }}
        >
          [ CONNECT ]
        </button>
        {loadedUrl && (
          <button
            type="button"
            onClick={handleClear}
            className="terminal-btn px-4 shrink-0"
            style={{
              borderColor: "oklch(65% 0.28 25)",
              color: "oklch(65% 0.28 25)",
            }}
          >
            [ CLEAR ]
          </button>
        )}
      </form>

      {/* Error display */}
      {error && (
        <div
          data-ocid="proxy.error_state"
          className="px-4 py-3 border text-xs font-bold tracking-wider"
          style={{
            color: "oklch(65% 0.28 25)",
            borderColor: "oklch(45% 0.22 25)",
            background: "oklch(65% 0.28 25 / 0.08)",
            boxShadow: "0 0 8px oklch(65% 0.28 25 / 0.2)",
          }}
        >
          &gt; ERROR: {error}
        </div>
      )}

      {/* Loading indicator */}
      {isLoading && (
        <div
          data-ocid="proxy.loading_state"
          className="px-4 py-3 border text-xs tracking-wider animate-pulse"
          style={{
            color: "oklch(85% 0.3 145)",
            borderColor: "oklch(30% 0.2 145)",
          }}
        >
          &gt; ESTABLISHING CONNECTION TO {loadedUrl}...
        </div>
      )}

      {/* iframe */}
      {loadedUrl && (
        <div
          className="border"
          style={{
            borderColor: "oklch(30% 0.2 145)",
            boxShadow: "0 0 10px oklch(85% 0.3 145 / 0.1)",
          }}
        >
          {/* iframe header bar */}
          <div
            className="flex items-center justify-between px-3 py-2 border-b text-xs"
            style={{
              borderColor: "oklch(20% 0.1 145)",
              background: "rgba(0, 10, 0, 0.8)",
              color: "oklch(40% 0.15 145)",
            }}
          >
            <span className="truncate">&gt; CONNECTED: {loadedUrl}</span>
            <span
              className="shrink-0 ml-2 px-1 py-0.5 border"
              style={{
                color: "oklch(70% 0.28 145)",
                borderColor: "oklch(40% 0.18 145)",
                background: "oklch(70% 0.28 145 / 0.1)",
              }}
            >
              LIVE
            </span>
          </div>

          <iframe
            src={loadedUrl}
            title="Proxy Frame"
            width="100%"
            style={{ height: "600px", display: "block", border: "none" }}
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>
      )}

      {/* Empty state */}
      {!loadedUrl && !error && (
        <div
          className="border p-12 text-center"
          style={{ borderColor: "oklch(15% 0.08 145)", borderStyle: "dashed" }}
        >
          <div
            className="text-4xl mb-4 opacity-30"
            style={{ filter: "drop-shadow(0 0 8px oklch(85% 0.3 145))" }}
          >
            ⬡
          </div>
          <p
            className="text-sm tracking-widest"
            style={{ color: "oklch(30% 0.12 145)" }}
          >
            NO ACTIVE CONNECTION
          </p>
          <p className="text-xs mt-2" style={{ color: "oklch(25% 0.1 145)" }}>
            Enter a URL above to begin tunneling
          </p>
        </div>
      )}
    </div>
  );
}
