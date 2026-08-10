import { createFileRoute, Link } from "@tanstack/react-router";
import { Map as MapIcon, ReceiptText, Zap, ArrowRight, TrendingUp, HeartHandshake } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { VibeMap } from "@/components/VibeMap";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { landingPins, restaurants } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VibeCheck — Toshkent restoranlarining jonli xaritasi" },
      {
        name: "description",
        content:
          "Real vaqtdagi bandlik, stol QR orqali jonli hisob va Click/Payme bilan bir zumda to'lov.",
      },
      { property: "og:title", content: "VibeCheck — Toshkent restoranlarining jonli xaritasi" },
      {
        property: "og:description",
        content: "Jonli vibe xaritasi, QR hisob va bir tegishda to'lov — Toshkent uchun.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  const { t } = useI18n();
  const pins = restaurants.filter((r) => landingPins.includes(r.id));

  const steps = [
    { icon: MapIcon, title: t("how.1.title"), text: t("how.1.text") },
    { icon: ReceiptText, title: t("how.2.title"), text: t("how.2.text") },
    { icon: Zap, title: t("how.3.title"), text: t("how.3.text") },
  ];

  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden soft-gradient">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-24">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card/70 px-3 py-1 text-xs font-semibold text-secondary-foreground backdrop-blur">
              <span className="size-2 animate-pulse-glow rounded-full bg-danger text-danger" />
              {t("hero.badge")}
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] md:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="mt-5 max-w-lg text-base text-muted-foreground md:text-lg">
              {t("hero.sub")}
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="group rounded-2xl px-7">
                <Link to="/signup">
                  {t("hero.cta")}
                  <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="animate-rise">
            <VibeMap venues={pins} />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-center text-3xl font-extrabold md:text-4xl">{t("how.title")}</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <article key={s.title} className="lift rounded-3xl border border-border bg-card p-7">
              <div className="grid size-12 place-items-center rounded-2xl bg-accent text-secondary-foreground">
                <s.icon className="size-5" strokeWidth={1.75} />
              </div>
              <p className="mt-5 text-xs font-bold uppercase tracking-widest text-primary">
                0{i + 1}
              </p>
              <h3 className="mt-1 text-xl font-bold">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* B2B */}
      <section id="business" className="bg-navy text-navy-foreground">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="max-w-2xl text-3xl font-extrabold md:text-4xl">{t("b2b.title")}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              { icon: TrendingUp, title: t("b2b.1.title"), text: t("b2b.1.text") },
              { icon: HeartHandshake, title: t("b2b.2.title"), text: t("b2b.2.text") },
            ].map((c) => (
              <article
                key={c.title}
                className="rounded-3xl border border-primary/25 bg-primary/10 p-7 backdrop-blur"
              >
                <c.icon className="size-6 text-primary" strokeWidth={1.75} />
                <h3 className="mt-4 text-xl font-bold">{c.title}</h3>
                <p className="mt-2 text-sm text-navy-foreground/75">{c.text}</p>
              </article>
            ))}
          </div>
          <Button asChild size="lg" variant="secondary" className="mt-10 rounded-2xl px-7">
            <Link to="/signup">{t("b2b.cta")}</Link>
          </Button>
        </div>
      </section>

      {/* Interactive map demo */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold md:text-4xl">{t("map.title")}</h2>
          <p className="mt-3 text-sm text-muted-foreground">{t("map.sub")}</p>
        </div>
        <div className="mt-10">
          <VibeMap venues={pins} />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
