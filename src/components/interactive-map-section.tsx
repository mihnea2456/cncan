import React, { useState } from "react";
import {
  Atom,
  ShieldCheck,
  Activity,
  MapPin,
  Zap,
  CheckCircle2,
  Award,
  Sparkles,
  ExternalLink,
  Radio,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Link } from "@tanstack/react-router";
import RomaniaMap from "@svg-maps/romania";

export interface NuclearFacility {
  id: string;
  name_ro: string;
  name_en: string;
  category_ro: string;
  category_en: string;
  location: string;
  powerOrType_ro: string;
  powerOrType_en: string;
  status_ro: string;
  status_en: string;
  details_ro: string;
  details_en: string;
  x: number; // SVG X percentage
  y: number; // SVG Y percentage
}

const FACILITIES: NuclearFacility[] = [
  {
    id: "cernavoda",
    name_ro: "Centrala Nuclearoelectrică Cernavodă (CNE)",
    name_en: "Cernavodă Nuclear Power Plant (CNE)",
    category_ro: "Producție Energie Nucleară (PHWR CANDU 6)",
    category_en: "Nuclear Power Production (PHWR CANDU 6)",
    location: "Cernavodă, Jud. Constanța",
    powerOrType_ro: "Putere totală: ~1.400 MW (Unitățile 1 și 2)",
    powerOrType_en: "Total capacity: ~1,400 MW (Units 1 and 2)",
    status_ro: "100% OPERAȚIONAL — SUB SUPRAVEGHERE PERMANENTĂ CNCAN",
    status_en: "100% OPERATIONAL — UNDER CONTINUOUS CNCAN SURVEILLANCE",
    details_ro:
      "Asigură ~20% din producția națională de energie electrică. CNCAN menține inspectori rezidenți pe amplasament și monitorizează continuu securitatea nucleară, protecția radiologică și garanțiile.",
    details_en:
      "Provides ~20% of Romania's electricity production. CNCAN maintains resident inspectors on site and continuously monitors nuclear safety, radiation protection, and safeguards.",
    x: 80.5,
    y: 79.5,
  },
  {
    id: "magurele",
    name_ro: "Platforma Națională de Cercetare Măgurele (IFIN-HH / ELI-NP)",
    name_en: "Măgurele National Research Platform (IFIN-HH / ELI-NP)",
    category_ro: "Cercetare Laser de Mare Putere & Fizică Nucleară",
    category_en: "High-Power Laser Research & Nuclear Physics",
    location: "Măgurele, Jud. Ilfov",
    powerOrType_ro: "Infrastructură: ELI-NP (Laser 10 PW) & CIFRA",
    powerOrType_en: "Infrastructure: ELI-NP (10 PW Laser) & CIFRA",
    status_ro: "ACREDITAT EURATOM — DEZAFECTARE REACTOR WWR-S ÎN SIGURANȚĂ",
    status_en: "EURATOM ACCREDITED — WWR-S REACTOR DECOMMISSIONED SAFELY",
    details_ro:
      "Găzduiește cele mai avansate instalații de cercetare din Europa de Est, inclusiv laserul de 10 Petawați ELI-NP. CNCAN reglementează laboratoarele de radioterapie, radioizotopi și dozimetrie.",
    details_en:
      "Hosts advanced Eastern European research facilities, including the 10-Petawatt ELI-NP laser. CNCAN regulates radiotherapy, radioisotope, and dosimetry laboratories.",
    x: 59.8,
    y: 84.5,
  },
  {
    id: "mioveni",
    name_ro: "Centrul Nuclear Mioveni-Pitești (ICN & FCN)",
    name_en: "Mioveni-Pitești Nuclear Centre (ICN & FCN)",
    category_ro: "Fabrică Combustibil Nuclear & Reactor TRIGA",
    category_en: "Nuclear Fuel Factory & TRIGA Research Reactor",
    location: "Mioveni, Jud. Argeș",
    powerOrType_ro: "FCN CANDU & Reactor de cercetare 14 MW",
    powerOrType_en: "CANDU Fuel Factory & 14 MW Research Reactor",
    status_ro: "AUTORIZAT PENTRU FABRICAȚIE & CERCETARE MATERIALE",
    status_en: "LICENSED FOR FUEL FABRICATION & MATERIALS RESEARCH",
    details_ro:
      "Fabrica de Combustibil Nuclear (FCN) produce anual fasciculele de combustibil pentru CNE Cernavodă, în timp ce Institutul de Cercetări Nucleare (ICN) operează reactorul pulsatoriu TRIGA.",
    details_en:
      "The Nuclear Fuel Factory (FCN) annually manufactures CANDU fuel bundles for Cernavoda NPP, while ICN operates the TRIGA pulsing research reactor.",
    x: 49.0,
    y: 73.0,
  },
  {
    id: "baita",
    name_ro: "Depozitul Național de Deșeuri Radioactive (DNDR Băița)",
    name_en: "National Radioactive Waste Repository (DNDR Băița)",
    category_ro: "Depozitare Geologică Instituțională (DFDSMA)",
    category_en: "Institutional Geological Repository (DFDSMA)",
    location: "Băița-Bihor, Jud. Bihor",
    powerOrType_ro: "Adâncime: galeriile fostei mine polimetalice",
    powerOrType_en: "Depth: converted former polymetallic mine galleries",
    status_ro: "SUB SUPRAVEGHERE SEISMICĂ ȘI RADIOLOGICĂ CONTINUĂ",
    status_en: "UNDER CONTINUOUS SEISMIC AND RADIOLOGICAL SURVEILLANCE",
    details_ro:
      "Asigură depozitarea definitivă în siguranță a deșeurilor radioactive cu activitate joasă și medie provenite din aplicații medicale, industriale și de cercetare din întreaga țară.",
    details_en:
      "Ensures permanent safe disposal of low- and intermediate-level radioactive waste originating from medical, industrial, and research applications nationwide.",
    x: 23.5,
    y: 34.0,
  },
];

export function InteractiveMapSection() {
  const { lang } = useI18n();
  const [selectedFacility, setSelectedFacility] = useState<NuclearFacility>(
    FACILITIES[0]
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-deep/5 via-card to-secondary/10 py-16 md:py-24 border-y border-border">
      {/* Background glow decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-page relative z-10">
        {/* STATS COUNTER BAR */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {[
            {
              icon: Atom,
              val: "450+",
              ro: "Instalații Nucleare & Radiologice Autorizate",
              en: "Licensed Nuclear & Radiological Facilities",
            },
            {
              icon: ShieldCheck,
              val: "100%",
              ro: "Conformitate cu Standardele AIEA & Euratom",
              en: "IAEA & Euratom Standard Compliance",
            },
            {
              icon: Radio,
              val: "24 / 7",
              ro: "Centru Național de Răspuns la Urgențe",
              en: "National Emergency Response Centre",
            },
            {
              icon: Award,
              val: "30+ Ani",
              ro: "Tradiție în Reglementare și Siguranță Nucleară",
              en: "Heritage in Nuclear Regulation & Safety",
            },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="group border border-border/70 bg-card/80 backdrop-blur-sm p-6 rounded-sm shadow-sm hover:border-brand transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon className="h-6 w-6 text-brand group-hover:text-brand-deep transition-colors" />
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="font-mono text-2xl md:text-3xl font-bold text-foreground">
                  {stat.val}
                </div>
                <p className="mt-1 text-xs text-muted-foreground font-medium leading-relaxed">
                  {lang === "ro" ? stat.ro : stat.en}
                </p>
              </div>
            );
          })}
        </div>

        {/* SECTION HEADER */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-brand uppercase tracking-widest bg-brand/10 px-3 py-1 rounded-full mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            {lang === "ro"
              ? "Harta Interactivă a Securității Nucleare"
              : "Interactive Nuclear Safety Map"}
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-brand-deep leading-tight">
            {lang === "ro"
              ? "Infrastructura Nucleară Majoră a României sub Reglementare CNCAN"
              : "Romania's Major Nuclear Infrastructure under CNCAN Regulation"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {lang === "ro"
              ? "Selectați un obiectiv pe hartă sau din lista de mai jos pentru a explora statutul operațional și parametrii de securitate supravegheați în timp real."
              : "Select a facility on the map or from the list below to explore operational status and real-time monitored safety parameters."}
          </p>
        </div>

        {/* MAP & DETAIL CARD GRID */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* MAP CANVAS (LEFT - 7 COLS) */}
          <div className="lg:col-span-7 border border-border/80 bg-card/90 rounded-sm p-6 md:p-8 shadow-sm relative overflow-hidden">
            {/* Header tag */}
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-4 pb-3 border-b border-border/60">
              <span className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                {lang === "ro" ? "HARTA NAȚIONALĂ OPERATIVĂ" : "NATIONAL OPERATIONAL MAP"}
              </span>
              <span>LAT: 45.9432° N | LON: 24.9668° E</span>
            </div>

            {/* SVG ROMANIA MAP OUTLINE */}
            <div className="relative w-full aspect-[16/10] bg-secondary/20 rounded-sm overflow-hidden border border-border/40 flex items-center justify-center">
              {/* AUTHENTIC 41-COUNTY ROMANIA MAP FROM @svg-maps/romania */}
              <svg
                viewBox={RomaniaMap.viewBox}
                className="w-full h-full text-brand/20 drop-shadow-md"
              >
                <g className="text-brand/35 hover:text-brand/50 transition-colors">
                  {RomaniaMap.locations.map((loc) => {
                    const isHostCounty = ["ro-ct", "ro-if", "ro-ag", "ro-bh"].includes(loc.id);
                    return (
                      <path
                        key={loc.id}
                        id={loc.id}
                        d={loc.path}
                        fill="currentColor"
                        fillOpacity={isHostCounty ? "0.26" : "0.14"}
                        stroke="currentColor"
                        strokeWidth={isHostCounty ? "1.6" : "1.1"}
                        strokeLinejoin="round"
                        className="hover:fill-brand/40 transition-all cursor-pointer"
                      >
                        <title>{loc.name}</title>
                      </path>
                    );
                  })}
                </g>
              </svg>

              {/* INTERACTIVE MARKERS ON THE MAP */}
              {FACILITIES.map((f) => {
                const isSelected = selectedFacility.id === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setSelectedFacility(f)}
                    style={{
                      left: `${f.x}%`,
                      top: `${f.y}%`,
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all duration-300 ${
                      isSelected ? "z-30 scale-125" : "z-20 hover:scale-110"
                    }`}
                  >
                    {/* Pulsing halo */}
                    {isSelected && (
                      <span className="absolute -inset-2 rounded-full bg-brand/30 animate-ping" />
                    )}
                    {/* Pin button */}
                    <div
                      className={`relative flex items-center justify-center h-8 w-8 rounded-full shadow-md transition-all ${
                        isSelected
                          ? "bg-brand text-primary-foreground ring-4 ring-brand/30"
                          : "bg-card text-brand border-2 border-brand hover:bg-brand hover:text-primary-foreground"
                      }`}
                    >
                      <Atom className="h-4 w-4" />
                    </div>
                    {/* Mini floating label */}
                    <span
                      className={`absolute left-1/2 -translate-x-1/2 -bottom-6 whitespace-nowrap px-2 py-0.5 rounded-sm text-[10px] font-mono font-bold transition-opacity shadow-sm pointer-events-none ${
                        isSelected
                          ? "bg-brand-deep text-white opacity-100"
                          : "bg-card text-foreground opacity-80 group-hover:opacity-100"
                      }`}
                    >
                      {f.id.toUpperCase()}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* QUICK SELECTION TABS BELOW MAP */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-4 border-t border-border/60">
              {FACILITIES.map((f) => {
                const isSelected = selectedFacility.id === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setSelectedFacility(f)}
                    className={`px-3 py-2.5 rounded-sm text-left transition-all border ${
                      isSelected
                        ? "border-brand bg-brand/10 text-brand font-bold shadow-xs"
                        : "border-border/60 bg-secondary/30 text-muted-foreground hover:text-foreground hover:border-brand/40"
                    }`}
                  >
                    <div className="text-[10px] font-mono uppercase tracking-wider">
                      {f.id}
                    </div>
                    <div className="text-xs truncate font-display font-medium">
                      {lang === "ro"
                        ? f.name_ro.split("(")[0]
                        : f.name_en.split("(")[0]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* FACILITY DETAIL GLASS CARD (RIGHT - 5 COLS) */}
          <div className="lg:col-span-5 border border-brand/40 bg-gradient-to-b from-brand-deep/5 via-card to-card p-7 md:p-8 rounded-sm shadow-sm relative space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-emerald-500/10 text-emerald-600 font-mono text-[11px] font-bold">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                {lang === "ro" ? "STAȚIE OPERAȚIONALĂ" : "OPERATIONAL STATION"}
              </span>
              <span className="text-xs font-mono text-muted-foreground">
                ID: #{selectedFacility.id.toUpperCase()}-RO
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-brand font-mono uppercase tracking-wider">
                <MapPin className="h-3.5 w-3.5" />
                {selectedFacility.location}
              </div>
              <h3 className="font-display text-2xl text-brand-deep font-bold leading-snug">
                {lang === "ro" ? selectedFacility.name_ro : selectedFacility.name_en}
              </h3>
              <div className="text-xs font-semibold text-foreground bg-secondary/40 px-3 py-1.5 rounded-sm inline-block">
                {lang === "ro"
                  ? selectedFacility.category_ro
                  : selectedFacility.category_en}
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-border/60 text-xs">
              <div className="flex items-start gap-2">
                <Zap className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                <div>
                  <strong className="text-foreground block">
                    {lang === "ro" ? "Parametri / Capacitate:" : "Parameters / Capacity:"}
                  </strong>
                  <span className="text-muted-foreground">
                    {lang === "ro"
                      ? selectedFacility.powerOrType_ro
                      : selectedFacility.powerOrType_en}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-foreground block">
                    {lang === "ro" ? "Statut de Securitate CNCAN:" : "CNCAN Safety Status:"}
                  </strong>
                  <span className="text-emerald-700 font-medium">
                    {lang === "ro"
                      ? selectedFacility.status_ro
                      : selectedFacility.status_en}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed pt-2 border-t border-border/60">
              {lang === "ro"
                ? selectedFacility.details_ro
                : selectedFacility.details_en}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                to="/instalatii-nucleare"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm bg-brand text-primary-foreground text-xs font-semibold hover:bg-brand-deep transition-colors shadow-xs w-full"
              >
                {lang === "ro" ? "Norme Instalații Nucleare" : "Nuclear Facility Norms"}
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/autorizari"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm border border-border bg-card text-foreground text-xs font-semibold hover:border-brand hover:text-brand transition-colors w-full"
              >
                {lang === "ro" ? "Vezi Cerințe Autorizare" : "View Licensing Norms"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
