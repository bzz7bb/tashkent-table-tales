import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, BellRing, UtensilsCrossed } from "lucide-react";
import { restaurants } from "@/lib/mock-data";
import { useI18n } from "@/lib/i18n";
import { getTable } from "@/lib/session";

export const Route = createFileRoute("/app/table/$id")({
  component: TableSession,
});

function TableSession() {
  const { id } = Route.useParams();
  const { t } = useI18n();
  const [table, setTable] = useState(7);
  const venue = restaurants.find((r) => r.id === id);

  useEffect(() => {
    setTable(getTable(id));
  }, [id]);

  return (
    <div className="space-y-6">
      <Link
        to="/app/venue/$id"
        params={{ id }}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" strokeWidth={1.75} /> {t("app.back")}
      </Link>

      <div className="rounded-3xl glass-card p-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          {t("table.title")}
        </p>
        <h1 className="mt-2 text-3xl font-extrabold">{venue?.name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("table.number")} #{table}
        </p>
      </div>

      <h2 className="text-center text-lg font-bold">{t("table.choose")}</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <Link
          to="/app/order/$id"
          params={{ id }}
          className="lift rounded-3xl border border-border bg-card p-8 text-center"
        >
          <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-accent text-accent-foreground">
            <UtensilsCrossed className="size-6" strokeWidth={1.75} />
          </div>
          <h3 className="mt-4 text-xl font-bold">{t("table.order")}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{t("table.orderDesc")}</p>
        </Link>

        <Link
          to="/app/bill/$id"
          params={{ id }}
          className="lift rounded-3xl border border-border bg-navy p-8 text-center text-navy-foreground"
        >
          <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary/20 text-primary">
            <BellRing className="size-6" strokeWidth={1.75} />
          </div>
          <h3 className="mt-4 text-xl font-bold">{t("table.waiter")}</h3>
          <p className="mt-2 text-sm text-navy-foreground/75">{t("table.waiterDesc")}</p>
        </Link>
      </div>
    </div>
  );
}
