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
  ShieldCheck,
  Building,
  HelpCircle,
  Activity,
  CheckSquare,
  ExternalLink,
  HelpCircle as QuestionMarkIcon,
  BookMarked,
  Clock,
  AlertTriangle,
  FileCode,
  Scale,
  Receipt,
  UserCheck,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PageHeader } from "@/components/page-header";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/surse-de-radiatii-ionizante")({
  head: () => ({
    meta: [
      { title: "Surse de Radiații Ionizante — CNCAN" },
      {
        name: "description",
        content:
          "Permise de exercitare (Nivel 1, 2, 3), lista posesorilor permis Nivel 3, prelungire valabilitate Nivel 3, clasificări, proceduri eliberare, sistem de autorizare, reglementări radioprotecție și RNDSR.",
      },
      { property: "og:title", content: "Surse de Radiații Ionizante — CNCAN" },
      {
        property: "og:description",
        content: "Ghid complet și cerințe legale pentru autorizarea surselor de radiații și a personalului de specialitate.",
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
          <TabsList className="w-full justify-start border-b border-border bg-transparent p-0 rounded-none h-auto flex-wrap gap-1">
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
              {lang === "ro" ? "2. Clasificare Permise" : "2. Classification"}
            </TabsTrigger>

            <TabsTrigger
              value="nivel12"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand data-[state=active]:bg-transparent px-4 py-3 font-display text-xs md:text-sm font-semibold"
            >
              <FileCheck className="mr-2 h-4 w-4 text-brand" />
              {lang === "ro" ? "3. Eliberare Nivel 1 & 2" : "3. Level 1 & 2"}
            </TabsTrigger>

            <TabsTrigger
              value="nivel3"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand data-[state=active]:bg-transparent px-4 py-3 font-display text-xs md:text-sm font-semibold"
            >
              <Award className="mr-2 h-4 w-4 text-brand" />
              {lang === "ro" ? "4. Eliberare Nivel 3" : "4. Level 3"}
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
              value="personal"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand data-[state=active]:bg-transparent px-4 py-3 font-display text-xs md:text-sm font-semibold"
            >
              <Users className="mr-2 h-4 w-4 text-brand" />
              {lang === "ro" ? "7. Autorizare Personal" : "7. Staff Licensing"}
            </TabsTrigger>

            <TabsTrigger
              value="rndsr"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand data-[state=active]:bg-transparent px-4 py-3 font-display text-xs md:text-sm font-semibold"
            >
              <FileSpreadsheet className="mr-2 h-4 w-4 text-brand" />
              {lang === "ro" ? "8. RNDSR" : "8. RNDSR Registry"}
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

                {/* EXAM QUESTIONS AND SPECIALTIES SECTION */}
                <div className="mt-10 border border-brand/30 bg-card p-6 md:p-8 rounded-sm shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-9 w-9 rounded-sm bg-brand/10 text-brand grid place-items-center">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-display text-xl text-brand-deep font-semibold">
                        Set Întrebări și Bibliografie pe Specialități
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Pentru fiecare specialitate puteți accesa atât setul de Întrebări cât și Bibliografia oficială (deschidere PDF în tab nou).
                      </p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {/* EXAMEN NIVEL 1 */}
                    <div className="border border-border p-5 rounded-sm bg-secondary/20">
                      <div className="flex items-center gap-2 font-display text-lg text-brand font-semibold mb-2">
                        <Award className="h-5 w-5 text-brand" /> Examen Nivel 1
                      </div>
                      <div className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
                        Domeniul: Activități cu risc radiologic nesemnificativ
                      </div>
                      <div className="text-xs font-medium text-muted-foreground mb-2">Specialități & Resurse:</div>
                      <div className="space-y-2.5">
                        {[
                          { name: "Tehnici nucleare - Activități cu generatori RX", qUrl: "/documents/intrebari/Examen_N1_Generatori_RX.pdf", bUrl: "/documents/bibliografie/Biblio_N1_Generatori_RX.pdf" },
                          { name: "Tehnici nucleare - Surse deschise", qUrl: "/documents/intrebari/Examen_N1_Surse_Deschise.pdf", bUrl: "/documents/bibliografie/Biblio_N1_Surse_Deschise.pdf" },
                          { name: "Tehnici nucleare - Surse închise", qUrl: "/documents/intrebari/Examen_N1_Surse_Inchise.pdf", bUrl: "/documents/bibliografie/Biblio_N1_Surse_Inchise.pdf" },
                        ].map((sp, idx) => (
                          <div key={idx} className="p-3 border border-border bg-card rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <span className="font-medium text-xs text-foreground flex items-center gap-1.5">
                              • {sp.name}
                            </span>
                            <div className="flex items-center gap-2 shrink-0">
                              <a
                                href={sp.qUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 px-3 py-1 bg-brand/10 text-brand hover:bg-brand hover:text-white rounded-sm text-xs font-medium transition-colors"
                              >
                                <FileText className="h-3 w-3" /> Întrebări
                              </a>
                              <a
                                href={sp.bUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 px-3 py-1 bg-gold/20 text-brand-deep hover:bg-gold rounded-sm text-xs font-medium transition-colors"
                              >
                                <BookMarked className="h-3 w-3" /> Bibliografie
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* EXAMEN NIVEL 2 */}
                    <div className="border border-border p-5 rounded-sm bg-secondary/20 space-y-6">
                      <div className="flex items-center gap-2 font-display text-lg text-brand font-semibold">
                        <Award className="h-5 w-5 text-brand" /> Examen Nivel 2
                      </div>

                      {/* 1. RADIODIAGNOSTIC */}
                      <div className="bg-card p-4 border border-border rounded-sm">
                        <div className="text-xs font-semibold text-brand uppercase tracking-wider mb-3">
                          1. Domeniul: Radiodiagnostic
                        </div>
                        <div className="space-y-2">
                          {[
                            { name: "Röntgendiagnostic", qUrl: "/documents/intrebari/Examen_N2_Rontgendiagnostic.pdf", bUrl: "/documents/bibliografie/Biblio_N2_Rontgendiagnostic.pdf" },
                            { name: "Röntgendiagnostic dentar", qUrl: "/documents/intrebari/Examen_N2_Rontgendiagnostic_Dentar.pdf", bUrl: "/documents/bibliografie/Biblio_N2_Rontgendiagnostic_Dentar.pdf" },
                            { name: "Ftiziologie", qUrl: "/documents/intrebari/Examen_N2_Ftiziologie.pdf", bUrl: "/documents/bibliografie/Biblio_N2_Ftiziologie.pdf" },
                            { name: "Medicină nucleară", qUrl: "/documents/intrebari/Examen_N2_Medicina_Nucleara.pdf", bUrl: "/documents/bibliografie/Biblio_N2_Medicina_Nucleara.pdf" },
                            { name: "Radiologie intervențională", qUrl: "/documents/intrebari/Examen_N2_Radiologie_Interventionala.pdf", bUrl: "/documents/bibliografie/Biblio_N2_Radiologie_Interventionala.pdf" },
                          ].map((item, idx) => (
                            <div key={idx} className="p-2.5 border border-border rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <span className="text-xs font-medium text-foreground">{item.name}</span>
                              <div className="flex items-center gap-2 shrink-0">
                                <a href={item.qUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand/10 text-brand hover:bg-brand hover:text-white rounded-sm text-xs font-medium transition-colors">
                                  <FileText className="h-3 w-3" /> Întrebări
                                </a>
                                <a href={item.bUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 px-2.5 py-1 bg-gold/20 text-brand-deep hover:bg-gold rounded-sm text-xs font-medium transition-colors">
                                  <BookMarked className="h-3 w-3" /> Bibliografie
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 2. RADIOTERAPIE */}
                      <div className="bg-card p-4 border border-border rounded-sm">
                        <div className="text-xs font-semibold text-brand uppercase tracking-wider mb-3">
                          2. Domeniul: Radioterapie
                        </div>
                        <div className="space-y-2">
                          {[
                            { name: "Röntgenterapie", qUrl: "/documents/intrebari/Examen_N2_Rontgenterapie.pdf", bUrl: "/documents/bibliografie/Biblio_N2_Rontgenterapie.pdf" },
                            { name: "Terapie cu surse deschise", qUrl: "/documents/intrebari/Examen_N2_Terapie_Surse_Deschise.pdf", bUrl: "/documents/bibliografie/Biblio_N2_Terapie_Surse_Deschise.pdf" },
                            { name: "Terapie cu acceleratori de particule", qUrl: "/documents/intrebari/Examen_N2_Terapie_Acceleratori.pdf", bUrl: "/documents/bibliografie/Biblio_N2_Terapie_Acceleratori.pdf" },
                            { name: "Curieterapie (Brachiterapie)", qUrl: "/documents/intrebari/Examen_N2_Curieterapie_Brachiterapie.pdf", bUrl: "/documents/bibliografie/Biblio_N2_Curieterapie_Brachiterapie.pdf" },
                          ].map((item, idx) => (
                            <div key={idx} className="p-2.5 border border-border rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <span className="text-xs font-medium text-foreground">{item.name}</span>
                              <div className="flex items-center gap-2 shrink-0">
                                <a href={item.qUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand/10 text-brand hover:bg-brand hover:text-white rounded-sm text-xs font-medium transition-colors">
                                  <FileText className="h-3 w-3" /> Întrebări
                                </a>
                                <a href={item.bUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 px-2.5 py-1 bg-gold/20 text-brand-deep hover:bg-gold rounded-sm text-xs font-medium transition-colors">
                                  <BookMarked className="h-3 w-3" /> Bibliografie
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 3. COMPLEX */}
                      <div className="bg-card p-4 border border-border rounded-sm">
                        <div className="text-xs font-semibold text-brand uppercase tracking-wider mb-3">
                          3. Domeniul: Complex
                        </div>
                        <div className="p-2.5 border border-border rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <span className="text-xs font-medium text-foreground">Igienă radiațiilor</span>
                          <div className="flex items-center gap-2 shrink-0">
                            <a href="/documents/intrebari/Examen_N2_Igiena_Radiatiilor.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand/10 text-brand hover:bg-brand hover:text-white rounded-sm text-xs font-medium transition-colors">
                              <FileText className="h-3 w-3" /> Întrebări
                            </a>
                            <a href="/documents/bibliografie/Biblio_N2_Igiena_Radiatiilor.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 px-2.5 py-1 bg-gold/20 text-brand-deep hover:bg-gold rounded-sm text-xs font-medium transition-colors">
                              <BookMarked className="h-3 w-3" /> Bibliografie
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* 4. GENERATORI DE RADIATII */}
                      <div className="bg-card p-4 border border-border rounded-sm">
                        <div className="text-xs font-semibold text-brand uppercase tracking-wider mb-3">
                          4. Domeniul: Generatori de radiații
                        </div>
                        <div className="space-y-2">
                          {[
                            { name: "Montare, reparare, întreținere, verificare - instalații medicale", qUrl: "/documents/intrebari/Examen_N2_Generatori_Instalatii_Medicale.pdf", bUrl: "/documents/bibliografie/Biblio_N2_Generatori_Instalatii_Medicale.pdf" },
                            { name: "Montare, reparare, întreținere, verificare - instalații industriale", qUrl: "/documents/intrebari/Examen_N2_Generatori_Instalatii_Industriale.pdf", bUrl: "/documents/bibliografie/Biblio_N2_Generatori_Instalatii_Industriale.pdf" },
                            { name: "Control nedistructiv", qUrl: "/documents/intrebari/Examen_N2_Control_Nedistructiv.pdf", bUrl: "/documents/bibliografie/Biblio_N2_Control_Nedistructiv.pdf" },
                            { name: "Analize fizice", qUrl: "/documents/intrebari/Examen_N2_Analize_Fizice.pdf", bUrl: "/documents/bibliografie/Biblio_N2_Analize_Fizice.pdf" },
                            { name: "Röntgendiagnostic veterinar", qUrl: "/documents/intrebari/Examen_N2_Rontgendiagnostic_Veterinar.pdf", bUrl: "/documents/bibliografie/Biblio_N2_Rontgendiagnostic_Veterinar.pdf" },
                            { name: "Control nedistructiv - control bagaje RX", qUrl: "/documents/intrebari/Examen_N2_Control_Bagaje_RX.pdf", bUrl: "/documents/bibliografie/Biblio_N2_Control_Bagaje_RX.pdf" },
                          ].map((item, idx) => (
                            <div key={idx} className="p-2.5 border border-border rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <span className="text-xs font-medium text-foreground">{item.name}</span>
                              <div className="flex items-center gap-2 shrink-0">
                                <a href={item.qUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand/10 text-brand hover:bg-brand hover:text-white rounded-sm text-xs font-medium transition-colors">
                                  <FileText className="h-3 w-3" /> Întrebări
                                </a>
                                <a href={item.bUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 px-2.5 py-1 bg-gold/20 text-brand-deep hover:bg-gold rounded-sm text-xs font-medium transition-colors">
                                  <BookMarked className="h-3 w-3" /> Bibliografie
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 5. SURSE INCHISE DE RADIATII */}
                      <div className="bg-card p-4 border border-border rounded-sm">
                        <div className="text-xs font-semibold text-brand uppercase tracking-wider mb-3">
                          5. Domeniul: Surse închise de radiații
                        </div>
                        <div className="space-y-2">
                          {[
                            { name: "Montare, reparare, întreținere, verificare - instalații medicale", qUrl: "/documents/intrebari/Examen_N2_SurseInchise_Instalatii_Medicale.pdf", bUrl: "/documents/bibliografie/Biblio_N2_SurseInchise_Instalatii_Medicale.pdf" },
                            { name: "Montare, reparare, întreținere, verificare - instalații industriale", qUrl: "/documents/intrebari/Examen_N2_SurseInchise_Instalatii_Industriale.pdf", bUrl: "/documents/bibliografie/Biblio_N2_SurseInchise_Instalatii_Industriale.pdf" },
                            { name: "Control nedistructiv", qUrl: "/documents/intrebari/Examen_N2_SurseInchise_Control_Nedistructiv.pdf", bUrl: "/documents/bibliografie/Biblio_N2_SurseInchise_Control_Nedistructiv.pdf" },
                            { name: "Iradieri materiale", qUrl: "/documents/intrebari/Examen_N2_SurseInchise_Iradieri_Materiale.pdf", bUrl: "/documents/bibliografie/Biblio_N2_SurseInchise_Iradieri_Materiale.pdf" },
                            { name: "Alte aplicații", qUrl: "/documents/intrebari/Examen_N2_SurseInchise_Alte_Aplicatii.pdf", bUrl: "/documents/bibliografie/Biblio_N2_SurseInchise_Alte_Aplicatii.pdf" },
                            { name: "Control nedistructiv - control bagaje sisteme închise", qUrl: "/documents/intrebari/Examen_N2_SurseInchise_Control_Bagaje.pdf", bUrl: "/documents/bibliografie/Biblio_N2_SurseInchise_Control_Bagaje.pdf" },
                          ].map((item, idx) => (
                            <div key={idx} className="p-2.5 border border-border rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <span className="text-xs font-medium text-foreground">{item.name}</span>
                              <div className="flex items-center gap-2 shrink-0">
                                <a href={item.qUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand/10 text-brand hover:bg-brand hover:text-white rounded-sm text-xs font-medium transition-colors">
                                  <FileText className="h-3 w-3" /> Întrebări
                                </a>
                                <a href={item.bUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 px-2.5 py-1 bg-gold/20 text-brand-deep hover:bg-gold rounded-sm text-xs font-medium transition-colors">
                                  <BookMarked className="h-3 w-3" /> Bibliografie
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 6. SURSE DESCHISE DE RADIATII */}
                      <div className="bg-card p-4 border border-border rounded-sm">
                        <div className="text-xs font-semibold text-brand uppercase tracking-wider mb-3">
                          6. Domeniul: Surse deschise de radiații
                        </div>
                        <div className="space-y-2">
                          {[
                            { name: "Montare, reparare, întreținere, verificare", qUrl: "/documents/intrebari/Examen_N2_SurseDeschise_Montare.pdf", bUrl: "/documents/bibliografie/Biblio_N2_SurseDeschise_Montare.pdf" },
                            { name: "Radiochimie", qUrl: "/documents/intrebari/Examen_N2_SurseDeschise_Radiochimie.pdf", bUrl: "/documents/bibliografie/Biblio_N2_SurseDeschise_Radiochimie.pdf" },
                            { name: "Marcări", qUrl: "/documents/intrebari/Examen_N2_SurseDeschise_Marcari.pdf", bUrl: "/documents/bibliografie/Biblio_N2_SurseDeschise_Marcari.pdf" },
                          ].map((item, idx) => (
                            <div key={idx} className="p-2.5 border border-border rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <span className="text-xs font-medium text-foreground">{item.name}</span>
                              <div className="flex items-center gap-2 shrink-0">
                                <a href={item.qUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand/10 text-brand hover:bg-brand hover:text-white rounded-sm text-xs font-medium transition-colors">
                                  <FileText className="h-3 w-3" /> Întrebări
                                </a>
                                <a href={item.bUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 px-2.5 py-1 bg-gold/20 text-brand-deep hover:bg-gold rounded-sm text-xs font-medium transition-colors">
                                  <BookMarked className="h-3 w-3" /> Bibliografie
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 7. ACCELERATORI DE PARTICULE */}
                      <div className="bg-card p-4 border border-border rounded-sm">
                        <div className="text-xs font-semibold text-brand uppercase tracking-wider mb-3">
                          7. Domeniul: Acceleratori de particule
                        </div>
                        <div className="p-2.5 border border-border rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <span className="text-xs font-medium text-foreground">Acceleratori de particule</span>
                          <div className="flex items-center gap-2 shrink-0">
                            <a href="/documents/intrebari/Examen_N2_Acceleratori_Particule.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand/10 text-brand hover:bg-brand hover:text-white rounded-sm text-xs font-medium transition-colors">
                              <FileText className="h-3 w-3" /> Întrebări
                            </a>
                            <a href="/documents/bibliografie/Biblio_N2_Acceleratori_Particule.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 px-2.5 py-1 bg-gold/20 text-brand-deep hover:bg-gold rounded-sm text-xs font-medium transition-colors">
                              <BookMarked className="h-3 w-3" /> Bibliografie
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

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
                ? "Permisele de exercitare eliberate de CNCAN sunt clasificate pe 3 niveluri de competență și responsabilitate, în funcție de domeniul de activitate (radiodiagnostic, radioterapie, medicina nucleară, defectoscopie industrială, gămagrafie, generatoare de radiații)."
                : "CNCAN practice permits are classified into 3 levels of competence and responsibility."}
            </p>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="border border-border bg-card p-6 rounded-sm">
                <div className="font-mono text-xs font-bold text-brand uppercase tracking-wider bg-brand/10 px-2.5 py-1 rounded-sm inline-block">Nivelul 1</div>
                <h4 className="mt-4 font-display text-xl text-brand-deep font-semibold">Operator / Manipulant Surse</h4>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Eliberat persoanelor desemnate pentru activități cu risc radiologic scazut/scazut-mediu. Permite executarea operatiunilor direct sub supravegherea RSR.
                </p>
              </div>

              <div className="border border-border bg-card p-6 rounded-sm">
                <div className="font-mono text-xs font-bold text-brand uppercase tracking-wider bg-brand/10 px-2.5 py-1 rounded-sm inline-block">Nivelul 2</div>
                <h4 className="mt-4 font-display text-xl text-brand-deep font-semibold">Responsabil Radioprotecție (RSR)</h4>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Destinat personalului care conduce și coordonează zona controlată radiologic, asigură aplicarea normelor de securitate și gestionarea evidenței surselor.
                </p>
              </div>

              <div className="border border-border bg-card p-6 rounded-sm">
                <div className="font-mono text-xs font-bold text-brand uppercase tracking-wider bg-brand/10 px-2.5 py-1 rounded-sm inline-block">Nivelul 3</div>
                <h4 className="mt-4 font-display text-xl text-brand-deep font-semibold">Expert Protecție Radiologică / Fizică Medicală</h4>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Specialiști înalt calificați acreditați pentru audit tehnic, expertiză radiologică, optimizare de doze și consultanță pentru proiecte nucleare/medicale complexe.
                </p>
              </div>
            </div>
          </TabsContent>

          {/* TAB 3: ELIBERARE NIVEL 1 SI 2 */}
          <TabsContent value="nivel12" className="pt-8">
            <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
              <div>
                <h3 className="font-display text-2xl text-brand-deep font-semibold">
                  {lang === "ro" ? "Eliberare Permise de Exercitare Nivel 1 și Nivel 2" : "Issuance of Level 1 & Level 2 Permits"}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {lang === "ro"
                    ? "Permisele de Nivel 1 și 2 se eliberează în urma promovării examenului susținut în fața comisiei CNCAN, după depunerea dosarului complet și parcurgerea cursurilor de pregătire acreditate."
                    : "Level 1 and 2 permits are issued after passing the exam before the CNCAN commission."}
                </p>

                <div className="mt-8 space-y-4">
                  <h4 className="font-display text-lg text-foreground font-medium">Condiții de eligibilitate și etape:</h4>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                      <span>Absolvent de studii medii sau superioare profil tehnic, fizică, chimie sau medicină.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                      <span>Efectuarea instruirii teoretice și practice în cadrul centrelor de pregătire acreditate CNCAN.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                      <span>Obținerea avizului de aptitudine medicală eliberat de un medic de medicina muncii acreditat.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                      <span>Susținerea examenului grilă și a probei orale la sediul CNCAN.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <aside className="space-y-6">
                <div className="border border-border bg-card p-6 rounded-sm">
                  <h4 className="font-display text-lg text-brand-deep font-semibold mb-4">Bibliografie & Tematică</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    Tematica oficială include Legea 111/1996, Normele NSR-01, NSR-02 și procedurile specifice domeniului solicitat.
                  </p>
                  <a
                    href="/legislatie"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand text-primary-foreground rounded-sm text-xs font-medium hover:bg-brand-deep transition-colors w-full justify-center"
                  >
                    <BookOpen className="h-4 w-4" /> Descarcă Tematica Examen
                  </a>
                </div>
              </aside>
            </div>
          </TabsContent>

          {/* TAB 4: ELIBERARE NIVEL 3 */}
          <TabsContent value="nivel3" className="pt-8">
            <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
              <div>
                <h3 className="font-display text-2xl text-brand-deep font-semibold">
                  {lang === "ro" ? "Eliberare Permise de Exercitare Nivel 3 (Experți)" : "Issuance of Level 3 Practice Permits"}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {lang === "ro"
                    ? "Permisul de Nivel 3 se adresează experților în protecție radiologică și experților în fizică medicală deținători de titluri de doctor sau experiență înaltă de minim 5 ani în domeniul nuclear."
                    : "Level 3 permits target radiation protection experts and medical physics experts."}
                </p>

                {/* REGISTRU NIVEL 3 HIGHLIGHT CARD */}
                <div className="mt-8 border border-brand/30 bg-gradient-to-r from-brand-deep/5 via-card to-brand/10 p-5 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <UserCheck className="h-6 w-6 text-brand shrink-0" />
                    <div>
                      <div className="font-display text-base font-semibold text-brand-deep">
                        LISTA POSESORILOR PERMISULUI DE EXERCITARE NIVEL 3
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Registrul public CNCAN al tuturor experților în protecție radiologică acreditați Nivel 3.
                      </div>
                    </div>
                  </div>
                  <a
                    href="/documents/Lista_Posesorilor_Permisului_de_Exercitare_Nivel_3.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-brand text-primary-foreground rounded-sm text-xs font-semibold hover:bg-brand-deep transition-colors"
                  >
                    <Download className="h-4 w-4" /> Descarcă Lista (PDF)
                  </a>
                </div>

                {/* NEW DEDICATED SECTION: DOCUMENTATIA PENTRU PRELUNGIREA NIVEL 3 */}
                <div className="mt-10 border border-brand/30 bg-card p-6 md:p-8 rounded-sm shadow-sm">
                  <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-border">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-sm bg-brand/10 text-brand grid place-items-center shrink-0">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-display text-xl text-brand-deep font-semibold">
                          Documentația pentru Prelungirea Perioadei de Valabilitate a Permisului de Nivel 3
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Lista completă a rapoartelor și dovezilor necesare pentru prelungirea permisului de exercitare de Nivel 3.
                        </p>
                      </div>
                    </div>
                    <a
                      href="/documents/Cerere_Raport_Prelungire_Nivel3.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-brand text-primary-foreground rounded-sm text-xs font-semibold hover:bg-brand-deep transition-colors"
                    >
                      <Download className="h-4 w-4" /> Descarcă Formular Prelungire (PDF)
                    </a>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        num: "01",
                        title: "Extras din evidența titularilor / solicitanților de autorizații",
                        desc: "Extras detaliat privind titularii sau solicitanții de autorizații pentru care expertul de Nivel 3 a oferit consultanță tehnică de specialitate.",
                      },
                      {
                        num: "02",
                        title: "Raport privind participarea la cursuri de radioprotecție (ultimii 5 ani)",
                        desc: "Raport justificativ privind participarea solicitantului în ultimii 5 ani la cursuri de pregătire în radioprotecție, în calitate de lector sau cursant.",
                      },
                      {
                        num: "03",
                        title: "Dovada participării la elaborarea de standarde, norme și lucrări științifice",
                        desc: "Dovada activității desfășurate în perioada de valabilitate a permisului la elaborarea de standarde, norme sau lucrări științifice publicate în domeniul radioprotecției.",
                      },
                      {
                        num: "04",
                        title: "Raport privind incidente / accidente radiologice și analiza cauzelor",
                        desc: "Raport detaliat privind eventualele incidente sau accidente radiologice petrecute în unitățile consultate, analiza cauzelor și măsurile corective/preventive recomandate pentru preîntâmpinarea repetării lor.",
                      },
                      {
                        num: "05",
                        title: "Raport privind contribuția personală la aplicarea principiului ALARA",
                        desc: "Raport privind contribuția personală adusă la aplicarea principiului ALARA (As Low As Reasonably Achievable) în evaluările de securitate radiologică efectuate.",
                      },
                      {
                        num: "06",
                        title: "Semnalarea altor observații și comentarii de securitate radiologică",
                        desc: "Semnalarea altor observații, comentarii sau evenimente relevante care merită a fi analizate din punct de vedere al securității radiologice.",
                      },
                      {
                        num: "07",
                        title: "Raport al sancțiunilor primite (dacă este cazul)",
                        desc: "Raport privind eventualele sancțiuni primite referitoare la încălcări ale normelor de securitate radiologică în perioada de valabilitate a permisului.",
                      },
                    ].map((docItem, idx) => (
                      <div key={idx} className="border border-border p-4 rounded-sm bg-secondary/15 flex items-start gap-4">
                        <div className="shrink-0 font-mono text-xs font-bold text-brand bg-brand/10 h-8 w-8 grid place-items-center rounded-sm">
                          {docItem.num}
                        </div>
                        <div>
                          <div className="font-display text-base text-brand-deep font-semibold">
                            {docItem.title}
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground leading-relaxed">
                            {docItem.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <h4 className="font-display text-lg text-foreground font-medium">Procedura specială Nivel 3:</h4>
                  <div className="border border-border bg-card p-5 rounded-sm space-y-3">
                    <div className="font-medium text-foreground text-sm">Examinarea în fața Comisiei Centrale CNCAN</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Evaluare complexă din calcule de ecranare, dozimetrie avansată, analiză de risc și optimizare ALARA.
                    </p>
                  </div>
                </div>
              </div>

              <aside className="space-y-6">
                <div className="border border-brand/40 bg-brand/5 p-6 rounded-sm">
                  <div className="text-xs font-semibold text-brand uppercase tracking-wider">Atestat Expert Nivel 3</div>
                  <div className="mt-2 font-display text-2xl text-brand-deep font-bold">Valabilitate 5 Ani</div>
                  <div className="mt-1 text-xs text-muted-foreground">Cu raportare anuală obligatorie CNCAN</div>
                </div>
              </aside>
            </div>
          </TabsContent>

          {/* TAB 5: SISTEM AUTORIZARE */}
          <TabsContent value="sistem" className="pt-8">
            <div className="space-y-12">
              {/* SECTION 1: TIPURILE DE AUTORIZAȚII */}
              <div className="border border-brand/30 bg-card p-6 md:p-8 rounded-sm shadow-sm">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                  <div className="h-10 w-10 rounded-sm bg-brand/10 text-brand grid place-items-center shrink-0">
                    <FileCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl text-brand-deep font-bold tracking-tight">
                      TIPURILE DE AUTORIZAȚII
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Lista completă a autorizațiilor eliberate de CNCAN conform reglementărilor legale în vigoare.
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    "1. Autorizația de securitate radiologică pentru produs",
                    "2. Autorizația de securitate radiologică pentru desfășurarea de activități din domeniul nuclear",
                    "3. Autorizația de import - export",
                    "4. Autorizația de închiriere",
                    "5. Autorizația de furnizare",
                    "6. Autorizația de transfer",
                    "7. Autorizația de transport sau de tranzitare",
                    "8. Autorizația de deținere",
                    "9. Autorizația de utilizare - funcționare și/sau pentru practici",
                    "10. Autorizația de construire",
                    "11. Autorizația de dezafectare",
                    "12. Autorizația de manipulare",
                    "13. Autorizația de producere",
                  ].map((authType, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 border border-border bg-secondary/20 rounded-sm flex items-start gap-3 hover:border-brand/50 transition-colors"
                    >
                      <CheckCircle2 className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                      <span className="text-xs font-medium text-foreground leading-snug">{authType}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 2: DOCUMENTAȚIA TEHNICĂ */}
              <div className="border border-brand/30 bg-card p-6 md:p-8 rounded-sm shadow-sm">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                  <div className="h-10 w-10 rounded-sm bg-brand/10 text-brand grid place-items-center shrink-0">
                    <FileCode className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl text-brand-deep font-bold tracking-tight">
                      DOCUMENTAȚIA TEHNICĂ
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Documentațiile tehnice necesare în funcție de tipul de autorizare și specificul practicilor solicitate.
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    "Documentația tehnică pentru înregistrare",
                    "Documentația tehnică pentru autorizația de securitate radiologică de produs",
                    "Documentația tehnică pentru autorizarea practicilor și utilizării - funcționării",
                    "Documentația tehnică pentru amplasare-construcție",
                    "Documentația tehnică de import-export",
                    "Documentația tehnică de închiriere sau transfer",
                    "Documentația tehnică de furnizare",
                    "Documentația tehnică de transport/tranzitare",
                    "Documentația tehnică de deținere",
                    "Documentația tehnică de manipulare",
                    "Documentația tehnică de producere",
                    "Documentația tehnică de dezafectare",
                  ].map((docTech, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 border border-border bg-card rounded-sm flex items-center gap-3 hover:border-brand transition-colors"
                    >
                      <FileText className="h-4 w-4 text-brand shrink-0" />
                      <span className="text-xs font-medium text-foreground leading-snug">{docTech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 3: OPTIONAL HYPERLINKS */}
              <div className="border border-gold/40 bg-gradient-to-r from-gold/10 via-card to-gold/5 p-6 md:p-8 rounded-sm shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <Scale className="h-6 w-6 text-brand" />
                  <h4 className="font-display text-xl text-brand-deep font-semibold">
                    Reglementări & Proceduri Legale Conexe
                  </h4>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    {
                      name: "DURATA DE VALABILITATE A AUTORIZAȚIEI ȘI A ÎNREGISTRĂRII",
                      url: "/documents/autorizare/Durata_Valabilitate_Autorizatie.pdf",
                    },
                    {
                      name: "PRELUNGIREA, REAUTORIZAREA, MODIFICAREA AUTORIZAȚIILOR",
                      url: "/documents/autorizare/Prelungire_Reautorizare_Modificare.pdf",
                    },
                    {
                      name: "REGIMUL DE SANCȚIONARE",
                      url: "/documents/autorizare/Regimul_de_Sanctionare.pdf",
                    },
                    {
                      name: "ÎNCETAREA ACTIVITĂȚII",
                      url: "/documents/autorizare/Incetarea_Activitatii.pdf",
                    },
                  ].map((linkItem, idx) => (
                    <a
                      key={idx}
                      href={linkItem.url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-4 border border-border bg-card rounded-sm flex items-center justify-between text-xs font-semibold text-brand hover:bg-brand hover:text-white transition-colors group shadow-xs"
                    >
                      <span className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4 text-gold group-hover:text-white transition-colors shrink-0" />
                        {linkItem.name}
                      </span>
                      <Download className="h-4 w-4 text-brand group-hover:text-white shrink-0" />
                    </a>
                  ))}
                </div>
              </div>

              {/* ORIGINAL PHASES SUMMARY */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { step: "01", title: "Amplasare & Proiectare", desc: "Avizarea proiectului tehnic și a calculului de ecranare pentru amenajarea spațiului." },
                  { step: "02", title: "Construcție & Montaj", desc: "Autorizarea lucrărilor de amenajare a buncărelor radiologice și montarea aparaturii." },
                  { step: "03", title: "Deținere & Utilrare", desc: "Inspecția CNCAN la fața locului și eliberarea autorizației de exploatare." },
                  { step: "04", title: "Import / Export & Transport", desc: "Aprobarea de tranzit, expediere și transfer securizat al surselor radioactive." },
                ].map((phase, i) => (
                  <div key={i} className="border border-border bg-card p-6 rounded-sm">
                    <div className="font-mono text-xl font-bold text-brand">{phase.step}</div>
                    <h4 className="mt-3 font-display text-lg text-brand-deep font-semibold">{phase.title}</h4>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{phase.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* TAB 6: REGLEMENTARI */}
          <TabsContent value="reglementari" className="pt-8">
            <h3 className="font-display text-2xl text-brand-deep font-semibold mb-6">
              {lang === "ro" ? "Reglementări & Norme de Securitate Radiologică" : "Radiological Safety Regulations"}
            </h3>

            <div className="border border-border bg-card divide-y divide-border">
              {[
                { code: "NSR-01", ord: "Ord. CNCAN 14/2018", title: "Normele fundamentale de securitate radiologică (NFSR)" },
                { code: "NSR-02", ord: "Ord. CNCAN 155/2018", title: "Norme privind securitatea radiologică a surselor închise și deschise" },
                { code: "NSR-03", ord: "Ord. CNCAN 62/2004", title: "Norme privind autorizarea personalului de exploatare și protecție radiologică" },
                { code: "NSR-04", ord: "Ord. CNCAN 155/2005", title: "Regulamentul privind taxele și tarifele de autorizare și control" },
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
                    <BookOpen className="h-3.5 w-3.5" /> Consultă Legislația
                  </a>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* TAB 7: AUTORIZARE PERSONAL */}
          <TabsContent value="personal" className="pt-8">
            <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
              <div>
                <h3 className="font-display text-2xl text-brand-deep font-semibold mb-4">
                  {lang === "ro" ? "Autorizarea Personalului de Specialitate" : "Specialist Personnel Licensing"}
                </h3>
                <p className="text-sm text-muted-foreground max-w-3xl leading-relaxed mb-8">
                  Cerințe legale privind atestarea responsabililor cu securitatea radiologică (RSR), responsabililor cu gestiunea surselor și cadrelor medicale/tehnice.
                </p>

                {/* 1. TAXE SI TARIFE HYPERLINKS CARD */}
                <div className="border border-brand/30 bg-card p-6 md:p-8 rounded-sm shadow-sm mb-8">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                    <div className="h-10 w-10 rounded-sm bg-brand/10 text-brand grid place-items-center shrink-0">
                      <Receipt className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-display text-xl text-brand-deep font-semibold">
                        Formulare de Taxe și Tarife Autorizare Personal
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Accesați și descărcați formularele de taxe și tarife aplicabile pentru obținerea permisului de exercitare.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <a
                      href="/documents/taxe/Formular_Taxe_Tarife_Permis_Nivel_1.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="p-5 border border-border bg-secondary/20 hover:bg-brand/5 hover:border-brand rounded-sm flex flex-col justify-between transition-colors group"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="font-mono text-xs font-bold text-brand bg-brand/10 px-2.5 py-1 rounded-sm">
                          Nivelul 1
                        </span>
                        <Download className="h-4 w-4 text-brand group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="mt-4 font-display text-base font-semibold text-foreground group-hover:text-brand transition-colors">
                        Formular de taxe și tarife pentru obținerea permisului de exercitare de nivel 1
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
                        <ExternalLink className="h-3 w-3" /> Deschide PDF în tab nou
                      </div>
                    </a>

                    <a
                      href="/documents/taxe/Formular_Taxe_Tarife_Permis_Nivel_2.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="p-5 border border-border bg-secondary/20 hover:bg-brand/5 hover:border-brand rounded-sm flex flex-col justify-between transition-colors group"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="font-mono text-xs font-bold text-brand bg-brand/10 px-2.5 py-1 rounded-sm">
                          Nivelul 2
                        </span>
                        <Download className="h-4 w-4 text-brand group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="mt-4 font-display text-base font-semibold text-foreground group-hover:text-brand transition-colors">
                        Formulare de taxe și tarife pentru obținerea permisului de nivel 2
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
                        <ExternalLink className="h-3 w-3" /> Deschide PDF în tab nou
                      </div>
                    </a>
                  </div>
                </div>

                {/* 2. DEDICATED CARD: LISTA POSESORILOR PERMISULUI NIVEL 3 (PLACED AFTER TAXES) */}
                <div className="border border-brand/40 bg-gradient-to-r from-brand-deep/5 via-card to-brand/10 p-6 md:p-8 rounded-sm shadow-sm mb-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-sm bg-brand/10 text-brand grid place-items-center shrink-0">
                        <UserCheck className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-display text-xl text-brand-deep font-bold">
                          LISTA POSESORILOR PERMISULUI DE EXERCITARE NIVEL 3
                        </h4>
                        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                          Consultați registrul oficial public actualizat CNCAN al persoanelor fizice deținătoare ale permisului de exercitare Nivel 3 (Experți în protecție radiologică și fizică medicală).
                        </p>
                      </div>
                    </div>
                    <a
                      href="/documents/Lista_Posesorilor_Permisului_de_Exercitare_Nivel_3.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-brand text-primary-foreground text-xs font-semibold rounded-sm hover:bg-brand-deep transition-colors shadow-sm"
                    >
                      <Download className="h-4 w-4" /> Descarcă Lista Oficială (PDF)
                    </a>
                  </div>
                </div>

                <div className="border border-border bg-card p-6 rounded-sm">
                  <h4 className="font-display text-lg text-brand-deep font-semibold mb-3">Evidența Personalului Expus</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Titularii de autorizație au obligația legală de a transmite la CNCAN lista actualizată a tuturor persoanelor expuse profesional și a permiselor de exercitare active.
                  </p>
                </div>
              </div>

              <aside className="space-y-6">
                <div className="border border-brand/40 bg-brand/5 p-6 rounded-sm">
                  <div className="text-xs font-semibold text-brand uppercase tracking-wider">Tarif Evaluare Personal</div>
                  <div className="mt-2 font-display text-3xl text-brand-deep font-bold">480 RON</div>
                  <div className="mt-1 text-xs text-muted-foreground">Conform Ord. CNCAN 155/2005</div>
                </div>
              </aside>
            </div>
          </TabsContent>

          {/* TAB 8: RNDSR */}
          <TabsContent value="rndsr" className="pt-8">
            <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
              <div>
                <h3 className="font-display text-2xl text-brand-deep font-semibold">
                  {lang === "ro" ? "Registrul Național al Dozelor și Surselor de Radiații (RNDSR)" : "National Registry of Doses & Radiation Sources"}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {lang === "ro"
                    ? "RNDSR este sistemul informatic național gestionat de CNCAN pentru monitorizarea centralizată a dozelor individuale primite de lucrătorii expuși profesional și evidența strictă a mișcării surselor radioactive pe teritoriul României."
                    : "RNDSR is the national system managed by CNCAN for monitoring individual doses received by occupationally exposed workers."}
                </p>

                <div className="mt-8 space-y-4">
                  <h4 className="font-display text-lg text-foreground font-medium">Obligații de raportare RNDSR:</h4>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                      <span>Transmiterea trimestrială a citirilor dozimetrice individuale de către organismele dozimetrice acreditate.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                      <span>Raportarea imediată a oricărei depășiri a dozei maxime admise (20 mSv/an).</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                      <span>Înregistrarea transferului, casării sau achiziției de surse radioactive în termen de 5 zile lucrătoare.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <aside className="space-y-6">
                <div className="border border-border bg-card p-6 rounded-sm">
                  <h4 className="font-display text-lg text-brand-deep font-semibold mb-4">Portal Raportare RNDSR</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    Accesați portalul electronic dedicat pentru încărcarea rapoartelor dozimetrice și actualizarea registrului surselor.
                  </p>
                  <Button asChild className="w-full bg-brand hover:bg-brand-deep text-white text-xs font-semibold">
                    <Link to="/urgente">Acces Portal RNDSR</Link>
                  </Button>
                </div>
              </aside>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
