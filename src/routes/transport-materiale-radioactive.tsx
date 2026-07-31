import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Truck,
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

export const Route = createFileRoute("/transport-materiale-radioactive")({
  head: () => ({
    meta: [
      { title: "Transportul Materialelor Radioactive — CNCAN" },
      {
        name: "description",
        content:
          "Reglementări, sistem de autorizare și evaluare documente pentru transportul și tranzitarea materialelor radioactive pe teritoriul României.",
      },
      { property: "og:title", content: "Transport Materiale Radioactive CNCAN" },
      {
        property: "og:description",
        content: "Sistemul de autorizare, norme aplicabile și procedura de evaluare tehnică a transportului nuclear.",
      },
    ],
  }),
  component: RadioactiveTransportPage,
});

function RadioactiveTransportPage() {
  const { lang } = useI18n();
  const [activeTab, setActiveTab] = useState("sistem");

  return (
    <>
      <PageHeader
        eyebrow="TMR · CNCAN"
        title={lang === "ro" ? "Transportul Materialelor Radioactive" : "Radioactive Material Transport"}
        subtitle={
          lang === "ro"
            ? "Sistemul de autorizare, cadrul de reglementare național/internațional și procedurile de evaluare tehnică a documentelor."
            : "Licensing system, national/international regulatory framework, and technical document evaluation procedures."
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
            <Truck className="h-3.5 w-3.5 text-brand" />
            <span>{lang === "ro" ? "DOMENIU RECUNOSCUT CNCAN" : "CNCAN ACCREDITED DOMAIN"}</span>
          </div>
        </div>

        {/* TABS MENU */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto bg-card border border-border p-1.5 rounded-sm">
            <TabsTrigger
              value="sistem"
              className="py-3 px-4 text-xs md:text-sm font-medium data-[state=active]:bg-brand data-[state=active]:text-primary-foreground rounded-sm"
            >
              <Award className="h-4 w-4 mr-2" />
              {lang === "ro" ? "1. Sistem de autorizare" : "1. Licensing System"}
            </TabsTrigger>
            <TabsTrigger
              value="reglementari"
              className="py-3 px-4 text-xs md:text-sm font-medium data-[state=active]:bg-brand data-[state=active]:text-primary-foreground rounded-sm"
            >
              <Scale className="h-4 w-4 mr-2" />
              {lang === "ro" ? "2. Reglementări" : "2. Regulations"}
            </TabsTrigger>
            <TabsTrigger
              value="evaluare"
              className="py-3 px-4 text-xs md:text-sm font-medium data-[state=active]:bg-brand data-[state=active]:text-primary-foreground rounded-sm"
            >
              <ClipboardCheck className="h-4 w-4 mr-2" />
              {lang === "ro" ? "3. Evaluare documente" : "3. Document Evaluation"}
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: SISTEM DE AUTORIZARE */}
          <TabsContent value="sistem" className="space-y-8">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6 border border-border bg-card p-8 rounded-sm">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-brand uppercase tracking-widest bg-brand/10 px-3 py-1 rounded-full">
                  <Award className="h-3.5 w-3.5" />
                  {lang === "ro" ? "Sistemul Național de Autorizare TMR" : "National TMR Licensing System"}
                </div>
                <h2 className="font-display text-2xl md:text-3xl text-brand-deep">
                  {lang === "ro"
                    ? "Autorizarea transportului, tranzitării și intermedierii materialelor radioactive"
                    : "Licensing of transport, transit, and brokering of radioactive materials"}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {lang === "ro"
                    ? "Sistemul de autorizare CNCAN pentru transportul materialelor radioactive asigură că toate expedierile (pe cale rutieră, feroviară, maritimă sau aeriană) respectă cele mai stricte standarde internaționale de radioprotecție, prevenind riscurile de iradiere sau contaminare pentru transportatori și populație."
                    : "The CNCAN licensing system for radioactive material transport ensures that all shipments (by road, rail, sea, or air) comply with the strictest international radiation protection standards, preventing exposure or contamination hazards for carriers and the public."}
                </p>

                <div className="grid gap-4 md:grid-cols-2 pt-4 border-t border-border">
                  <div className="border border-border/60 bg-secondary/30 p-5 rounded-sm space-y-2">
                    <div className="flex items-center gap-2 text-brand font-display font-semibold text-base">
                      <Truck className="h-4 w-4" />
                      <span>{lang === "ro" ? "Autorizația de Transport" : "Transport Authorization"}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {lang === "ro"
                        ? "Necesară operatorilor care efectuează expedierea, transportul pe teritoriul României sau intermedierea de materiale radioactive clasificate."
                        : "Required for operators conducting shipment, domestic transport in Romania, or brokering of classified radioactive materials."}
                    </p>
                  </div>

                  <div className="border border-border/60 bg-secondary/30 p-5 rounded-sm space-y-2">
                    <div className="flex items-center gap-2 text-brand font-display font-semibold text-base">
                      <Globe className="h-4 w-4" />
                      <span>{lang === "ro" ? "Autorizația de Tranzit & Export" : "Transit & Export Permit"}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {lang === "ro"
                        ? "Avizare obligatorie pentru tranzitarea teritoriului național, importul sau exportul coletelor și materialelor radioactive de tip industrial, medical sau nuclear."
                        : "Mandatory permit for transit across national territory, import, or export of industrial, medical, or nuclear radioactive packages and materials."}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-sm bg-brand/5 border border-brand/20">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-deep mb-2">
                    {lang === "ro" ? "Clasificarea coletelor de transport:" : "Transport package classification:"}
                  </h4>
                  <ul className="grid gap-2 sm:grid-cols-2 text-xs text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand shrink-0" />
                      <span>{lang === "ro" ? "Colete exceptate & Colete industriale (IP-1, IP-2, IP-3)" : "Excepted & Industrial packages (IP-1, IP-2, IP-3)"}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand shrink-0" />
                      <span>{lang === "ro" ? "Colete de Tip A (surse standard de diagnostic/industrie)" : "Type A packages (standard diagnostic/industrial sources)"}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand shrink-0" />
                      <span>{lang === "ro" ? "Colete de Tip B(U) și B(M) (surse de mare activitate)" : "Type B(U) and B(M) packages (high-activity sources)"}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand shrink-0" />
                      <span>{lang === "ro" ? "Colete de Tip C & materiale fisionabile" : "Type C packages & fissile materials"}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border border-brand/30 bg-gradient-to-b from-brand-deep/5 via-card to-card p-6 rounded-sm space-y-5">
                <div className="flex items-center gap-3 text-brand">
                  <ShieldCheck className="h-6 w-6" />
                  <h3 className="font-display text-lg text-brand-deep">
                    {lang === "ro" ? "Obligațiile Solicitantului" : "Applicant Obligations"}
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {lang === "ro"
                    ? "Pentru obținerea autorizației de transport, transportatorul trebuie să demonstreze existența personalului calificat, deținerea de vehicule autorizate, a planului de intervenție în caz de urgență și conformitatea cu cerințele de protecție fizică."
                    : "To obtain transport authorization, carriers must demonstrate qualified personnel, authorized vehicles, emergency response plans, and compliance with physical protection requirements."}
                </p>
                <div className="space-y-3 pt-3 border-t border-border text-xs text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-brand">•</span>
                    <span>{lang === "ro" ? "Consilier de siguranță pentru transportul mărfurilor periculoase Clasa 7" : "Safety adviser for Class 7 dangerous goods transport"}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-brand">•</span>
                    <span>{lang === "ro" ? "Sistem de Management al Calității (SMC) avizat CNCAN" : "CNCAN-endorsed Quality Management System (QMS)"}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-brand">•</span>
                    <span>{lang === "ro" ? "Asigurare de răspundere civilă / garanții financiare" : "Civil liability insurance / financial guarantees"}</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TAB 2: REGLEMENTARI */}
          <TabsContent value="reglementari" className="space-y-8">
            <div className="rounded-sm border border-brand/30 bg-gradient-to-r from-brand-deep/5 via-card to-brand/5 p-6 md:p-8">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand uppercase tracking-widest bg-brand/10 px-3 py-1 rounded-full mb-3">
                  <Scale className="h-4 w-4" />
                  {lang === "ro" ? "CADRUL NORMATIV NAȚIONAL ȘI INTERNAȚIONAL" : "NATIONAL & INTERNATIONAL REGULATORY FRAMEWORK"}
                </div>
                <h2 className="font-display text-2xl md:text-3xl text-brand-deep">
                  {lang === "ro"
                    ? "Reglementări aplicabile transportului de materiale radioactive"
                    : "Regulations applicable to transport of radioactive materials"}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {lang === "ro"
                    ? "Reglementările emise de CNCAN în domeniul transportului sunt armonizate integral cu reglementările Agenției Internaționale pentru Energia Atomică (AIEA SSR-6) și cu acordurile internaționale pentru transportul mărfurilor periculoase din clasa 7 (ADR, RID, IMDG, ICAO-TI)."
                    : "CNCAN transport regulations are fully harmonized with International Atomic Energy Agency regulations (IAEA SSR-6) and international dangerous goods agreements for Class 7 (ADR, RID, IMDG, ICAO-TI)."}
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  code: "NDR-01",
                  ro: "Norme fundamentale pentru transportul în siguranță al materialelor radioactive",
                  en: "Fundamental norms for the safe transport of radioactive materials",
                  desc_ro:
                    "Stabilesc standardele obligatorii pentru proiectarea coletelor, etichetare, indexul de transport (IT), limitele de iradiere la suprafața vehiculelor și cerințele de radioprotecție operațională.",
                  desc_en:
                    "Establishes mandatory standards for package design, labeling, transport index (TI), surface radiation limits, and operational radiation protection rules.",
                },
                {
                  code: "NS-TR-02",
                  ro: "Reglementări privind securitatea fizică a transporturilor de materiale nucleare și radioactive",
                  en: "Regulations on physical security of nuclear and radioactive material transport",
                  desc_ro:
                    "Măsurile de protecție fizică, monitorizare prin GPS, escortă specializată și securizarea rutelor în timpul transportului terestru sau aerian.",
                  desc_en:
                    "Physical protection measures, GPS tracking, specialized escort, and route security during ground or air transport.",
                },
                {
                  code: "ADR / RID / IMDG",
                  ro: "Acorduri Internaționale (Clasa 7 — Mărfuri Periculoase)",
                  en: "International Agreements (Class 7 — Dangerous Goods)",
                  desc_ro:
                    "Aplicarea directă a prevederilor ADR (rutier), RID (feroviar), IMDG (maritim) și ICAO/IATA (aerian) privind marcarea, placarea și documentația de transport.",
                  desc_en:
                    "Direct application of ADR (road), RID (rail), IMDG (maritime), and ICAO/IATA (air) regarding marking, placarding, and transport documentation.",
                },
                {
                  code: "OM-TR-04",
                  ro: "Norme privind raportarea evenimentelor și intervenția în caz de accident la transport",
                  en: "Norms on event reporting and emergency intervention in transport accidents",
                  desc_ro:
                    "Procedurile operaționale de alertare a autorităților, delimitarea zonei periculoase și coordonarea cu Inspectoratul General pentru Situații de Urgență (IGSU) și CNCAN.",
                  desc_en:
                    "Operational procedures for alerting authorities, establishing exclusion zones, and coordinating with Emergency Situations Inspectorate and CNCAN.",
                },
              ].map((reg, idx) => (
                <div
                  key={idx}
                  className="border border-border bg-card p-6 rounded-sm hover:border-brand/60 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-sm bg-brand/10 text-brand font-mono text-xs font-bold">
                      {reg.code}
                    </span>
                    <h4 className="mt-3 font-display text-lg text-foreground leading-snug">
                      {lang === "ro" ? reg.ro : reg.en}
                    </h4>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      {lang === "ro" ? reg.desc_ro : reg.desc_en}
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-brand font-medium">
                    <span>{lang === "ro" ? "Reglementare în vigoare" : "Regulation in force"}</span>
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* TAB 3: EVALUARE DOCUMENTE */}
          <TabsContent value="evaluare" className="space-y-8">
            <div className="border border-border bg-card p-8 rounded-sm space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-brand uppercase tracking-widest bg-brand/10 px-3 py-1 rounded-full mb-2">
                  <ClipboardCheck className="h-3.5 w-3.5" />
                  {lang === "ro" ? "Procedura de Evaluare Tehnică" : "Technical Evaluation Procedure"}
                </div>
                <h3 className="font-display text-2xl text-brand-deep">
                  {lang === "ro"
                    ? "Evaluarea documentației pentru eliberarea autorizațiilor sau avizelor de transport"
                    : "Documentation evaluation for granting transport authorizations or endorsements"}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-3xl">
                  {lang === "ro"
                    ? "În procesul de avizare și autorizare, CNCAN evaluează conformitatea tehnică a dosarelor transmise de solicitanți, verificând siguranța radiologică a coletelor, planurile operaționale de transport și capacitatea de reacție în caz de urgență."
                    : "During the licensing process, CNCAN evaluates the technical compliance of application dossiers, verifying package radiation safety, operational transport plans, and emergency response capabilities."}
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3 pt-4">
                {[
                  {
                    step: "1",
                    title_ro: "Verificarea de Conformitate Administrativă",
                    title_en: "Administrative Compliance Check",
                    desc_ro:
                      "Verificarea cererilor oficiale, a completitudinii dosarului, achitarea taxelor legale și valabilitatea avizelor prealabile ale vehiculelor și personalului.",
                    desc_en:
                      "Verification of official applications, dossier completeness, legal fee payment, and prior validity of vehicle and staff permits.",
                  },
                  {
                    step: "2",
                    title_ro: "Evaluarea Tehnică & Radioprotecție",
                    title_en: "Technical & Radiation Safety Evaluation",
                    desc_ro:
                      "Analiza certificatelor de aprobare ale coletelor (Tip A, Tip B, etc.), analizele de ecranare, calculele de criticitate și planul de radioprotecție operațională.",
                    desc_en:
                      "Analysis of package approval certificates (Type A, Type B, etc.), shielding analyses, criticality calculations, and operational radioprotection plan.",
                  },
                  {
                    step: "3",
                    title_ro: "Inspecția și Eliberarea Autorizației",
                    title_en: "Inspection & License Issuance",
                    desc_ro:
                      "Efectuarea de controale pe amplasament sau la vehicul, testarea echipamentelor de intervenție și emiterea autorizației CNCAN de transport/tranzit.",
                    desc_en:
                      "Conducting on-site or vehicle checks, testing emergency equipment, and issuing the official CNCAN transport/transit license.",
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
                          {lang === "ro" ? "Etapă Evaluare" : "Evaluation Phase"}
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

              {/* CHECKLIST TABLE FOR TECHNICAL DOSSIER */}
              <div className="mt-8 pt-6 border-t border-border">
                <h4 className="font-display text-lg text-brand-deep mb-4">
                  {lang === "ro" ? "Checklist — Documente Obligatorii la Evaluare" : "Checklist — Mandatory Evaluation Documents"}
                </h4>
                <div className="overflow-x-auto border border-border rounded-sm">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-secondary text-muted-foreground font-mono uppercase text-[11px] border-b border-border">
                      <tr>
                        <th className="p-3.5">#</th>
                        <th className="p-3.5">{lang === "ro" ? "Denumire Document / Capitol" : "Document / Section Name"}</th>
                        <th className="p-3.5">{lang === "ro" ? "Cerință CNCAN" : "CNCAN Requirement"}</th>
                        <th className="p-3.5">{lang === "ro" ? "Status Evaluare" : "Evaluation Status"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60 text-foreground">
                      <tr>
                        <td className="p-3.5 font-mono text-muted-foreground">01</td>
                        <td className="p-3.5 font-medium">
                          {lang === "ro"
                            ? "Certificatul de omologare / aprobare pentru modelul de colet"
                            : "Approval certificate for package design"}
                        </td>
                        <td className="p-3.5 text-muted-foreground">
                          {lang === "ro" ? "Obligatoriu (emise sau recunoscute de CNCAN)" : "Mandatory (issued or endorsed by CNCAN)"}
                        </td>
                        <td className="p-3.5">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-semibold text-[11px]">
                            <CheckCircle2 className="h-3 w-3" />
                            {lang === "ro" ? "Cerință de bază" : "Core requirement"}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-muted-foreground">02</td>
                        <td className="p-3.5 font-medium">
                          {lang === "ro"
                            ? "Planul și procedurile de radioprotecție în timpul transportului"
                            : "Radioprotection plan and procedures during transport"}
                        </td>
                        <td className="p-3.5 text-muted-foreground">
                          {lang === "ro" ? "Conform normelor NDR-01 / SSR-6" : "In accordance with NDR-01 / SSR-6 norms"}
                        </td>
                        <td className="p-3.5">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-semibold text-[11px]">
                            <CheckCircle2 className="h-3 w-3" />
                            {lang === "ro" ? "Verificat tehnic" : "Technically verified"}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-muted-foreground">03</td>
                        <td className="p-3.5 font-medium">
                          {lang === "ro"
                            ? "Planul de Intervenție în caz de Urgență și Accident (PIU-T)"
                            : "Emergency and Accident Response Plan (PIU-T)"}
                        </td>
                        <td className="p-3.5 text-muted-foreground">
                          {lang === "ro" ? "Avizat de responsabilul pe securitate nucleară" : "Endorsed by nuclear safety officer"}
                        </td>
                        <td className="p-3.5">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-semibold text-[11px]">
                            <CheckCircle2 className="h-3 w-3" />
                            {lang === "ro" ? "Obligatoriu" : "Mandatory"}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-muted-foreground">04</td>
                        <td className="p-3.5 font-medium">
                          {lang === "ro"
                            ? "Autorizații pentru vehicule și permise de exercitare (şoferi ADR Clasa 7)"
                            : "Vehicle permits and Class 7 ADR driver licenses"}
                        </td>
                        <td className="p-3.5 text-muted-foreground">
                          {lang === "ro" ? "Certificare ADR în curs de valabilitate" : "Valid ADR certification"}
                        </td>
                        <td className="p-3.5">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 font-semibold text-[11px]">
                            <CheckCircle2 className="h-3 w-3" />
                            {lang === "ro" ? "Control administrativ" : "Administrative control"}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
