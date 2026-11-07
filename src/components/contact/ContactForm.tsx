"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { toMailto, validateContact, type ContactErrors, type ContactFields } from "@/lib/contact";

const empty: ContactFields = { name: "", email: "", message: "" };

export function ContactForm() {
  const [fields, setFields] = useState<ContactFields>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [honey, setHoney] = useState("");
  const [draft, setDraft] = useState<string | null>(null);

  function update(key: keyof ContactFields, value: string) {
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (honey.trim()) return;

    const nextErrors = validateContact(fields);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setDraft(null);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, website: honey }),
      });
      const payload = (await response.json()) as { ok?: boolean; mailto?: string; errors?: ContactErrors };
      if (!response.ok && payload.errors) {
        setErrors(payload.errors);
        setDraft(null);
        return;
      }
      const href = payload.mailto ?? toMailto(fields);
      setDraft(href);
      window.location.href = href;
    } catch {
      const href = toMailto(fields);
      setDraft(href);
      window.location.href = href;
    }
  }

  return (
    <form onSubmit={submit} noValidate className="relative grid gap-8">
      <div className="absolute -left-[9999px] h-0 overflow-hidden" aria-hidden="true">
        <label>
          Company website
          <input
            tabIndex={-1}
            autoComplete="off"
            value={honey}
            onChange={(event) => setHoney(event.target.value)}
          />
        </label>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <Field
          id="name"
          label="Name"
          autoComplete="name"
          value={fields.name}
          error={errors.name}
          maxLength={80}
          onChange={(value) => update("name", value)}
        />
        <Field
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          value={fields.email}
          error={errors.email}
          maxLength={120}
          onChange={(value) => update("email", value)}
        />
      </div>

      <div>
        <label htmlFor="message" className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-muted">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={2000}
          value={fields.message}
          onChange={(event) => update("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="mt-3 w-full resize-y border-b border-ink/20 bg-transparent py-3 text-base text-ink outline-none focus:border-oxide"
        />
        {errors.message ? (
          <p id="message-error" className="mt-2 text-sm text-oxide">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <button type="submit" className="btn btn-primary">
          Compose email
          <ArrowUpRight aria-hidden="true" size={16} />
        </button>
        <p className="text-sm text-muted">Opens a draft in your email app. Nothing is stored on this site.</p>
      </div>

      {draft ? (
        <p className="text-sm text-ink-soft" role="status">
          If a draft did not open,{" "}
          <a className="link-underline text-ink" href={draft}>
            use this link
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}

function Field({
  id,
  label,
  value,
  error,
  onChange,
  type = "text",
  autoComplete,
  maxLength,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete: string;
  maxLength: number;
}) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-muted">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        autoComplete={autoComplete}
        maxLength={maxLength}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className="mt-3 w-full border-b border-ink/20 bg-transparent py-3 text-base text-ink outline-none focus:border-oxide"
      />
      {error ? (
        <p id={errorId} className="mt-2 text-sm text-oxide">
          {error}
        </p>
      ) : null}
    </div>
  );
}
