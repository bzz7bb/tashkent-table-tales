import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut, Map, User } from "lucide-react";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";

export function AppHeader() {
  const { t } = useI18n();
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <Logo />
        <nav className="flex items-center gap-1">
          <Link
            to="/app"
            activeOptions={{ exact: true }}
            activeProps={{ className: "bg-accent text-accent-foreground" }}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Map className="size-4" strokeWidth={1.75} />
            <span className="hidden sm:inline">{t("nav.map")}</span>
          </Link>
          <Link
            to="/app/profile"
            activeProps={{ className: "bg-accent text-accent-foreground" }}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <User className="size-4" strokeWidth={1.75} />
            <span className="hidden sm:inline">{t("nav.profile")}</span>
          </Link>
          <LanguageSwitcher className="ml-1" />
          <button
            type="button"
            onClick={() => {
              logout();
              navigate({ to: "/", replace: true });
            }}
            className="ml-1 grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label={t("nav.logout")}
          >
            <LogOut className="size-4" strokeWidth={1.75} />
          </button>
        </nav>
      </div>
    </header>
  );
}
