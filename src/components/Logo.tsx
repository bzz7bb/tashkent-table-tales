import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({ className, dark = false }: { className?: string; dark?: boolean }) {
  return (
    <Link to="/" className={cn("inline-flex items-center gap-2", className)}>
      <span className="relative grid size-8 place-items-center rounded-xl brand-gradient">
        <span className="size-2.5 rounded-full bg-background" />
        <span className="absolute inset-0 rounded-xl ring-2 ring-primary/25" />
      </span>
      <span
        className={cn(
          "text-lg font-extrabold tracking-tight",
          dark ? "text-navy-foreground" : "text-foreground",
        )}
      >
        Vibe<span className="text-primary">Check</span>
      </span>
    </Link>
  );
}
