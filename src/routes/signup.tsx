import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthShell, Field, type Errs } from "@/routes/login";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Ro'yxatdan o'tish — VibeCheck" },
      {
        name: "description",
        content: "VibeCheck'ga qo'shiling: jonli xarita, QR hisob va bir zumda to'lov.",
      },
      { property: "og:title", content: "Ro'yxatdan o'tish — VibeCheck" },
      { property: "og:description", content: "VibeCheck'ga bir daqiqada qo'shiling." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const { t } = useI18n();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", contact: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<Errs>({});
  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: Errs = {};
    if (form.name.trim().length < 2) next.name = t("auth.err.name");
    if (!/^([^@\s]+@[^@\s]+\.[^@\s]+|\+?\d{7,})$/.test(form.contact.trim()))
      next.contact = t("auth.err.contact");
    if (form.password.length < 6) next.password = t("auth.err.password");
    if (form.confirm !== form.password) next.confirm = t("auth.err.match");
    setErrors(next);
    if (Object.keys(next).length) return;
    login({ name: form.name.trim(), contact: form.contact.trim() });
    navigate({ to: "/app" });
  }

  return (
    <AuthShell title={t("auth.signup.title")} subtitle={t("auth.signup.sub")}>
      <form onSubmit={submit} className="space-y-4" noValidate>
        <Field id="name" label={t("auth.name")} value={form.name} onChange={set("name")} error={errors.name} />
        <Field
          id="contact"
          label={t("auth.contact")}
          value={form.contact}
          onChange={set("contact")}
          error={errors.contact}
        />
        <Field
          id="password"
          type="password"
          label={t("auth.password")}
          value={form.password}
          onChange={set("password")}
          error={errors.password}
        />
        <Field
          id="confirm"
          type="password"
          label={t("auth.confirm")}
          value={form.confirm}
          onChange={set("confirm")}
          error={errors.confirm}
        />
        <Button type="submit" className="w-full rounded-xl" size="lg">
          {t("auth.submit.signup")}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        {t("auth.hasAccount")}{" "}
        <Link to="/login" className="font-semibold text-primary">
          {t("nav.login")}
        </Link>
      </p>
    </AuthShell>
  );
}
