import { useState } from "react";
import { MapPin, Users, Music4, X } from "lucide-react";
import { occupancyLevel, tr, type Restaurant } from "@/lib/mock-data";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const levelClass = {
  low: { dot: "bg-success text-success", badge: "bg-success/15 text-success" },
  mid: { dot: "bg-warning text-warning", badge: "bg-warning/20 text-warning" },
  high: { dot: "bg-danger text-danger", badge: "bg-danger/15 text-danger" },
} as const;

export function VibeMap({
  venues,
  onOpen,
  className,
}: {
  venues: Restaurant[];
  onOpen?: (r: Restaurant) => void;
  className?: string;
}) {
  const { t, lang } = useI18n();
  const [active, setActive] = useState<string | null>(null);
  const selected = venues.find((v) => v.id === active) ?? null;

  return (
    <div
      className={cn(
        "relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-border bg-secondary sm:aspect-[16/9]",
        className,
      )}
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      {/* stylized city map */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full">
        <defs>
          <linearGradient id="vc-map-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.96 0.03 190)" />
            <stop offset="100%" stopColor="oklch(0.93 0.04 220)" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill="url(#vc-map-bg)" />
        <g stroke="oklch(0.88 0.03 200)" strokeWidth="0.5">
          {[12, 26, 40, 54, 68, 82, 96].map((y) => (
            <line key={`h${y}`} x1="0" y1={y} x2="100" y2={y} />
          ))}
          {[10, 24, 38, 52, 66, 80, 94].map((x) => (
            <line key={`v${x}`} x1={x} y1="0" x2={x} y2="100" />
          ))}
        </g>
        <path
          d="M0 78 Q 30 62 55 74 T 100 66"
          fill="none"
          stroke="oklch(0.82 0.07 220)"
          strokeWidth="2.4"
        />
        <path
          d="M-5 20 L 60 -5 M 20 105 L 105 40"
          stroke="oklch(0.86 0.04 195)"
          strokeWidth="3"
          fill="none"
        />
        <circle cx="50" cy="48" r="14" fill="oklch(0.9 0.05 165)" opacity="0.5" />
        <circle cx="84" cy="86" r="10" fill="oklch(0.9 0.05 165)" opacity="0.45" />
      </svg>

      {/* pins */}
      {venues.map((v) => {
        const lvl = occupancyLevel(v.occupancy);
        return (
          <button
            key={v.id}
            type="button"
            onClick={() => setActive((cur) => (cur === v.id ? null : v.id))}
            style={{ left: `${v.x}%`, top: `${v.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110 focus:outline-none"
            aria-label={v.name}
          >
            <span className="relative flex flex-col items-center gap-1">
              <span
                className={cn(
                  "grid size-9 place-items-center rounded-full text-background shadow-lg",
                  levelClass[lvl].dot,
                  active === v.id && "ring-4 ring-background/70",
                )}
              >
                <MapPin className="size-4 text-background" strokeWidth={2} />
                <span
                  className={cn(
                    "absolute inset-0 animate-pulse-glow rounded-full opacity-40",
                    levelClass[lvl].dot,
                  )}
                />
              </span>
              <span className="rounded-full bg-card/85 px-2 py-0.5 text-[11px] font-semibold shadow-sm backdrop-blur">
                {v.name}
              </span>
            </span>
          </button>
        );
      })}

      {/* popover */}
      {selected && (
        <div
          key={selected.id}
          style={{
            left: `${Math.min(Math.max(selected.x, 22), 78)}%`,
            top: `${Math.min(selected.y + 8, 72)}%`,
          }}
          className="absolute w-60 -translate-x-1/2 animate-pop-in rounded-2xl glass-card p-4"
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
            aria-label="Close"
          >
            <X className="size-4" strokeWidth={1.75} />
          </button>
          <p className="pr-6 text-sm font-bold">{selected.name}</p>
          <div className="mt-3 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">{t("map.occupancy")}</span>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 font-bold",
                  levelClass[occupancyLevel(selected.occupancy)].badge,
                )}
              >
                {selected.occupancy}%
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-1 text-muted-foreground">
                <Music4 className="size-3.5" strokeWidth={1.75} /> {t("map.vibe")}
              </span>
              <span className="text-right font-medium">{tr(selected.vibe, lang)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-muted-foreground">
                <Users className="size-3.5" strokeWidth={1.75} /> {t("map.free")}
              </span>
              <span className="font-medium">
                {selected.freeTables} {t("map.tables")}
              </span>
            </div>
          </div>
          {onOpen && (
            <button
              type="button"
              onClick={() => onOpen(selected)}
              className="mt-3 w-full rounded-xl bg-primary py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              {t("map.open")}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
