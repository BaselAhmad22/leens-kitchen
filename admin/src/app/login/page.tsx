"use client";

import { FormEvent, useState } from "react";
import { withBasePath } from "@/lib/base-path";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

const ease = [0.32, 0.72, 0, 1] as const;

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch(withBasePath("/api/auth"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (!res.ok) {
      setError("Wrong password. Try again.");
      return;
    }
    router.replace("/dashboard");
    router.refresh();
  }

  return (
    <main className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-4">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 20% 10%, rgba(0,117,74,0.28), transparent 55%), radial-gradient(ellipse 50% 40% at 90% 85%, rgba(89,212,153,0.12), transparent 50%), radial-gradient(ellipse 35% 30% at 70% 20%, rgba(255,197,51,0.06), transparent 45%)",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[12%] top-[18%] h-40 w-40 rounded-full bg-sage/20 blur-3xl"
        animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.08, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-[16%] right-[14%] h-48 w-48 rounded-full bg-accent/25 blur-3xl"
        animate={{ opacity: [0.25, 0.55, 0.25], scale: [1.05, 0.95, 1.05] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease }}
        className="surface relative w-full max-w-md overflow-hidden p-8 md:p-10"
        style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.06), transparent 40%), #161616" }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sage/50 to-transparent" />
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease }}
          className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-sage"
        >
          Leen&apos;s studio
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.55, ease }}
          className="mt-3 text-3xl font-semibold tracking-tight"
        >
          Welcome back
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.55, ease }}
          className="mt-2 text-sm leading-relaxed text-muted"
        >
          Sign in to update the menu, photos, and story guests see on the site.
        </motion.p>

        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.5, ease }}
          >
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              required
              placeholder="Enter admin password"
            />
          </motion.div>
          {error ? (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[12px] border border-danger/30 bg-[rgba(255,97,97,0.1)] px-3 py-2 text-sm text-danger"
            >
              {error}
            </motion.p>
          ) : null}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34, duration: 0.5, ease }}
          >
            <button type="submit" className="btn btn-accent w-full" disabled={loading}>
              {loading ? "Checking..." : "Enter studio"}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </main>
  );
}
