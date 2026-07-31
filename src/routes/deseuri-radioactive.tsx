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
              {[
                {
                  code: "NDR-01",
                  title_ro:
                    "Normele fundamentale pentru gospodărirea în siguranță a deșeurilor radioactive (NDR-01)",
                  title_en:
                    "Fundamental norms for the safe management of radioactive waste (NDR-01)",
                  desc_ro:
                    "1. Ordinul CNCAN nr. 56/25.03.2004 privind aprobarea Normelor fundamentale pentru gospodarirea in siguranta a deseurilor radioactive (NDR-01), republicat.",
                  desc_en:
                    "1. CNCAN Order no. 56/25.03.2004 on approving the Fundamental norms for the safe management of radioactive waste (NDR-01), republished.",
                  url: "https://www.cncan.ro/assets/NDR/NDR-1-Ordinul-562005-republicat.pdf",
                },
                {
                  code: "NDR-02",
                  title_ro:
                    "Norme privind eliberarea de sub regimul de autorizare a materialelor rezultate din practici autorizate (NDR-02)",
                  title_en:
                    "Norms on clearance from regulatory control of materials resulting from authorized practices (NDR-02)",
                  desc_ro:
                    "2. Ordinul CNCAN nr. 62/31.03.2004 privind aprobarea Norme privind eliberarea de sub regimul de autorizare a materialelor rezultate din practici autorizate (NDR-02), publicat în Monitorul Oficial, Partea I nr. 393/04.05.2004.",
                  desc_en:
                    "2. CNCAN Order no. 62/31.03.2004 on approving Norms on clearance from regulatory control of materials resulting from authorized practices (NDR-02), published in Official Gazette, Part I no. 393/04.05.2004.",
                  url: "https://www.cncan.ro/assets/NDR/ndr-02-ordin-cncan-62-2004.pdf",
                },
                {
                  code: "NDR-03",
                  title_ro:
                    "Norme privind clasificarea deșeurilor radioactive (NDR-03)",
                  title_en:
                    "Norms on radioactive waste classification (NDR-03)",
                  desc_ro:
                    "3. Ordinul CNCAN nr. 156/14.05.2005 privind aprobarea Normelor privind clasificarea deseurilor radioactive (NDR-03), publicat in Monitorul Oficial al Romaniei.",
                  desc_en:
                    "3. CNCAN Order no. 156/14.05.2005 on approving the Norms on radioactive waste classification (NDR-03), published in Official Gazette of Romania.",
                  url: "https://www.cncan.ro/assets/NDR/ndr-03.pdf",
                },
                {
                  code: "NDR-04",
                  title_ro:
                    "Norme privind limitarea eliberărilor de efluenți radioactivi în mediu (NDR-04)",
                  title_en:
                    "Norms on limiting radioactive effluent releases into the environment (NDR-04)",
                  desc_ro:
                    "4. Ordinul CNCAN nr. 221/25.08.2005 privind aprobarea Normelor privind limitarea eliberarilor de efluenti radioactivi in mediu (NDR-04), publicat in Monitorul Oficial al Romaniei.",
                  desc_en:
                    "4. CNCAN Order no. 221/25.08.2005 on approving the Norms on limiting radioactive effluent releases into the environment (NDR-04), published in Official Gazette of Romania.",
                  url: "https://www.cncan.ro/assets/NDR/ndr-04.pdf",
                },
                {
                  code: "NDR-05",
                  title_ro:
                    "Depozitarea la suprafață a deșeurilor radioactive (NDR-05)",
                  title_en:
                    "Near-surface disposal of radioactive waste (NDR-05)",
                  desc_ro:
                    "5. Ordinul CNCAN nr. 400/13.12.2005 privind aprobarea Depozitarii la suprafaţă a deşeurilor radioactive (NDR-05), publicat in Monitorul Oficial al Romaniei Partea I nr. 345 din 17/04/2006.",
                  desc_en:
                    "5. CNCAN Order no. 400/13.12.2005 on approving Near-surface disposal of radioactive waste (NDR-05), published in Official Gazette of Romania Part I no. 345 of 17/04/2006.",
                  url: "https://www.cncan.ro/assets/NDR/ndr05.pdf",
                },
              ].map((reg, idx) => (
                <div
                  key={idx}
                  className="border border-border bg-card p-6 rounded-sm hover:border-brand/60 transition-all flex flex-col justify-between shadow-sm"
                >
                  <div>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-sm bg-brand/10 text-brand font-mono text-xs font-bold">
                      {reg.code}
                    </span>
                    <h4 className="mt-3 font-display text-lg text-foreground leading-snug">
                      <a
                        href={reg.url}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline text-brand inline-flex items-center gap-1.5"
                      >
                        {lang === "ro" ? reg.title_ro : reg.title_en}
                        <ExternalLink className="h-4 w-4 shrink-0" />
                      </a>
                    </h4>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      {lang === "ro" ? reg.desc_ro : reg.desc_en}
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-brand font-medium">
                    <a
                      href={reg.url}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline inline-flex items-center gap-1"
                    >
                      <Download className="h-3.5 w-3.5" />
                      {lang === "ro" ? "Consultă documentul oficial" : "Consult official document"} →
                    </a>
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* TAB 2: SISTEMUL DE AUTORIZARE */}
          <TabsContent value="sistem" className="space-y-8">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6 border border-border bg-card p-8 rounded-sm">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-brand uppercase tracking-widest bg-brand/10 px-3 py-1 rounded-full">
                  <Award className="h-3.5 w-3.5" />
                  {lang === "ro" ? "Sistemul Național de Autorizare GDR" : "National Waste Licensing System"}
                </div>
                <h2 className="font-display text-2xl md:text-3xl text-brand-deep">
                  {lang === "ro"
                    ? "Autorizarea instalațiilor și activităților de gospodărire a deșeurilor radioactive"
                    : "Licensing of radioactive waste management facilities and activities"}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {lang === "ro"
                    ? "Orice activitate care generează, procesează sau stochează deșeuri radioactive necesită autorizare prealabilă emisă de CNCAN. Sistemul de autorizare acoperă toate etapele ciclului de viață, de la generare până la depozitarea definitivă sau eliberarea necondiționată."
                    : "Any activity that generates, processes, or stores radioactive waste requires prior authorization issued by CNCAN. The licensing system covers all life-cycle stages from generation to final disposal or unconditional clearance."}
                </p>

                <div className="grid gap-4 md:grid-cols-2 pt-4 border-t border-border">
                  <div className="border border-border/60 bg-secondary/30 p-5 rounded-sm space-y-2">
                    <div className="flex items-center gap-2 text-brand font-display font-semibold text-base">
                      <FolderOpen className="h-4 w-4" />
                      <span>{lang === "ro" ? "Autorizații de Operare" : "Operating Licenses"}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {lang === "ro"
                        ? "Eliberate pentru stațiile de tratare, condiționare și depozitare temporară sau definitivă a deșeurilor radioactive instituționale sau de la CNE Cernavodă."
                        : "Issued for treatment, conditioning, and interim or final storage facilities for institutional radioactive waste or CNE Cernavoda waste."}
                    </p>
                  </div>

                  <div className="border border-border/60 bg-secondary/30 p-5 rounded-sm space-y-2">
                    <div className="flex items-center gap-2 text-brand font-display font-semibold text-base">
                      <ClipboardCheck className="h-4 w-4" />
                      <span>{lang === "ro" ? "Avizarea Matricei de Condiționare" : "Conditioning Matrix Approval"}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {lang === "ro"
                        ? "Certificarea calității coletelor de deșeuri (cimentare, bituminare, compactare) pentru a asigura stabilitatea mecanică și chimică pe termen lung."
                        : "Quality certification of waste packages (cementation, bituminization, compaction) to ensure long-term mechanical and chemical stability."}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-sm bg-brand/5 border border-brand/20">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-deep mb-2">
                    {lang === "ro" ? "Etapele autorizării unei instalații de deșeuri:" : "Licensing stages for a waste facility:"}
                  </h4>
                  <ul className="grid gap-2 sm:grid-cols-2 text-xs text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand shrink-0" />
                      <span>{lang === "ro" ? "1. Avizul de amplasare & Studiu geotehnic" : "1. Siting permit & Geotechnical study"}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand shrink-0" />
                      <span>{lang === "ro" ? "2. Autorizația de construcție & montaj" : "2. Construction & assembly license"}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand shrink-0" />
                      <span>{lang === "ro" ? "3. Autorizația de punere în funcțiune & operare" : "3. Commissioning & operating license"}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand shrink-0" />
                      <span>{lang === "ro" ? "4. Autorizația de închidere / dezafectare" : "4. Closure / decommissioning license"}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border border-brand/30 bg-gradient-to-b from-brand-deep/5 via-card to-card p-6 rounded-sm space-y-5">
                <div className="flex items-center gap-3 text-brand">
                  <ShieldCheck className="h-6 w-6" />
                  <h3 className="font-display text-lg text-brand-deep">
                    {lang === "ro" ? "Cerințe pentru Solicitanți" : "Requirements for Applicants"}
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {lang === "ro"
                    ? "Operatorii instalațiilor de gestionare a deșeurilor trebuie să mențină un sistem riguros de evidență a coletelor și de monitorizare radiologică a mediului, raportând periodic către CNCAN."
                    : "Operators of waste management facilities must maintain a rigorous package registry and environmental radiation monitoring system, reporting periodically to CNCAN."}
                </p>
                <div className="space-y-3 pt-3 border-t border-border text-xs text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-brand">•</span>
                    <span>{lang === "ro" ? "Dosar de Securitate Nucleară (DSN) actualizat" : "Updated Nuclear Safety Dossier"}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-brand">•</span>
                    <span>{lang === "ro" ? "Program de Management al Calității aprobat CNCAN" : "CNCAN-approved Quality Management Program"}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-brand">•</span>
                    <span>{lang === "ro" ? "Contribuții la Fondul Național pentru Deșeuri (ANDR)" : "Contributions to National Waste Fund (ANDR)"}</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TAB 3: CONVENTIA DE DESEURI */}
          <TabsContent value="conventie" className="space-y-8">
            <div className="border border-border bg-card p-8 rounded-sm space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-brand uppercase tracking-widest bg-brand/10 px-3 py-1 rounded-full mb-2">
                  <Globe className="h-3.5 w-3.5" />
                  {lang === "ro" ? "Angajamente Internaționale AIEA & Euratom" : "International IAEA & Euratom Commitments"}
                </div>
                <h3 className="font-display text-2xl md:text-3xl text-brand-deep">
                  {lang === "ro"
                    ? "Convenția Comună asupra gospodăririi în siguranță a combustibilului nuclear uzat și a deșeurilor radioactive"
                    : "Joint Convention on the Safety of Spent Fuel Management and on the Safety of Radioactive Waste Management"}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-3xl">
                  {lang === "ro"
                    ? "România este parte a Convenției Comune a AIEA, obligându-se să aplice cele mai înalte standarde internaționale pentru a proteja populația și mediul împotriva efectelor nocive ale radiațiilor, atât în prezent cât și pentru generațiile viitoare."
                    : "Romania is a Contracting Party to the IAEA Joint Convention, committing to apply the highest international standards to protect individuals, society, and the environment against radiological hazards, now and for future generations."}
                </p>
              </div>

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
                      ? "Convenția Comună AIEA — Textul și Rapoartele Naționale"
                      : "IAEA Joint Convention — Official Text and National Reports"}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {lang === "ro"
                      ? "Puteți consulta documentele oficiale și rapoartele periodice de evaluare emise sub egida AIEA și CNCAN."
                      : "You can consult official documents and periodic peer-review reports issued under IAEA and CNCAN auspices."}
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
