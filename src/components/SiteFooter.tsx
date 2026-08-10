import { useState } from "react";
import { Instagram, Send, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useI18n();
  const [done, setDone] = useState(false);

  return (
    <footer id="contact" className="border-t border-border/60 bg-card/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <h3 className="text-base font-bold">{t("footer.about")}</h3>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">{t("footer.desc")}</p>
          <p className="mt-4 text-sm text-muted-foreground">hello@vibecheck.uz · +998 71 200 00 00</p>
        </div>

        <div>
          <h3 className="text-base font-bold">{t("footer.legal")}</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="#" className="transition-colors hover:text-primary">
                {t("footer.privacy")}
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-primary">
                {t("footer.terms")}
              </a>
            </li>
          </ul>
          <h3 className="mt-6 text-base font-bold">{t("footer.social")}</h3>
          <div className="mt-3 flex gap-3">
            {[Instagram, Send, Facebook].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid size-9 place-items-center rounded-xl border border-border bg-background text-primary transition-colors hover:bg-accent"
              >
                <Icon className="size-4" strokeWidth={1.75} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-base font-bold">{t("footer.news")}</h3>
          <form
            className="mt-3 space-y-2"
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
          >
            <Input type="email" required placeholder={t("footer.email")} className="rounded-xl" />
            <Button type="submit" className="w-full rounded-xl">
              {t("footer.subscribe")}
            </Button>
            {done && <p className="text-xs text-primary">{t("footer.subscribed")}</p>}
          </form>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} VibeCheck. {t("footer.rights")}
      </div>
    </footer>
  );
}
