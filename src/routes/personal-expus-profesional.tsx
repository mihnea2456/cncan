import { createFileRoute, Link } from "@tanstack/react-router";
import {
  UserCheck,
  Award,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Download,
  ExternalLink,
  AlertTriangle,
  Activity,
  Eye,
  Hand,
  Users,
  FileCheck as FileCheckIcon,
  ArrowLeft,
  BookOpen,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PageHeader } from "@/components/page-header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export const Route = createFileRoute("/personal-expus-profesional")({
  head: () => ({
    meta: [
      { title: "Personal Expus Profesional (PEP) & Permise — CNCAN" },
      {
        name: "description",
        content:
          "Sistemul național de eliberare a permiselor de exercitare, supraveghere dozimetrică și protecție radiologică individuală (ALARA) pentru personalul expus profesional.",
      },
    ],
  }),
  component: PersonalExpusPage,
});

function PersonalExpusPage() {
  const { lang } = useI18n();

  return (
    <>
      <PageHeader
        eyebrow="01 / AUTORIZĂRI CNCAN"
        title={
          lang === "ro"
            ? "Personal Expus Profesional (PEP)"
            : "Occupationally Exposed Staff"
        }
        subtitle={
          lang === "ro"
            ? "Sistemul național de permise de exercitare, supraveghere dozimetrică și securitate radiologică (ALARA)"
            : "National system for practice permits, dosimetric surveillance, and radiation safety (ALARA)"
        }
      />

      <section className="container-page py-12 md:py-16">
        <div className="mb-8 flex items-center justify-between">
          <Link
            to="/autorizari"
            className="inline-flex items-center gap-2 text-xs font-semibold text-brand hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            {lang === "ro" ? "Înapoi la Portal Autorizări" : "Back to Licensing Portal"}
          </Link>
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
            {lang === "ro" ? "Reglementări CNCAN & Legea nr. 111/1996" : "CNCAN Norms & Law no. 111/1996"}
          </span>
        </div>

        <Tabs defaultValue="permise" className="w-full">
          <TabsList className="mb-8 grid w-full grid-cols-1 md:grid-cols-3 h-auto p-1 bg-secondary/50 rounded-sm">
            <TabsTrigger
              value="permise"
              className="py-3 px-4 text-xs md:text-sm font-display font-medium data-[state=active]:bg-card data-[state=active]:text-brand data-[state=active]:shadow-sm rounded-sm"
            >
              {lang === "ro" ? "1. Permise de Exercitare" : "1. Practice Permits"}
            </TabsTrigger>
            <TabsTrigger
              value="formulare"
              className="py-3 px-4 text-xs md:text-sm font-display font-medium data-[state=active]:bg-card data-[state=active]:text-brand data-[state=active]:shadow-sm rounded-sm"
            >
              {lang === "ro"
                ? "2. Formulare și Dosar Examen"
                : "2. Forms & Exam Dossier"}
            </TabsTrigger>
            <TabsTrigger
              value="dozimetrie"
              className="py-3 px-4 text-xs md:text-sm font-display font-medium data-[state=active]:bg-card data-[state=active]:text-brand data-[state=active]:shadow-sm rounded-sm"
            >
              {lang === "ro"
                ? "3. Dozimetrie & Norme ALARA"
                : "3. Dosimetry & ALARA Norms"}
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: PERMISE DE EXERCITARE */}
          <TabsContent value="permise" className="space-y-8">
            <div className="border border-border bg-card p-8 rounded-sm space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-brand uppercase tracking-widest bg-brand/10 px-3 py-1 rounded-full mb-2">
                  <Award className="h-3.5 w-3.5" />
                  {lang === "ro" ? "Clasificare & Autorizare" : "Classification & Licensing"}
                </div>
                <h2 className="font-display text-2xl md:text-3xl text-brand-deep">
                  {lang === "ro"
                    ? "Cele 3 Niveluri de Permise de Exercitare CNCAN"
                    : "The 3 Levels of CNCAN Practice Permits"}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-3xl">
                  {lang === "ro"
                    ? "Pentru a lucra cu surse de radiații sau în zone controlate, personalul expus profesional trebuie să dețină un Permis de Exercitare emis prin examen de către CNCAN, valabil 5 ani."
                    : "To work with radiation sources or in controlled areas, occupationally exposed staff must hold a Practice Permit issued by CNCAN examination, valid for 5 years."}
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3 pt-4 border-t border-border">
                {/* NIVEL 1 */}
                <div className="border border-border bg-secondary/20 p-6 rounded-sm flex flex-col justify-between hover:border-brand/60 transition-all">
                  <div>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-sm bg-brand/10 text-brand font-mono text-xs font-bold">
                      {lang === "ro" ? "NIVEL 1" : "LEVEL 1"}
                    </span>
                    <h3 className="mt-4 font-display text-lg text-foreground font-bold">
                      {lang === "ro" ? "Operatori de bază" : "Basic Operators"}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      {lang === "ro"
                        ? "Eliberat pentru tehnicieni și operatori care lucrează sub îndrumare și supraveghere cu instalații radiologice (ex: tehnicieni radiologie, operatori industriali)."
                        : "Issued for technicians and operators working under supervision with radiological installations (e.g. radiography technicians, industrial operators)."}
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-brand font-medium">
                    <span>{lang === "ro" ? "Examen scris & practic" : "Written & practical exam"}</span>
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  </div>
                </div>

                {/* NIVEL 2 */}
                <div className="border border-brand/50 bg-brand/5 p-6 rounded-sm flex flex-col justify-between hover:border-brand transition-all shadow-sm">
                  <div>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-sm bg-brand text-primary-foreground font-mono text-xs font-bold">
                      {lang === "ro" ? "NIVEL 2" : "LEVEL 2"}
                    </span>
                    <h3 className="mt-4 font-display text-lg text-foreground font-bold">
                      {lang === "ro" ? "Specialiști & Operatori Independenți" : "Specialists & Independent Operators"}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      {lang === "ro"
                        ? "Destinat medicilor radiologi, cardiologilor intervenționaliști, radioterapeuților și operatorilor de control nedistructiv (CND) care conduc practici radiologice."
                        : "For radiologists, interventional cardiologists, radiotherapists, and NDT operators managing radiological practices."}
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-brand font-semibold">
                    <span>{lang === "ro" ? "Certificare de specialitate" : "Specialist certification"}</span>
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  </div>
                </div>

                {/* NIVEL 3 */}
                <div className="border border-border bg-secondary/20 p-6 rounded-sm flex flex-col justify-between hover:border-brand/60 transition-all">
                  <div>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-sm bg-brand/10 text-brand font-mono text-xs font-bold">
                      {lang === "ro" ? "NIVEL 3" : "LEVEL 3"}
                    </span>
                    <h3 className="mt-4 font-display text-lg text-foreground font-bold">
                      {lang === "ro" ? "Responsabil Securitate (RSR) & Fizicieni" : "Radiation Safety Officer (RSO) & Physicists"}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      {lang === "ro"
                        ? "Obligatoriu pentru Responsabilul cu Securitatea Radiologică (RSR), fizicieni medicali, experți acreditați în radioprotecție și conducerea instalațiilor."
                        : "Mandatory for Radiation Safety Officers (RSO), medical physicists, accredited radiation protection experts, and facility management."}
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-brand font-medium">
                    <span>{lang === "ro" ? "Atestare nivel superior" : "Senior accreditation"}</span>
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  </div>
                </div>
              </div>

              {/* ELIGIBILITY CHECKLIST */}
              <div className="border border-border bg-card p-6 rounded-sm space-y-4">
                <h3 className="font-display text-base text-brand-deep font-semibold">
                  {lang === "ro"
                    ? "Cerințe obligatorii pentru eligibilitatea la examenul CNCAN:"
                    : "Mandatory eligibility requirements for CNCAN examination:"}
                </h3>
                <div className="grid gap-3 sm:grid-cols-3 text-xs text-muted-foreground">
                  <div className="flex items-start gap-2.5 p-3 rounded-sm bg-secondary/30 border border-border/60">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-foreground mb-1">
                        {lang === "ro" ? "1. Curs de Radioprotecție" : "1. Radiation Protection Course"}
                      </strong>
                      {lang === "ro"
                        ? "Certificat valabil emis de un furnizor de formare profesională avizat de CNCAN."
                        : "Valid certificate issued by a CNCAN-approved training provider."}
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-sm bg-secondary/30 border border-border/60">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-foreground mb-1">
                        {lang === "ro" ? "2. Aptitudine Medicală" : "2. Medical Fitness"}
                      </strong>
                      {lang === "ro"
                        ? "Fișă de medicina muncii: „Apt pentru lucru în mediu cu radiații ionizante”."
                        : "Occupational health sheet: 'Fit for work in ionizing radiation environment'."}
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-sm bg-secondary/30 border border-border/60">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-foreground mb-1">
                        {lang === "ro" ? "3. Studii de Specialitate" : "3. Specialized Studies"}
                      </strong>
                      {lang === "ro"
                        ? "Diplome universitare sau de calificare tehnică corespunzătoare nivelului solicitat."
                        : "University diplomas or technical qualification relevant to the requested level."}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TAB 2: FORMULARE SI DOSARE */}
          <TabsContent value="formulare" className="space-y-8">
            <div className="border border-border bg-card p-8 rounded-sm space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-brand uppercase tracking-widest bg-brand/10 px-3 py-1 rounded-full mb-2">
                    <FileCheckIcon className="h-3.5 w-3.5" />
                    {lang === "ro" ? "Biblioteca de Dosare & Cereri" : "Dossier & Forms Library"}
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl text-brand-deep">
                    {lang === "ro"
                      ? "Formulare pentru Permise și Securitate Radiologică"
                      : "Forms for Permits and Radiological Safety"}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {lang === "ro"
                      ? "Formularele oficiale vor fi încărcate în curând. Puteți consulta lista documentelor necesare pentru întocmirea dosarelor."
                      : "Official forms will be uploaded soon. You can check the required documentation list for applications."}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 pt-4 border-t border-border">
                {[
                  {
                    code: "PE-01",
                    ro: "Cerere eliberare / prelungire Permis de Exercitare CNCAN",
                    en: "Application form for CNCAN Practice Permit issuance / renewal",
                    desc_ro:
                      "Formularul standard pentru înscrierea la examen sau prelungirea valabilității permisului pentru Nivel 1, 2 sau 3.",
                    desc_en:
                      "Standard application form for examination enrollment or permit renewal for Level 1, 2, or 3.",
                  },
                  {
                    code: "PE-02",
                    ro: "Ghid și Opis documente pentru Dosarul de Examen CNCAN",
                    en: "Guide and Document List for CNCAN Examination Dossier",
                    desc_ro:
                      "Lista completă de acte necesare (studii, adeverințe, taxe) și tematica de examen pe domenii (medical, industrial, nuclear).",
                    desc_en:
                      "Full checklist of required documents (diplomas, certificates, fees) and exam topics by domain.",
                  },
                  {
                    code: "PE-03",
                    ro: "Formular nominalizare Responsabil cu Securitatea Radiologică (RSR)",
                    en: "Nomination form for Radiation Safety Officer (RSO)",
                    desc_ro:
                      "Declarația angajatorului și fișa de responsabilități pentru desemnarea oficială a RSR în cadrul instalației.",
                    desc_en:
                      "Employer declaration and responsibility sheet for officially designating the RSO within the facility.",
                  },
                  {
                    code: "PE-04",
                    ro: "Fișă de atestare medicală pentru zonă controlată",
                    en: "Medical clearance sheet for controlled area work",
                    desc_ro:
                      "Model de adeverință medicală de medicina muncii care atestă aptitudinea personalului expus profesional.",
                    desc_en:
                      "Occupational health certificate model attesting fitness of occupationally exposed personnel.",
                  },
                ].map((doc, idx) => (
                  <div
                    key={idx}
                    className="border border-border bg-secondary/10 p-6 rounded-sm flex flex-col justify-between hover:border-brand/60 transition-all"
                  >
                    <div>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-sm bg-brand/10 text-brand font-mono text-xs font-bold">
                        {doc.code}
                      </span>
                      <h3 className="mt-3 font-display text-base text-foreground font-semibold leading-snug">
                        {lang === "ro" ? doc.ro : doc.en}
                      </h3>
                      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                        {lang === "ro" ? doc.desc_ro : doc.desc_en}
                      </p>
                    </div>
                    <div className="mt-6 pt-3 border-t border-border/60 flex items-center justify-between text-xs font-medium">
                      <button
                        type="button"
                        onClick={() => {
                          alert(
                            lang === "ro"
                              ? "Notă: Documentele oficiale PDF pentru această secțiune sunt în curs de pregătire și vor fi actualizate curând."
                              : "Note: The official PDF documents for this section are in preparation and will be updated soon."
                          );
                        }}
                        className="inline-flex items-center gap-1.5 text-brand hover:underline cursor-pointer"
                      >
                        <Download className="h-3.5 w-3.5" />
                        {lang === "ro"
                          ? "Descarcă formularul (În curând)"
                          : "Download form (Coming soon)"}{" "}
                        →
                      </button>
                      <span className="text-[11px] font-mono text-muted-foreground">PDF</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* TAB 3: DOZIMETRIE & ALARA */}
          <TabsContent value="dozimetrie" className="space-y-8">
            <div className="border border-border bg-card p-8 rounded-sm space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-brand uppercase tracking-widest bg-brand/10 px-3 py-1 rounded-full mb-2">
                  <Activity className="h-3.5 w-3.5" />
                  {lang === "ro" ? "Protecție Radiologică & Monitorizare" : "Radiation Protection & Surveillance"}
                </div>
                <h2 className="font-display text-2xl md:text-3xl text-brand-deep">
                  {lang === "ro"
                    ? "Limitele de Doză și Principiul ALARA"
                    : "Dose Limits and the ALARA Principle"}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-3xl">
                  {lang === "ro"
                    ? "Conform normelor CNCAN, expunerea la radiații ionizante trebuie menținută la cel mai scăzut nivel rezonabil realizabil (ALARA), respectând strict limitele legale anuale de doză."
                    : "Under CNCAN norms, exposure to ionizing radiation must be kept as low as reasonably achievable (ALARA), strictly adhering to legal annual dose limits."}
                </p>
              </div>

              {/* CAT A vs CAT B */}
              <div className="grid gap-6 md:grid-cols-2 pt-2">
                <div className="border border-brand/40 bg-brand/5 p-6 rounded-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-sm bg-brand text-primary-foreground font-mono text-xs font-bold">
                      {lang === "ro" ? "CATEGORIA A" : "CATEGORY A"}
                    </span>
                    <ShieldCheck className="h-5 w-5 text-brand" />
                  </div>
                  <h3 className="font-display text-lg text-foreground font-bold">
                    {lang === "ro"
                      ? "Supraveghere Dozimetrică Individuală Obligatorie"
                      : "Mandatory Individual Dosimetric Surveillance"}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {lang === "ro"
                      ? "Personalul expus la riscul de a primi mai mult de 3/10 din limita anuală de doză. Dozimetrele individuale (TLD / OSL) trebuie purtate obligatoriu și citite periodic de un laborator acreditat CNCAN."
                      : "Personnel at risk of receiving more than 3/10 of the annual dose limit. Individual dosimeters (TLD / OSL) are mandatory and must be periodically read by a CNCAN-accredited laboratory."}
                  </p>
                </div>

                <div className="border border-border bg-secondary/20 p-6 rounded-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-sm bg-secondary text-foreground font-mono text-xs font-bold border border-border">
                      {lang === "ro" ? "CATEGORIA B" : "CATEGORY B"}
                    </span>
                    <Users className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <h3 className="font-display text-lg text-foreground font-bold">
                    {lang === "ro"
                      ? "Monitorizare și Protecție de Arie"
                      : "Area Monitoring and Protection"}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {lang === "ro"
                      ? "Personal care nu lucrează direct în zona controlată cu risc crescut sau care nu depășește pragurile Categoriei A. Monitorizarea se poate efectua prin dozimetrie individuală sau de arie."
                      : "Personnel not working directly in high-risk controlled areas or not exceeding Category A thresholds. Monitoring may be performed via individual or area dosimetry."}
                  </p>
                </div>
              </div>

              {/* DOSE LIMITS CARDS */}
              <div className="space-y-4 pt-4 border-t border-border">
                <h3 className="font-display text-lg text-brand-deep font-semibold">
                  {lang === "ro"
                    ? "Limitele anuale de doză pentru Personalul Expus Profesional:"
                    : "Annual occupational dose limits for Exposed Staff:"}
                </h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  {/* DOZA EFECTIVA */}
                  <div className="border border-border bg-card p-5 rounded-sm flex flex-col justify-between">
                    <div className="flex items-center gap-2 text-brand font-display font-semibold text-sm">
                      <Activity className="h-4 w-4" />
                      <span>{lang === "ro" ? "Întregul Corp" : "Whole Body"}</span>
                    </div>
                    <div className="mt-4">
                      <div className="font-mono text-2xl font-bold text-foreground">
                        20 mSv<span className="text-xs font-normal text-muted-foreground"> / an</span>
                      </div>
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        {lang === "ro"
                          ? "Medie pe 5 ani consecutivi (max. 50 mSv într-un singur an)."
                          : "Average over 5 consecutive years (max. 50 mSv in any single year)."}
                      </p>
                    </div>
                  </div>

                  {/* CRISTALIN */}
                  <div className="border border-border bg-card p-5 rounded-sm flex flex-col justify-between">
                    <div className="flex items-center gap-2 text-brand font-display font-semibold text-sm">
                      <Eye className="h-4 w-4" />
                      <span>{lang === "ro" ? "Cristalin (Ochi)" : "Eye Lens"}</span>
                    </div>
                    <div className="mt-4">
                      <div className="font-mono text-2xl font-bold text-foreground">
                        20 mSv<span className="text-xs font-normal text-muted-foreground"> / an</span>
                      </div>
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        {lang === "ro"
                          ? "Limită anuală de doză echivalentă pentru prevenirea cataractei radiogene."
                          : "Annual equivalent dose limit to prevent radiogenic cataract."}
                      </p>
                    </div>
                  </div>

                  {/* EXTREMITATI */}
                  <div className="border border-border bg-card p-5 rounded-sm flex flex-col justify-between">
                    <div className="flex items-center gap-2 text-brand font-display font-semibold text-sm">
                      <Hand className="h-4 w-4" />
                      <span>{lang === "ro" ? "Extremități / Piele" : "Extremities / Skin"}</span>
                    </div>
                    <div className="mt-4">
                      <div className="font-mono text-2xl font-bold text-foreground">
                        500 mSv<span className="text-xs font-normal text-muted-foreground"> / an</span>
                      </div>
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        {lang === "ro"
                          ? "Limită de doză echivalentă pentru mâini, antebrațe, picioare și tegumente."
                          : "Equivalent dose limit for hands, forearms, feet, and skin."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* REGISTRUL DOZIMETRIC NOTICE */}
              <div className="p-5 rounded-sm bg-secondary/30 border border-border/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-foreground">
                    {lang === "ro"
                      ? "Registrul Individual de Dozimetrie & Raportare"
                      : "Individual Dosimetry Registry & Reporting"}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {lang === "ro"
                      ? "Titularul de autorizație este obligat prin lege să păstreze evidența dozelor individuale pe toată durata vieții profesionale a angajatului și până când acesta împlinește 75 de ani."
                      : "The licensee is legally required to keep individual dose records throughout the employee's working life and until they reach age 75."}
                  </p>
                </div>
                <Link
                  to="/legislatie"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-brand text-primary-foreground text-xs font-semibold hover:bg-brand-deep transition-colors shrink-0"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  {lang === "ro" ? "Consultă Normele NSR" : "Consult NSR Norms"}
                </Link>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
