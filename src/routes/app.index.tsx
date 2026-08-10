import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { VibeMap } from "@/components/VibeMap";
import { cuisines, occupancyLevel, restaurants, tr, type Restaurant } from "@/lib/mock-data";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/")({
  component: AppMap,
});

const badge = {
  low: "bg-success/15 text-success",
  mid: "bg-warning/20 text-warning",
  high: "bg-danger/15 text-danger",
} as const;

function AppMap() {
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Restaurant["cuisine"] | "all">("all");
  const venues = restaurants.filter((r) => filter === "all" || r.cuisine === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold md:text-3xl">{t("app.nearby")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("map.sub")}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase text-muted-foreground">
          {t("map.filters")}
        </span>
        {[{ id: "all" as const, label: t("map.all") }, ...cuisines.map((c) => ({ id: c.id, label: tr(c.label, lang) }))].map(
          (c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setFilter(c.id)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
                filter === c.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:bg-secondary",
              )}
            >
              {c.label}
            </button>
          ),
        )}
      </div>

      <VibeMap venues={venues} onOpen={(r) => navigate({ to: "/app/venue/$id", params: { id: r.id } })} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {venues.map((r) => (
          <Link
            key={r.id}
            to="/app/venue/$id"
            params={{ id: r.id }}
            className="lift overflow-hidden rounded-3xl border border-border bg-card"
          >
            <img
              src={r.image}
              alt={r.name}
              loading="lazy"
              width={1024}
              height={640}
              className="h-36 w-full object-cover"
            />
            <div className="p-4">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-bold">{r.name}</h2>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs font-bold",
                    badge[occupancyLevel(r.occupancy)],
                  )}
                >
                  {r.occupancy}%
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{tr(r.vibe, lang)}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                {t("map.free")}: {r.freeTables} {t("map.tables")}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
