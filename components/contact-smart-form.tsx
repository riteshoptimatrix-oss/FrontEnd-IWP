"use client";

import * as React from "react";
import { CheckCircle2, Send, Paperclip, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/button";

interface FormState {
  name: string;
  email: string;
  company: string;
  phone: string;
  budget: string;
  message: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

const EMPTY: FormState = {
  name: "",
  email: "",
  company: "",
  phone: "",
  budget: "",
  message: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormState): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(values.email))
    errors.email = "Please enter a valid email address.";
  if (values.message.trim().length < 10)
    errors.message = "Tell us a little more (at least 10 characters).";
  return errors;
}

function FloatingInput({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  optional,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder: string;
  type?: string;
  optional?: boolean;
}) {
  return (
    <div className="relative">
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        placeholder={placeholder}
        className={cn(
          "peer h-12 w-full rounded-xl border border-input bg-background px-4 pt-2 text-sm text-foreground transition-all duration-200 placeholder:text-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-gold/50",
          error && "border-destructive focus-visible:ring-destructive",
        )}
      />
      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-4 top-3.5 text-sm text-muted-foreground transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-gold peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-xs",
          error && "text-destructive",
        )}
      >
        {label}{optional ? <span className="text-muted-foreground/60 ml-1">(optional)</span> : null}
      </label>
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-xs text-destructive px-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function FloatingTextarea({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  placeholder: string;
}) {
  return (
    <div className="relative">
      <textarea
        id={id}
        name={id}
        rows={5}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        placeholder={placeholder}
        className={cn(
          "peer h-auto w-full rounded-xl border border-input bg-background px-4 pt-6 pb-3 text-sm text-foreground transition-all duration-200 placeholder:text-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-gold/50 resize-y",
          error && "border-destructive focus-visible:ring-destructive",
        )}
      />
      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-4 top-4 text-sm text-muted-foreground transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-gold peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs",
          error && "text-destructive",
        )}
      >
        {label}
      </label>
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-xs text-destructive px-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function SmartContactForm({ className }: { className?: string }) {
  const [values, setValues] = React.useState<FormState>(EMPTY);
  const [errors, setErrors] = React.useState<Errors>({});
  const [submitted, setSubmitted] = React.useState(false);

  const update =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setValues((prev) => ({ ...prev, [key]: e.target.value }));

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = validate(values);
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div
        className={cn(
          "flex flex-col items-center gap-4 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/5 to-transparent p-10 text-center",
          className,
        )}
        role="status"
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-soft text-white shadow-sm">
          <CheckCircle2 className="size-7" aria-hidden />
        </span>
        <h3 className="text-2xl font-semibold">Thank you — message received!</h3>
        <p className="max-w-sm text-muted-foreground text-sm">
          This is a frontend demo, so nothing was actually sent. In production we&apos;d
          reply within one business day.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setValues(EMPTY);
            setSubmitted(false);
          }}
        >
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn("grid gap-5", className)}
      aria-label="Contact form"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <FloatingInput
          id="scf-name"
          label="Full name"
          value={values.name}
          onChange={update("name")}
          error={errors.name}
          placeholder="Jane Doe"
        />
        <FloatingInput
          id="scf-email"
          label="Email address"
          type="email"
          value={values.email}
          onChange={update("email")}
          error={errors.email}
          placeholder="jane@company.com"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FloatingInput
          id="scf-company"
          label="Company"
          value={values.company}
          onChange={update("company")}
          placeholder="Company Inc."
          optional
        />
        <FloatingInput
          id="scf-phone"
          label="Phone"
          type="tel"
          value={values.phone}
          onChange={update("phone")}
          placeholder="+91 8128361116"
          optional
        />
      </div>

      <div className="relative">
        <select
          id="scf-budget"
          name="budget"
          value={values.budget}
          onChange={update("budget")}
          className="peer h-12 w-full rounded-xl border border-input bg-background px-4 pt-2 text-sm text-foreground transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-gold/50 appearance-none cursor-pointer"
        >
          <option value="">Select a range</option>
          <option value="under-2L">Under ₹2L</option>
          <option value="2-5L">₹2L – ₹5L</option>
          <option value="5-15L">₹5L – ₹15L</option>
          <option value="15-50L">₹15L – ₹50L</option>
          <option value="50L+">₹50L+</option>
        </select>
        <label
          htmlFor="scf-budget"
          className="pointer-events-none absolute left-4 top-1.5 text-xs text-gold transition-all duration-200"
        >
          Budget <span className="text-muted-foreground/60">(optional)</span>
        </label>
      </div>

      <FloatingTextarea
        id="scf-message"
        label="Project details"
        value={values.message}
        onChange={update("message")}
        error={errors.message}
        placeholder="Tell us what you're building, your timeline and any references."
      />

      <div className="flex items-center gap-3">
        <Button type="submit" variant="gold" size="lg">
          Send message
          <Send />
        </Button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl border border-border/60 bg-background px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Attach file (placeholder)"
        >
          <Paperclip className="size-4" />
          <span className="hidden sm:inline">Attach file</span>
        </button>
      </div>

      <p className="text-xs text-muted-foreground/60">
        By submitting, you agree to our privacy policy. We&apos;ll never share your data.
      </p>
    </form>
  );
}
