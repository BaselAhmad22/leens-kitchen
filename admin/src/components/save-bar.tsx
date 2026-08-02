"use client";

import { useEffect, useState } from "react";
import { Check, FloppyDisk, SpinnerGap, WarningCircle } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import type { SiteData } from "@/lib/types";

export function useSiteEditor(initial: SiteData) {
  const [data, setData] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function save(next?: SiteData) {
    setSaving(true);
    setMessage("");
    setError("");
    const payload = next ?? data;
    const res = await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (!res.ok) {
      setError("Save failed. Check the content folder path.");
      return false;
    }
    const json = await res.json();
    setData(json.data as SiteData);
    setMessage("Saved. Refresh the public site to see updates.");
    return true;
  }

  return { data, setData, save, saving, message, error, setMessage, setError };
}

const ease = [0.32, 0.72, 0, 1] as const;

export function SaveBar({
  saving,
  message,
  error,
  onSave,
}: {
  saving: boolean;
  message: string;
  error: string;
  onSave: () => void;
}) {
  const [phase, setPhase] = useState<"idle" | "saving" | "success" | "error">("idle");

  useEffect(() => {
    if (saving) {
      setPhase("saving");
      return;
    }
    if (error) {
      setPhase("error");
      return;
    }
    if (message) {
      setPhase("success");
      const t = window.setTimeout(() => setPhase("idle"), 2400);
      return () => window.clearTimeout(t);
    }
    setPhase("idle");
  }, [saving, message, error]);

  const label =
    phase === "saving"
      ? "Saving"
      : phase === "success"
        ? "Saved"
        : phase === "error"
          ? "Retry save"
          : "Save changes";

  return (
    <div className="pointer-events-none sticky bottom-5 z-20 mt-12 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease }}
        className="pointer-events-auto"
      >
        <div className="relative flex items-center gap-2 rounded-full border border-white/10 bg-[rgba(18,18,18,0.82)] p-1.5 shadow-[0_18px_50px_rgba(0,0,0,0.55)] backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-sage/40 to-transparent" />

          <motion.button
            type="button"
            disabled={saving}
            onClick={onSave}
            whileHover={saving ? undefined : { scale: 1.02 }}
            whileTap={saving ? undefined : { scale: 0.97 }}
            className={`relative inline-flex min-w-[168px] items-center justify-center gap-2.5 overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold tracking-tight transition-colors ${
              phase === "success"
                ? "bg-sage text-accent-fg"
                : phase === "error"
                  ? "bg-danger text-white"
                  : "bg-accent text-white"
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={phase}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease }}
                className="inline-flex items-center gap-2.5"
              >
                <span
                  className={`grid h-7 w-7 place-items-center rounded-full ${
                    phase === "success"
                      ? "bg-black/15"
                      : phase === "error"
                        ? "bg-black/20"
                        : "bg-white/15"
                  }`}
                >
                  {phase === "saving" ? (
                    <SpinnerGap size={15} weight="bold" className="animate-spin" />
                  ) : phase === "success" ? (
                    <Check size={15} weight="bold" />
                  ) : phase === "error" ? (
                    <WarningCircle size={15} weight="fill" />
                  ) : (
                    <FloppyDisk size={15} weight="bold" />
                  )}
                </span>
                <span>{label}</span>
              </motion.span>
            </AnimatePresence>

            {phase === "saving" ? (
              <motion.span
                className="pointer-events-none absolute inset-x-3 bottom-1 h-[2px] overflow-hidden rounded-full bg-white/15"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.span
                  className="block h-full w-1/2 rounded-full bg-white/80"
                  animate={{ x: ["-120%", "220%"] }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.span>
            ) : null}
          </motion.button>

          <AnimatePresence mode="wait">
            {phase === "success" || phase === "error" ? (
              <motion.p
                key={phase === "success" ? "ok-msg" : "err-msg"}
                initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                animate={{ opacity: 1, width: "auto", marginLeft: 4 }}
                exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                transition={{ duration: 0.35, ease }}
                className="max-w-[220px] overflow-hidden whitespace-nowrap pr-3 text-xs text-muted"
              >
                {phase === "success" ? "Live site can refresh now" : "Couldn’t save — try again"}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description: string;
}) {
  return (
    <header className="mb-8 max-w-2xl">
      {eyebrow ? (
        <p className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-sage">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-fg md:text-4xl">
        {title}
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">{description}</p>
    </header>
  );
}
