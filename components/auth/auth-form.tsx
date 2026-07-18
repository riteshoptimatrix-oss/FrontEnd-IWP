"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { m, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/auth-store";
import { Button } from "@/components/button";
import {
  loginSchema,
  registerSchema,
  type LoginInput,
  type RegisterInput,
} from "@/lib/validations";

type AuthFormMode = "login" | "register";

export function AuthForm({ mode }: { mode: AuthFormMode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { login, register, isLoading, clearError } = useAuthStore();
  const [showPassword, setShowPassword] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  const isLogin = mode === "login";

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember_me: false },
  });

  const registerForm = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { full_name: "", email: "", password: "", company: "" },
  });

  const form = isLogin ? loginForm : registerForm;

  React.useEffect(() => setMounted(true), []);
  React.useEffect(() => clearError, [pathname]);

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      if (isLogin) {
        await login({
          email: data.email,
          password: data.password,
          remember_me: (data as LoginInput).remember_me,
        });
        toast.success("Welcome back!", {
          description: "You have been signed in successfully.",
        });
      } else {
        const regData = data as RegisterInput;
        await register({
          full_name: regData.full_name,
          email: regData.email,
          password: regData.password,
          company: regData.company || undefined,
        });
        toast.success("Account created!", {
          description: "Welcome to India Web Programmers.",
        });
      }
      router.push("/dashboard");
    } catch (err: unknown) {
      const message =
        (err as { message?: string })?.message || "Something went wrong.";
      toast.error("Authentication failed", { description: message });
    }
  });

  if (!mounted) return null;

  const {
    register: reg,
    formState: { errors: loginErrors },
  } = loginForm;

  const {
    register: rReg,
    formState: { errors: registerErrors },
  } = registerForm;

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {isLogin ? (
          <LoginFormFields
            register={reg}
            errors={loginErrors}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword((v) => !v)}
          />
        ) : (
          <RegisterFormFields
            register={rReg}
            errors={registerErrors}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword((v) => !v)}
          />
        )}

        {isLogin && (
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                {...loginForm.register("remember_me")}
                className="size-4 rounded border-border accent-gold"
              />
              Remember me
            </label>
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-gold transition-colors hover:text-gold/80"
            >
              Forgot password?
            </Link>
          </div>
        )}

        <Button
          type="submit"
          variant="gold"
          size="lg"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : isLogin ? (
            "Sign In"
          ) : (
            "Create Account"
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {isLogin ? (
          <>
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-gold hover:text-gold/80">
              Create one
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-gold hover:text-gold/80">
              Sign in
            </Link>
          </>
        )}
      </p>
    </m.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Login Form Fields                                                  */
/* ------------------------------------------------------------------ */

function LoginFormFields({
  register,
  errors,
  showPassword,
  onTogglePassword,
}: {
  register: any;
  errors: any;
  showPassword: boolean;
  onTogglePassword: () => void;
}) {
  return (
    <>
      <FieldInput
        label="Email"
        type="email"
        placeholder="you@company.com"
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />
      <div className="relative">
        <FieldInput
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password")}
        />
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute right-3 top-[38px] text-muted-foreground/50 transition-colors hover:text-muted-foreground"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Register Form Fields                                               */
/* ------------------------------------------------------------------ */

function RegisterFormFields({
  register,
  errors,
  showPassword,
  onTogglePassword,
}: {
  register: any;
  errors: any;
  showPassword: boolean;
  onTogglePassword: () => void;
}) {
  return (
    <>
      <FieldInput
        label="Full Name"
        type="text"
        placeholder="John Doe"
        autoComplete="name"
        error={errors.full_name?.message}
        {...register("full_name")}
      />
      <FieldInput
        label="Company"
        type="text"
        placeholder="Optional"
        autoComplete="organization"
        error={errors.company?.message}
        {...register("company")}
      />
      <FieldInput
        label="Email"
        type="email"
        placeholder="you@company.com"
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />
      <div className="relative">
        <FieldInput
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Min. 8 characters"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password")}
        />
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute right-3 top-[38px] text-muted-foreground/50 transition-colors hover:text-muted-foreground"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Shared Field Input                                                 */
/* ------------------------------------------------------------------ */

const FieldInput = React.forwardRef<
  HTMLInputElement,
  {
    label: string;
    type: string;
    placeholder?: string;
    autoComplete?: string;
    error?: string;
    className?: string;
  } & React.InputHTMLAttributes<HTMLInputElement>
>(({ label, type, placeholder, autoComplete, error, className, ...rest }, ref) => {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={cn(
          "w-full rounded-xl border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 transition-all duration-200 outline-none",
          "focus:border-gold focus:ring-2 focus:ring-gold/20",
          "dark:bg-ink/50 dark:border-border dark:text-foreground dark:placeholder:text-muted-foreground/30",
          error
            ? "border-red-400 focus:border-red-500 focus:ring-red-200"
            : "border-border",
          className,
        )}
        {...rest}
      />
      {error && (
        <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500 dark:text-red-400">
          <AlertCircle className="size-3" />
          {error}
        </p>
      )}
    </div>
  );
});
FieldInput.displayName = "FieldInput";
