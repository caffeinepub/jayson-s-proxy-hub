import { useEffect, useRef, useState } from "react";
import { useActor } from "../hooks/useActor";
import { MatrixRain } from "./MatrixRain";

interface LockScreenProps {
  onUnlock: () => void;
}

const CORRECT_PASSWORD = "44344";

export function LockScreen({ onUnlock }: LockScreenProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [bootAnim, setBootAnim] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const { actor } = useActor();

  useEffect(() => {
    const timer = setTimeout(() => setBootAnim(false), 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!bootAnim && inputRef.current) {
      inputRef.current.focus();
    }
  }, [bootAnim]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!password || isVerifying) return;

    setIsVerifying(true);
    setError(false);

    // Local check first for immediate response
    const localMatch = password === CORRECT_PASSWORD;

    if (localMatch) {
      // Also verify with backend (fire-and-forget for speed)
      if (actor) {
        actor.verifyPassword(password).catch(() => {});
      }
      sessionStorage.setItem("jph_unlocked", "true");
      onUnlock();
      return;
    }

    // Try backend if local fails
    let backendMatch = false;
    if (actor) {
      try {
        backendMatch = await actor.verifyPassword(password);
      } catch {
        backendMatch = false;
      }
    }

    if (backendMatch) {
      sessionStorage.setItem("jph_unlocked", "true");
      onUnlock();
      return;
    }

    // Wrong password
    setError(true);
    setIsShaking(true);
    setIsVerifying(false);
    setTimeout(() => setIsShaking(false), 600);
    setPassword("");
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <MatrixRain />

      {/* Overlay to darken matrix */}
      <div className="fixed inset-0 z-10 bg-black/40" />

      {/* Lock Terminal */}
      <div
        className={`relative z-20 w-full max-w-md mx-4 ${bootAnim ? "terminal-boot" : ""}`}
        style={{
          border: "1px solid oklch(50% 0.25 145)",
          boxShadow:
            "0 0 30px oklch(85% 0.3 145 / 0.3), 0 0 80px oklch(85% 0.3 145 / 0.1), inset 0 0 30px rgba(0,0,0,0.5)",
          background: "rgba(0, 5, 0, 0.95)",
        }}
      >
        {/* Terminal title bar */}
        <div
          className="flex items-center gap-2 px-3 py-2 border-b"
          style={{
            borderColor: "oklch(30% 0.2 145)",
            background: "rgba(0, 20, 0, 0.8)",
          }}
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: "oklch(65% 0.28 25)" }}
          />
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: "oklch(80% 0.2 80)" }}
          />
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: "oklch(70% 0.28 145)" }}
          />
          <span
            className="ml-2 text-xs"
            style={{ color: "oklch(40% 0.15 145)" }}
          >
            jayson@proxyhub:~$ ./unlock
          </span>
        </div>

        {/* Terminal content */}
        <div className="p-8 font-mono">
          {/* Boot text */}
          <div className="mb-6 space-y-1">
            <p className="text-xs" style={{ color: "oklch(40% 0.15 145)" }}>
              JAYSON'S PROXY HUB OS v4.4.3 kernel
            </p>
            <p className="text-xs" style={{ color: "oklch(40% 0.15 145)" }}>
              Loading security modules... [OK]
            </p>
            <p className="text-xs" style={{ color: "oklch(40% 0.15 145)" }}>
              Initializing encryption layer... [OK]
            </p>
          </div>

          {/* Glitch Title */}
          <div className="mb-8 text-center">
            <h1
              className="text-4xl font-bold tracking-widest glitch-title terminal-text-glow"
              style={{ color: "oklch(85% 0.3 145)" }}
            >
              &gt; JAYSON'S PROXY HUB_
            </h1>
            <p
              className="mt-3 text-xs tracking-[0.2em] uppercase"
              style={{ color: "oklch(55% 0.22 145)" }}
            >
              ENTER ACCESS CODE TO CONTINUE
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className={isShaking ? "animate-shake" : ""}
          >
            <div className="mb-4">
              <label
                className="block text-xs mb-2 tracking-widest"
                style={{ color: "oklch(55% 0.22 145)" }}
                htmlFor="lock-password"
              >
                &gt; ACCESS_CODE:
              </label>
              <input
                ref={inputRef}
                id="lock-password"
                data-ocid="lock.input"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="••••••••"
                className="terminal-input w-full text-lg tracking-[0.5em]"
                autoComplete="current-password"
              />
            </div>

            {/* Error message */}
            {error && (
              <div
                data-ocid="lock.error_state"
                className="mb-4 px-3 py-2 text-sm font-bold tracking-wider border"
                style={{
                  color: "oklch(65% 0.28 25)",
                  borderColor: "oklch(65% 0.28 25)",
                  background: "oklch(65% 0.28 25 / 0.1)",
                  boxShadow: "0 0 8px oklch(65% 0.28 25 / 0.3)",
                }}
              >
                &gt; ACCESS DENIED. RETRY.
              </div>
            )}

            <button
              type="submit"
              data-ocid="lock.submit_button"
              disabled={isVerifying || !password}
              className="terminal-btn w-full mt-2 py-3 font-bold tracking-[0.3em] text-sm"
              style={{
                opacity: isVerifying || !password ? 0.5 : 1,
                cursor: isVerifying || !password ? "not-allowed" : "pointer",
              }}
            >
              {isVerifying ? "[ VERIFYING... ]" : "[ AUTHENTICATE ]"}
            </button>

            {/* Success state (hidden, for markers) */}
            <div data-ocid="lock.success_state" className="hidden" />
          </form>

          {/* Footer */}
          <div
            className="mt-8 border-t pt-4"
            style={{ borderColor: "oklch(20% 0.1 145)" }}
          >
            <p
              className="text-xs text-center"
              style={{ color: "oklch(30% 0.12 145)" }}
            >
              UNAUTHORIZED ACCESS IS PROHIBITED
            </p>
            <p
              className="text-xs text-center mt-1"
              style={{ color: "oklch(25% 0.1 145)" }}
            >
              ALL ACTIVITIES ARE MONITORED AND LOGGED
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
