import { useState } from "react";
import { Banknote, CreditCard, CheckCircle2, Users } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useI18n, formatUZS } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Method = "cash" | "click" | "payme";

export function PaymentPanel({ total, allowSplit = false }: { total: number; allowSplit?: boolean }) {
  const { t } = useI18n();
  const [method, setMethod] = useState<Method>("click");
  const [split, setSplit] = useState(false);
  const [people, setPeople] = useState(2);
  const [custom, setCustom] = useState("");
  const [paid, setPaid] = useState(false);

  const share = split
    ? custom
      ? Math.min(Number(custom) || 0, total)
      : Math.round(total / people)
    : total;

  if (paid) {
    return (
      <div className="animate-pop-in rounded-3xl glass-card p-8 text-center">
        <CheckCircle2 className="mx-auto size-14 text-primary" strokeWidth={1.5} />
        <h2 className="mt-4 text-2xl font-extrabold">{t("pay.done")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t("pay.doneSub")}</p>
        <p className="mt-5 text-3xl font-extrabold text-primary">{formatUZS(share)}</p>
        <Button asChild className="mt-7 rounded-xl" size="lg">
          <Link to="/app">{t("pay.back")}</Link>
        </Button>
      </div>
    );
  }

  const methods: { id: Method; label: string; icon: typeof Banknote }[] = [
    { id: "cash", label: t("pay.cash"), icon: Banknote },
    { id: "click", label: "Click", icon: CreditCard },
    { id: "payme", label: "Payme", icon: CreditCard },
  ];

  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <h3 className="text-lg font-bold">{t("pay.title")}</h3>

      {allowSplit && (
        <div className="mt-4 rounded-2xl bg-secondary p-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-semibold">
              <Users className="size-4" strokeWidth={1.75} /> {t("pay.split")}
            </span>
            <button
              type="button"
              onClick={() => setSplit((v) => !v)}
              className={cn(
                "h-6 w-11 rounded-full transition-colors",
                split ? "bg-primary" : "bg-border",
              )}
              aria-pressed={split}
            >
              <span
                className={cn(
                  "block size-5 rounded-full bg-card transition-transform",
                  split ? "translate-x-5" : "translate-x-0.5",
                )}
              />
            </button>
          </div>

          {split && (
            <div className="mt-4 animate-pop-in space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t("pay.people")}</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="size-7 rounded-lg border border-border bg-card"
                    onClick={() => setPeople((p) => Math.max(2, p - 1))}
                  >
                    −
                  </button>
                  <span className="w-5 text-center font-bold">{people}</span>
                  <button
                    type="button"
                    className="size-7 rounded-lg border border-border bg-card"
                    onClick={() => setPeople((p) => Math.min(12, p + 1))}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-muted-foreground">{t("pay.splitCustom")}</span>
                <input
                  value={custom}
                  onChange={(e) => setCustom(e.target.value.replace(/\D/g, ""))}
                  placeholder={String(Math.round(total / people))}
                  inputMode="numeric"
                  className="w-32 rounded-lg border border-border bg-card px-2 py-1 text-right text-sm"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {t("pay.perPerson")}: {formatUZS(Math.round(total / people))}
              </p>
            </div>
          )}
        </div>
      )}

      <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {t("pay.method")}
      </p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {methods.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMethod(m.id)}
            className={cn(
              "flex flex-col items-center gap-1.5 rounded-2xl border p-3 text-xs font-semibold transition-colors",
              method === m.id
                ? "border-primary bg-accent text-accent-foreground"
                : "border-border bg-background text-muted-foreground hover:bg-secondary",
            )}
          >
            <m.icon className="size-4" strokeWidth={1.75} />
            {m.label}
          </button>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
        <span className="text-sm text-muted-foreground">
          {split ? t("pay.yourShare") : t("cart.total")}
        </span>
        <span className="text-2xl font-extrabold">{formatUZS(share)}</span>
      </div>

      <Button
        size="lg"
        className="mt-4 w-full rounded-xl"
        disabled={total <= 0}
        onClick={() => setPaid(true)}
      >
        {t("pay.pay")}
      </Button>
    </div>
  );
}
