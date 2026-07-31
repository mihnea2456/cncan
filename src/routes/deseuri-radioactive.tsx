import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Trash2,
  FileText,
  Download,
  CheckCircle2,
  BookOpen,
  ArrowLeft,
  ExternalLink,
  Layers,
  Scale,
  ShieldCheck,
  FolderOpen,
  ClipboardCheck,
  AlertTriangle,
  Globe,
  Award,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PageHeader } from "@/components/page-header";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export const Route = createFileRoute("/deseuri-radioactive")({
  head: () => ({
    meta: [
      { title: "Deșeuri Radioactive — CNCAN" },
      {
        name: "description",
        content:
          "Reglementări, Sistemul de autorizare și Convenția de deșeuri (Convenția Comună asupra gospodăririi în siguranță a combustibilului nuclear uzat și a deșeurilor radioactive).",
      },
      { property: "og:title", content: "Deșeuri Radioactive CNCAN" },
      {
        property: "og:description",
        content: "Cadrul legal, sistemul de autorizare și raportarea internațională pentru gestionarea deșeurilor radioactive din România.",
      },
    ],
  }),
  component: RadioactiveWastePage,
});

function RadioactiveWastePage() {
  const { lang } = useI18n();
  const [activeTab, setActiveTab] = useState("reglementari");

  return (
    <>
      <PageHeader
        eyebrow="GDR · CNCAN"
        title={lang === "ro" ? "Deșeuri Radioactive" : "Radioactive Waste"}
        subtitle={
          lang === "ro"
            ? "Cadrul național de reglementare, Sistemul de autorizare pentru gestionarea deșeurilor radioactive și Convenția Comună internațională."
            : "National regulatory framework, Licensing System for radioactive waste management, and the Joint Convention."
        }
      />

      <section className="container-page py-12 md:py-16">
        {/* TOP BREADCRUMB & BACK LINK */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/autorizari"
            className="inline-flex items-center gap-2 text-xs font-semibold text-brand hover:text-brand-deep transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {lang === "ro" ? "Înapoi la Portalul Autorizări" : "Back to Licensing Portal"}
          </Link>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground bg-secondary/80 px-3 py-1 rounded-sm border border-border">
            <Trash2 className="h-3.5 w-3.5 text-brand" />
            <span>{lang === "ro" ? "DOMENIU RECUNOSCUT CNCAN" : "CNCAN ACCREDITED DOMAIN"}</span>
          </div>
        </div>

        {/* TABS MENU */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto bg-card border border-border p-1.5 rounded-sm">
            <TabsTrigger
              value="reglementari"
              className="py-3 px-4 text-xs md:text-sm font-medium data-[state=active]:bg-brand data-[state=active]:text-primary-foreground rounded-sm"
            >
              <Scale className="h-4 w-4 mr-2" />
              {lang === "ro" ? "1. Reglementări" : "1. Regulations"}
            </TabsTrigger>
            <TabsTrigger
              value="sistem"
              className="py-3 px-4 text-xs md:text-sm font-medium data-[state=active]:bg-brand data-[state=active]:text-primary-foreground rounded-sm"
            >
              <Award className="h-4 w-4 mr-2" />
              {lang === "ro" ? "2. Sistemul de autorizare" : "2. Licensing System"}
            </TabsTrigger>
            <TabsTrigger
              value="conventie"
              className="py-3 px-4 text-xs md:text-sm font-medium data-[state=active]:bg-brand data-[state=active]:text-primary-foreground rounded-sm"
            >
              <Globe className="h-4 w-4 mr-2" />
              {lang === "ro" ? "3. Convenția de deșeuri" : "3. Waste Convention"}
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: REGLEMENTARI */}
          <TabsContent value="reglementari" className="space-y-8">
            <div className="rounded-sm border border-brand/30 bg-gradient-to-r from-brand-deep/5 via-card to-brand/5 p-6 md:p-8">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand uppercase tracking-widest bg-brand/10 px-3 py-1 rounded-full mb-3">
                  <Scale className="h-4 w-4" />
                  {lang === "ro" ? "CADRUL NORMATIV PENTRU GESTIONAREA DEȘEURILOR" : "WASTE MANAGEMENT REGULATORY FRAMEWORK"}
                </div>
                <h2 className="font-display text-2xl md:text-3xl text-brand-deep">
                  {lang === "ro"
                    ? "Reglementări aplicabile gospodăririi deșeurilor radioactive"
                    : "Regulations applicable to radioactive waste management"}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {lang === "ro"
                    ? "Activitățile de colectare, sortare, tratare, condiționare, depozitare intermediară și depozitare definitivă a deșeurilor radioactive din România sunt reglementate strict de CNCAN în conformitate cu Legea nr. 111/1996 și standardele internaționale AIEA și Euratom."
                    : "The collection, sorting, treatment, conditioning, interim storage, and final disposal of radioactive waste in Romania are strictly regulated by CNCAN in accordance with Law no. 111/1996 and international IAEA and Euratom standards."}
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* CARD 1: NDR-01 */}
              <div className="border border-border bg-card p-6 rounded-sm hover:border-brand/60 transition-all flex flex-col justify-between shadow-sm">
                <div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-sm bg-brand/10 text-brand font-mono text-xs font-bold">
                    NDR-01
                  </span>
                  <h4 className="mt-3 font-display text-lg text-foreground leading-snug">
                    <a
                      href="/documents/deseuri/NDR_01.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline text-brand inline-flex items-center gap-1.5"
                    >
                      {lang === "ro"
                        ? "Normele fundamentale pentru gospodărirea în siguranță a deșeurilor radioactive (NDR-01)"
                        : "Fundamental norms for the safe management of radioactive waste (NDR-01)"}
                      <ExternalLink className="h-4 w-4 shrink-0" />
                    </a>
                  </h4>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    1. Ordinul CNCAN nr. 56/25.03.2004 privind aprobarea Normelor fundamentale pentru gospodarirea in siguranta a deseurilor radioactive (NDR-01), republicat.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-brand font-medium">
                  <a
                    href="/documents/deseuri/NDR_01.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline inline-flex items-center gap-1 text-brand"
                  >
                    <Download className="h-3.5 w-3.5" />
                    {lang === "ro" ? "Deschide documentul PDF (481 KB)" : "Open PDF document (481 KB)"} →
                  </a>
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                </div>
              </div>

              {/* CARD 2: NDR-02 (WITH USER REQUESTED ERROR ALERT) */}
              <div className="border border-border bg-card p-6 rounded-sm hover:border-red-500/50 transition-all flex flex-col justify-between shadow-sm relative overflow-hidden">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-sm bg-brand/10 text-brand font-mono text-xs font-bold">
                      NDR-02
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/10 text-red-600 font-semibold text-[10px] border border-red-500/20">
                      <AlertTriangle className="h-3 w-3" />
                      {lang === "ro" ? "Indisponibil oficial" : "Officially unavailable"}
                    </span>
                  </div>
                  <h4 className="mt-3 font-display text-lg text-foreground leading-snug">
                    {lang === "ro"
                      ? "Norme privind eliberarea de sub regimul de autorizare a materialelor rezultate din practici autorizate (NDR-02)"
                      : "Norms on clearance from regulatory control of materials resulting from authorized practices (NDR-02)"}
                  </h4>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    2. Ordinul CNCAN nr. 62/31.03.2004 privind aprobarea Norme privind eliberarea de sub regimul de autorizare a materialelor rezultate din practici autorizate (NDR-02), publicat în Monitorul Oficial, Partea I nr. 393/04.05.2004.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-border/60 flex items-center justify-between text-xs font-medium">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(
                        lang === "ro"
                          ? "Eroare: Documentul NDR-02 nu funcționează momentan pe site-ul oficial CNCAN și nu poate fi accesat sau descărcat."
                          : "Error: The NDR-02 document is currently unavailable on the official CNCAN server and cannot be accessed or downloaded."
                      );
                    }}
                    className="inline-flex items-center gap-1.5 text-red-600 hover:text-red-700 font-semibold transition-colors cursor-pointer"
                  >
                    <AlertTriangle className="h-3.5 w-3.5" />
                    {lang === "ro" ? "Document indisponibil (clic pentru detalii)" : "Document unavailable (click for details)"}
                  </button>
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </div>
              </div>

              {/* CARD 3: NDR-03 */}
              <div className="border border-border bg-card p-6 rounded-sm hover:border-brand/60 transition-all flex flex-col justify-between shadow-sm">
                <div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-sm bg-brand/10 text-brand font-mono text-xs font-bold">
                    NDR-03
                  </span>
                  <h4 className="mt-3 font-display text-lg text-foreground leading-snug">
                    <a
                      href="/documents/deseuri/NDR_03.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline text-brand inline-flex items-center gap-1.5"
                    >
                      {lang === "ro"
                        ? "Norme privind clasificarea deșeurilor radioactive (NDR-03)"
                        : "Norms on radioactive waste classification (NDR-03)"}
                      <ExternalLink className="h-4 w-4 shrink-0" />
                    </a>
                  </h4>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    3. Ordinul CNCAN nr. 156/14.05.2005 privind aprobarea Normelor privind clasificarea deseurilor radioactive (NDR-03), publicat in Monitorul Oficial al Romaniei.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-brand font-medium">
                  <a
                    href="/documents/deseuri/NDR_03.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline inline-flex items-center gap-1 text-brand"
                  >
                    <Download className="h-3.5 w-3.5" />
                    {lang === "ro" ? "Deschide documentul PDF (105 KB)" : "Open PDF document (105 KB)"} →
                  </a>
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                </div>
              </div>

              {/* CARD 4: NDR-04 */}
              <div className="border border-border bg-card p-6 rounded-sm hover:border-brand/60 transition-all flex flex-col justify-between shadow-sm">
                <div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-sm bg-brand/10 text-brand font-mono text-xs font-bold">
                    NDR-04
                  </span>
                  <h4 className="mt-3 font-display text-lg text-foreground leading-snug">
                    <a
                      href="/documents/deseuri/NDR_04.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline text-brand inline-flex items-center gap-1.5"
                    >
                      {lang === "ro"
                        ? "Norme privind limitarea eliberărilor de efluenți radioactivi în mediu (NDR-04)"
                        : "Norms on limiting radioactive effluent releases into the environment (NDR-04)"}
                      <ExternalLink className="h-4 w-4 shrink-0" />
                    </a>
                  </h4>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    4. Ordinul CNCAN nr. 221/25.08.2005 privind aprobarea Normelor privind limitarea eliberarilor de efluenti radioactivi in mediu (NDR-04), publicat in Monitorul Oficial al Romaniei.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-brand font-medium">
                  <a
                    href="/documents/deseuri/NDR_04.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline inline-flex items-center gap-1 text-brand"
                  >
                    <Download className="h-3.5 w-3.5" />
                    {lang === "ro" ? "Deschide documentul PDF (168 KB)" : "Open PDF document (168 KB)"} →
                  </a>
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                </div>
              </div>

              {/* CARD 5: NDR-05 */}
              <div className="border border-border bg-card p-6 rounded-sm hover:border-brand/60 transition-all flex flex-col justify-between shadow-sm">
                <div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-sm bg-brand/10 text-brand font-mono text-xs font-bold">
                    NDR-05
                  </span>
                  <h4 className="mt-3 font-display text-lg text-foreground leading-snug">
                    <a
                      href="/documents/deseuri/NDR_05.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline text-brand inline-flex items-center gap-1.5"
                    >
                      {lang === "ro"
                        ? "Depozitarea la suprafață a deșeurilor radioactive (NDR-05)"
                        : "Near-surface disposal of radioactive waste (NDR-05)"}
                      <ExternalLink className="h-4 w-4 shrink-0" />
                    </a>
                  </h4>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    5. Ordinul CNCAN nr. 400/13.12.2005 privind aprobarea Depozitarii la suprafaţă a deşeurilor radioactive (NDR-05), publicat in Monitorul Oficial al Romaniei Partea I nr. 345 din 17/04/2006.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-brand font-medium">
                  <a
                    href="/documents/deseuri/NDR_05.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline inline-flex items-center gap-1 text-brand"
                  >
                    <Download className="h-3.5 w-3.5" />
                    {lang === "ro" ? "Deschide documentul PDF (534 KB)" : "Open PDF document (534 KB)"} →
                  </a>
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TAB 2: SISTEMUL DE AUTORIZARE */}
          <TabsContent value="sistem" className="space-y-8">
            <div className="border border-border bg-card p-8 rounded-sm space-y-8">
              {/* INTRO & MAIN TITLE */}
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-brand uppercase tracking-widest bg-brand/10 px-3 py-1 rounded-full mb-2">
                  <Award className="h-3.5 w-3.5" />
                  {lang === "ro" ? "Sistemul Național de Autorizare" : "National Licensing System"}
                </div>
                <h3 className="font-display text-2xl md:text-3xl text-brand-deep">
                  {lang === "ro"
                    ? "Autorizarea activității de management al deșeurilor radioactive și a combustibilului nuclear ars"
                    : "Licensing of radioactive waste and spent nuclear fuel management activities"}
                </h3>
                <p className="mt-3 text-sm text-foreground leading-relaxed font-medium">
                  {lang === "ro"
                    ? "Managementul deșeurilor radioactive cuprinde colectarea, tratarea, condiționarea, depozitarea intermediară, depozitarea finală a deșeurilor radioactive și a combustibilului nuclear ars."
                    : "Radioactive waste management comprises the collection, treatment, conditioning, interim storage, and final disposal of radioactive waste and spent nuclear fuel."}
                </p>
              </div>

              {/* LIST OF AUTHORIZED ACTIVITIES (A, B, C) */}
              <div className="rounded-sm border border-border/80 bg-secondary/20 p-6 space-y-4">
                <h4 className="font-display text-base text-brand-deep font-semibold">
                  {lang === "ro"
                    ? "Următoarele activități din domeniul deșeurilor radioactive și a combustibilului nuclear ars necesită autorizație emisă de CNCAN:"
                    : "The following activities in the field of radioactive waste and spent nuclear fuel require authorization issued by CNCAN:"}
                </h4>
                <div className="grid gap-3 text-xs md:text-sm text-foreground">
                  {[
                    {
                      letter: "a)",
                      text_ro:
                        "cercetarea, proiectarea, amplasarea, producția, construcția, montajul, punerea în funcțiune, exploatarea, furnizarea, închirierea, importul și exportul instalațiilor nucleare;",
                      text_en:
                        "research, design, siting, production, construction, assembly, commissioning, operation, supply, leasing, import and export of nuclear facilities;",
                    },
                    {
                      letter: "b)",
                      text_ro:
                        "manipularea, deținerea, tratarea, utilizarea, depozitarea temporară sau definitivă, transportarea, tranzitarea combustibilului nuclear ars și a deșeurilor radioactive inclusiv a surselor radioactive închise uzate;",
                      text_en:
                        "handling, possession, treatment, use, interim or final storage, transport, transit of spent nuclear fuel and radioactive waste including disused sealed radioactive sources;",
                    },
                    {
                      letter: "c)",
                      text_ro:
                        "furnizarea și utilizarea mijloacelor de containerizare sau de transport a combustibilului nuclear ars și a deșeurilor radioactive, special amenajate în acest scop.",
                      text_en:
                        "supply and use of packaging or transport means for spent nuclear fuel and radioactive waste, specially designed for this purpose.",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-sm bg-card border border-border/60"
                    >
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-sm bg-brand/10 text-brand font-mono font-bold text-xs shrink-0">
                        {item.letter}
                      </span>
                      <p className="leading-relaxed text-foreground">
                        {lang === "ro" ? item.text_ro : item.text_en}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* REGULATORY PROCEDURES & EXEMPTIONS TEXT */}
              <div className="space-y-4 text-xs md:text-sm text-muted-foreground leading-relaxed border-t border-border pt-6">
                <p>
                  {lang === "ro"
                    ? "Exceptarea de la regimul de autorizare a utilizării este reglementată prin art. 8, 9, 10 și 11 din Normele fundamentale de securitate radiologică aprobate prin ordinul președintelui Comisiei Naționale pentru Controlul Activităților Nucleare nr. 14/2000, publicat în Monitorul Oficial al României, partea I, nr. 404 bis din 29 august 2000."
                    : "Exemption from user licensing is regulated by art. 8, 9, 10, and 11 of the Fundamental Radiation Safety Norms approved by Order of the President of CNCAN no. 14/2000, published in the Official Gazette of Romania, Part I, no. 404 bis of August 29, 2000."}
                </p>
                <p>
                  {lang === "ro"
                    ? "Autorizarea activității de management al deșeurilor radioactive se face conform Normelor de Securitate Radiologică – Proceduri de Autorizare, aprobate prin Ordinul CNCAN nr. 366 din 22 septembrie 2001, publicat în Monitorul Oficial, Partea I nr. 764 din 30 noiembrie 2001."
                    : "Authorization of radioactive waste management activities is carried out in accordance with the Radiation Safety Norms – Licensing Procedures, approved by CNCAN Order no. 366 of September 22, 2001, published in Official Gazette, Part I no. 764 of November 30, 2001."}
                </p>
                <p>
                  {lang === "ro" ? (
                    <>
                      Pentru detalii accesați{" "}
                      <Link
                        to="/surse-de-radiatii-ionizante"
                        className="text-brand hover:underline font-medium"
                      >
                        Aplicații surse de radiații nucleare
                      </Link>
                      .
                    </>
                  ) : (
                    <>
                      For details access{" "}
                      <Link
                        to="/surse-de-radiatii-ionizante"
                        className="text-brand hover:underline font-medium"
                      >
                        Nuclear radiation sources applications
                      </Link>
                      .
                    </>
                  )}
                </p>
                <p>
                  {lang === "ro"
                    ? "Autorizarea activității de management a combustibilului nuclear ars se face conform normelor specifice de securitate nucleară, emise de CNCAN."
                    : "Licensing of spent nuclear fuel management activities is carried out in accordance with specific nuclear safety norms issued by CNCAN."}
                </p>
              </div>

              {/* CLEAN SIMPLE DOWNLOAD BUTTON FOR MINI-BOOK */}
              <div className="pt-6 border-t border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-xs md:text-sm font-medium text-foreground">
                  Norme de securitate radiologica pentru proceduri de autorizare
                </span>
                <a
                  href="/documents/deseuri/Norme_securitate_radiologica_proceduri_autorizare.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-border bg-secondary hover:bg-secondary/80 text-xs font-medium text-foreground transition-colors shrink-0"
                >
                  <Download className="h-3.5 w-3.5 text-brand" />
                  {lang === "ro" ? "Descarcă documentul (1.1 MB)" : "Download document (1.1 MB)"}
                </a>
              </div>
            </div>
          </TabsContent>

          {/* TAB 3: CONVENTIA DE DESEURI */}
          <TabsContent value="conventie" className="space-y-8">
            <div className="border border-border bg-card p-8 rounded-sm space-y-8">
              {/* HEADER / INTRO */}
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-brand uppercase tracking-widest bg-brand/10 px-3 py-1 rounded-full mb-2">
                  <Globe className="h-3.5 w-3.5" />
                  {lang === "ro" ? "Angajamente Internaționale AIEA & Euratom" : "International IAEA & Euratom Commitments"}
                </div>
                <h3 className="font-display text-2xl md:text-3xl text-brand-deep">
                  {lang === "ro"
                    ? "Convenție deșeuri, Raportul național la Convenție"
                    : "Waste Convention, National Report to the Convention"}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-3xl">
                  {lang === "ro"
                    ? "România este parte a Convenției Comune a AIEA, obligându-se să aplice cele mai înalte standarde internaționale pentru a proteja populația și mediul împotriva efectelor nocive ale radiațiilor, atât în prezent cât și pentru generațiile viitoare."
                    : "Romania is a Contracting Party to the IAEA Joint Convention, committing to apply the highest international standards to protect individuals, society, and the environment against radiological hazards, now and for future generations."}
                </p>
              </div>

              {/* REPORT BOX (USER REQUESTED 6th EDITION 2017 REPORT) */}
              <div className="border border-brand/30 bg-gradient-to-b from-brand-deep/5 via-card to-card p-6 rounded-sm shadow-sm space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-sm bg-brand/10 text-brand font-mono text-xs font-bold">
                      {lang === "ro" ? "Editia a 6-a (2017)" : "6th Edition (2017)"}
                    </span>
                    <h4 className="font-display text-lg text-foreground leading-snug">
                      {lang === "ro"
                        ? "Raportul National in cadrul Conventiei comune asupra gospodaririi in siguranta a combustibilului uzat si asupra gospodaririi in siguranta a deseurilor radioactive – a 6-a editie (2017)."
                        : "National Report under the Joint Convention on the Safety of Spent Fuel Management and on the Safety of Radioactive Waste Management – 6th edition (2017)."}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {lang === "ro"
                        ? "Raportul național prezintă evaluarea completă a infrastructurii, practicilor și instalațiilor nucleare din România în conformitate cu obligațiile Convenției Comune."
                        : "The national report presents the comprehensive assessment of Romania's nuclear infrastructure, practices, and facilities in compliance with the Joint Convention obligations."}
                    </p>
                  </div>

                  <a
                    href="/documents/deseuri/RomaniaJC6thNational-Report2017.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-sm bg-brand text-primary-foreground text-xs font-semibold hover:bg-brand-deep transition-colors shrink-0 shadow-sm"
                  >
                    <Download className="h-4 w-4" />
                    {lang === "ro" ? "Descarcă Raportul (2.4 MB)" : "Download Report (2.4 MB)"}
                  </a>
                </div>
              </div>

              {/* CONVENTION OBJECTIVES & INFO */}
              <div className="grid gap-6 md:grid-cols-3 pt-4 border-t border-border">
                {[
                  {
                    step: "01",
                    title_ro: "Rapoartele Naționale ale României",
                    title_en: "Romania's National Reports",
                    desc_ro:
                      "CNCAN elaborează și prezintă trienal Raportul Național privind stadiul gospodăririi combustibilului uzat (de la CNE Cernavodă) și a deșeurilor radioactive din România.",
                    desc_en:
                      "CNCAN prepares and presents triennially the National Report on spent fuel management (from CNE Cernavoda) and radioactive waste in Romania.",
                  },
                  {
                    step: "02",
                    title_ro: "Reuniuni de Evaluare (Peer-Review)",
                    title_en: "Peer-Review Review Meetings",
                    desc_ro:
                      "În cadrul conferințelor internaționale de la Viena (AIEA), experții statelor contractante analizează progresele României în proiectele depozitelor DFDSMA și DFDGN.",
                    desc_en:
                      "At international conferences in Vienna (IAEA), contracting parties evaluate Romania's progress in surface and geological repository projects.",
                  },
                  {
                    step: "03",
                    title_ro: "Transparență & Acces la Informație",
                    title_en: "Transparency & Information Access",
                    desc_ro:
                      "Toate deciziile de reglementare, analizele de securitate și stocurile naționale de deșeuri radioactive sunt raportate public în conformitate cu directivele Euratom.",
                    desc_en:
                      "All regulatory decisions, safety analyses, and national radioactive waste inventories are publicly reported in compliance with Euratom directives.",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="border border-border/60 bg-secondary/20 p-6 rounded-sm relative flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand text-primary-foreground font-bold text-sm">
                          {item.step}
                        </span>
                        <span className="text-xs font-mono text-muted-foreground uppercase">
                          {lang === "ro" ? "Obiectiv Convenție" : "Convention Objective"}
                        </span>
                      </div>
                      <h4 className="font-display text-base text-foreground font-bold">
                        {lang === "ro" ? item.title_ro : item.title_en}
                      </h4>
                      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                        {lang === "ro" ? item.desc_ro : item.desc_en}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-5 rounded-sm bg-brand/5 border border-brand/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-brand-deep">
                    {lang === "ro"
                      ? "Convenția Comună AIEA — Portalul Oficial"
                      : "IAEA Joint Convention — Official Portal"}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {lang === "ro"
                      ? "Puteți consulta documentele oficiale și rapoartele internaționale emise sub egida AIEA."
                      : "You can consult official international documents and reports issued under IAEA auspices."}
                  </p>
                </div>
                <a
                  href="https://www.iaea.org/topics/nuclear-safety-conventions/joint-convention-safety-spent-fuel-management-and-safety-radioactive-waste"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-brand text-primary-foreground text-xs font-semibold hover:bg-brand-deep transition-colors shrink-0"
                >
                  <Globe className="h-3.5 w-3.5" />
                  {lang === "ro" ? "Portal AIEA Convenția Comună" : "IAEA Joint Convention Portal"}
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
