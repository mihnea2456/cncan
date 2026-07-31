import React, { useState } from "react";
import {
  Sparkles,
  Hospital,
  Factory,
  Truck,
  ArrowRight,
  CheckCircle2,
  FileText,
  ExternalLink,
  HelpCircle,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Link } from "@tanstack/react-router";

interface WizardOption {
  id: string;
  label_ro: string;
  label_en: string;
  targetPath: string;
  docCode: string;
  docTitle_ro: string;
  docTitle_en: string;
  norm_ro: string;
  norm_en: string;
}

const DOMAINS = [
  {
    id: "medical",
    icon: Hospital,
    ro: "Domeniul Medical",
    en: "Medical Domain",
    desc_ro: "Radiologie, Stomatologie, Radioterapie, Medicină Nucleară",
    desc_en: "Radiology, Dental, Radiotherapy, Nuclear Medicine",
    options: [
      {
        id: "stoma",
        label_ro: "Autorizare aparat Roentgen dentar / Stomatologie",
        label_en: "Dental X-ray machine / clinic licensing",
        targetPath: "/surse-de-radiatii-ionizante",
        docCode: "SR-01",
        docTitle_ro: "Dosar deținere și utilizare generator radiații (NSR-13)",
        docTitle_en: "Dossier for possession and use of X-ray generator (NSR-13)",
        norm_ro: "NSR-13 — Norme radiologie de diagnostic și interventională",
        norm_en: "NSR-13 — Diagnostic and interventional radiology norms",
      },
      {
        id: "pep-med",
        label_ro: "Permis de Exercitare Operator Medical (Medici / Asistenți)",
        label_en: "Medical Practice Permit (Doctors / Technicians)",
        targetPath: "/personal-expus-profesional",
        docCode: "PE-01",
        docTitle_ro: "Cerere eliberare / prelungire Permis Exercitare CNCAN",
        docTitle_en: "CNCAN Practice Permit issuance / renewal form",
        norm_ro: "Norme privind eliberarea permiselor de exercitare",
        norm_en: "Practice permit issuance regulations",
      },
      {
        id: "radio-terapie",
        label_ro: "Autorizare accelerator liniar / Radioterapie / CT",
        label_en: "Linear accelerator / Radiotherapy / CT licensing",
        targetPath: "/surse-de-radiatii-ionizante",
        docCode: "SR-02",
        docTitle_ro: "Dosar complet autorizare instalație medicală complexă",
        docTitle_en: "Full application dossier for complex medical installation",
        norm_ro: "NSR-12 — Norme de securitate în radioterapie",
        norm_en: "NSR-12 — Radiotherapy safety norms",
      },
    ] as WizardOption[],
  },
  {
    id: "industrial",
    icon: Factory,
    ro: "Domeniul Industrial & Cercetare",
    en: "Industrial & Research Domain",
    desc_ro: "Control nedistructiv (CND), Iradiatori, IFIN-HH, Laboratoare",
    desc_en: "Non-destructive testing (NDT), Irradiators, Labs",
    options: [
      {
        id: "cnd",
        label_ro: "Autorizare surse Control Nedistructiv (Gamagrafie / X)",
        label_en: "Non-Destructive Testing source licensing (Gamma / X)",
        targetPath: "/surse-de-radiatii-ionizante",
        docCode: "SR-03",
        docTitle_ro: "Cerere autorizare practică industrială CND",
        docTitle_en: "Application for NDT industrial practice licensing",
        norm_ro: "NSR-10 — Norme de securitate pentru control nedistructiv",
        norm_en: "NSR-10 — NDT radiation safety norms",
      },
      {
        id: "pep-ind",
        label_ro: "Permis Operator CND / Responsabil Securitate (RSR)",
        label_en: "NDT Operator Permit / Radiation Safety Officer (RSO)",
        targetPath: "/personal-expus-profesional",
        docCode: "PE-03",
        docTitle_ro: "Formular nominalizare și atestare RSR / Operator Nivel 2-3",
        docTitle_en: "Nomination and accreditation form for RSO / Level 2-3",
        norm_ro: "Normative de autorizare personal expus profesional",
        norm_en: "Occupationally exposed staff licensing standards",
      },
      {
        id: "smc",
        label_ro: "Avizare / Autorizare Sistem Managementul Calității (SMC)",
        label_en: "Quality Management System (QMS) Licensing",
        targetPath: "/managementul-calitatii",
        docCode: "MC-01",
        docTitle_ro: "Model Cerere Autorizare Sistem Managementul Calității",
        docTitle_en: "Model QMS Licensing Application",
        norm_ro: "NMC-01 — Norme de management al calității în domeniul nuclear",
        norm_en: "NMC-01 — Quality management norms in the nuclear field",
      },
    ] as WizardOption[],
  },
  {
    id: "transport",
    icon: Truck,
    ro: "Transport & Deșeuri Radioactive",
    en: "Transport & Radioactive Waste",
    desc_ro: "Colete tip B, expedieri internaționale, depozite, eliberare",
    desc_en: "Type B packages, international shipments, repositories",
    options: [
      {
        id: "trans-colet",
        label_ro: "Aprobare model colet sau autorizație transport",
        label_en: "Package design approval or transport license",
        targetPath: "/transport-materiale-radioactive",
        docCode: "NTR-03",
        docTitle_ro: "Raport de securitate și cerere aprobare model colet",
        docTitle_en: "Safety report and package design approval form",
        norm_ro: "NTR-01 / NTR-03 — Norme naționale transport materiale radioactive",
        norm_en: "NTR-01 / NTR-03 — National transport safety regulations",
      },
      {
        id: "deseuri-auth",
        label_ro: "Autorizare management / depozitare deșeuri radioactive",
        label_en: "Radioactive waste management / storage licensing",
        targetPath: "/deseuri-radioactive",
        docCode: "NDR-01",
        docTitle_ro: "Gospodărirea în siguranță a deșeurilor radioactive",
        docTitle_en: "Safe management of radioactive waste",
        norm_ro: "NDR-01 — Norme fundamentale gospodărire deșeuri",
        norm_en: "NDR-01 — Fundamental waste management norms",
      },
      {
        id: "constructii-nuc",
        label_ro: "Autorizație de construire / desființare obiectiv nuclear",
        label_en: "Nuclear facility construction / decommissioning permit",
        targetPath: "/constructii-nucleare",
        docCode: "CN-01",
        docTitle_ro: "Norme privind construcțiile cu specific nuclear",
        docTitle_en: "Regulations on nuclear-specific constructions",
        norm_ro: "Normativ tehnic construcții și instalații nucleare",
        norm_en: "Technical code for nuclear buildings and installations",
      },
    ] as WizardOption[],
  },
];

export function LicensingWizard() {
  const { lang } = useI18n();
  const [selectedDomainIdx, setSelectedDomainIdx] = useState(0);
  const [selectedOptIdx, setSelectedOptIdx] = useState(0);

  const domain = DOMAINS[selectedDomainIdx];
  const option = domain.options[selectedOptIdx] || domain.options[0];

  return (
    <div className="border border-brand/40 bg-gradient-to-b from-brand-deep/5 via-card to-card p-6 md:p-8 rounded-sm shadow-sm mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-border/80">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand uppercase tracking-widest bg-brand/10 px-3 py-1 rounded-full mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            {lang === "ro" ? "Ghid Rapid Interactiv" : "Interactive Quick Guide"}
          </div>
          <h2 className="font-display text-2xl md:text-3xl text-brand-deep">
            {lang === "ro"
              ? "Găsește autorizația potrivită în 3 pași simpli"
              : "Find the right license in 3 simple steps"}
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            {lang === "ro"
              ? "Selectați domeniul de activitate și tipul procedurii pentru a identifica instant cerințele legale și formularele CNCAN."
              : "Select your domain and procedure type to instantly identify CNCAN legal requirements and forms."}
          </p>
        </div>
      </div>

      {/* STEP 1: SELECT DOMAIN */}
      <div className="space-y-3 mb-6">
        <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground font-bold">
          {lang === "ro" ? "PASUL 1 — ALEGE DOMENIUL:" : "STEP 1 — CHOOSE DOMAIN:"}
        </label>
        <div className="grid sm:grid-cols-3 gap-3">
          {DOMAINS.map((dom, idx) => {
            const Icon = dom.icon;
            const isSelected = selectedDomainIdx === idx;
            return (
              <button
                key={dom.id}
                type="button"
                onClick={() => {
                  setSelectedDomainIdx(idx);
                  setSelectedOptIdx(0);
                }}
                className={`flex items-start gap-3 p-4 rounded-sm border text-left transition-all ${
                  isSelected
                    ? "border-brand bg-brand/10 shadow-xs"
                    : "border-border/80 bg-secondary/20 hover:border-brand/50"
                }`}
              >
                <div
                  className={`p-2 rounded-sm ${
                    isSelected ? "bg-brand text-primary-foreground" : "bg-card text-brand"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div
                    className={`font-display text-base font-bold ${
                      isSelected ? "text-brand-deep" : "text-foreground"
                    }`}
                  >
                    {lang === "ro" ? dom.ro : dom.en}
                  </div>
                  <div className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                    {lang === "ro" ? dom.desc_ro : dom.desc_en}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 2: SELECT PROCEDURE / OPTION */}
      <div className="space-y-3 mb-6">
        <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground font-bold">
          {lang === "ro"
            ? "PASUL 2 — CE DOREȘTI SĂ AUTORIZEZI?"
            : "STEP 2 — WHAT DO YOU WANT TO LICENSE?"}
        </label>
        <div className="grid sm:grid-cols-3 gap-3">
          {domain.options.map((opt, idx) => {
            const isSelected = selectedOptIdx === idx;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelectedOptIdx(idx)}
                className={`p-3.5 rounded-sm border text-left transition-all flex items-center justify-between ${
                  isSelected
                    ? "border-brand bg-brand text-primary-foreground font-semibold shadow-xs"
                    : "border-border/80 bg-card text-foreground hover:border-brand/60"
                }`}
              >
                <span className="text-xs leading-snug">
                  {lang === "ro" ? opt.label_ro : opt.label_en}
                </span>
                {isSelected && <CheckCircle2 className="h-4 w-4 shrink-0 ml-2" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 3: RESULT RECOMMENDATION CARD */}
      <div className="border border-brand/50 bg-card p-6 rounded-sm shadow-xs">
        <div className="flex items-center gap-2 text-xs font-mono text-brand uppercase tracking-wider mb-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          {lang === "ro"
            ? "PASUL 3 — PROCEDURĂ JURIDICĂ RECOMANDATĂ"
            : "STEP 3 — RECOMMENDED REGULATORY PROCEDURE"}
        </div>

        <div className="grid md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-2">
            <h3 className="font-display text-xl text-brand-deep font-bold">
              {lang === "ro" ? option.docTitle_ro : option.docTitle_en}
            </h3>
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-block px-2.5 py-0.5 rounded-sm bg-secondary font-mono font-bold text-foreground">
                {option.docCode}
              </span>
              <span>•</span>
              <span className="font-medium text-foreground">
                {lang === "ro" ? option.norm_ro : option.norm_en}
              </span>
            </div>
          </div>

          <div className="md:col-span-4 flex justify-end">
            <Link
              to={option.targetPath}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm bg-brand text-primary-foreground text-xs font-bold hover:bg-brand-deep transition-colors shadow-sm w-full md:w-auto"
            >
              <FileText className="h-4 w-4" />
              {lang === "ro" ? "Accesează Formularele" : "Access Forms"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
