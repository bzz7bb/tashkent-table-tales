import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PaymentPanel } from "@/components/PaymentPanel";
import { menu, restaurants, tr } from "@/lib/mock-data";
import { formatUZS, useI18n } from "@/lib/i18n";
import { getTable } from "@/lib/session";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/bill/$id")({
  component: LiveBill,
});

const sequence = ["m2", "m4", "m9", "m5", "m11"];

function LiveBill() {
  const { id } = Route.useParams();
  const { t, lang } = useI18n();
  const [table, setTable] = useState(7);
  const [count, setCount] = useState(0);
  const [finalized, setFinalized] = useState(false);
  const venue = restaurants.find((r) => r.id === id);

  useEffect(() => setTable(getTable(id)), [id]);

  useEffect(() => {
    if (finalized || count >= sequence.length) return;
    const timer = setTimeout(() => setCount((c) => c + 1), count === 0 ? 1600 : 2600);
    return () => clearTimeout(timer);
  }, [count, finalized]);

  const items = sequence
    .slice(0, count)
    .map((mid) => menu.find((m) => m.id === mid))
    .filter(Boolean) as (typeof menu)[number][];
  const total = items.reduce((s, i) => s + i.price, 0);

  const status =
    count === 0
      ? t("bill.status.notified")
      : count < sequence.length
        ? t("bill.status.preparing")
        : finalized
          ? t("bill.status.final")
          : t("bill.status.updating");

  return (
    <div className="space-y-6">
      <Link
        to="/app/table/$id"
        params={{ id }}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" strokeWidth={1.75} /> {t("app.back")}
      </Link>

      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <div className="rounded-3xl border border-border bg-card p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-extrabold">{t("bill.title")}</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {venue?.name} · {t("table.number")} #{table}
              </p>
            </div>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold",
                finalized ? "bg-secondary text-secondary-foreground" : "bg-danger/15 text-danger",
              )}
            >
              <Radio className={cn("size-3.5", !finalized && "animate-pulse")} strokeWidth={2} />
              {finalized ? t("bill.status.final") : t("bill.live")}
            </span>
          </div>

          <div className="mt-5 rounded-2xl bg-secondary p-4 text-sm font-semibold text-secondary-foreground">
            {status}
          </div>

          <ul className="mt-5 divide-y divide-border">
            {items.length === 0 && (
              <li className="py-6 text-center text-sm text-muted-foreground">{t("bill.waiting")}</li>
            )}
            {items.map((i, idx) => (
              <li
                key={`${i.id}-${idx}`}
                className="flex animate-pop-in items-center justify-between gap-3 py-3 text-sm"
              >
                <span>{tr(i.name, lang)}</span>
                <span className="font-semibold">{formatUZS(i.price)}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
            <span className="text-sm text-muted-foreground">{t("cart.total")}</span>
            <span
              className={cn(
                "text-3xl font-extrabold text-primary",
                !finalized && count > 0 && "animate-pulse",
              )}
            >
              {formatUZS(total)}
            </span>
          </div>

          {!finalized && (
            <Button
              variant="outline"
              className="mt-4 w-full rounded-xl"
              onClick={() => {
                setCount(sequence.length);
                setFinalized(true);
              }}
            >
              {t("bill.finalize")}
            </Button>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          {finalized ? (
            <PaymentPanel total={total} allowSplit />
          ) : (
            <div className="rounded-3xl border border-dashed border-border bg-card/60 p-6 text-center text-sm text-muted-foreground">
              {t("bill.status.updating")}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
