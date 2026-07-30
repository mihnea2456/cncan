import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Radiation,
  FileCheck,
  Award,
  Download,
  BookOpen,
  CheckCircle2,
  ShieldAlert,
  ArrowLeft,
  Search,
  Layers,
  FileText,
  FileSpreadsheet,
  Users,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PageHeader } from "@/components/page-header";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/surse-de-radiatii-ionizante")({
  head: () => ({
    meta: [
      { title: "Surse de Radiații Ionizante — Permise de Exercitare CNCAN" },
      {
        name: "description",
        content:
          "Proceduri, formulare și cerințe pentru obținerea Permiselor de Exercitare în domeniul Surse de Radiații Ionizante (Nivel 1, 2, 3, RNDSR).",
      },
      { property: "og:title", content: "Surse de Radiații Ionizante — CNCAN" },
      {
        property: "og:description",
        content: "Ghid complet pentru autorizarea surselor și obținerea permiselor de exercitare radioprotecție.",
      },
    ],
  }),
  component: RadiationSourcesPage,
});

function RadiationSourcesPage() {
  const { lang } = useI18n();
  const [activeTab, setActiveTab] = useState("permise");

  return (
    <>
      <PageHeader
        eyebrow="SR · CNCAN"
        title={lang === "ro" ? "Surse de Radiații Ionizante" : "Ionizing Radiation Sources"}
        subtitle={
          lang === "ro"
            ? "Permise de exercitare, clasificare niveluri, sistem de autorizare, reglementări și evidență RNDSR."
            : "Practice permits, level classification, licensing system, regulations and RNDSR registry."
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
                <Radiation className="h-4 w-4" />
                {lang === "ro" ? "Regimul de Autorizare și Control CNCAN" : "Licensing & Control Regime"}
              </div>
              <h2 className="font-display text-2xl md:text-3xl text-brand-deep font-semibold">
                {lang === "ro" ? "Permise de Exercitare și Securitate Radiologică" : "Practice Permits & Radiological Safety"}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-3xl leading-relaxed">
                {lang === "ro"
                  ? "Conform Legii 111/1996, desfășurarea oricărei activități cu surse de radiații ionizante (deținere, utilizare, producție, import/export, transport) necesită personal autorizat deținător al Permisului de Exercitare eliberat de CNCAN."
                  : "Under Law 111/1996, operating ionizing radiation sources requires CNCAN-accredited personnel holding a Practice Permit."}
              </p>
            </div>
            <a
              href="/documents/Legea_111_1996.pdf"
              target="_blank"
              rel="noreferrer"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-brand text-primary-foreground text-xs font-semibold rounded-sm hover:bg-brand-deep transition-colors shadow-sm"
            >
              <Download className="h-4 w-4" />
              {lang === "ro" ? "Reglementări Radioprotecție" : "Radiological Regulations"}
            </a>
          </div>
        </div>

        {/* TABS NAVIGATION MATCHING CNCAN.RO STRUCTURE */}
        <Tabs defaultValue="permise" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start border-b border-border bg-transparent p-0 rounded-none h-auto flex-wrap">
            <TabsTrigger
              value="permise"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand data-[state=active]:bg-transparent px-4 py-3 font-display text-xs md:text-sm font-semibold"
            >
              <Award className="mr-2 h-4 w-4 text-brand" />
              {lang === "ro" ? "1. Permise de Exercitare" : "1. Practice Permits"}
            </TabsTrigger>

            <TabsTrigger
              value="clasificare"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand data-[state=active]:bg-transparent px-4 py-3 font-display text-xs md:text-sm font-semibold"
            >
              <Layers className="mr-2 h-4 w-4 text-brand" />
              {lang === "ro" ? "2. Clasificare Permise" : "2. Permit Classification"}
            </TabsTrigger>

            <TabsTrigger
              value="nivel12"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand data-[state=active]:bg-transparent px-4 py-3 font-display text-xs md:text-sm font-semibold"
            >
              <FileCheck className="mr-2 h-4 w-4 text-brand" />
              {lang === "ro" ? "3. Eliberare Nivel 1 și 2" : "3. Level 1 & 2 Permits"}
            </TabsTrigger>

            <TabsTrigger
              value="nivel3"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand data-[state=active]:bg-transparent px-4 py-3 font-display text-xs md:text-sm font-semibold"
            >
              <Award className="mr-2 h-4 w-4 text-brand" />
              {lang === "ro" ? "4. Eliberare Nivel 3" : "4. Level 3 Permits"}
            </TabsTrigger>

            <TabsTrigger
              value="sistem"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand data-[state=active]:bg-transparent px-4 py-3 font-display text-xs md:text-sm font-semibold"
            >
              <FileText className="mr-2 h-4 w-4 text-brand" />
              {lang === "ro" ? "5. Sistem Autorizare" : "5. Licensing System"}
            </TabsTrigger>

            <TabsTrigger
              value="reglementari"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand data-[state=active]:bg-transparent px-4 py-3 font-display text-xs md:text-sm font-semibold"
            >
              <BookOpen className="mr-2 h-4 w-4 text-brand" />
              {lang === "ro" ? "6. Reglementări" : "6. Regulations"}
            </TabsTrigger>

            <TabsTrigger
              value="rndsr"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand data-[state=active]:bg-transparent px-4 py-3 font-display text-xs md:text-sm font-semibold"
            >
              <FileSpreadsheet className="mr-2 h-4 w-4 text-brand" />
              {lang === "ro" ? "7. RNDSR" : "7. RNDSR Registry"}
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: PERMISE DE EXERCITARE */}
          <TabsContent value="permise" className="pt-8">
            <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
              <div>
                <h3 className="font-display text-2xl text-brand-deep font-semibold">
                  {lang === "ro" ? "Procedura de Obținere a Permisului de Exercitare" : "Practice Permit Application Procedure"}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {lang === "ro"
                    ? "Permisul de exercitare atestă că persoana fizică deține pregătirea de specialitate, cunoștințele de radioprotecție și avizele medicale/de securitate necesare pentru a manipula sau coordona activități cu surse de radiații ionizante."
                    : "The practice permit proves that the individual holds specialized training, radiation protection knowledge, and medical/security clearances."}
                </p>

                <div className="mt-8 space-y-4">
                  <h4 className="font-display text-lg text-foreground font-medium">
                    {lang === "ro" ? "Documente necesare pentru dosarul de permis:" : "Required documents for practice permit file:"}
                  </h4>

                  {[
                    {
                      num: "01",
                      title_ro: "Cerere tip de examinare și eliberare permis",
                      desc_ro: "Formularul oficial completat cu datele solicitantului și domeniul solicitat.",
                    },
                    {
                      num: "02",
                      title_ro: "Fișa medicală de aptitudine (Personal Expus Profesional)",
                      desc_ro: "Avizul medical de medicina muncii valabil pentru lucrul în mediu cu radiații ionizante.",
                    },
                    {
                      num: "03",
                      title_ro: "Certificat de absolvire curs de radioprotecție",
                      desc_ro: "Dovada absolvirii unui curs de pregătire acreditat de CNCAN în domeniul specific.",
                    },
                    {
                      num: "04",
                      title_ro: "Copii după diplomele de studii și Curriculum Vitae",
                      desc_ro: "Diplomă de studii medii/superioare relevante și dovada experienței practice.",
                    },
                    {
                      num: "05",
                      title_ro: "Dovada achitării tarifului de examinare și eliberare (Ord. 155/2005)",
                      title_en: "Proof of payment",
                      desc_ro: "Ordin de plată în contul CNCAN (480 RON pentru valabilitate 5 ani).",
                    },
                  ].map((req, idx) => (
                    <div key={idx} className="border border-border bg-card p-5 flex items-start gap-4 rounded-sm">
                      <div className="shrink-0 font-mono text-sm font-bold text-brand bg-secondary h-9 w-9 grid place-items-center rounded-sm">
                        {req.num}
                      </div>
                      <div>
                        <div className="font-display text-base text-foreground font-medium">
                          {req.title_ro}
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">{req.desc_ro}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SIDEBAR FORMULARE */}
              <aside className="space-y-6">
                <div className="border border-border bg-card p-6 rounded-sm">
                  <h4 className="font-display text-lg text-brand-deep font-semibold mb-4">
                    {lang === "ro" ? "Formulare Descărcabile Permise" : "Permit Application Forms"}
                  </h4>
                  <div className="space-y-3">
                    <a
                      href="#"
                      className="p-3.5 border border-border rounded-sm flex items-center justify-between hover:bg-secondary/40 transition-colors text-xs font-medium text-foreground group"
                    >
                      <span className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-brand group-hover:scale-110 transition-transform" />
                        Cerere Eliberare Permis Exercitare.pdf
                      </span>
                      <Download className="h-4 w-4 text-brand" />
                    </a>
                    <a
                      href="#"
                      className="p-3.5 border border-border rounded-sm flex items-center justify-between hover:bg-secondary/40 transition-colors text-xs font-medium text-foreground group"
                    >
                      <span className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-brand group-hover:scale-110 transition-transform" />
                        Fisa de Aptitudine Medicala Radioprotectie.pdf
                      </span>
                      <Download className="h-4 w-4 text-brand" />
                    </a>
                  </div>
                </div>

                <div className="border border-brand/40 bg-brand/5 p-6 rounded-sm">
                  <div className="text-xs font-semibold text-brand uppercase tracking-wider">Tarif Permis Exercitare</div>
                  <div className="mt-2 font-display text-3xl text-brand-deep font-bold">480 RON</div>
                  <div className="mt-1 text-xs text-muted-foreground">Valabilitate 5 ani (Ord. CNCAN 155/2005)</div>
                </div>
              </aside>
            </div>
          </TabsContent>

          {/* TAB 2: CLASIFICARE PERMISE */}
          <TabsContent value="clasificare" className="pt-8">
            <h3 className="font-display text-2xl text-brand-deep font-semibold mb-4">
              {lang === "ro" ? "Clasificarea Permiselor de Exercitare pe Niveluri" : "Permit Classification Levels"}
            </h3>
            <p className="text-sm text-muted-foreground max-w-3xl leading-relaxed mb-8">
              {lang === "ro"
                ? "Permisele de exercitare eliberate de CNCAN sunt clasificate pe 3 niveluri de competență și responsabilitate, în funcție de domeniul de activitate (medical, industrial, cercetare)."
                : "CNCAN practice permits are classified into 3 levels of competence and responsibility."}
            </p>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="border border-border bg-card p-6 rounded-sm">
                <div className="font-mono text-xs font-bold text-brand uppercase tracking-wider bg-brand/10 px-2.5 py-1 rounded-sm inline-block">Nivelul 1</div>
                <h4 className="mt-4 font-display text-xl text-brand-deep font-semibold">Operator / Manipulant</h4>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Permite manipularea directă a instalațiilor radiologice și surselor sub supravegherea unui responsabil de securitate.
                </p>
              </div>

              <div className="border border-border bg-card p-6 rounded-sm">
                <div className="font-mono text-xs font-bold text-brand uppercase tracking-wider bg-brand/10 px-2.5 py-1 rounded-sm inline-block">Nivelul 2</div>
                <h4 className="mt-4 font-display text-xl text-brand-deep font-semibold">Responsabil Radioprotecție (RSR)</h4>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Permite coordonarea, gestionarea și asigurarea securității radiologice la nivel de laborator, secție sau unitate.
                </p>
              </div>

              <div className="border border-border bg-card p-6 rounded-sm">
                <div className="font-mono text-xs font-bold text-brand uppercase tracking-wider bg-brand/10 px-2.5 py-1 rounded-sm inline-block">Nivelul 3</div>
                <h4 className="mt-4 font-display text-xl text-brand-deep font-semibold">Expert în Fizică Medicală / RSR Senior</h4>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Permite expertiza înaltă, avizarea proiectelor complexe, optimizarea dozelor și consultanță tehnică de specialitate.
                </p>
              </div>
            </div>
          </TabsContent>

          {/* TAB 3-7 PLACEHOLDERS READY FOR SUBSECTIONS */}
          <TabsContent value="nivel12" className="pt-8">
            <h3 className="font-display text-2xl text-brand-deep font-semibold mb-3">Eliberare Permise Nivel 1 și 2</h3>
            <p className="text-sm text-muted-foreground">Proceduri detaliate, cerințe de cursuri și formulare specifice pentru Nivelul 1 și Nivelul 2.</p>
          </TabsContent>

          <TabsContent value="nivel3" className="pt-8">
            <h3 className="font-display text-2xl text-brand-deep font-semibold mb-3">Eliberare Permise Nivel 3</h3>
            <p className="text-sm text-muted-foreground">Cerințe de examinare, comisii speciale CNCAN și dosare pentru Nivelul 3 (Experți).</p>
          </TabsContent>

          <TabsContent value="sistem" className="pt-8">
            <h3 className="font-display text-2xl text-brand-deep font-semibold mb-3">Sistemul de Autorizare Surse Radiații</h3>
            <p className="text-sm text-muted-foreground">Etapele de autorizare a deținerii, utilizării, producției și importului/exportului surselor.</p>
          </TabsContent>

          <TabsContent value="reglementari" className="pt-8">
            <h3 className="font-display text-2xl text-brand-deep font-semibold mb-3">Reglementări & Norme Radioprotecție</h3>
            <p className="text-sm text-muted-foreground">Normele fundamentale de securitate radiologică (NSR-01, NSR-02) emise de CNCAN.</p>
          </TabsContent>

          <TabsContent value="rndsr" className="pt-8">
            <h3 className="font-display text-2xl text-brand-deep font-semibold mb-3">Registrul Național RNDSR</h3>
            <p className="text-sm text-muted-foreground">Evidența națională a dozelor de radiație primite de personalul expus și registrul surselor.</p>
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
