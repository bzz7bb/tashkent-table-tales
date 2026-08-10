import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Pencil, Star, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { visitHistory } from "@/lib/mock-data";
import { formatUZS, useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/app/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { t, lang } = useI18n();
  const { user, update } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name ?? "");

  const monthTotal = visitHistory
    .filter((v) => v.date.startsWith("2026-08"))
    .reduce((s, v) => s + v.amount, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold md:text-3xl">{t("profile.title")}</h1>

      <div className="flex flex-wrap items-center gap-4 rounded-3xl glass-card p-6">
        <div className="grid size-16 place-items-center rounded-2xl brand-gradient text-xl font-extrabold text-primary-foreground">
          {(user?.name ?? "V").charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          {editing ? (
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="max-w-xs rounded-xl bg-card"
            />
          ) : (
            <p className="text-lg font-bold">{user?.name}</p>
          )}
          <p className="truncate text-sm text-muted-foreground">{user?.contact}</p>
        </div>
        <Button
          variant={editing ? "default" : "outline"}
          className="rounded-xl"
          onClick={() => {
            if (editing) update({ name: name.trim() || (user?.name ?? "") });
            setEditing((v) => !v);
          }}
        >
          <Pencil className="mr-1 size-4" strokeWidth={1.75} />
          {editing ? t("profile.save") : t("profile.edit")}
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat icon={Wallet} label={t("profile.month")} value={formatUZS(monthTotal)} />
        <Stat icon={Star} label={t("profile.favorite")} value="Socials" />
        <Stat icon={Wallet} label={t("profile.visits")} value={String(visitHistory.length)} />
      </div>

      <section className="rounded-3xl border border-border bg-card p-6">
        <h2 className="text-lg font-bold">{t("profile.history")}</h2>
        <ul className="mt-4 divide-y divide-border">
          {visitHistory.map((v) => (
            <li key={v.id} className="flex items-center justify-between gap-3 py-3">
              <div>
                <p className="text-sm font-semibold">{v.restaurant}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(v.date).toLocaleDateString(lang === "uz" ? "uz-UZ" : "ru-RU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <span className="text-sm font-bold">{formatUZS(v.amount)}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Wallet;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5">
      <Icon className="size-5 text-primary" strokeWidth={1.75} />
      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-lg font-extrabold">{value}</p>
    </div>
  );
}
