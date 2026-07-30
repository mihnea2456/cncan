import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="mt-24 border-t border-border bg-brand-deep text-primary-foreground/85">
      <div className="container-page py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-sm bg-gold text-brand-deep font-display">C</div>
            <div>
              <div className="font-display text-lg text-white">CNCAN</div>
              <div className="text-xs opacity-80">{t("site.tagline")}</div>
            </div>
          </div>
          <p className="mt-5 text-sm max-w-md opacity-80">{t("footer.address")}</p>
          <p className="mt-2 text-sm opacity-80">Tel: +40 21 316 05 63 · office@cncan.ro</p>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest text-gold/90 font-sans font-semibold">
            {t("nav.authorizations")}
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/instalatii-nucleare" className="hover:text-white">Instalații nucleare</Link></li>
            <li><Link to="/surse-de-radiatii-ionizante" className="hover:text-white">Surse de radiații ionizante</Link></li>
            <li><Link to="/managementul-calitatii" className="hover:text-white">Managementul calității (SMC)</Link></li>
            <li><Link to="/autorizari" className="hover:text-white">Toate autorizările</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest text-gold/90 font-sans font-semibold">
            {t("nav.about")}
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/despre" className="hover:text-white">Misiune</Link></li>
            <li><Link to="/legislatie" className="hover:text-white">Legea 111/1996</Link></li>
            <li><Link to="/comunicate" className="hover:text-white">Transparență</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-xs opacity-70">
          <span>© {new Date().getFullYear()} CNCAN. {t("footer.rights")}</span>
          <span>{t("site.gov")}</span>
        </div>
      </div>
    </footer>
  );
}
