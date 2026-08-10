import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, MapPin, QrCode, ScanLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { occupancyLevel, restaurants, tr } from "@/lib/mock-data";
import { useI18n } from "@/lib/i18n";
import { startSession } from "@/lib/session";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/venue/$id")({
  component: VenueDetail,
});

const badge = {
  low: "bg-success/15 text-success",
  mid: "bg-warning/20 text-warning",
  high: "bg-danger/15 text-danger",
} as const;

function VenueDetail() {
  const { id } = Route.useParams();
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [scanning, setScanning] = useState(false);
  const venue = restaurants.find((r) => r.id === id);

  if (!venue) {
    return (
      <div className="py-20 text-center">
        <p className="text-muted-foreground">404</p>
        <Link to="/app" className="text-primary">
          {t("app.back")}
        </Link>
      </div>
    );
  }

  function scan() {
    if (!venue) return;
    setScanning(true);
    startSession(venue.id);
    setTimeout(() => {
      setScanning(false);
      setOpen(false);
      navigate({ to: "/app/table/$id", params: { id: venue.id } });
    }, 1400);
  }

  return (
    <div className="space-y-6">
      <Link
        to="/app"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" strokeWidth={1.75} /> {t("app.back")}
      </Link>

      <div className="overflow-hidden rounded-3xl border border-border bg-card">
        <img
          src={venue.image}
          alt={venue.name}
          width={1024}
          height={640}
          className="h-56 w-full object-cover md:h-72"
        />
        <div className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-extrabold md:text-3xl">{venue.name}</h1>
              <p className="mt-1 text-sm capitalize text-muted-foreground">{venue.cuisine}</p>
            </div>
            <span
              className={cn(
                "rounded-full px-3 py-1 text-sm font-bold",
                badge[occupancyLevel(venue.occupancy)],
              )}
            >
              {t("map.occupancy")}: {venue.occupancy}%
            </span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <Info label={t("map.vibe")} value={tr(venue.vibe, lang)} />
            <Info label={t("map.free")} value={`${venue.freeTables} ${t("map.tables")}`} />
            <Info label={t("app.detail.address")} value={tr(venue.address, lang)} icon />
          </div>

          <Button size="lg" className="mt-6 w-full rounded-2xl sm:w-auto" onClick={() => setOpen(true)}>
            <QrCode className="mr-1 size-4" strokeWidth={1.75} />
            {t("app.detail.scan")}
          </Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-3xl sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>{t("scan.title")}</DialogTitle>
          </DialogHeader>
          <div className="relative mx-auto grid aspect-square w-56 place-items-center overflow-hidden rounded-2xl border-2 border-dashed border-primary/50 bg-secondary">
            <QrCode className="size-24 text-primary/70" strokeWidth={1} />
            {scanning && (
              <span className="absolute inset-x-0 top-0 h-1 animate-[rise_1.2s_ease-in-out_infinite] bg-primary" />
            )}
          </div>
          <p className="text-center text-sm text-muted-foreground">
            {scanning ? t("scan.scanning") : t("scan.hint")}
          </p>
          <Button className="w-full rounded-xl" onClick={scan} disabled={scanning}>
            <ScanLine className="mr-1 size-4" strokeWidth={1.75} />
            {t("scan.simulate")}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Info({ label, value, icon }: { label: string; value: string; icon?: boolean }) {
  return (
    <div className="rounded-2xl bg-secondary p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 flex items-start gap-1.5 text-sm font-medium">
        {icon && <MapPin className="mt-0.5 size-3.5 shrink-0 text-primary" strokeWidth={1.75} />}
        {value}
      </p>
    </div>
  );
}
