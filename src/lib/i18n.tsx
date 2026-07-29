import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ro" | "en";

type Dict = Record<string, { ro: string; en: string }>;

export const dict = {
  "nav.home": { ro: "Acasă", en: "Home" },
  "nav.authorizations": { ro: "Autorizări", en: "Authorizations" },
  "nav.legislation": { ro: "Legislație", en: "Legislation" },
  "nav.news": { ro: "Comunicate", en: "News" },
  "nav.emergency": { ro: "Urgențe", en: "Emergency" },
  "nav.about": { ro: "Despre CNCAN", en: "About CNCAN" },
  "nav.contact": { ro: "Contact", en: "Contact" },

  "site.name": { ro: "CNCAN", en: "CNCAN" },
  "site.tagline": {
    ro: "Comisia Națională pentru Controlul Activităților Nucleare",
    en: "National Commission for Nuclear Activities Control",
  },
  "site.gov": { ro: "Guvernul României", en: "Government of Romania" },

  "home.hero.eyebrow": { ro: "Autoritatea națională de reglementare nucleară", en: "National nuclear regulatory authority" },
  "home.hero.title": {
    ro: "Reglementare, autorizare și supraveghere pentru siguranță nucleară.",
    en: "Regulation, licensing and oversight for nuclear safety.",
  },
  "home.hero.sub": {
    ro: "Portal pentru titulari de autorizație, operatori și profesioniști. Depuneți cereri, consultați legislația în vigoare și urmăriți comunicatele oficiale.",
    en: "A portal for licensees, operators and professionals. Submit applications, consult current legislation, and track official communications.",
  },
  "home.hero.cta.primary": { ro: "Depune o cerere de autorizare", en: "Submit an authorization request" },
  "home.hero.cta.secondary": { ro: "Caută în legislație", en: "Search legislation" },

  "home.tasks.title": { ro: "Sarcini frecvente", en: "Frequent tasks" },
  "home.tasks.sub": { ro: "Fluxuri optimizate pentru titulari și operatori.", en: "Streamlined flows for licensees and operators." },

  "home.stats.licensees": { ro: "Titulari activi", en: "Active licensees" },
  "home.stats.inspections": { ro: "Inspecții / an", en: "Inspections / year" },
  "home.stats.laws": { ro: "Acte normative", en: "Regulatory acts" },
  "home.stats.staff": { ro: "Specialiști", en: "Specialists" },

  "home.news.title": { ro: "Ultimele comunicate", en: "Latest communications" },
  "home.news.all": { ro: "Toate comunicatele", en: "All communications" },

  "home.emergency.badge": { ro: "Informație oficială", en: "Official information" },
  "home.emergency.title": { ro: "În caz de accident nuclear", en: "In case of a nuclear accident" },
  "home.emergency.body": {
    ro: "Ghid oficial cu instrucțiuni de protecție a populației, valabil pe întreg teritoriul României.",
    en: "Official guide with population protection instructions, valid across the territory of Romania.",
  },
  "home.emergency.cta": { ro: "Citește ghidul", en: "Read the guide" },

  "footer.rights": { ro: "Toate drepturile rezervate.", en: "All rights reserved." },
  "footer.address": { ro: "Bd. Libertății nr. 14, Sector 5, București", en: "14 Bd. Libertății, District 5, Bucharest" },

  "auth.title": { ro: "Autorizări și tarife", en: "Authorizations and fees" },
  "auth.sub": {
    ro: "Toate procedurile de autorizare pentru activități nucleare, surse de radiații și construcții cu specific nuclear.",
    en: "All licensing procedures for nuclear activities, radiation sources and nuclear-specific constructions.",
  },

  "leg.title": { ro: "Registrul legislativ", en: "Legislative registry" },
  "leg.sub": {
    ro: "Legi, ordonanțe, hotărâri și norme aplicabile domeniului nuclear din România.",
    en: "Laws, ordinances, decisions and norms applicable to Romania's nuclear domain.",
  },
  "leg.search": { ro: "Caută după titlu, număr sau cuvânt-cheie…", en: "Search by title, number or keyword…" },

  "news.title": { ro: "Comunicate și evenimente", en: "News and events" },
  "news.sub": { ro: "Comunicate oficiale, decizii, consultări publice.", en: "Official communications, decisions, public consultations." },

  "em.title": { ro: "Pregătire pentru urgențe", en: "Emergency preparedness" },
  "em.sub": { ro: "Ce trebuie să știți și cum să acționați.", en: "What you need to know and how to act." },

  "about.title": { ro: "Despre CNCAN", en: "About CNCAN" },
  "about.sub": {
    ro: "Autoritatea națională competentă în reglementarea, autorizarea și controlul activităților nucleare, înființată prin Legea 111/1996.",
    en: "The national competent authority for regulation, licensing and control of nuclear activities, established under Law 111/1996.",
  },

  "contact.title": { ro: "Contact", en: "Contact" },
  "contact.sub": { ro: "Puncte de contact instituționale și pentru presă.", en: "Institutional and press contact points." },
} satisfies Dict;

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (key: keyof typeof dict) => string };

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ro");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("cncan.lang") as Lang | null) : null;
    if (saved === "ro" || saved === "en") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("cncan.lang", l);
  };

  const t = (key: keyof typeof dict) => dict[key]?.[lang] ?? String(key);

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
