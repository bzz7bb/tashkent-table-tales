import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PaymentPanel } from "@/components/PaymentPanel";
import { dishImage, menu, menuCategories, restaurants, tr } from "@/lib/mock-data";
import { formatUZS, useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/app/order/$id")({
  component: OrderPage,
});

function OrderPage() {
  const { id } = Route.useParams();
  const { t, lang } = useI18n();
  const [cart, setCart] = useState<Record<string, number>>({});
  const [checkout, setCheckout] = useState(false);
  const venue = restaurants.find((r) => r.id === id);

  const lines = useMemo(
    () =>
      menu
        .filter((m) => (cart[m.id] ?? 0) > 0)
        .map((m) => ({ item: m, qty: cart[m.id] ?? 0, sum: (cart[m.id] ?? 0) * m.price })),
    [cart],
  );
  const total = lines.reduce((s, l) => s + l.sum, 0);

  const add = (mid: string, delta: number) =>
    setCart((c) => {
      const next = Math.max(0, (c[mid] ?? 0) + delta);
      const copy = { ...c };
      if (next === 0) delete copy[mid];
      else copy[mid] = next;
      return copy;
    });

  return (
    <div className="space-y-6">
      <Link
        to="/app/table/$id"
        params={{ id }}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" strokeWidth={1.75} /> {t("app.back")}
      </Link>

      <h1 className="text-2xl font-extrabold md:text-3xl">
        {t("menu.title")} · {venue?.name}
      </h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-10">
          {menuCategories.map((cat) => (
            <section key={cat}>
              <h2 className="text-lg font-bold">{t(`menu.cat.${cat}`)}</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {menu
                  .filter((m) => m.category === cat)
                  .map((m) => (
                    <article
                      key={m.id}
                      className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3"
                    >
                      <img
                        src={dishImage}
                        alt={tr(m.name, lang)}
                        loading="lazy"
                        width={1024}
                        height={1024}
                        className="size-16 shrink-0 rounded-xl object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold">{tr(m.name, lang)}</p>
                        <p className="truncate text-xs text-muted-foreground">{tr(m.desc, lang)}</p>
                        <p className="mt-1 text-sm font-semibold text-primary">
                          {formatUZS(m.price)}
                        </p>
                      </div>
                      {(cart[m.id] ?? 0) > 0 ? (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => add(m.id, -1)}
                            className="grid size-7 place-items-center rounded-lg border border-border"
                          >
                            <Minus className="size-3.5" strokeWidth={2} />
                          </button>
                          <span className="w-4 text-center text-sm font-bold">{cart[m.id]}</span>
                          <button
                            type="button"
                            onClick={() => add(m.id, 1)}
                            className="grid size-7 place-items-center rounded-lg bg-primary text-primary-foreground"
                          >
                            <Plus className="size-3.5" strokeWidth={2} />
                          </button>
                        </div>
                      ) : (
                        <Button size="sm" className="rounded-xl" onClick={() => add(m.id, 1)}>
                          {t("menu.add")}
                        </Button>
                      )}
                    </article>
                  ))}
              </div>
            </section>
          ))}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          {checkout ? (
            <PaymentPanel total={total} />
          ) : (
            <div className="rounded-3xl border border-border bg-card p-5">
              <h2 className="flex items-center gap-2 text-lg font-bold">
                <ShoppingBag className="size-4" strokeWidth={1.75} /> {t("cart.title")}
              </h2>
              {lines.length === 0 ? (
                <p className="mt-4 text-sm text-muted-foreground">{t("cart.empty")}</p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {lines.map((l) => (
                    <li key={l.item.id} className="flex justify-between gap-3 text-sm">
                      <span className="text-muted-foreground">
                        {l.qty}× {tr(l.item.name, lang)}
                      </span>
                      <span className="font-semibold">{formatUZS(l.sum)}</span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <span className="text-sm text-muted-foreground">{t("cart.total")}</span>
                <span className="text-xl font-extrabold">{formatUZS(total)}</span>
              </div>
              <Button
                className="mt-4 w-full rounded-xl"
                size="lg"
                disabled={total === 0}
                onClick={() => setCheckout(true)}
              >
                {t("cart.checkout")}
              </Button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
