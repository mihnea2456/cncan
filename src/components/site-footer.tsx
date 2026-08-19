import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export function SiteFooter() {
  const { t, lang } = useI18n();
  return (
    <footer className="mt-24 border-t border-border bg-brand-deep text-primary-foreground/85">
      <div className="container-page py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <img src="/images/guvern_logo.png" alt="Guvernul României" className="h-12 w-auto object-contain bg-white rounded-sm p-1" />
            <div className="hidden sm:block w-px h-10 bg-white/20"></div>
            <div className="flex items-center gap-3">
              <img src="/images/logo.jpg" alt="CNCAN Logo" className="h-10 w-10 object-contain rounded-sm bg-white p-0.5" />
              <div>
                <div className="font-display text-lg text-white">CNCAN</div>
                <div className="text-xs opacity-80">{t("site.tagline")}</div>
              </div>
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
            <li><Link to="/instalatii-nucleare" className="hover:text-white">{lang === "ro" ? "Instalații nucleare" : "Nuclear Facilities"}</Link></li>
            <li><Link to="/constructii-nucleare" className="hover:text-white">{lang === "ro" ? "Construcții cu specific nuclear" : "Nuclear-specific Constructions"}</Link></li>
            <li><Link to="/transport-materiale-radioactive" className="hover:text-white">{lang === "ro" ? "Transport materiale radioactive" : "Transport of Radioactive Materials"}</Link></li>
            <li><Link to="/deseuri-radioactive" className="hover:text-white">{lang === "ro" ? "Deșeuri radioactive" : "Radioactive Waste"}</Link></li>
            <li><Link to="/surse-de-radiatii-ionizante" className="hover:text-white">{lang === "ro" ? "Surse de radiații ionizante" : "Ionizing Radiation Sources"}</Link></li>
            <li><Link to="/managementul-calitatii" className="hover:text-white">{lang === "ro" ? "Managementul calității (SMC)" : "Quality Management (QMS)"}</Link></li>
            <li><Link to="/autorizari" className="hover:text-white">{lang === "ro" ? "Toate autorizările" : "All Authorizations"}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest text-gold/90 font-sans font-semibold">
            {t("nav.about")}
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/despre" className="hover:text-white">{lang === "ro" ? "Misiune" : "Mission"}</Link></li>
            <li><Link to="/legislatie" className="hover:text-white">{lang === "ro" ? "Legea 111/1996" : "Law 111/1996"}</Link></li>
            <li><Link to="/integritate" className="hover:text-white">{lang === "ro" ? "Integritate Instituțională" : "Institutional Integrity"}</Link></li>
            <li><Link to="/contact" className="hover:text-white">{lang === "ro" ? "Contact" : "Contact"}</Link></li>
            <li><Link to="/informatii-publice" className="hover:text-white">{lang === "ro" ? "Informații de interes public" : "Public Interest Information"}</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-xs opacity-70">
          <div className="flex gap-4">
            <span>© {new Date().getFullYear()} CNCAN. {t("footer.rights")}</span>
          </div>
          <span>{t("site.gov")}</span>
        </div>
      </div>
    </footer>
  );
}
