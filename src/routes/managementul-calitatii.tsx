import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Award,
  FileText,
  Download,
  CheckCircle2,
  Users,
  BookOpen,
  ClipboardCheck,
  ShieldCheck,
  ArrowLeft,
  FileCheck,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PageHeader } from "@/components/page-header";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/managementul-calitatii")({
  head: () => ({
    meta: [
      { title: "Managementul Calității — Autorizare & Cerințe CNCAN" },
      {
        name: "description",
        content:
          "Cerințe, dosar și proceduri pentru Autorizarea Sistemelor de Management al Calității (SMC) și atestarea personalului de către CNCAN.",
      },
      { property: "og:title", content: "Managementul Calității CNCAN" },
      {
        property: "og:description",
        content: "Ghid complet și cerințe legale pentru autorizarea Sistemelor de Management al Calității.",
      },
    ],
  }),
  component: QualityManagementPage,
});

function QualityManagementPage() {
  const { lang } = useI18n();
  const [activeTab, setActiveTab] = useState("autorizare");

  return (
    <>
      <PageHeader
        eyebrow="MC · CNCAN"
        title={lang === "ro" ? "Managementul Calității în Domeniul Nuclear" : "Quality Management in Nuclear Sector"}
        subtitle={
          lang === "ro"
            ? "Reglementarea, autorizarea sistemelor de management al calității (SMC) și atestarea personalului de specialitate."
            : "Regulation, licensing of quality management systems (QMS) and personnel accreditation."
        }
      />

      <section className="container-page py-12 md:py-16">
        {/* Navigation back */}
        <div className="mb-8">
          <Button asChild variant="outline" size="sm">
            <Link to="/autorizari">
              <ArrowLeft className="mr-2 h-4 w-4" /> {lang === "ro" ? "Înapoi la Centralizator Autorizări" : "Back to Authorization Portal"}
            </Link>
          </Button>
        </div>

        {/* TOP NOTICE CARD */}
        <div className="mb-10 rounded-sm border border-brand/30 bg-gradient-to-r from-brand-deep/5 via-card to-brand/5 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand uppercase tracking-widest bg-brand/10 px-3 py-1 rounded-full mb-3">
                <ShieldCheck className="h-4 w-4" />
                {lang === "ro" ? "Precondiție Legală Obligatorie (Art. 24 Legea 111/1996)" : "Mandatory Legal Condition"}
              </div>
              <h2 className="font-display text-2xl md:text-3xl text-brand-deep font-semibold">
                {lang === "ro" ? "Autorizarea Sistemelor de Management al Calității" : "Authorization of Quality Management Systems"}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-3xl leading-relaxed">
                {lang === "ro"
                  ? "Conform legii, autorizarea sistemului de management al calității de către CNCAN este o precondiție obligatorie înainte de desfășurarea oricărei activități nucleare (proiectare, construcție, exploatare, furnizare produse sau servicii importante pentru securitate)."
                  : "According to law, licensing of quality management system by CNCAN is a mandatory prerequisite before conducting nuclear activities."}
              </p>
            </div>
            <a
              href="/documents/Cerere_Autorizare_SMC_Model_Anexa1.pdf"
              target="_blank"
              rel="noreferrer"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-brand text-primary-foreground text-xs font-semibold rounded-sm hover:bg-brand-deep transition-colors shadow-sm"
            >
              <Download className="h-4 w-4" />
              {lang === "ro" ? "Deschide Cerere Autorizare (PDF)" : "Open Application PDF"}
            </a>
          </div>
        </div>

        {/* TABS SELECTOR */}
        <Tabs defaultValue="autorizare" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start border-b border-border bg-transparent p-0 rounded-none h-auto flex-wrap">
            <TabsTrigger
              value="autorizare"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand data-[state=active]:bg-transparent px-5 py-3 font-display text-sm font-semibold"
            >
              <Award className="mr-2 h-4 w-4 text-brand" />
              {lang === "ro" ? "1. Autorizare Sistem SMC" : "1. QMS Licensing"}
            </TabsTrigger>

            <TabsTrigger
              value="atestare"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand data-[state=active]:bg-transparent px-5 py-3 font-display text-sm font-semibold"
            >
              <Users className="mr-2 h-4 w-4 text-brand" />
              {lang === "ro" ? "2. Atestare Personal MC" : "2. Staff Accreditation"}
            </TabsTrigger>

            <TabsTrigger
              value="norme"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand data-[state=active]:bg-transparent px-5 py-3 font-display text-sm font-semibold"
            >
              <BookOpen className="mr-2 h-4 w-4 text-brand" />
              {lang === "ro" ? "3. Norme & Reglementări (Seria NMC)" : "3. Quality Norms (NMC)"}
            </TabsTrigger>

            <TabsTrigger
              value="pasi"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand data-[state=active]:bg-transparent px-5 py-3 font-display text-sm font-semibold"
            >
              <ClipboardCheck className="mr-2 h-4 w-4 text-brand" />
              {lang === "ro" ? "4. Ghid Pas cu Pas" : "4. Step-by-Step Guide"}
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: AUTORIZARE SISTEM SMC */}
          <TabsContent value="autorizare" className="pt-8">
            <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
              <div>
                <h3 className="font-display text-2xl text-brand-deep font-semibold">
                  {lang === "ro" ? "Cerințe pentru Autorizarea Sistemului de Management al Calității" : "Requirements for QMS Licensing"}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {lang === "ro"
                    ? "Pentru obținerea autorizației SMC, organizațiile solicitante trebuie să demonstreze că au stabilit, documentat și pus în aplicare un sistem de management al calității conforme cu normele CNCAN aplicabile instalațiilor sau serviciilor furnizate."
                    : "To obtain QMS licensing, applicant organizations must prove they established, documented and implemented a QMS compliant with CNCAN norms."}
                </p>

                <div className="mt-8 space-y-4">
                  <h4 className="font-display text-lg text-foreground font-medium">
                    {lang === "ro" ? "Dosarul necesar pentru solicitarea autorizației SMC:" : "Required dossier for QMS authorization:"}
                  </h4>

                  {[
                    {
                      num: "01",
                      title_ro: "Cererea oficială de autorizare (Model Anexa 1 la NMC-01)",
                      title_en: "Official licensing application (Model Annex 1 to NMC-01)",
                      desc_ro: "Modelul tipizat de cerere adresată Președintelui CNCAN.",
                      pdfUrl: "/documents/Cerere_Autorizare_SMC_Model_Anexa1.pdf",
                    },
                    {
                      num: "02",
                      title_ro: "Chestionarul tip de evaluare inițială SMC (Model Anexa 2 la NMC-01)",
                      title_en: "Initial QMS evaluation questionnaire (Model Annex 2 to NMC-01)",
                      desc_ro: "Formularul completat privind datele organizației, profilul și resursele.",
                      pdfUrl: "/documents/Chestionar_Evaluare_SMC_Model_Anexa2.pdf",
                    },
                    {
                      num: "03",
                      title_ro: "Manualul Managementului Calității (MMC)",
                      title_en: "Quality Management Manual (QMM)",
                      desc_ro: "Documentul principal care descrie politica calității, structura organizatorică și responsabilitățile.",
                    },
                    {
                      num: "04",
                      title_ro: "Procedurile Generale și Specifice de Sistem",
                      title_en: "General and specific system procedures",
                      desc_ro: "Proceduri scrise privind controlul documentelor, audituri interne, neconformități și acțiuni corective.",
                    },
                    {
                      num: "05",
                      title_ro: "Dovada achitării tarifelor legale (Ordinul 155/2005)",
                      title_en: "Proof of fee payment (Order 155/2005)",
                      desc_ro: "Dovada plății tarifului de evaluare și autorizare în contul CNCAN.",
                    },
                  ].map((req, idx) => (
                    <div key={idx} className="border border-border bg-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-sm">
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 font-mono text-sm font-bold text-brand bg-secondary h-9 w-9 grid place-items-center rounded-sm">
                          {req.num}
                        </div>
                        <div>
                          <div className="font-display text-base text-foreground font-medium">
                            {lang === "ro" ? req.title_ro : req.title_en}
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground">{req.desc_ro}</div>
                        </div>
                      </div>
                      {req.pdfUrl && (
                        <a
                          href={req.pdfUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand/10 text-brand hover:bg-brand hover:text-white rounded-sm text-xs font-semibold transition-colors"
                        >
                          <Download className="h-3.5 w-3.5" />
                          {lang === "ro" ? "Deschide PDF" : "Open PDF"}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* DOWNLOADS SIDEBAR */}
              <aside className="space-y-6">
                <div className="border border-border bg-card p-6 rounded-sm">
                  <h4 className="font-display text-lg text-brand-deep font-semibold mb-4">
                    {lang === "ro" ? "Formulare Descărcabile SMC" : "Downloadable QMS Forms"}
                  </h4>
                  <div className="space-y-3">
                    <a
                      href="/documents/Cerere_Autorizare_SMC_Model_Anexa1.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 border border-border rounded-sm flex items-center justify-between hover:bg-secondary/40 transition-colors text-xs font-medium text-foreground"
                    >
                      <span className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-brand" />
                        Cerere Autorizare SMC (Anexa 1)
                      </span>
                      <Download className="h-4 w-4 text-brand" />
                    </a>
                    <a
                      href="/documents/Chestionar_Evaluare_SMC_Model_Anexa2.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 border border-border rounded-sm flex items-center justify-between hover:bg-secondary/40 transition-colors text-xs font-medium text-foreground"
                    >
                      <span className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-brand" />
                        Chestionar Evaluare SMC (Anexa 2)
                      </span>
                      <Download className="h-4 w-4 text-brand" />
                    </a>
                  </div>
                </div>

                <div className="border border-brand/40 bg-brand/5 p-6 rounded-sm">
                  <div className="text-xs font-semibold text-brand uppercase tracking-wider">Tarif Autorizare SMC</div>
                  <div className="mt-2 font-display text-3xl text-brand-deep font-bold">12,400 RON</div>
                  <div className="mt-1 text-xs text-muted-foreground">Conform Ord. CNCAN 155/2005</div>
                </div>
              </aside>
            </div>
          </TabsContent>

          {/* TAB 2: ATESTARE PERSONAL MC */}
          <TabsContent value="atestare" className="pt-8">
            <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
              <div>
                <h3 className="font-display text-2xl text-brand-deep font-semibold">
                  {lang === "ro" ? "Atestarea Personalului cu Funcții în Managementul Calității" : "Personnel Accreditation for Quality Management"}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {lang === "ro"
                    ? "Personalul care îndeplinește funcții de conducere, coordonare, audit intern sau inspecție de calitate în cadrul organizațiilor ce desfășoară activități nucleare trebuie să fie atestat de către CNCAN."
                    : "Staff performing leadership, coordination, internal audit or quality inspection roles must be accredited by CNCAN."}
                </p>

                <div className="mt-8 space-y-4">
                  <h4 className="font-display text-lg text-foreground font-medium">
                    {lang === "ro" ? "Condiții minime pentru obținerea atestatului:" : "Minimum conditions for accreditation:"}
                  </h4>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                      <span>Studii superioare tehnice / inginerești în domeniul de activitate.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                      <span>Experiență profesională practică de minim 3 ani în domeniul nuclear sau în managementul calității.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                      <span>Instruire de specialitate în normele CNCAN și principiile auditului de calitate.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                      <span>Promovarea examinării de specialitate organizate de comisia CNCAN.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <aside className="space-y-6">
                <div className="border border-border bg-card p-6 rounded-sm">
                  <h4 className="font-display text-lg text-brand-deep font-semibold mb-4">
                    {lang === "ro" ? "Formulare Atestare Personal" : "Staff Accreditation Forms"}
                  </h4>
                  <div className="space-y-3">
                    <a
                      href="/documents/Cerere_Autorizare_SMC_Model_Anexa1.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 border border-border rounded-sm flex items-center justify-between hover:bg-secondary/40 transition-colors text-xs font-medium text-foreground"
                    >
                      <span className="flex items-center gap-2">
                        <FileCheck className="h-4 w-4 text-brand" />
                        Cerere Atestare Responsabil SMC
                      </span>
                      <Download className="h-4 w-4 text-muted-foreground" />
                    </a>
                  </div>
                </div>
              </aside>
            </div>
          </TabsContent>

          {/* TAB 3: NORME SERIA NMC */}
          <TabsContent value="norme" className="pt-8">
            <h3 className="font-display text-2xl text-brand-deep font-semibold mb-6">
              {lang === "ro" ? "Normele de Managementul Calității (Seria NMC)" : "Quality Management Norms (NMC Series)"}
            </h3>

            <div className="border border-border bg-card divide-y divide-border">
              {[
                {
                  code: "NMC-01",
                  ord: "Ordinul 65/2003",
                  title: "Norme privind autorizarea sistemelor de management al calității aplicate la realizarea, funcționarea și dezafectarea instalațiilor nucleare.",
                },
                {
                  code: "NMC-02",
                  ord: "Ordinul 66/2003",
                  title: "Norme privind cerințele generale pentru sistemele de management al calității în domeniul nuclear.",
                },
                {
                  code: "NMC-06",
                  ord: "Ordinul 70/2003",
                  title: "Norme privind furnizarea de produse și servicii destinate instalațiilor nucleare.",
                },
                {
                  code: "NMC-07",
                  ord: "Ordinul 71/2003",
                  title: "Norme privind activitățile de aprovizionare și servicii subcontractate în domeniul nuclear.",
                },
              ].map((norm, idx) => (
                <div key={idx} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-brand bg-secondary px-2.5 py-1 rounded-sm">
                        {norm.code}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">{norm.ord}</span>
                    </div>
                    <div className="mt-2 font-display text-base text-foreground font-medium">{norm.title}</div>
                  </div>
                  <a
                    href="/legislatie"
                    className="inline-flex items-center gap-1.5 px-4 py-2 border border-border rounded-sm text-xs font-medium text-brand hover:bg-secondary transition-colors shrink-0"
                  >
                    <BookOpen className="h-3.5 w-3.5" /> Consultă în Legislație
                  </a>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* TAB 4: PAS CU PAS */}
          <TabsContent value="pasi" className="pt-8">
            <h3 className="font-display text-2xl text-brand-deep font-semibold mb-6">
              {lang === "ro" ? "Ghidul Pas cu Pas pentru Obținerea Autorizației SMC" : "Step-by-Step Licensing Guide"}
            </h3>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: "01",
                  title: "Întocmirea Documentației SMC",
                  desc: "Elaborarea Manualului Calității, a procedurilor generale și specifice conforme normelor NMC.",
                },
                {
                  step: "02",
                  title: "Depunerea Dosarului la CNCAN",
                  desc: "Înregistrarea cererii oficiale împreună cu documentele SMC și dovada plății tarifului legal.",
                },
                {
                  step: "03",
                  title: "Evaluarea & Inspecția CNCAN",
                  desc: "Evaluarea documentară și efectuarea inspecției pe teren de către echipa de inspectori CNCAN.",
                },
                {
                  step: "04",
                  title: "Eliberarea Autorizației SMC",
                  desc: "Emiterea autorizației oficiale de către președintele CNCAN cu o valabilitate determinată.",
                },
              ].map((st, i) => (
                <div key={i} className="border border-border bg-card p-6 rounded-sm">
                  <div className="font-mono text-2xl font-bold text-brand">{st.step}</div>
                  <h4 className="mt-3 font-display text-lg text-brand-deep font-semibold">{st.title}</h4>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{st.desc}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
