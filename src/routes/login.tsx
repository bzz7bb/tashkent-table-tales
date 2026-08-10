import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Kirish — VibeCheck" },
      { name: "description", content: "VibeCheck hisobingizga kiring va jonli xaritani oching." },
      { property: "og:title", content: "Kirish — VibeCheck" },
      { property: "og:description", content: "VibeCheck hisobingizga kiring." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { t } = useI18n();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errs>({});

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: Errs = {};
    if (!/^([^@\s]+@[^@\s]+\.[^@\s]+|\+?\d{7,})$/.test(contact.trim()))
      next.contact = t("auth.err.contact");
    if (password.length < 6) next.password = t("auth.err.password");
    setErrors(next);
    if (Object.keys(next).length) return;
    login({ name: contact.split("@")[0] || "Mehmon", contact: contact.trim() });
    navigate({ to: "/app" });
  }

  return (
    <AuthShell title={t("auth.login.title")} subtitle={t("auth.login.sub")}>
      <form onSubmit={submit} className="space-y-4" noValidate>
        <Field
          id="contact"
          label={t("auth.contact")}
          value={contact}
          onChange={setContact}
          error={errors.contact}
        />
        <Field
          id="password"
          type="password"
          label={t("auth.password")}
          value={password}
          onChange={setPassword}
          error={errors.password}
        />
        <a href="#" className="block text-right text-xs font-medium text-primary">
          {t("auth.forgot")}
        </a>
        <Button type="submit" className="w-full rounded-xl" size="lg">
          {t("auth.submit.login")}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        {t("auth.noAccount")}{" "}
        <Link to="/signup" className="font-semibold text-primary">
          {t("nav.signup")}
        </Link>
      </p>
    </AuthShell>
  );
}

export type Errs = {
  name?: string | undefined;
  contact?: string | undefined;
  password?: string | undefined;
  confirm?: string | undefined;
};

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col soft-gradient">
      <div className="flex items-center justify-between px-4 py-5">
        <Logo />
        <LanguageSwitcher />
      </div>
      <div className="flex flex-1 items-center justify-center px-4 pb-16">
        <div className="w-full max-w-md animate-pop-in rounded-3xl glass-card p-8">
          <h1 className="text-2xl font-extrabold">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-7">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string | undefined;
  type?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs font-semibold">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl bg-card"
        aria-invalid={!!error}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
