"use client";

import * as React from "react";
import { CheckCircle2, Send } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/button";

interface FormState {
  name: string;
  email: string;
  company: string;
  budget: string;
  message: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

const EMPTY: FormState = {
  name: "",
  email: "",
  company: "",
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
        <p id={`${id}-err`} className="mt-1.5 text-xs text-destructive px-1">
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
        <p id={`${id}-err`} className="mt-1.5 text-xs text-destructive px-1">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm({ className }: { className?: string }) {
  const [values, setValues] = React.useState<FormState>(EMPTY);
  const [errors, setErrors] = React.useState<Errors>({});
  const [submitted, setSubmitted] = React.useState(false);

  const update =
    (key: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setValues(prev => ({ ...prev, [key]: e.target.value }));

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
        <h3 className="text-2xl font-semibold">
          Thank you &mdash; message received!
        </h3>
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
          id="cf-name"
          label="Name"
          value={values.name}
          onChange={update("name")}
          error={errors.name}
          placeholder="Jane Doe"
        />
        <FloatingInput
          id="cf-email"
          label="Email"
          type="email"
          value={values.email}
          onChange={update("email")}
          error={errors.email}
          placeholder="jane@company.com"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FloatingInput
          id="cf-company"
          label="Company"
          value={values.company}
          onChange={update("company")}
          placeholder="Company Inc."
          optional
        />
        <div className="relative">
          <select
            id="cf-budget"
            name="budget"
            value={values.budget}
            onChange={update("budget")}
            className="peer h-12 w-full rounded-xl border border-input bg-background px-4 pt-2 text-sm text-foreground transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-gold/50 appearance-none cursor-pointer"
          >
            <option value="">Select a range</option>
            <option value="<5k">&lt; $5k</option>
            <option value="5-15k">$5k &ndash; $15k</option>
            <option value="15-50k">$15k &ndash; $50k</option>
            <option value="50k+">$50k+</option>
          </select>
          <label
            htmlFor="cf-budget"
            className="pointer-events-none absolute left-4 top-1.5 text-xs text-gold transition-all duration-200"
          >
            Budget <span className="text-muted-foreground/60">(optional)</span>
          </label>
        </div>
      </div>

      <FloatingTextarea
        id="cf-message"
        label="Project details"
        value={values.message}
        onChange={update("message")}
        error={errors.message}
        placeholder="Tell us what you're building, your timeline and any references."
      />

      <Button type="submit" variant="gold" size="lg" className="w-full sm:w-auto">
        Send message
        <Send />
      </Button>
    </form>
  );
}
