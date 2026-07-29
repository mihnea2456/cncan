import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { SearchModal } from "@/components/search-modal";

const links = [
  { to: "/", key: "nav.home" as const, exact: true },
  { to: "/autorizari", key: "nav.authorizations" as const },
  { to: "/legislatie", key: "nav.legislation" as const },
  { to: "/comunicate", key: "nav.news" as const },
  { to: "/urgente", key: "nav.emergency" as const },
  { to: "/despre", key: "nav.about" as const },
  { to: "/contact", key: "nav.contact" as const },
];

export function SiteHeader() {
  const { t, lang, setLang } = useI18n();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur-md">
        {/* Gov bar */}
        <div className="bg-brand-deep text-primary-foreground/90 text-[11px] uppercase tracking-[0.14em]">
          <div className="container-page flex h-8 items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-gold" />
              {t("site.gov")}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setLang("ro")}
                className={`px-2 py-0.5 rounded-sm transition-colors ${lang === "ro" ? "bg-white/15 text-white" : "hover:text-white"}`}
                aria-pressed={lang === "ro"}
              >
                RO
              </button>
              <span className="opacity-40">/</span>
              <button
                onClick={() => setLang("en")}
                className={`px-2 py-0.5 rounded-sm transition-colors ${lang === "en" ? "bg-white/15 text-white" : "hover:text-white"}`}
                aria-pressed={lang === "en"}
              >
                EN
              </button>
            </div>
          </div>
        </div>

        {/* Main nav */}
        <div className="container-page flex h-20 items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="grid h-11 w-11 place-items-center rounded-sm bg-brand text-primary-foreground font-display text-lg shadow-sm">
              <span className="tracking-tight">C</span>
            </div>
            <div className="leading-tight">
              <div className="font-display text-lg text-brand-deep">CNCAN</div>
              <div className="text-[11px] text-muted-foreground max-w-[280px] truncate">{t("site.tagline")}</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => {
              const active = l.exact ? pathname === l.to : pathname.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                    active ? "text-brand-deep" : "text-foreground/70 hover:text-brand-deep"
                  }`}
                >
                  {t(l.key)}
                  {active && <span className="absolute inset-x-3 -bottom-[1px] h-[2px] bg-gold" />}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSearchOpen(true)}
              className="hidden md:inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground border-border bg-secondary/50 px-3 h-9"
              aria-label="Search"
            >
              <Search className="h-3.5 w-3.5 text-brand" />
              <span>{lang === "ro" ? "Căutare..." : "Search..."}</span>
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-0.5 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-[10px]">Ctrl+K</span>
              </kbd>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden border-t border-border bg-background">
            <nav className="container-page flex flex-col py-2">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="py-3 border-b border-border/60 text-sm font-medium text-foreground/80"
                >
                  {t(l.key)}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
