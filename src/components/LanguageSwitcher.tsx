import { Globe } from "lucide-react";
import { useI18n, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { lang, setLang } = useI18n();
  const langs: Lang[] = ["uz", "ru"];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-border bg-card/70 p-1 backdrop-blur",
        className,
      )}
    >
      <Globe className="ml-1.5 size-3.5 text-muted-foreground" strokeWidth={1.75} />
      {langs.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-semibold uppercase transition-colors",
            lang === l
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
