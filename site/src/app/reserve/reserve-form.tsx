"use client";

import { FormEvent, useState } from "react";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { useContent } from "@/lib/content-context";

type Status = "idle" | "loading" | "success" | "error";

export function ReserveForm() {
  const { restaurant } = useContent();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setStatus("loading");

    const form = e.currentTarget;
    const data = new FormData(form);
    const guests = Number(data.get("guests"));
    const date = String(data.get("date") || "");
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();

    if (!name || !phone || !date || !guests) {
      setStatus("error");
      setError("Please fill in every required field.");
      return;
    }

    if (guests < 1 || guests > 12) {
      setStatus("error");
      setError("Party size should be between 1 and 12 guests.");
      return;
    }

    await new Promise((r) => setTimeout(r, 700));
    setStatus("success");
    form.reset();
  }

  if (status === "success") {
    return (
      <div className="surface p-8 text-center md:p-10">
        <CheckCircle size={40} weight="duotone" className="mx-auto text-accent" />
        <h2 className="mt-4 text-2xl font-semibold tracking-tight">Request received</h2>
        <p className="mx-auto mt-3 max-w-[40ch] text-sm text-fg-muted">
          This is a local demo form. For a real booking, call{" "}
          <a className="text-fg underline-offset-2 hover:underline" href={restaurant.phoneHref}>
            {restaurant.phone}
          </a>
          .
        </p>
        <button
          type="button"
          className="btn-secondary mt-6"
          onClick={() => setStatus("idle")}
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="surface p-6 md:p-8"
      noValidate
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full name" htmlFor="name">
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Aisha Rahman"
            className="field-input"
          />
        </Field>
        <Field label="Phone" htmlFor="phone" hint="We confirm by WhatsApp or call">
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+60 12 345 6789"
            className="field-input"
          />
        </Field>
        <Field label="Date" htmlFor="date">
          <input id="date" name="date" type="date" required className="field-input" />
        </Field>
        <Field label="Preferred time" htmlFor="time">
          <select id="time" name="time" required className="field-input" defaultValue="19:00">
            <option value="12:00">12:00 pm (weekend lunch)</option>
            <option value="12:30">12:30 pm</option>
            <option value="13:00">1:00 pm</option>
            <option value="18:00">6:00 pm</option>
            <option value="18:30">6:30 pm</option>
            <option value="19:00">7:00 pm</option>
            <option value="19:30">7:30 pm</option>
            <option value="20:00">8:00 pm</option>
            <option value="20:30">8:30 pm</option>
            <option value="21:00">9:00 pm</option>
          </select>
        </Field>
        <Field label="Guests" htmlFor="guests">
          <input
            id="guests"
            name="guests"
            type="number"
            min={1}
            max={12}
            defaultValue={2}
            required
            className="field-input"
          />
        </Field>
        <Field label="Email (optional)" htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@email.com"
            className="field-input"
          />
        </Field>
      </div>

      <Field label="Notes" htmlFor="notes" className="mt-5" hint="Allergies, celebration, seating preference">
        <textarea
          id="notes"
          name="notes"
          rows={4}
          placeholder="Window table if available"
          className="field-input resize-y"
        />
      </Field>

      {status === "error" ? (
        <p className="mt-4 flex items-start gap-2 text-sm text-red-700 dark:text-red-300" role="alert">
          <WarningCircle size={18} className="mt-0.5 shrink-0" weight="fill" />
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary mt-6 w-full disabled:opacity-60 md:w-auto"
      >
        {status === "loading" ? "Sending..." : "Reserve a table"}
      </button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  hint,
  children,
  className = "",
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-fg">
        {label}
      </label>
      {children}
      {hint ? <p className="text-xs text-fg-soft">{hint}</p> : null}
    </div>
  );
}
