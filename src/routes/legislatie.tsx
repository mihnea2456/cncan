import React, { useState, useEffect, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";
import {
  Search,
  FileText,
  Filter,
  HelpCircle,
  Star,
  Download,
  Eye,
  Scale,
  BookOpen,
  ShieldCheck,
  UserCheck,
  Coins,
  Globe,
  Award,
  ChevronRight,
  ExternalLink,
  BookMarked,
  CheckCircle2,
  FolderOpen,
  ChevronDown,
  ChevronUp,
  Layers,
  Hash,
  Shield,
  Truck,
  Trash2,
  Cpu,
  Building,
  Radiation,
  Activity,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/legislatie")({
  head: () => ({
    meta: [
      { title: "Legislație nucleară — CNCAN" },
      {
        name: "description",
        content:
          "Registrul legislativ CNCAN structurat pe 8 categorii, cu categoria Norme subdivizată în 19 subsecțiuni de specialitate.",
      },
      { property: "og:title", content: "Registrul legislativ CNCAN" },
      { property: "og:description", content: "Toate actele normative aplicabile domeniului nuclear ordonate clar și concis." },
    ],
  }),
  component: LegPage,
});

export interface LegCategory {
  id: string;
  name_ro: string;
  name_en: string;
  description_ro: string;
  description_en: string;
  icon: React.ElementType;
}

export const CATEGORIES: LegCategory[] = [
  {
    id: "legi",
    name_ro: "1. Legi",
    name_en: "1. Laws",
    description_ro: "Cadrul legislativ primar adoptat de Parlamentul României pentru domeniul nuclear și protecția radiologică.",
    description_en: "Primary legislative framework adopted by the Romanian Parliament for the nuclear and radiation protection sector.",
    icon: Scale,
  },
  {
    id: "norme",
    name_ro: "2. Norme",
    name_en: "2. Norms & Regulations",
    description_ro: "Norme de securitate radiologică (NSR) și securitate nucleară (NSN) structurate pe subsecțiuni specializate.",
    description_en: "Radiological Safety Norms (NSR) and Nuclear Safety Norms (NSN) structured into specialized subsections.",
    icon: FileText,
  },
  {
    id: "ghiduri",
    name_ro: "3. Ghiduri",
    name_en: "3. Guidelines",
    description_ro: "Ghiduri tehnice și de interpretare pentru aplicarea normelor CNCAN și redactarea rapoartelor de securitate.",
    description_en: "Technical and interpretation guidelines for applying CNCAN norms and drafting safety reports.",
    icon: BookOpen,
  },
  {
    id: "inspectie",
    name_ro: "4. Inspecție și Supraveghere",
    name_en: "4. Inspection & Surveillance",
    description_ro: "Proceduri de control de stat, audit de radioprotecție și inspecții rezidențiale pe amplasamente nucleare.",
    description_en: "State control procedures, radiation protection audits, and resident inspections at nuclear sites.",
    icon: ShieldCheck,
  },
  {
    id: "autorizare-personal",
    name_ro: "5. Autorizare Personal Instalații Nucleare",
    name_en: "5. Personnel Licensing for Nuclear Facilities",
    description_ro: "Reglementări privind obținerea permiselor de exercitare, atestarea operatorilor de cameră de comandă și examinări.",
    description_en: "Regulations on obtaining work permits, control room operator certification, and exams.",
    icon: UserCheck,
  },
  {
    id: "taxe-si-tarife",
    name_ro: "6. Regulament taxe și tarife",
    name_en: "6. Fees and Tariffs Regulations",
    description_ro: "Ordinul nr. 155/2005 și grilele de cuantumuri aplicabile pentru autorizări, avizări și servicii CNCAN.",
    description_en: "Order no. 155/2005 and fee schedules applicable for CNCAN licensing, approvals, and services.",
    icon: Coins,
  },
  {
    id: "comunitara",
    name_ro: "7. Legislație comunitară",
    name_en: "7. EU / Community Legislation",
    description_ro: "Directivele EURATOM transpuse în legislația națională privind normele de bază și securitatea instalațiilor.",
    description_en: "EURATOM Directives transposed into national legislation on basic standards and facility safety.",
    icon: Globe,
  },
  {
    id: "tratate",
    name_ro: "8. Tratate, acorduri, convenții",
    name_en: "8. Treaties, Agreements, Conventions",
    description_ro: "Tratate internaționale ratificate de România, convenții AIEA și acorduri bilaterale de garanții nucleare.",
    description_en: "International treaties ratified by Romania, IAEA conventions, and bilateral nuclear safeguards agreements.",
    icon: Award,
  },
];

// 19 SUBSECȚIUNI EXACTE PENTRU CATEGORIA 2. NORME (conform ordinii solicitate)
export interface NormeSubSection {
  id: string;
  code: string;
  title_ro: string;
  title_en: string;
  description_ro: string;
  description_en: string;
}

export const NORME_SUBSECTIONS: NormeSubSection[] = [
  {
    id: "norme-radiologica",
    code: "2.1",
    title_ro: "Norme de securitate radiologică",
    title_en: "Radiological Safety Norms",
    description_ro: "Cerințe fundamentale privind limitele de doză, radioprotecția operațională și monitorizarea expunerii.",
    description_en: "Fundamental requirements regarding dose limits, operational radiation protection, and exposure monitoring.",
  },
  {
    id: "norme-nucleara",
    code: "2.2",
    title_ro: "Norme și ghiduri de securitate nucleară",
    title_en: "Nuclear Safety Norms and Guidelines",
    description_ro: "Cerințe de securitate pentru amplasarea, proiectarea, exploatarea și dezafectarea instalațiilor nucleare.",
    description_en: "Safety requirements for siting, design, operation, and decommissioning of nuclear facilities.",
  },
  {
    id: "norme-interdepartamentale",
    code: "2.3",
    title_ro: "Norme comune interdepartamentale în domeniul nuclear",
    title_en: "Interdepartmental Common Norms in Nuclear Sector",
    description_ro: "Ordine comune emise de CNCAN împreună cu Ministerul Sănătății, MAI sau Ministerul Mediului.",
    description_en: "Joint orders issued by CNCAN together with Ministry of Health, Ministry of Interior, or Ministry of Environment.",
  },
  {
    id: "norme-garantii",
    code: "2.4",
    title_ro: "Norme de garanții nucleare",
    title_en: "Nuclear Safeguards Norms",
    description_ro: "Evidența, controlul și raportarea materialelor nucleare conform acordurilor AIEA și EURATOM.",
    description_en: "Accounting, control, and reporting of nuclear materials according to IAEA and EURATOM agreements.",
  },
  {
    id: "norme-protectie-fizica",
    code: "2.5",
    title_ro: "Norme de protecție fizică în domeniul nuclear",
    title_en: "Physical Protection Norms in Nuclear Sector",
    description_ro: "Asigurarea protecției fizice împotriva sabotajului, accesului neautorizat și sustragerii materialelor nucleare.",
    description_en: "Ensuring physical protection against sabotage, unauthorized access, and theft of nuclear materials.",
  },
  {
    id: "norme-minerit",
    code: "2.6",
    title_ro: "Norme de minerit radioactiv",
    title_en: "Radioactive Mining Norms",
    description_ro: "Securitatea radiologică în activitățile de explorare, exploatare și preparare a minereurilor de uraniu/toriu.",
    description_en: "Radiological safety in exploration, mining, and processing of uranium/thorium ores.",
  },
  {
    id: "norme-transport",
    code: "2.7",
    title_ro: "Norme de transport materiale radioactive",
    title_en: "Radioactive Materials Transport Norms",
    description_ro: "Reglementări privind transportul rutier, feroviar, aerian și maritim al coletelor cu conținut radioactiv (NSR-04).",
    description_en: "Regulations on road, rail, air, and maritime transport of packages with radioactive content (NSR-04).",
  },
  {
    id: "norme-deseuri",
    code: "2.8",
    title_ro: "Norme privind managementul deșeurilor radioactive",
    title_en: "Radioactive Waste Management Norms",
    description_ro: "Cerințe pentru colectarea, tratarea, condiționarea, depozitarea intermediară și definitivă a deșeurilor radioactive.",
    description_en: "Requirements for collection, treatment, conditioning, interim storage, and disposal of radioactive waste.",
  },
  {
    id: "norme-calitate",
    code: "2.9",
    title_ro: "Norme de managementul calității în domeniul nuclear",
    title_en: "Quality Management Norms in Nuclear Sector",
    description_ro: "Sisteme de management integrat (SMC/SMI) obligatorii pentru titularii de autorizație și furnizori.",
    description_en: "Integrated management systems (QMS/IMS) mandatory for license holders and suppliers.",
  },
  {
    id: "norme-urgente",
    code: "2.10",
    title_ro: "Norme privind managementul urgențelor radiologice",
    title_en: "Radiological Emergency Management Norms",
    description_ro: "Planificarea, pregătirea și intervenția operațională în caz de urgență nucleară sau radiologică.",
    description_en: "Planning, preparedness, and operational response in case of nuclear or radiological emergencies.",
  },
  {
    id: "norme-surse-naturale",
    code: "2.11",
    title_ro: "Norme privind sursele naturale de radiații",
    title_en: "Natural Radiation Sources Norms",
    description_ro: "Reglementări privind expunerea la radon, materiale NORM și radiația cosmică în aviație.",
    description_en: "Regulations regarding radon exposure, NORM materials, and cosmic radiation in aviation.",
  },
  {
    id: "norme-personal",
    code: "2.12",
    title_ro: "Norme privind pregătirea și atestarea personalului în domeniul nuclear",
    title_en: "Personnel Training and Licensing Norms in Nuclear Sector",
    description_ro: "Cerințe de calificare, examinare și emitere a permiselor de exercitare (Nivel 1, 2 și 3).",
    description_en: "Qualification, examination, and work permit issuance requirements (Levels 1, 2, and 3).",
  },
  {
    id: "norme-constructii",
    code: "2.13",
    title_ro: "Norme construcții nucleare",
    title_en: "Nuclear Construction Norms",
    description_ro: "Cerințe tehnice speciale de proiectare, seismicitate și execuție pentru structuri și clădiri nucleare.",
    description_en: "Special technical requirements for design, seismicity, and execution of nuclear structures and buildings.",
  },
  {
    id: "norme-cibernetica",
    code: "2.14",
    title_ro: "Norme de securitate cibernetică în domeniul nuclear",
    title_en: "Cybersecurity Norms in Nuclear Sector",
    description_ro: "Protecția sistemelor informatice industriale, SCADA și de cameră de comandă împotriva atacurilor cibernetice.",
    description_en: "Protection of industrial IT systems, SCADA, and control rooms against cyber attacks.",
  },
  {
    id: "ordin-96-2013",
    code: "2.15",
    title_ro: "Ordinul nr. 96/2013 privind modificarea și completarea Normelor de dozimetrie individuală",
    title_en: "Order no. 96/2013 amending and supplementing Individual Dosimetry Norms",
    description_ro: "Ordinul Președintelui CNCAN nr. 96/2013 pentru modificarea Normelor de dozimetrie individuală și servicii de monitorizare.",
    description_en: "CNCAN President Order no. 96/2013 amending Individual Dosimetry Norms and monitoring services.",
  },
  {
    id: "ordin-1-2015",
    code: "2.16",
    title_ro: "Ordinul nr. 1/2015 din 06 ianuarie 2015",
    title_en: "Order no. 1/2015 of January 6, 2015",
    description_ro: "Ordinul Președintelui CNCAN nr. 1/2015 din 06 ianuarie 2015 privind modificări și reglementări tehnice.",
    description_en: "CNCAN President Order no. 1/2015 of January 6, 2015 regarding technical modifications and norms.",
  },
  {
    id: "ordin-155-2017-eli-np",
    code: "2.17",
    title_ro: "Ordinul nr. 155/2017 pentru aprobarea Procedurii privind cerințele de autorizare pentru instalația de cercetare Infrastructura Luminii Extreme - Fizică nucleară (ELI-NP)",
    title_en: "Order no. 155/2017 approving the Licensing Requirements Procedure for the Extreme Light Infrastructure - Nuclear Physics (ELI-NP) research facility",
    description_ro: "Procedură specifică de reglementare, evaluare și autorizare pentru laserul de mare putere și sistemul gama de la Măgurele (ELI-NP).",
    description_en: "Specific regulation, evaluation, and licensing procedure for the high-power laser and gamma system at Magurele (ELI-NP).",
  },
  {
    id: "ordin-176-2017",
    code: "2.18",
    title_ro: "Ordinul nr. 176/2017 privind aprobarea cerințelor de autorizare a activității de manipulare a instalațiilor radiologice",
    title_en: "Order no. 176/2017 approving licensing requirements for handling radiological equipment",
    description_ro: "Ordinul Președintelui CNCAN nr. 176/2017 cu cerințe speciale de securitate radiologică la manipularea echipamentelor.",
    description_en: "CNCAN President Order no. 176/2017 with special radiation safety requirements for handling equipment.",
  },
  {
    id: "ordin-14-2018",
    code: "2.19",
    title_ro: "Ordinul nr. 14/2018 pentru aprobarea Procedurii privind cerințele de eliberare a avizelor pentru programele de pregătire în protecția radiologică",
    title_en: "Order no. 14/2018 approving the Procedure for issuing approvals for radiation protection training programs",
    description_ro: "Procedura CNCAN de evaluare și avizare a cursurilor de pregătire profesională în radioprotecție organizate de furnizori.",
    description_en: "CNCAN procedure for evaluating and approving professional radiation protection training courses organized by providers.",
  },
];

// 13 SUBSECȚIUNI EXACTE PENTRU CATEGORIA 3. GHIDURI (conform cerinței)
export interface GhiduriSubSection {
  id: string;
  code: string;
  title_ro: string;
  title_en: string;
  description_ro: string;
  description_en: string;
}

export const GHIDURI_SUBSECTIONS: GhiduriSubSection[] = [
  {
    id: "ghiduri-radiologica",
    code: "GSR",
    title_ro: "Ghiduri de securitate radiologică (GSR)",
    title_en: "Radiological Safety Guidelines (GSR)",
    description_ro: "Ghiduri tehnice pentru radioprotecție, monitorizare și practici cu surse de radiații ionizante.",
    description_en: "Technical guidelines for radiation protection, monitoring, and practices with ionizing radiation sources.",
  },
  {
    id: "ghiduri-nucleara",
    code: "GSN",
    title_ro: "Ghiduri de securitate nucleară (GSN)",
    title_en: "Nuclear Safety Guidelines (GSN)",
    description_ro: "Ghiduri privind elaborarea Rapoartelor de Securitate Preliminară și Finală pentru instalații nucleare.",
    description_en: "Guidelines on drafting Preliminary and Final Safety Reports for nuclear facilities.",
  },
  {
    id: "ghiduri-comune",
    code: "GIN",
    title_ro: "Ghiduri comune interdepartamentale în domeniul nuclear (GIN)",
    title_en: "Interdepartmental Joint Guidelines in Nuclear Sector (GIN)",
    description_ro: "Ghiduri interinstituționale pentru coordonarea activităților în domeniul nuclear și radiologic.",
    description_en: "Inter-institutional guidelines for coordinating nuclear and radiological activities.",
  },
  {
    id: "ghiduri-garantii",
    code: "GGN",
    title_ro: "Ghiduri de garanții nucleare (GGN)",
    title_en: "Nuclear Safeguards Guidelines (GGN)",
    description_ro: "Ghiduri pentru controlul, evidența și raportarea materialelor nucleare.",
    description_en: "Guidelines for accounting, control, and reporting of nuclear materials.",
  },
  {
    id: "ghiduri-protectie-fizica",
    code: "GPF",
    title_ro: "Ghiduri de protecție fizică în domeniul nuclear (GPF)",
    title_en: "Physical Protection Guidelines in Nuclear Sector (GPF)",
    description_ro: "Ghiduri tehnice pentru securitatea fizică a amplasamentelor și materialelor nucleare.",
    description_en: "Technical guidelines for physical security of nuclear sites and materials.",
  },
  {
    id: "ghiduri-minerit",
    code: "GMR",
    title_ro: "Ghiduri de minerit radioactiv (GMR)",
    title_en: "Radioactive Mining Guidelines (GMR)",
    description_ro: "Ghiduri pentru activitățile de prospectare, exploatare și prelucrare a minereurilor radioactive.",
    description_en: "Guidelines for prospecting, mining, and processing radioactive ores.",
  },
  {
    id: "ghiduri-transport",
    code: "GTR",
    title_ro: "Ghiduri de transport materiale radioactive (GTR)",
    title_en: "Radioactive Materials Transport Guidelines (GTR)",
    description_ro: "Ghiduri privind ambalarea, etichetarea și transportul în siguranță al coletelor radioactive.",
    description_en: "Guidelines on packaging, labeling, and safe transport of radioactive packages.",
  },
  {
    id: "ghiduri-deseuri",
    code: "GDR",
    title_ro: "Ghiduri privind managementul deșeurilor radioactive (GDR)",
    title_en: "Radioactive Waste Management Guidelines (GDR)",
    description_ro: "Ghiduri privind tratarea, condiționarea, depozitarea și dezafectarea deșeurilor radioactive.",
    description_en: "Guidelines on treatment, conditioning, storage, and disposal of radioactive waste.",
  },
  {
    id: "ghiduri-calitate",
    code: "GMC",
    title_ro: "Ghiduri de managementul calității în domeniul nuclear (GMC)",
    title_en: "Quality Management Guidelines in Nuclear Sector (GMC)",
    description_ro: "Ghiduri pentru implementarea și evaluarea sistemelor de management integrat și al calității.",
    description_en: "Guidelines for implementing and evaluating integrated quality management systems.",
  },
  {
    id: "ghiduri-urgente",
    code: "GUR",
    title_ro: "Ghiduri privind managementul urgențelor radiologice (GUR)",
    title_en: "Radiological Emergency Management Guidelines (GUR)",
    description_ro: "Ghiduri pentru planificarea, intervenția și protecția populației în caz de urgență radiologică.",
    description_en: "Guidelines for planning, intervention, and public protection in radiological emergencies.",
  },
  {
    id: "ghiduri-surse-naturale",
    code: "GRN",
    title_ro: "Ghiduri privind sursele naturale de radiații (GRN)",
    title_en: "Natural Radiation Sources Guidelines (GRN)",
    description_ro: "Ghiduri de monitorizare și remediere a expunerii la radon și la surse naturale de radiații.",
    description_en: "Guidelines on monitoring and remediation of exposure to radon and natural radiation sources.",
  },
  {
    id: "ghiduri-pregatire",
    code: "GPP",
    title_ro: "Ghiduri privind pregătirea și atestarea personalului în domeniul nuclear (GPP)",
    title_en: "Personnel Training and Certification Guidelines (GPP)",
    description_ro: "Ghiduri de avizare a programelor de instruire, examinare și atestare în securitate radiologică.",
    description_en: "Guidelines for approving training programs, exams, and radiological safety certification.",
  },
  {
    id: "ghiduri-constructii",
    code: "GCN",
    title_ro: "Ghiduri construcții nucleare (GCN)",
    title_en: "Nuclear Construction Guidelines (GCN)",
    description_ro: "Ghiduri de proiectare, execuție și verificare a structurilor cu specific nuclear.",
    description_en: "Guidelines on design, execution, and verification of nuclear structures.",
  },
];

export interface InspectieSubSection {
  id: string;
  code: string;
  title_ro: string;
  title_en: string;
  description_ro: string;
  description_en: string;
}

export const INSPECTIE_SUBSECTIONS: InspectieSubSection[] = [
  {
    id: "insp-autorizare",
    code: "IA",
    title_ro: "Inspecții pentru autorizare",
    title_en: "Licensing Inspections",
    description_ro: "Inspecții efectuate pentru evaluarea îndeplinirii condițiilor de emitere a autorizațiilor.",
    description_en: "Inspections performed to evaluate compliance with licensing conditions.",
  },
  {
    id: "insp-curent",
    code: "CP",
    title_ro: "Control curent și periodic",
    title_en: "Current and Periodic Control",
    description_ro: "Activități regulate de verificare a respectării cerințelor de securitate în timpul exploatării.",
    description_en: "Regular activities to verify compliance with safety requirements during operation.",
  },
  {
    id: "insp-inopinate",
    code: "II",
    title_ro: "Inspecții inopinate",
    title_en: "Unannounced Inspections",
    description_ro: "Inspecții neanunțate pentru verificarea stării reale de securitate și conformitate.",
    description_en: "Unannounced inspections to verify the actual state of safety and compliance.",
  },
  {
    id: "insp-cultura",
    code: "CS",
    title_ro: "Evaluarea culturii de securitate",
    title_en: "Safety Culture Evaluation",
    description_ro: "Inspecții axate pe evaluarea atitudinilor și practicilor organizaționale privind securitatea nucleară.",
    description_en: "Inspections focused on assessing organizational attitudes and practices regarding nuclear safety.",
  },
  {
    id: "insp-cerinte",
    code: "CIE",
    title_ro: "Cerințe privind inspecțiile în exploatare",
    title_en: "In-Service Inspection Requirements",
    description_ro: "Norme și cerințe legale care stau la baza activităților de supraveghere și testare.",
    description_en: "Legal norms and requirements underlying surveillance and testing activities.",
  },
];

export interface LegItem {
  no: string;
  type: string;
  title_ro: string;
  title_en: string;
  year: number;
  catId: string;
  subCatId?: string;
  pdfUrl?: string;
  pageUrl?: string;
  featured?: boolean;
}

export const LEGISLATION_ITEMS: LegItem[] = [
  {
    no: "N/A",
    type: "regulament",
    title_ro: "Regulament taxe și tarife",
    title_en: "Fees and Tariffs Regulations",
    year: undefined,
    catId: "taxe-si-tarife",
    pdfUrl: "/documents/legislatie/taxe/Regulament_taxe_si_tarife.pdf"
  },
  {
    no: "1/2022",
    type: "procedura",
    title_ro: "Procedura de control și inspecție CNCAN",
    title_en: "CNCAN Control and Inspection Procedure",
    year: 2022,
    catId: "inspectie",
    subCatId: "insp-curent",
    pdfUrl: "/documents/legislatie/inspectie/Procedura_de_Control_2022.pdf"
  },
  {
    no: "01.07.2020",
    type: "norma",
    title_ro: "Normele de securitate nucleară privind supravegherea, întreținerea, testarea și inspecțiile în exploatare pentru instalațiile nucleare",
    title_en: "Nuclear safety norms on surveillance, maintenance, testing, and in-service inspections for nuclear installations",
    year: 2020,
    catId: "inspectie",
    subCatId: "insp-cerinte",
    pageUrl: "https://lege5.ro/gratuit/gm3tqnjygqza/cerinte-privind-inspectiile-in-exploatare-norma?dp=gmytsobrgi3tcoi"
  },
  // =========================================================================
  // 1. LEGI & HOTĂRÂRI ALE GUVERNULUI (Arhiva completă E:\documente cncan\Legislatie\legi)
  // =========================================================================
  {
    no: "111/1996",
    type: "Lege",
    title_ro: "Legea nr. 111/1996 privind desfășurarea în siguranță, reglementarea, autorizarea și controlul activităților nucleare (Republicată)",
    title_en: "Law no. 111/1996 on the safe conduct, regulation, licensing and control of nuclear activities (Republished)",
    year: 1996,
    catId: "legi",
    featured: true,
    pdfUrl: "/documents/Legea_111_1996.pdf",
    pageUrl: "/legea-111",
  },
  {
    no: "234/2023",
    type: "Lege",
    title_ro: "Legea nr. 234/2023 pentru modificarea și completarea Legii nr. 111/1996 privind desfășurarea în siguranță a activităților nucleare",
    title_en: "Law no. 234/2023 amending and supplementing Law no. 111/1996 on the safe conduct of nuclear activities",
    year: 2023,
    catId: "legi",
    pdfUrl: "/documents/legislatie/legi/Legea-234-din-2023.pdf",
  },
  {
    no: "63/2018",
    type: "Lege",
    title_ro: "Legea nr. 63 pentru modificarea și completarea Legii nr. 111/1996 privind desfășurarea în siguranță a activităților nucleare",
    title_en: "Law no. 63 amending and supplementing Law no. 111/1996 on the safe conduct of nuclear activities",
    year: 2018,
    catId: "legi",
    pdfUrl: "/documents/legislatie/legi/Legea-63-pentru-mdificarea-si-completarea-Legii-111.pdf",
  },
  {
    no: "703/2001",
    type: "Lege",
    title_ro: "Legea nr. 703/2001 privind răspunderea civilă pentru daune nucleare și reglementarea daunelor de mediu",
    title_en: "Law no. 703/2001 on civil liability for nuclear damage and environmental damage regulation",
    year: 2001,
    catId: "legi",
    pdfUrl: "/documents/legislatie/legi/Legea-nr.-7032001-privind-raspunderea-civila-pentru-daune-nucleare.pdf",
  },
  {
    no: "HG 828 (ROF)",
    type: "Hotărâre Guvern",
    title_ro: "Hotărârea Guvernului nr. 828 privind aprobarea Regulamentului de organizare și funcționare a CNCAN (consolidat)",
    title_en: "Government Decision no. 828 approving the Regulation of Organization and Functioning of CNCAN (consolidated)",
    year: 2005,
    catId: "legi",
    pdfUrl: "/documents/legislatie/legi/HG-828-ROF-CNCAN.pdf",
  },
  {
    no: "HG PNAR 2018",
    type: "Hotărâre Guvern",
    title_ro: "Hotărârea Guvernului din 25.07.2018 pentru aprobarea Planului Național de Acțiune la Radon (PNAR)",
    title_en: "Government Decision of 25.07.2018 approving the National Action Plan for Radon (PNAR)",
    year: 2018,
    catId: "legi",
    pdfUrl: "/documents/legislatie/legi/HG-25072018-PNAR.pdf",
  },
  {
    no: "HG 483 (RANET)",
    type: "Hotărâre Guvern",
    title_ro: "Hotărârea Guvernului nr. 483 privind participarea României la Rețeaua de Intervenție și Asistență în Situații de Urgență AIEA (RANET / MOF)",
    title_en: "Government Decision no. 483 on Romania's participation in the IAEA Emergency Response and Assistance Network (RANET / MOF)",
    year: 2016,
    catId: "legi",
    pdfUrl: "/documents/legislatie/legi/HG-483-RANETMOF.pdf",
  },
  {
    no: "HG Strategie 2014",
    type: "Hotărâre Guvern",
    title_ro: "Hotărârea Guvernului privind aprobarea Strategiei Naționale pentru siguranța nucleară și gospodărirea în siguranță a deșeurilor radioactive",
    title_en: "Government Decision approving the National Strategy for Nuclear Safety and Safe Management of Radioactive Waste",
    year: 2014,
    catId: "legi",
    pdfUrl: "/documents/legislatie/legi/HG-Strategie-2014.pdf",
  },
  {
    no: "HG 501",
    type: "Hotărâre Guvern",
    title_ro: "Hotărârea Guvernului nr. 501 privind actualizarea unor dispoziții de reglementare în domeniul protecției nucleare și radiologice",
    title_en: "Government Decision no. 501 updating regulatory provisions in nuclear and radiological protection",
    year: 2024,
    catId: "legi",
    pdfUrl: "/documents/legislatie/legi/HG-501-din-2026-publicat.pdf",
  },
  {
    no: "HG Patrimoniu",
    type: "Hotărâre Guvern",
    title_ro: "Hotărârea Guvernului privind administrarea patrimoniului public și privat aferent obiectivelor și instalațiilor nucleare",
    title_en: "Government Decision on managing public and private heritage related to nuclear objectives and facilities",
    year: 2023,
    catId: "legi",
    pdfUrl: "/documents/legislatie/legi/HG-patrimoniu-publicat260629085929.pdf",
  },
  {
    no: "Ordinul 40/1990",
    type: "Ordin fondator",
    title_ro: "Ordinul nr. 40/1990 privind dispozițiile fundamentale de control de stat în domeniul nuclear (Arhiva istorică activă)",
    title_en: "Order no. 40/1990 on state control provisions in the nuclear field (active historical archive)",
    year: 1990,
    catId: "legi",
    pdfUrl: "/documents/legislatie/legi/Ordinul-CNCAN-40-din-1990.pdf",
  },
  {
    no: "105/1999",
    type: "Lege",
    title_ro: "Legea nr. 105/1999 pentru ratificarea Convenției comune privind gospodărirea în siguranță a combustibilului uzat și a deșeurilor radioactive",
    title_en: "Law no. 105/1999 ratifying the Joint Convention on the Safety of Spent Fuel Management and on the Safety of Radioactive Waste Management",
    year: 1999,
    catId: "legi",
  },
  {
    no: "43/2020",
    type: "Lege",
    title_ro: "Legea nr. 43/2020 privind regimul de autorizare a obiectivelor și instalațiilor nucleare din România",
    title_en: "Law no. 43/2020 on the licensing regime for nuclear objectives and facilities in Romania",
    year: 2020,
    catId: "legi",
  },
  {
    no: "5/2015",
    type: "Lege",
    title_ro: "Legea nr. 5/2015 privind unele măsuri pentru facilitarea schimbului transfrontalier de informații cu privire la protecția radiologică",
    title_en: "Law no. 5/2015 on measures to facilitate cross-border information exchange on radiation protection",
    year: 2015,
    catId: "legi",
  },
  {
    no: "193/2003",
    type: "Lege",
    title_ro: "Legea nr. 193/2003 privind aprobarea OUG nr. 195/2002 privind protecția mediului pentru obiective specifice",
    title_en: "Law no. 193/2003 approving Emergency Ordinance no. 195/2002 on environmental protection for specific objectives",
    year: 2003,
    catId: "legi",
  },

  // =========================================================================
  // 2. NORME (Subdivizate în cele 19 subsecțiuni)
  // =========================================================================
  // 2.1 Norme de securitate radiologică (24 acte din arhiva oficială)
  {
    no: "NSR-01",
    type: "Normă NSR / Bază",
    title_ro: "NSR-01 — Norme privind cerințele de bază de securitate radiologică (CBSR)",
    title_en: "NSR-01 — Basic Safety Standards for Radiation Protection",
    year: 2018,
    catId: "norme",
    subCatId: "norme-radiologica",
    pdfUrl: "/documents/legislatie/norme/norme-radiologica/NSR_01_Cerinte_de_Baza.pdf",
  },
  {
    no: "NSR-04M",
    type: "Normă NSR Medical",
    title_ro: "NSR-04 — Norme privind radioprotecția persoanelor în cazul expunerilor medicale",
    title_en: "NSR-04 — Radiation Protection Norms in Medical Exposures",
    year: 2004,
    catId: "norme",
    subCatId: "norme-radiologica",
    pdfUrl: "/documents/legislatie/norme/norme-radiologica/NSR_04_Expuneri_Medicale.pdf",
  },
  {
    no: "NSR-05",
    type: "Normă NSR",
    title_ro: "NSR-05 — Norme de autorizare a lucrului cu surse de radiații în exteriorul incintei special amenajate",
    title_en: "NSR-05 — Licensing Work with Radiation Sources Outside Specialized Facilities",
    year: 2004,
    catId: "norme",
    subCatId: "norme-radiologica",
    pdfUrl: "/documents/legislatie/norme/norme-radiologica/NSR_05_Lucru_Exterior.pdf",
  },
  {
    no: "NSR-06",
    type: "Normă NSR",
    title_ro: "NSR-06 — Norme de dozimetrie individuală",
    title_en: "NSR-06 — Individual Dosimetry Norms",
    year: 2002,
    catId: "norme",
    subCatId: "norme-radiologica",
    pdfUrl: "/documents/legislatie/norme/norme-radiologica/NSR_06_Dozimetrie_Individuala.pdf",
  },
  {
    no: "NSR-07",
    type: "Normă NSR / Permise",
    title_ro: "NSR-07 — Norme privind eliberarea permiselor de exercitare și desemnarea experților acreditați în radioprotecție",
    title_en: "NSR-07 — Work Permits and Radiation Protection Experts Licensing Norms",
    year: 2005,
    catId: "norme",
    subCatId: "norme-radiologica",
    pdfUrl: "/documents/legislatie/norme/norme-radiologica/NSR_07_Permise_si_Experti.pdf",
  },
  {
    no: "NSR-12",
    type: "Normă NSR",
    title_ro: "NSR-12 — Norme de securitate radiologică în practica de radioterapie",
    title_en: "NSR-12 — Radiological Safety Norms in Radiotherapy Practice",
    year: 2004,
    catId: "norme",
    subCatId: "norme-radiologica",
    pdfUrl: "/documents/legislatie/norme/norme-radiologica/NSR_12_Radioterapie.pdf",
  },
  {
    no: "NSR-14",
    type: "Normă NSR",
    title_ro: "NSR-14 — Norme de securitate radiologică pentru practica de medicină nucleară",
    title_en: "NSR-14 — Radiological Safety Norms in Nuclear Medicine",
    year: 2004,
    catId: "norme",
    subCatId: "norme-radiologica",
    pdfUrl: "/documents/legislatie/norme/norme-radiologica/NSR_14_Medicina_Nucleara.pdf",
  },
  {
    no: "NSR-15",
    type: "Normativ NSR",
    title_ro: "NSR-15 — Normativ de acordare și utilizare a echipamentului individual de protecție la radiații ionizante",
    title_en: "NSR-15 — Normative for Granting and Using Personal Protective Equipment",
    year: 2004,
    catId: "norme",
    subCatId: "norme-radiologica",
    pdfUrl: "/documents/legislatie/norme/norme-radiologica/NSR_15_Echipament_Protectie.pdf",
  },
  {
    no: "NSR-21",
    type: "Normă NSR / Mediu",
    title_ro: "NSR-21 — Norme privind monitorizarea emisiilor radioactive de la instalațiile nucleare și radiologice",
    title_en: "NSR-21 — Norms on Monitoring Radioactive Emissions from Facilities",
    year: 2005,
    catId: "norme",
    subCatId: "norme-radiologica",
    pdfUrl: "/documents/legislatie/norme/norme-radiologica/NSR_21_Monitorizare_Emisii.pdf",
  },
  {
    no: "NSR-22",
    type: "Normă NSR / Mediu",
    title_ro: "NSR-22 — Norme de monitorizare a radioactivității mediului în vecinătatea instalațiilor nucleare sau radiologice",
    title_en: "NSR-22 — Environmental Radioactivity Monitoring Norms in Facility Vicinity",
    year: 2005,
    catId: "norme",
    subCatId: "norme-radiologica",
    pdfUrl: "/documents/legislatie/norme/norme-radiologica/NSR_22_Monitorizare_Mediu.pdf",
  },
  {
    no: "NSR-23",
    type: "Normă NSR / Mediu",
    title_ro: "NSR-23 — Norme privind calculul dispersiei efluenților radioactivi evacuați în mediu",
    title_en: "NSR-23 — Norms for Calculating Radioactive Effluent Dispersion in Environment",
    year: 2005,
    catId: "norme",
    subCatId: "norme-radiologica",
    pdfUrl: "/documents/legislatie/norme/norme-radiologica/NSR_23_Dispersie_Efluenti.pdf",
  },
  {
    no: "NSR-24",
    type: "Normă NSR / Meteo",
    title_ro: "NSR-24 — Norme privind măsurările meteorologice și hidrologice la instalațiile nucleare",
    title_en: "NSR-24 — Meteorological and Hydrological Measurement Norms at Facilities",
    year: 2005,
    catId: "norme",
    subCatId: "norme-radiologica",
    pdfUrl: "/documents/legislatie/norme/norme-radiologica/NSR_24_Meteo_Hidro.pdf",
  },
  {
    no: "NSR-30",
    type: "Normă NSR",
    title_ro: "NSR-30 — Norme de securitate radiologică - Sisteme de măsurare cu surse de radiații",
    title_en: "NSR-30 — Radiological Safety Norms for Radiation Measuring Systems",
    year: 2004,
    catId: "norme",
    subCatId: "norme-radiologica",
    pdfUrl: "/documents/legislatie/norme/norme-radiologica/NSR_30_Sisteme_Masurare.pdf",
  },
  {
    no: "NSR-EXT",
    type: "Normă NSR / Procedură",
    title_ro: "Norme de protecție radiologică — Procedura de acceptare a întreprinderilor externe",
    title_en: "Radiation Protection Norms — External Enterprises Acceptance Procedure",
    year: 2005,
    catId: "norme",
    subCatId: "norme-radiologica",
    pdfUrl: "/documents/legislatie/norme/norme-radiologica/NSR_Acceptare_Intreprinderi_Externe.pdf",
  },
  {
    no: "NSR-CND",
    type: "Normă NSR / Industrie",
    title_ro: "Norme de securitate radiologică privind desfășurarea practicii de control nedistructiv (CND) cu radiații ionizante",
    title_en: "Radiological Safety Norms in Non-Destructive Testing (NDT) with Ionizing Radiation",
    year: 2018,
    catId: "norme",
    subCatId: "norme-radiologica",
    pdfUrl: "/documents/legislatie/norme/norme-radiologica/NSR_Control_Nedistructiv_CND.pdf",
  },
  {
    no: "NSR-CPP",
    type: "Normă NSR / Industrie",
    title_ro: "Norme de securitate radiologică în practicile de control al parametrilor de proces cu radiații ionizante",
    title_en: "Radiological Safety Norms in Industrial Process Parameter Control",
    year: 2018,
    catId: "norme",
    subCatId: "norme-radiologica",
    pdfUrl: "/documents/legislatie/norme/norme-radiologica/NSR_Control_Parametri_Proces.pdf",
  },
  {
    no: "NSR-CARGO",
    type: "Normă NSR / Vamă",
    title_ro: "Norme de autorizare a controlului de securitate cu radiații la colete, bagaje, vehicule și aeronave",
    title_en: "Radiological Safety Inspection Norms for Packages, Luggage, Vehicles, and Aircraft",
    year: 2019,
    catId: "norme",
    subCatId: "norme-radiologica",
    pdfUrl: "/documents/legislatie/norme/norme-radiologica/NSR_Control_Securitate_Colete_Cargo.pdf",
  },
  {
    no: "NSR-SURSE",
    type: "Normă NSR / Control",
    title_ro: "Norme privind controlul reglementat al surselor radioactive și gestionarea surselor orfane",
    title_en: "Norms on Regulatory Control of Radioactive Sources and Safe Management of Orphan Sources",
    year: 2019,
    catId: "norme",
    subCatId: "norme-radiologica",
    pdfUrl: "/documents/legislatie/norme/norme-radiologica/NSR_Control_Surse_si_Surse_Orfane.pdf",
  },
  {
    no: "NSR-LAB",
    type: "Normă NSR / Acreditare",
    title_ro: "Norme privind procedura de desemnare și atestare a laboratoarelor pentru domeniul nuclear",
    title_en: "Norms on the Procedure for Designating and Attesting Nuclear Laboratories",
    year: 2018,
    catId: "norme",
    subCatId: "norme-radiologica",
    pdfUrl: "/documents/legislatie/norme/norme-radiologica/NSR_Desemnare_Laboratoare.pdf",
  },
  {
    no: "NSR-RADON",
    type: "Normă NSR / Radon",
    title_ro: "Norme de dozimetrie individuală și monitorizare a concentrației de radon",
    title_en: "Individual Dosimetry and Radon Concentration Monitoring Norms",
    year: 2018,
    catId: "norme",
    subCatId: "norme-radiologica",
    pdfUrl: "/documents/legislatie/norme/norme-radiologica/NSR_Dozimetrie_si_Radon.pdf",
  },
  {
    no: "NSR-DOZ",
    type: "Normă NSR / Doze",
    title_ro: "Norme privind estimarea dozelor efective și echivalente din expuneri interne și externe",
    title_en: "Norms for Estimating Effective and Equivalent Doses from Internal and External Exposure",
    year: 2020,
    catId: "norme",
    subCatId: "norme-radiologica",
    pdfUrl: "/documents/legislatie/norme/norme-radiologica/NSR_Estimare_Doze_Expunere.pdf",
  },
  {
    no: "NSR-EFM",
    type: "Normă NSR / Medical",
    title_ro: "Norme privind calificarea, atribuțiile și recunoașterea expertului în fizică medicală",
    title_en: "Norms on the Qualification, Duties, and Recognition of the Medical Physics Expert",
    year: 2016,
    catId: "norme",
    subCatId: "norme-radiologica",
    pdfUrl: "/documents/legislatie/norme/norme-radiologica/NSR_Expert_Fizica_Medicala.pdf",
  },
  {
    no: "NSR-MED-PR",
    type: "Reglementare Medical",
    title_ro: "Reglementări privind cerințele de școlarizare și pregătire în protecție radiologică a personalului medical",
    title_en: "Specific Regulations on Radiation Protection Training Requirements for Medical Personnel",
    year: 2018,
    catId: "norme",
    subCatId: "norme-radiologica",
    pdfUrl: "/documents/legislatie/norme/norme-radiologica/NSR_Pregatire_Personal_Medical.pdf",
  },
  {
    no: "NSR-RAD",
    type: "Normă NSR / Diagnostic",
    title_ro: "Norme de securitate radiologică în radiologia de diagnostic și radiologia intervențională",
    title_en: "Radiological Safety Norms in Diagnostic and Interventional Radiology",
    year: 2018,
    catId: "norme",
    subCatId: "norme-radiologica",
    pdfUrl: "/documents/legislatie/norme/norme-radiologica/NSR_Radiologie_Diagnostic_Interventie.pdf",
  },
  // 2.2 Norme și ghiduri de securitate nucleară
  {
    no: "NSN-01 (222/2020)",
    type: "Normă NSN",
    title_ro: "NSN-01 — Norme de securitate nucleară pentru amplasarea, proiectarea și exploatarea centralelor nuclearoelectrice",
    title_en: "NSN-01 — Nuclear Safety Norms for the Siting, Design, and Operation of Nuclear Power Plants",
    year: 2020,
    catId: "norme",
    subCatId: "norme-nucleara",
  },
  {
    no: "NSN-02 (223/2020)",
    type: "Normă NSN",
    title_ro: "NSN-02 — Norme de securitate nucleară privind protecția împotriva incendiilor la instalațiile nucleare",
    title_en: "NSN-02 — Nuclear Safety Norms Regarding Fire Protection at Nuclear Facilities",
    year: 2020,
    catId: "norme",
    subCatId: "norme-nucleara",
  },
  {
    no: "NSN-05",
    type: "Normă NSN",
    title_ro: "NSN-05 — Norme de securitate nucleară privind limitele și condițiile tehnice de operare pentru instalațiile nucleare",
    title_en: "NSN-05 — Nuclear Safety Norms on Operational Limits and Technical Conditions for Nuclear Facilities",
    year: 2015,
    catId: "norme",
    subCatId: "norme-nucleara",
    pdfUrl: "/documents/legislatie/norme/norme-nucleara/NSN_05_Limite_si_Conditii_Operare.pdf",
  },
  {
    no: "NSN-06",
    type: "Normă NSN",
    title_ro: "NSN-06 — Norme de securitate nucleară privind protecția instalațiilor nucleare împotriva evenimentelor externe de origine naturală",
    title_en: "NSN-06 — Nuclear Safety Norms on Protecting Nuclear Facilities Against External Natural Events",
    year: 2015,
    catId: "norme",
    subCatId: "norme-nucleara",
    pdfUrl: "/documents/legislatie/norme/norme-nucleara/NSN_06_Protectie_Evenimente_Naturale.pdf",
  },
  {
    no: "NSN-07 (Ordin 10/2024)",
    type: "Normă NSN / Urgență",
    title_ro: "NSN-07 — Norme de securitate nucleară privind pregătirea răspunsului la tranzienți, accidente și situații de urgență la CNE (completare)",
    title_en: "NSN-07 — Norms on Emergency and Accident Response Preparedness at NPPs (Amendment)",
    year: 2024,
    catId: "norme",
    subCatId: "norme-nucleara",
    pdfUrl: "/documents/legislatie/norme/norme-nucleara/NSN_07_Raspuns_Tranzienti_si_Accidente.pdf",
  },
  {
    no: "NSN-08",
    type: "Normă NSN / Evaluare",
    title_ro: "NSN-08 — Norme privind evaluările probabilistice de securitate nucleară pentru centralele nuclearoelectrice",
    title_en: "NSN-08 — Norms on Probabilistic Nuclear Safety Assessments for NPPs",
    year: 2006,
    catId: "norme",
    subCatId: "norme-nucleara",
    pdfUrl: "/documents/legislatie/norme/norme-nucleara/NSN_08_Evaluari_Probabilistice_Securitate.pdf",
  },
  {
    no: "NSN-09",
    type: "Normă NSN / Incendii",
    title_ro: "NSN-09 — Norme privind protecția centralelor nuclearoelectrice împotriva incendiilor",
    title_en: "NSN-09 — Norms on Fire Protection of Nuclear Power Plants",
    year: 2006,
    catId: "norme",
    subCatId: "norme-nucleara",
    pdfUrl: "/documents/legislatie/norme/norme-nucleara/NSN_09_Protectie_Incendii_CNE.pdf",
  },
  {
    no: "NSN-10",
    type: "Normă NSN / Revizuire",
    title_ro: "NSN-10 — Norme privind revizuirea periodică a securității nucleare pentru centralele nuclearoelectrice",
    title_en: "NSN-10 — Norms on Periodic Nuclear Safety Review for NPPs",
    year: 2006,
    catId: "norme",
    subCatId: "norme-nucleara",
    pdfUrl: "/documents/legislatie/norme/norme-nucleara/NSN_10_Revizuire_Periodica_Securitate.pdf",
  },
  {
    no: "NSN-11",
    type: "Normă NSN / Răcire",
    title_ro: "NSN-11 — Norme privind sistemul de răcire la avarie a zonei active pentru centralele nuclearoelectrice",
    title_en: "NSN-11 — Norms on Emergency Core Cooling Systems for NPPs",
    year: 2006,
    catId: "norme",
    subCatId: "norme-nucleara",
    pdfUrl: "/documents/legislatie/norme/norme-nucleara/NSN_11_Sistem_Racire_Avarie.pdf",
  },
  {
    no: "NSN-14 (Ordin 65/2024)",
    type: "Normă NSN / Permise",
    title_ro: "NSN-14 — Norme privind eliberarea permiselor de exercitare pentru personalul din centralele nuclearoelectrice și instalații nucleare",
    title_en: "NSN-14 — Norms on Issuing Practice Permits for Operating and Management Personnel in NPPs and Nuclear Facilities",
    year: 2024,
    catId: "norme",
    subCatId: "norme-nucleara",
    pdfUrl: "/documents/legislatie/norme/norme-nucleara/NSN_14_Permise_Exercitare_Personal.pdf",
  },
  {
    no: "NSN-14 (Ordin 232/2025)",
    type: "Normă NSN / Permise",
    title_ro: "NSN-14 — Norme privind eliberarea permiselor de exercitare pentru personalul din CNE și instalații nucleare (modificare)",
    title_en: "NSN-14 — Norms on Issuing Practice Permits for NPP and Nuclear Facility Personnel (Amendment)",
    year: 2025,
    catId: "norme",
    subCatId: "norme-nucleara",
    pdfUrl: "/documents/legislatie/norme/norme-nucleara/NSN_14_Modificare_Permise_Personal.pdf",
  },
  {
    no: "NSN-15",
    type: "Normă NSN / Calcule",
    title_ro: "NSN-15 — Norme privind efectuarea, documentarea și verificarea independentă a analizelor și evaluărilor tehnice pentru securitate nucleară",
    title_en: "NSN-15 — Norms on Independent Verification of Technical Analyses and Calculations for Nuclear Safety",
    year: 2024,
    catId: "norme",
    subCatId: "norme-nucleara",
    pdfUrl: "/documents/legislatie/norme/norme-nucleara/NSN_15_Verificare_Independenta_Analize.pdf",
  },
  {
    no: "NSN-16 (Ordin 122/2020)",
    type: "Normă NSN / Inspecții",
    title_ro: "NSN-16 — Norme de securitate nucleară privind supravegherea, întreținerea, testarea și inspecțiile în exploatare pentru instalațiile nucleare",
    title_en: "NSN-16 — Nuclear Safety Norms on In-Service Surveillance, Maintenance, Testing, and Inspection for Nuclear Facilities",
    year: 2020,
    catId: "norme",
    subCatId: "norme-nucleara",
    pdfUrl: "/documents/legislatie/norme/norme-nucleara/NSN_16_Supraveghere_si_Inspectii_Exploatare.pdf",
  },
  {
    no: "NSN-17 (Ordin 174/2021)",
    type: "Normă NSN / Îmbătrânire",
    title_ro: "NSN-17 — Norme de securitate nucleară privind managementul îmbătrânirii pentru instalațiile nucleare",
    title_en: "NSN-17 — Nuclear Safety Norms on Ageing Management for Nuclear Facilities",
    year: 2021,
    catId: "norme",
    subCatId: "norme-nucleara",
    pdfUrl: "/documents/legislatie/norme/norme-nucleara/NSN_17_Management_Imbatranire.pdf",
  },
  {
    no: "NSN-18 (Ordin 227/2025)",
    type: "Normă NSN / Evenimente",
    title_ro: "NSN-18 — Norme privind înregistrarea, raportarea, analiza evenimentelor și utilizarea experienței de exploatare pentru instalațiile nucleare",
    title_en: "NSN-18 — Norms on Recording, Reporting, Analyzing Events and Operational Experience Feedback for Nuclear Facilities",
    year: 2025,
    catId: "norme",
    subCatId: "norme-nucleara",
    pdfUrl: "/documents/legislatie/norme/norme-nucleara/NSN_18_Raportare_si_Analiza_Evenimente.pdf",
  },
  {
    no: "NSN-19 (Ordin 199/2025)",
    type: "Normă NSN / Proiect",
    title_ro: "NSN-19 — Norme de securitate nucleară privind modificările de proiect și controlul configurației pentru instalațiile nucleare",
    title_en: "NSN-19 — Nuclear Safety Norms on Design Modifications and Configuration Control for Nuclear Facilities",
    year: 2025,
    catId: "norme",
    subCatId: "norme-nucleara",
    pdfUrl: "/documents/legislatie/norme/norme-nucleara/NSN_19_Modificari_Proiect_si_Configuratie.pdf",
  },
  {
    no: "NSN-20 (Ordin 212/2022)",
    type: "Normă NSN / Politică",
    title_ro: "NSN-20 — Norme privind politica de securitate nucleară și evaluarea independentă a securității nucleare",
    title_en: "NSN-20 — Norms on Nuclear Safety Policy and Independent Evaluation of Nuclear Safety",
    year: 2022,
    catId: "norme",
    subCatId: "norme-nucleara",
    pdfUrl: "/documents/legislatie/norme/norme-nucleara/NSN_20_Politica_si_Evaluare_Securitate.pdf",
  },
  {
    no: "NSN-22 (Ordin 170/2025)",
    type: "Normă NSN / Autorizare",
    title_ro: "NSN-22 — Norme privind autorizarea instalațiilor nucleare (completare Ordin 336/2018)",
    title_en: "NSN-22 — Norms on Licensing of Nuclear Facilities (Amendment to Order 336/2018)",
    year: 2025,
    catId: "norme",
    subCatId: "norme-nucleara",
    pdfUrl: "/documents/legislatie/norme/norme-nucleara/NSN_22_Autorizare_Instalatii_Nucleare.pdf",
  },
  {
    no: "NSN-23 (Ordin 24/2024)",
    type: "Normă NSN / Personal",
    title_ro: "NSN-23 — Norme de securitate nucleară privind selecția, pregătirea, calificarea și autorizarea personalului organizațiilor din domeniul nuclear",
    title_en: "NSN-23 — Nuclear Safety Norms on Selection, Training, Qualification, and Licensing of Nuclear Organization Personnel",
    year: 2024,
    catId: "norme",
    subCatId: "norme-nucleara",
    pdfUrl: "/documents/legislatie/norme/norme-nucleara/NSN_23_Pregatire_si_Calificare_Personal.pdf",
  },
  {
    no: "NSN-23 (Ordin 231/2025)",
    type: "Normă NSN / Personal",
    title_ro: "NSN-23 — Norme de securitate nucleară privind selecția, pregătirea, calificarea și autorizarea personalului instalațiilor nucleare (modificare)",
    title_en: "NSN-23 — Norms on Selection, Training, Qualification and Licensing of Nuclear Facility Personnel (Amendment)",
    year: 2025,
    catId: "norme",
    subCatId: "norme-nucleara",
    pdfUrl: "/documents/legislatie/norme/norme-nucleara/NSN_23_Modificare_Personal.pdf",
  },
  {
    no: "NSN-27 (Ordin 159/2021)",
    type: "Normă NSN / Standarde",
    title_ro: "NSN-27 — Norme privind utilizarea standardelor pentru asigurarea, menținerea, evaluarea și îmbunătățirea continuă a securității nucleare la CNE",
    title_en: "NSN-27 — Norms on Using Standards for Assurance, Maintenance, Assessment, and Improvement of Nuclear Safety at NPPs",
    year: 2021,
    catId: "norme",
    subCatId: "norme-nucleara",
    pdfUrl: "/documents/legislatie/norme/norme-nucleara/NSN_27_Utilizare_Standarde_Securitate.pdf",
  },
  {
    no: "NSN-31 (Ordin 200/2024)",
    type: "Normă NSN / AI",
    title_ro: "NSN-31 — Norme privind utilizarea inteligenței artificiale în aplicațiile destinate instalațiilor nucleare",
    title_en: "NSN-31 — Norms on the Use of Artificial Intelligence in Applications for Nuclear Facilities",
    year: 2024,
    catId: "norme",
    subCatId: "norme-nucleara",
    pdfUrl: "/documents/legislatie/norme/norme-nucleara/NSN_31_Inteligenta_Artificiala_in_Nuclear.pdf",
  },
  {
    no: "GSN-11 (Ordin 229/2025)",
    type: "Ghid GSN",
    title_ro: "GSN-11 — Ghid de securitate nucleară privind investigarea și remedierea defecțiunilor de echipamente din instalațiile nucleare",
    title_en: "GSN-11 — Nuclear Safety Guide on Investigating and Remediating Equipment Failures in Nuclear Facilities",
    year: 2025,
    catId: "norme",
    subCatId: "norme-nucleara",
    pdfUrl: "/documents/legislatie/norme/norme-nucleara/GSN_11_Investigare_Defectiuni.pdf",
  },
  // 2.3 Norme comune interdepartamentale în domeniul nuclear
  {
    no: "NIN-01",
    type: "Normă NIN / Urgență",
    title_ro: "NIN-01 — Norme privind alimentele și furajele contaminate radioactiv după un accident nuclear sau situație de urgență radiologică",
    title_en: "NIN-01 — Norms on Radioactively Contaminated Food and Feed Following a Nuclear Accident or Radiological Emergency",
    year: 2002,
    catId: "norme",
    subCatId: "norme-interdepartamentale",
    pdfUrl: "/documents/legislatie/norme/norme-interdepartamentale/NIN_01_Alimente_si_Furaje_Contaminate.pdf",
  },
  {
    no: "NIN-02",
    type: "Normă NIN / Alimente",
    title_ro: "NIN-02 — Norme privind alimentele și ingredientele alimentare tratate cu radiații ionizante",
    title_en: "NIN-02 — Norms on Food and Food Ingredients Treated with Ionizing Radiation",
    year: 2002,
    catId: "norme",
    subCatId: "norme-interdepartamentale",
    pdfUrl: "/documents/legislatie/norme/norme-interdepartamentale/NIN_02_Alimente_Tratate_cu_Radiatii.pdf",
  },
  {
    no: "NIN-03 (Ordin comun 117/2010)",
    type: "Normă NIN / Metal reciclabile",
    title_ro: "NIN-03 — Norme privind monitorizarea radiologică a materialelor metalice reciclabile pe întregul ciclu de colectare, comercializare și procesare",
    title_en: "NIN-03 — Norms on Radiological Monitoring of Recyclable Metallic Materials Throughout Collection, Commercialization, and Processing",
    year: 2010,
    catId: "norme",
    subCatId: "norme-interdepartamentale",
    pdfUrl: "/documents/legislatie/norme/norme-interdepartamentale/NIN_03_Monitorizare_Materiale_Metalice.pdf",
  },
  // 2.4 Norme de garanții nucleare
  {
    no: "NGN-01",
    type: "Normă Garanții",
    title_ro: "NGN-01 — Normele de control și garanții în domeniul nuclear",
    title_en: "NGN-01 — Norms on Safeguards and Control in the Nuclear Sector",
    year: 2001,
    catId: "norme",
    subCatId: "norme-garantii",
    pdfUrl: "/documents/legislatie/norme/norme-garantii/NGN_01_Control_Garantii_Nucleare.pdf",
  },
  {
    no: "NGN-02",
    type: "Lista Garanții / Proliferare",
    title_ro: "NGN-02 — Lista detaliată a materialelor și echipamentelor pertinente pentru proliferarea armelor nucleare",
    title_en: "NGN-02 — Detailed List of Materials and Equipment Relevant to the Proliferation of Nuclear Weapons",
    year: 2002,
    catId: "norme",
    subCatId: "norme-garantii",
    pdfUrl: "/documents/legislatie/norme/norme-garantii/NGN_02_Lista_Materiale_Proliferare.pdf",
  },
  {
    no: "NGN-03 (Ordin 135/2024)",
    type: "Normă Garanții / Autorizare",
    title_ro: "NGN-03 — Norme privind autorizarea activităților cu materiale și echipamente pertinente pentru proliferarea nucleară",
    title_en: "NGN-03 — Norms on Licensing Activities Involving Materials and Equipment Relevant to Nuclear Proliferation",
    year: 2024,
    catId: "norme",
    subCatId: "norme-garantii",
    pdfUrl: "/documents/legislatie/norme/norme-garantii/NGN_03_Autorizare_Activitati_Proliferare.pdf",
  },
  // 2.5 Norme de protecție fizică în domeniul nuclear
  {
    no: "NPF-01 (Ordin 173/2021)",
    type: "Normă Protecție Fizică",
    title_ro: "NPF-01 — Norme fundamentale de protecție fizică în domeniul nuclear",
    title_en: "NPF-01 — Fundamental Norms on Physical Protection in the Nuclear Sector",
    year: 2021,
    catId: "norme",
    subCatId: "norme-protectie-fizica",
    pdfUrl: "/documents/legislatie/norme/norme-protectie-fizica/NPF_01_Protectie_Fizica_Fundamentale.pdf",
  },
  {
    no: "NPF-02 (Ordin 59/2021)",
    type: "Normă Standarde / Proiectare",
    title_ro: "NPF-02 — Norme privind utilizarea standardelor pentru sistemele de protecție fizică a instalațiilor nucleare",
    title_en: "NPF-02 — Norms on Using Standards for Physical Protection Systems of Nuclear Facilities",
    year: 2021,
    catId: "norme",
    subCatId: "norme-protectie-fizica",
    pdfUrl: "/documents/legislatie/norme/norme-protectie-fizica/NPF_02_Standarde_Protectie_Fizica.pdf",
  },
  {
    no: "NPF-03",
    type: "Normă Avizare / Securitate",
    title_ro: "NPF-03 — Norme privind avizarea personalului cu activități permanente în instalații nucleare",
    title_en: "NPF-03 — Norms on Security Vetting for Permanent Staff in Nuclear Facilities",
    year: 2004,
    catId: "norme",
    subCatId: "norme-protectie-fizica",
    pdfUrl: "/documents/legislatie/norme/norme-protectie-fizica/NPF_03_Avizare_Personal_Permanent.pdf",
  },
  {
    no: "NPF-04 (Ordin 182/2023)",
    type: "Normă Personal / Pază",
    title_ro: "NPF-04 — Norme privind pregătirea și calificarea personalului de pază și protecție fizică în domeniul nuclear",
    title_en: "NPF-04 — Norms on Training and Qualification of Security and Physical Protection Personnel",
    year: 2023,
    catId: "norme",
    subCatId: "norme-protectie-fizica",
    pdfUrl: "/documents/legislatie/norme/norme-protectie-fizica/NPF_04_Calificare_Personal_Paza.pdf",
  },
  // 2.6 Norme de minerit radioactiv
  {
    no: "NMR-01 (Ordin 192/2002)",
    type: "Normă Minerit / Radioprotecție",
    title_ro: "NMR-01 — Norme de securitate radiologică pentru radioprotecția operațională în mineritul uraniului și toriului",
    title_en: "NMR-01 — Radiological Safety Norms on Operational Radiation Protection in Uranium and Thorium Mining",
    year: 2002,
    catId: "norme",
    subCatId: "norme-minerit",
    pdfUrl: "/documents/legislatie/norme/norme-minerit/NMR_01_Radioprotectie_Minerit.pdf",
  },
  {
    no: "NMR-02 (2002)",
    type: "Normă Minerit / Deșeuri",
    title_ro: "NMR-02 — Norme de securitate radiologică pentru managementul deșeurilor din mineritul uraniului și toriului",
    title_en: "NMR-02 — Radiological Safety Norms on Radioactive Waste Management from Uranium and Thorium Mining",
    year: 2002,
    catId: "norme",
    subCatId: "norme-minerit",
    pdfUrl: "/documents/legislatie/norme/norme-minerit/NMR_02_Deseuri_Minerit.pdf",
  },
  {
    no: "NMR-03 (Ordin 207/2003)",
    type: "Normă Minerit / Dezafectare",
    title_ro: "NMR-03 — Norme privind dezafectarea instalațiilor de minerit și preparare a uraniului și toriului și criterii de eliberare de sub regimul de autorizare",
    title_en: "NMR-03 — Norms on Decommissioning Mining Facilities and Clearance Criteria from Licensing Regime",
    year: 2003,
    catId: "norme",
    subCatId: "norme-minerit",
    pdfUrl: "/documents/legislatie/norme/norme-minerit/NMR_03_Dezafectare_Instalatii_Minerit.pdf",
  },
  // 2.7 Norme de transport materiale radioactive
  {
    no: "NTR-01 (Ordin 221/2017)",
    type: "Normă Transport / Autorizare",
    title_ro: "NTR-01 — Norme privind cerințele de autorizare a activităților de transport de materiale radioactive",
    title_en: "NTR-01 — Norms on Licensing Requirements for Transport of Radioactive Materials",
    year: 2017,
    catId: "norme",
    subCatId: "norme-transport",
    pdfUrl: "/documents/legislatie/norme/norme-transport/NTR_01_Autorizare_Transport.pdf",
  },
  {
    no: "NTR-02 (Ordin 104/2022)",
    type: "Normă Transport / Radioprotecție",
    title_ro: "NTR-02 — Norme privind programul de radioprotecție în transportul materialelor radioactive",
    title_en: "NTR-02 — Norms on Radiation Protection Program in Transport of Radioactive Materials",
    year: 2022,
    catId: "norme",
    subCatId: "norme-transport",
    pdfUrl: "/documents/legislatie/norme/norme-transport/NTR_02_Ordin_104_2022_Program_Radioprotectie.pdf",
  },
  {
    no: "NTR-03 (Ordin 223/2017)",
    type: "Normă Transport / Colete",
    title_ro: "NTR-03 — Norme privind raportul de securitate pentru modelele de colete de transport radioactiv",
    title_en: "NTR-03 — Norms on Safety Reports for Radioactive Material Transport Package Models",
    year: 2017,
    catId: "norme",
    subCatId: "norme-transport",
    pdfUrl: "/documents/legislatie/norme/norme-transport/NTR_03_Raport_Securitate_Colete.pdf",
  },
  {
    no: "NDR-06 (Ordin 443/2008)",
    type: "Normă Expedieri / Deșeuri",
    title_ro: "NDR-06 — Norme privind supravegherea și controlul expedierilor internaționale de deșeuri radioactive",
    title_en: "NDR-06 — Norms on Surveillance and Control of International Shipments of Radioactive Waste",
    year: 2008,
    catId: "norme",
    subCatId: "norme-transport",
    pdfUrl: "/documents/legislatie/norme/norme-transport/NDR_06_Expedieri_Internationale_Deseuri.pdf",
  },
  {
    no: "Ordin 329/2006 (Euratom 1493/93)",
    type: "Ordin / Expedieri UE",
    title_ro: "Ordin 329/2006 — Instrucțiuni pentru expedițiile de substanțe radioactive între statele membre UE",
    title_en: "Order 329/2006 — Instructions on Shipments of Radioactive Substances Between EU Member States",
    year: 2006,
    catId: "norme",
    subCatId: "norme-transport",
    pdfUrl: "/documents/legislatie/norme/norme-transport/Ordin_329_2006_Expeditii_UE_Euratom.pdf",
  },
  // 2.8 Norme privind managementul deșeurilor radioactive
  {
    no: "NDR-01 (Ordin 74/2022)",
    type: "Normă Deșeuri / Fundamentale",
    title_ro: "NDR-01 — Norme fundamentale privind gestionarea în siguranță a deșeurilor radioactive și combustibilului uzat",
    title_en: "NDR-01 — Fundamental Norms on Safe Management of Radioactive Waste and Spent Fuel",
    year: 2022,
    catId: "norme",
    subCatId: "norme-deseuri",
    pdfUrl: "/documents/legislatie/norme/norme-deseuri/NDR_01_Fundamentale_Deseuri_2022.pdf",
  },
  {
    no: "NDR-02 (Ordin 103/2022)",
    type: "Normă Deșeuri / Predepozitare",
    title_ro: "NDR-02 — Norme de securitate pentru predepozitarea deșeurilor radioactive și surselor uzate",
    title_en: "NDR-02 — Safety Norms on Storage of Radioactive Waste and Disused Sealed Sources",
    year: 2022,
    catId: "norme",
    subCatId: "norme-deseuri",
    pdfUrl: "/documents/legislatie/norme/norme-deseuri/NDR_02_Predepozitare_Deseuri_2022.pdf",
  },
  {
    no: "NDR-03 (Ordin 156/2005)",
    type: "Normă Deșeuri / Clasificare",
    title_ro: "NDR-03 — Norme privind clasificarea deșeurilor radioactive",
    title_en: "NDR-03 — Norms on Radioactive Waste Classification",
    year: 2005,
    catId: "norme",
    subCatId: "norme-deseuri",
    pdfUrl: "/documents/legislatie/norme/norme-deseuri/NDR_03_Clasificare_Deseuri.pdf",
  },
  {
    no: "NDR-04 (Ordin 221/2005)",
    type: "Normă Efluenți / Mediu",
    title_ro: "NDR-04 — Norme privind limitarea eliberărilor de efluenți radioactivi în mediu",
    title_en: "NDR-04 — Norms on Limiting Radioactive Effluent Releases into the Environment",
    year: 2005,
    catId: "norme",
    subCatId: "norme-deseuri",
    pdfUrl: "/documents/legislatie/norme/norme-deseuri/NDR_04_Limitare_Efluenti_Mediu.pdf",
  },
  {
    no: "NDR-05 (Ordin 102/2022)",
    type: "Normă Deșeuri / Dezafectare",
    title_ro: "NDR-05 — Norme de securitate pentru dezafectarea instalațiilor nucleare și radiologice",
    title_en: "NDR-05 — Safety Norms on Decommissioning of Nuclear and Radiological Facilities",
    year: 2022,
    catId: "norme",
    subCatId: "norme-deseuri",
    pdfUrl: "/documents/legislatie/norme/norme-deseuri/NDR_05_Dezafectare_Instalatii_2022.pdf",
  },
  {
    no: "NDR-06 (Ordin 155/2022)",
    type: "Normă Deșeuri / Eliberare",
    title_ro: "NDR-06 — Norme privind cerințele de eliberare de sub regimul de autorizare CNCAN",
    title_en: "NDR-06 — Norms on Exemption and Clearance Criteria from Licensing Regime",
    year: 2022,
    catId: "norme",
    subCatId: "norme-deseuri",
    pdfUrl: "/documents/legislatie/norme/norme-deseuri/NDR_06_Eliberare_Sub_Regim_Autorizare_2022.pdf",
  },
  {
    no: "Ordin 80/2025",
    type: "Ordin / Abrogare",
    title_ro: "Ordin 80/2025 — Modificare și abrogare art. 29 din Normele de eliberare (Ordin 155/2022)",
    title_en: "Order 80/2025 — Amendment to Clearance Norms (Order 155/2022)",
    year: 2025,
    catId: "norme",
    subCatId: "norme-deseuri",
    pdfUrl: "/documents/legislatie/norme/norme-deseuri/Ordin_80_2025_Modificare_Eliberare.pdf",
  },
  // 2.9 Norme de managementul calității în domeniul nuclear
  {
    no: "NMC-02 (Ordin 66/2003)",
    type: "Normă Calitate / Generale",
    title_ro: "NMC-02 — Norme generale pentru sistemele de management al calității în instalațiile nucleare",
    title_en: "NMC-02 — General Quality Management Norms for Nuclear Facilities",
    year: 2003,
    catId: "norme",
    subCatId: "norme-calitate",
    pdfUrl: "/documents/legislatie/norme/norme-calitate/NMC_02_Cerinte_Generale_SMC.pdf",
  },
  {
    no: "NMC-03 (Ordin 67/2003)",
    type: "Normă Calitate / Amplasamente",
    title_ro: "NMC-03 — Norme de managementul calității pentru evaluarea și alegerea amplasamentelor",
    title_en: "NMC-03 — Quality Management Norms for Site Evaluation and Selection",
    year: 2003,
    catId: "norme",
    subCatId: "norme-calitate",
    pdfUrl: "/documents/legislatie/norme/norme-calitate/NMC_03_Evaluare_Amplasamente_SMC.pdf",
  },
  {
    no: "NMC-04 (Ordin 68/2003)",
    type: "Normă Calitate / Cercetare-Dezvoltare",
    title_ro: "NMC-04 — Norme de managementul calității pentru activități de cercetare-dezvoltare (C&D)",
    title_en: "NMC-04 — Quality Management Norms for R&D Activities",
    year: 2003,
    catId: "norme",
    subCatId: "norme-calitate",
    pdfUrl: "/documents/legislatie/norme/norme-calitate/NMC_04_Cercetare_Dezvoltare_SMC.pdf",
  },
  {
    no: "NMC-05 (Ordin 69/2003)",
    type: "Normă Calitate / Proiectare",
    title_ro: "NMC-05 — Norme de managementul calității pentru proiectarea instalațiilor nucleare",
    title_en: "NMC-05 — Quality Management Norms for Nuclear Facility Design",
    year: 2003,
    catId: "norme",
    subCatId: "norme-calitate",
    pdfUrl: "/documents/legislatie/norme/norme-calitate/NMC_05_Proiectare_SMC.pdf",
  },
  {
    no: "NMC-06 (Ordin 70/2003)",
    type: "Normă Calitate / Aprovizionare",
    title_ro: "NMC-06 — Norme de managementul calității pentru activități de aprovizionare",
    title_en: "NMC-06 — Quality Management Norms for Procurement Activities",
    year: 2003,
    catId: "norme",
    subCatId: "norme-calitate",
    pdfUrl: "/documents/legislatie/norme/norme-calitate/NMC_06_Aprovizionare_SMC.pdf",
  },
  {
    no: "NMC-08 (Ordin 72/2003)",
    type: "Normă Calitate / Construcții-Montaj",
    title_ro: "NMC-08 — Norme de managementul calității pentru construcții-montaj în instalații nucleare",
    title_en: "NMC-08 — Quality Management Norms for Construction and Assembly",
    year: 2003,
    catId: "norme",
    subCatId: "norme-calitate",
    pdfUrl: "/documents/legislatie/norme/norme-calitate/NMC_08_Constructii_Montaj_SMC.pdf",
  },
  {
    no: "NMC-09 (Ordin 73/2003)",
    type: "Normă Calitate / Punere în Funcțiune",
    title_ro: "NMC-09 — Norme de managementul calității pentru punerea în funcțiune a instalațiilor nucleare",
    title_en: "NMC-09 — Quality Management Norms for Commissioning Activities",
    year: 2003,
    catId: "norme",
    subCatId: "norme-calitate",
    pdfUrl: "/documents/legislatie/norme/norme-calitate/NMC_09_Punere_In_Functiune_SMC.pdf",
  },
  {
    no: "NMC-10 (Ordin 74/2003)",
    type: "Normă Calitate / Exploatare",
    title_ro: "NMC-10 — Norme de managementul calității pentru exploatarea instalațiilor nucleare",
    title_en: "NMC-10 — Quality Management Norms for Nuclear Facility Operation",
    year: 2003,
    catId: "norme",
    subCatId: "norme-calitate",
    pdfUrl: "/documents/legislatie/norme/norme-calitate/NMC_10_Exploatare_SMC.pdf",
  },
  {
    no: "NMC-11 (Ordin 75/2003)",
    type: "Normă Calitate / Dezafectare",
    title_ro: "NMC-11 — Norme de managementul calității pentru dezafectarea instalațiilor nucleare",
    title_en: "NMC-11 — Quality Management Norms for Decommissioning Activities",
    year: 2003,
    catId: "norme",
    subCatId: "norme-calitate",
    pdfUrl: "/documents/legislatie/norme/norme-calitate/NMC_11_Dezafectare_SMC.pdf",
  },
  {
    no: "NMC-01 (Ordin 213/2025)",
    type: "Ordin / Modificare Autorizare SMC",
    title_ro: "NMC-01 / Ordin 213/2025 — Modificări la Normele privind autorizarea sistemelor de management al calității (Ordin 65/2003)",
    title_en: "NMC-01 / Order 213/2025 — Amendments to Quality Management System Licensing Norms",
    year: 2025,
    catId: "norme",
    subCatId: "norme-calitate",
    pdfUrl: "/documents/legislatie/norme/norme-calitate/NMC_01_Ordin_213_2025_Modificare_Autorizare_SMC.pdf",
  },
  {
    no: "NMC-06 (Ordin 214/2025)",
    type: "Ordin / Modificare Aprovizionare SMC",
    title_ro: "NMC-06 / Ordin 214/2025 — Modificări la Normele de aprovizionare pentru instalații nucleare (Ordin 70/2003)",
    title_en: "NMC-06 / Order 214/2025 — Amendments to Quality Management Norms for Procurement",
    year: 2025,
    catId: "norme",
    subCatId: "norme-calitate",
    pdfUrl: "/documents/legislatie/norme/norme-calitate/NMC_06_Ordin_214_2025_Modificare_Aprovizionare_SMC.pdf",
  },
  // 2.10 Norme privind managementul urgențelor radiologice
  {
    no: "NUR-01 (Ordin 147/2018)",
    type: "Normă Urgențe / Răspuns",
    title_ro: "NUR-01 — Norme privind prevenirea, pregătirea și răspunsul în caz de urgență nucleară sau radiologică",
    title_en: "NUR-01 — Norms on Preparedness and Response for a Nuclear or Radiological Emergency",
    year: 2018,
    catId: "norme",
    subCatId: "norme-urgente",
    pdfUrl: "/documents/legislatie/norme/norme-urgente/NUR_01_Norme_Urgenta_Radiologica_2018.pdf",
  },
  {
    no: "Ordin 147/2018",
    type: "Ordin Aprobare",
    title_ro: "Ordin 147/2018 — Aprobarea Normelor privind prevenirea, pregătirea și răspunsul în caz de urgență (NUR-01)",
    title_en: "Order 147/2018 — Approval of Emergency Preparedness and Response Norms NUR-01",
    year: 2018,
    catId: "norme",
    subCatId: "norme-urgente",
    pdfUrl: "/documents/legislatie/norme/norme-urgente/Ordin_147_2018_Aprobare_NUR_01.pdf",
  },
  {
    no: "Regulament Național (2018)",
    type: "Regulament Guvernamental",
    title_ro: "Regulamentul național privind gestionarea situațiilor de urgență specifice riscului nuclear sau radiologic (2018)",
    title_en: "National Regulation on Managing Nuclear or Radiological Emergency Situations (2018)",
    year: 2018,
    catId: "norme",
    subCatId: "norme-urgente",
    pdfUrl: "/documents/legislatie/norme/norme-urgente/Regulament_Gestionare_Urgente_Nucleare_Radiologice_2018.pdf",
  },
  {
    no: "Ordin 150/138/2021",
    type: "Ordin Comun MAI-CNCAN",
    title_ro: "Ordin 150/138/2021 — Modificarea și completarea Regulamentului de gestionare a urgențelor nucleare și radiologice",
    title_en: "Order 150/138/2021 — Amendment to the Regulation on Managing Nuclear and Radiological Emergencies",
    year: 2021,
    catId: "norme",
    subCatId: "norme-urgente",
    pdfUrl: "/documents/legislatie/norme/norme-urgente/Ordin_150_138_2021_Modificare_Regulament_Urgente.pdf",
  },
  // 2.11 Norme privind sursele naturale de radiații
  {
    no: "NSN-21 (Ordin 316/2018)",
    type: "Normă Surse Naturale",
    title_ro: "Norme privind cerințele de securitate radiologică pentru surse naturale de radiații (Ordin 316/2018)",
    title_en: "Radiological safety norms for natural radiation sources (Order 316/2018)",
    year: 2018,
    catId: "norme",
    subCatId: "norme-surse-naturale",
    pdfUrl: "/documents/legislatie/norme/norme-surse-naturale/Norme_Securitate_Surse_Naturale_Radiatii_Ordin_316_2018.pdf",
  },
  {
    no: "Ordin 153/2023 (Radon)",
    type: "Metodologie Radon",
    title_ro: "Metodologie pentru determinarea concentrației de radon în aerul din interiorul clădirilor și de la locurile de muncă",
    title_en: "Methodology for determining radon concentration in indoor air of buildings and workplaces (Order 153/2023)",
    year: 2023,
    catId: "norme",
    subCatId: "norme-surse-naturale",
    pdfUrl: "/documents/legislatie/norme/norme-surse-naturale/Metodologie_Determinare_Radon_Ordin_153_2023.pdf",
  },
  // 2.12 Norme privind pregătirea și atestarea personalului în domeniul nuclear
  {
    no: "63/2018 (Personal)",
    type: "Normă Personal",
    title_ro: "Norme privind cerințele de pregătire, calificare și autorizare pentru personalul cu responsabilități în domeniul nuclear",
    title_en: "Norms on training, qualification, and licensing requirements for personnel with nuclear responsibilities",
    year: 2018,
    catId: "norme",
    subCatId: "norme-personal",
  },
  // 2.13 Norme construcții nucleare
  {
    no: "NCN-01 (Ordin 407/2005)",
    type: "Normă Construcții Nucleare",
    title_ro: "NCN-01 — Norme privind autorizarea executării construcțiilor cu specific nuclear (Ordin 407/2005)",
    title_en: "NCN-01 — Norms on Licensing the Execution of Nuclear Construction Works (Order 407/2005)",
    year: 2005,
    catId: "norme",
    subCatId: "norme-constructii",
    pdfUrl: "/documents/legislatie/norme/norme-constructii/NCN_01_Norme_Autorizare_Constructii_Nucleare_2005.pdf",
  },
  {
    no: "NCN-01 (Ordin 134/2024)",
    type: "Ordin / Modificare NCN-01",
    title_ro: "NCN-01 / Ordin 134/2024 — Modificare și completare a Normelor privind autorizarea construcțiilor nucleare (Ordin 407/2005)",
    title_en: "NCN-01 / Order 134/2024 — Amendments to Norms on Licensing Nuclear Construction Works",
    year: 2024,
    catId: "norme",
    subCatId: "norme-constructii",
    pdfUrl: "/documents/legislatie/norme/norme-constructii/NCN_01_Ordin_134_2024_Modificare_Constructii_Nucleare.pdf",
  },
  // 2.14 Norme de securitate cibernetică în domeniul nuclear
  {
    no: "NSC-01 (Ordin 203/2021)",
    type: "Normă Securitate Cibernetică",
    title_ro: "NSC-01 — Norme privind protecția instalațiilor nucleare împotriva amenințărilor cibernetice (Ordin 203/2021)",
    title_en: "NSC-01 — Norms on Cyber Security Protection of Nuclear Installations against Cyber Threats (Order 203/2021)",
    year: 2021,
    catId: "norme",
    subCatId: "norme-cibernetica",
    pdfUrl: "/documents/legislatie/norme/norme-cibernetica/NSC_01_Norme_Securitate_Cibernetica_Ordin_203_2021.pdf",
  },
  // 2.15 Ordinul nr. 96/2013 privind modificarea și completarea Normelor de dozimetrie individuală
  {
    no: "Ordinul 96/2013",
    type: "Ordin / Dozimetrie",
    title_ro: "Ordinul nr. 96/2013 privind modificarea și completarea Normelor de dozimetrie individuală și monitorizare a personalului",
    title_en: "Order no. 96/2013 amending and supplementing Individual Dosimetry and Personnel Monitoring Norms",
    year: 2013,
    catId: "norme",
    subCatId: "ordin-96-2013",
    pdfUrl: "/documents/legislatie/norme/ordine/Ordin_96_2013_Modificare_Norme_Dozimetrie_Individuala.pdf",
  },
  // 2.16 Ordinul nr. 1/2015 din 06 ianuarie 2015
  {
    no: "Ordinul 1/2015",
    type: "Ordin / Lista Organisme Acreditate",
    title_ro: "Ordinul nr. 1/2015 din 06 ianuarie 2015 — Lista organismelor de dozimetrie individuală acreditate de CNCAN",
    title_en: "Order no. 1/2015 of January 6, 2015 — List of individual dosimetry bodies accredited by CNCAN",
    year: 2015,
    catId: "norme",
    subCatId: "ordin-1-2015",
    pdfUrl: "/documents/legislatie/norme/ordine/Ordin_01_2015_Lista_Organisme_Dozimetrie_Individuala.pdf",
  },
  // 2.17 Ordinul nr. 155/2017 ELI-NP
  {
    no: "Ordinul 155/2017",
    type: "Ordin / ELI-NP",
    title_ro: "Ordinul nr. 155/2017 pentru aprobarea Procedurii privind cerințele de autorizare pentru instalația de cercetare ELI-NP (Fizică nucleară)",
    title_en: "Order no. 155/2017 approving the Licensing Procedure for Extreme Light Infrastructure - Nuclear Physics (ELI-NP)",
    year: 2017,
    catId: "norme",
    subCatId: "ordin-155-2017-eli-np",
    pdfUrl: "/documents/legislatie/norme/ordine/Ordin_155_2017_Procedura_Autorizare_ELI_NP.pdf",
  },
  // 2.18 Ordinul nr. 176/2017
  {
    no: "Ordinul 176/2017",
    type: "Ordin CNCAN",
    title_ro: "Ordinul nr. 176/2017 privind aprobarea cerințelor de autorizare a activității de manipulare a instalațiilor radiologice",
    title_en: "Order no. 176/2017 approving licensing requirements for handling radiological equipment",
    year: 2017,
    catId: "norme",
    subCatId: "ordin-176-2017",
    pdfUrl: "/documents/legislatie/norme/ordine/Ordin_176_2017_Cerinte_Autorizare_Instalatii_Radiologice.pdf",
  },
  // 2.19 Ordinul nr. 14/2018
  {
    no: "Ordinul 14/2018",
    type: "Ordin / Avize",
    title_ro: "Ordinul nr. 14/2018 pentru aprobarea Procedurii privind cerințele de eliberare a avizelor pentru programele de pregătire în protecție radiologică",
    title_en: "Order no. 14/2018 approving the Procedure for issuing approvals for radiation protection training programs",
    year: 2018,
    catId: "norme",
    subCatId: "ordin-14-2018",
    pdfUrl: "/documents/legislatie/norme/ordine/Ordin_14_2018_Avize_Programe_Pregatire_Radioprotectie.pdf",
  },

  // =========================================================================
  // 3. GHIDURI  // 3. GHIDURI
  // =========================================================================
  {
    no: "GSN-01",
    type: "Ghid Tehnic",
    title_ro: "Ghid privind evaluarea de securitate nucleară pentru elaborarea Rapoartelor de Securitate Preliminară și Finală",
    title_en: "Guideline on nuclear safety assessment for drafting Preliminary and Final Safety Reports",
    year: 2021,
    catId: "ghiduri",
    subCatId: "ghiduri-nucleara",
  },
  {
    no: "GAU-02",
    type: "Ghid Autorizare",
    title_ro: "Ghidul solicitantului de autorizație pentru practicile cu surse de radiații ionizante în aplicații industriale",
    title_en: "Applicant Guideline for licensing practices with ionizing radiation sources in industrial applications",
    year: 2019,
    catId: "ghiduri",
    subCatId: "ghiduri-radiologica",
  },
  {
    no: "GM-03",
    type: "Ghid Medical",
    title_ro: "Ghid tehnic de radioprotecție, dozimetrie și control de calitate pentru instalațiile radiologice medicale",
    title_en: "Technical guideline on radiation protection, dosimetry, and quality assurance for medical radiological equipment",
    year: 2022,
    catId: "ghiduri",
    subCatId: "ghiduri-radiologica",
  },
  {
    no: "G-RADON",
    type: "Ghid Practic",
    title_ro: "Ghid de măsurare și remediere a concentrațiilor de radon în clădiri publice, școli și spații rezidențiale",
    title_en: "Guideline for measuring and remediating radon concentrations in public buildings, schools, and homes",
    year: 2020,
    catId: "ghiduri",
    subCatId: "ghiduri-surse-naturale",
  },

  // =========================================================================
  // 4. INSPECȚIE ȘI SUPRAVEGHERE
  // =========================================================================
  {
    no: "180/2017",
    type: "Ordin / Procedură",
    title_ro: "Procedura și instrucțiunile de efectuare a inspecțiilor de stat CNCAN la obiectivele și instalațiile nucleare",
    title_en: "Procedure and instructions for conducting CNCAN state inspections at nuclear facilities and objectives",
    year: 2017,
    catId: "inspectie",
  },
  {
    no: "95/2019",
    type: "Ordin",
    title_ro: "Norme privind supravegherea radiologică a mediului și raportarea datelor către Rețeaua Națională de Supraveghere",
    title_en: "Rules on environmental radiological surveillance and data reporting to the National Surveillance Network",
    year: 2019,
    catId: "inspectie",
  },
  {
    no: "312/2015",
    type: "Regulament",
    title_ro: "Metodologia de control operațional și inspecție permanentă de către inspectorii rezidenți pe amplasamentul CNE Cernavodă",
    title_en: "Methodology of operational control and permanent inspection by resident inspectors at Cernavoda NPP",
    year: 2015,
    catId: "inspectie",
  },

  // =========================================================================
  // 5. AUTORIZARE PERSONAL INSTALAȚII NUCLEARE
  // =========================================================================
  {
    no: "63/2018",
    type: "Ordin / Normă",
    title_ro: "Norme privind cerințele de calificare și autorizare pentru personalul cu responsabilități în domeniul nuclear (Permise de exercitare)",
    title_en: "Norms on qualification and licensing requirements for personnel with nuclear responsibilities (Work Permits)",
    year: 2018,
    catId: "autorizare-personal",
  },
  {
    no: "215/2021",
    type: "Regulament",
    title_ro: "Regulamentul de examinare, atestare și reautorizare a operatorilor de cameră de comandă principală de la CNE Cernavodă",
    title_en: "Regulation on examination, certification, and re-licensing of main control room operators at Cernavoda NPP",
    year: 2021,
    catId: "autorizare-personal",
  },
  {
    no: "112/2016",
    type: "Ordin / Normă",
    title_ro: "Norme privind pregătirea profesională și autorizarea experților acreditați în fizică medicală și protecție radiologică",
    title_en: "Norms on professional training and licensing of accredited medical physics and radiation protection experts",
    year: 2016,
    catId: "autorizare-personal",
  },

  // =========================================================================
  // 6. REGULAMENT TAXE ȘI TARIFE
  // =========================================================================
  {
    no: "155/2005",
    type: "Ordin CNCAN",
    title_ro: "Norme privind stabilirea taxelor și tarifelor pentru autorizarea și controlul activităților nucleare (text consolidat)",
    title_en: "Rules on establishing fees and tariffs for licensing and control of nuclear activities (consolidated text)",
    year: 2005,
    catId: "taxe-si-tarife",
  },
  {
    no: "44/2023",
    type: "Ordin / Actualizare",
    title_ro: "Actualizarea grilei de taxe și tarife CNCAN pentru emiterea permiselor de exercitare, avizelor și autorizațiilor sanitare",
    title_en: "Update of CNCAN fee and tariff schedule for issuing work permits, approvals, and health licenses",
    year: 2023,
    catId: "taxe-si-tarife",
  },
  {
    no: "53/2008",
    type: "HG",
    title_ro: "Hotărârea Guvernului privind regulamentul de administrare a veniturilor destinate controlului și reglementării nucleare",
    title_en: "Government Decision on rules for managing revenues designated for nuclear control and regulation",
    year: 2008,
    catId: "taxe-si-tarife",
  },

  // =========================================================================
  // 7. LEGISLAȚIE COMUNITARĂ
  // =========================================================================
  {
    no: "2013/59/EURATOM",
    type: "Directivă EURATOM",
    title_ro: "Directiva Consiliului de stabilire a normelor de bază privind protecția sanitară împotriva pericolelor expunerii la radiații ionizante",
    title_en: "Council Directive laying down basic safety standards for protection against dangers arising from exposure to ionizing radiation",
    year: 2013,
    catId: "comunitara",
  },
  {
    no: "2014/87/EURATOM",
    type: "Directivă EURATOM",
    title_ro: "Directiva Consiliului de modificare a Directivei 2009/71/EURATOM de instituire a unui cadru comunitar pentru securitatea nucleară",
    title_en: "Council Directive amending Directive 2009/71/EURATOM establishing a Community framework for the nuclear safety of nuclear installations",
    year: 2014,
    catId: "comunitara",
  },
  {
    no: "2011/70/EURATOM",
    type: "Directivă EURATOM",
    title_ro: "Directiva Consiliului de instituire a unui cadru comunitar pentru gestionarea responsabilă a combustibilului uzat și a deșeurilor radioactive",
    title_en: "Council Directive establishing a Community framework for responsible and safe management of spent fuel and radioactive waste",
    year: 2011,
    catId: "comunitara",
  },
  {
    no: "2006/117/EURATOM",
    type: "Directivă EURATOM",
    title_ro: "Directiva privind supravegherea și controlul transferurilor transfrontaliere de deșeuri radioactive și combustibil uzat",
    title_en: "Directive on the supervision and control of shipments of radioactive waste and spent fuel",
    year: 2006,
    catId: "comunitara",
  },

  // =========================================================================
  // 8. TRATATE, ACORDURI, CONVENȚII
  // =========================================================================
  {
    no: "Convenția Viena 1997",
    type: "Convenție internațională",
    title_ro: "Convenția de la Viena privind răspunderea civilă pentru daune nucleare și Protocolul internațional de modificare",
    title_en: "Vienna Convention on Civil Liability for Nuclear Damage and the International Amending Protocol",
    year: 1997,
    catId: "tratate",
  },
  {
    no: "Tratatul NPT 1970",
    type: "Tratat internațional",
    title_ro: "Tratatul cu privire la neproliferarea armelor nucleare (ratificat de România prin Decretul nr. 148/1970)",
    title_en: "Treaty on the Non-Proliferation of Nuclear Weapons (NPT, ratified by Romania via Decree 148/1970)",
    year: 1970,
    catId: "tratate",
  },
  {
    no: "Acordul AIEA-EURATOM",
    type: "Acord de garanții",
    title_ro: "Acordul dintre România, Comunitatea Europeană (EURATOM) și AIEA în aplicarea garanțiilor nucleare (INFCIRC/193)",
    title_en: "Agreement between Romania, EURATOM, and IAEA for the application of nuclear safeguards (INFCIRC/193)",
    year: 1972,
    catId: "tratate",
  },
  {
    no: "Convenția CNS 1994",
    type: "Convenție AIEA",
    title_ro: "Convenția privind securitatea nucleară (Convention on Nuclear Safety - CNS), adoptată la Viena în 1994",
    title_en: "Convention on Nuclear Safety (CNS), adopted in Vienna in 1994 and ratified by Law no. 105/1995",
    year: 1994,
    catId: "tratate",
  },
];

function LegPage() {
  const { t, lang } = useI18n();
  const [query, setQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState<string>("norme");
  const [selectedSubCat, setSelectedSubCat] = useState<string>("all-sub");
  const [expandedSubCats, setExpandedSubCats] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    NORME_SUBSECTIONS.forEach((s) => {
      initial[s.id] = true;
    });
    GHIDURI_SUBSECTIONS.forEach((s) => {
      initial[s.id] = true;
    });
    INSPECTIE_SUBSECTIONS.forEach((s) => {
      initial[s.id] = true;
    });
    return initial;
  });

  const [dynamicItems, setDynamicItems] = useState<LegItem[]>([]);

  useEffect(() => {
    const fetchDynamicLegislation = async () => {
      try {
        const { data, error } = await supabase
          .from('legislation')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        if (data) {
          const mappedItems: LegItem[] = data.map((item: any) => ({
            id: item.id,
            title_ro: item.title_ro,
            title_en: item.title_en || item.title_ro,
            type: item.type,
            no: item.no || "",
            year: item.year || "",
            catId: item.cat_id,
            subCatId: item.sub_cat_id || undefined,
            pdfUrl: item.pdf_url,
          }));
          setDynamicItems(mappedItems);
        }
      } catch (err) {
        console.error("Failed to fetch dynamic legislation:", err);
      }
    };
    fetchDynamicLegislation();
  }, []);

  const allLegislationItems = useMemo(() => {
    return [...dynamicItems, ...LEGISLATION_ITEMS];
  }, [dynamicItems]);

  const toggleSubCat = (id: string) => {
    setExpandedSubCats((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredItems = allLegislationItems.filter((item) => {
    const q = query.toLowerCase().trim();
    const matchQuery =
      !q ||
      item.no.toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q) ||
      item.title_ro.toLowerCase().includes(q) ||
      item.title_en.toLowerCase().includes(q);

    const matchCategory = selectedCat === "all" || item.catId === selectedCat;

    const matchSubCategory =
      (selectedCat !== "norme" && selectedCat !== "ghiduri" && selectedCat !== "inspectie") ||
      selectedSubCat === "all-sub" ||
      item.subCatId === selectedSubCat;

    return matchQuery && matchCategory && matchSubCategory;
  });

  const featuredItem = allLegislationItems.find((i) => i.featured);

  return (
    <>
      <PageHeader
        eyebrow="02"
        title={lang === "ro" ? "Registrul Legislativ Național" : "National Legislative Registry"}
        subtitle={
          lang === "ro"
            ? "Ordine clară și concisă a actelor normative aplicabile domeniului nuclear, reglementărilor de securitate și tratatelor internaționale."
            : "Clear and concise ordering of legal acts applicable to the nuclear sector, safety regulations, and international treaties."
        }
      />

      <section className="container-page py-10 md:py-14">
        {/* LEGEA 111/1996 FEATURED HERO CARD */}
        {featuredItem &&
          (selectedCat === "all" || selectedCat === "legi") &&
          (!query ||
            "111/1996".includes(query.toLowerCase()) ||
            "legea".includes(query.toLowerCase()) ||
            "nucleare".includes(query.toLowerCase())) && (
            <div className="mb-10 rounded-sm border-2 border-brand/40 bg-gradient-to-br from-brand-deep/5 via-card to-brand/10 p-6 md:p-8 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                  <Star className="h-3.5 w-3.5 fill-brand text-brand" />
                  {lang === "ro" ? "LEGEA CADRU A DOMENIULUI NUCLEAR" : "FRAMEWORK LAW OF THE NUCLEAR SECTOR"}
                </div>
                <span className="font-mono text-xs text-muted-foreground">Republicată & Consolidată (PDF 24 pagini)</span>
              </div>

              <h2 className="mt-4 font-display text-2xl md:text-3xl text-brand-deep leading-snug">
                {lang === "ro" ? featuredItem.title_ro : featuredItem.title_en}
              </h2>

              <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-3xl">
                {lang === "ro"
                  ? "Actul normativ fundamental care reglementează regimul de autorizare, securitatea nucleară, radioprotecția, controlul de stat și sancțiunile aplicabile tuturor activităților nucleare din România."
                  : "The fundamental legal act regulating the licensing regime, nuclear safety, radiation protection, state control, and sanctions for all nuclear activities in Romania."}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a
                  href={featuredItem.pdfUrl || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm bg-brand px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-deep shadow-sm"
                >
                  <Download className="h-4 w-4" />
                  {lang === "ro" ? "Descarcă PDF-ul Integral (24 pagini)" : "Download Full PDF (24 pages)"}
                </a>
                <a
                  href={featuredItem.pdfUrl || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                >
                  <FileText className="h-4 w-4 text-brand" />
                  {lang === "ro" ? "Deschide PDF-ul în browser" : "Open PDF in browser"}
                </a>
                <Link
                  to="/legea-111"
                  className="inline-flex items-center gap-2 text-sm text-brand font-medium hover:underline ml-auto"
                >
                  <Eye className="h-4 w-4" />
                  {lang === "ro" ? "Citește textul pe site" : "Read text on site"}
                </Link>
              </div>
            </div>
          )}

        {/* SEARCH & 8-CATEGORY SELECTOR BAR */}
        <div className="rounded-sm border border-border bg-card p-5 shadow-sm mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-border">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  lang === "ro"
                    ? "Caută după număr, an sau denumire act normativ..."
                    : "Search by number, year, or normative act title..."
                }
                className="w-full pl-10 pr-4 h-11 bg-secondary/40 border border-border rounded-sm text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
              />
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Filter className="h-4 w-4 text-brand" />
              <span>
                {lang === "ro" ? "Afișați pe categorii sau integral:" : "Display by category or all:"}
              </span>
            </div>
          </div>

          {/* 8 EXACT USER-REQUESTED CATEGORIES PILLS */}
          <div className="flex flex-wrap items-center gap-2 mt-5">
            <button
              onClick={() => {
                setSelectedCat("all");
                setSelectedSubCat("all-sub");
              }}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-sm text-xs font-semibold transition-all ${
                selectedCat === "all"
                  ? "bg-brand text-primary-foreground shadow-sm scale-[1.02]"
                  : "bg-secondary/60 text-foreground hover:bg-secondary border border-border/70"
              }`}
            >
              <FolderOpen className="h-3.5 w-3.5" />
              {lang === "ro"
                ? `Toate Categoriile (${allLegislationItems.length} acte)`
                : `All Categories (${allLegislationItems.length} acts)`}
            </button>

            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const count = allLegislationItems.filter((i) => i.catId === cat.id).length;
              const isActive = selectedCat === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCat(cat.id);
                    setSelectedSubCat("all-sub");
                  }}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-sm text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-brand text-primary-foreground shadow-sm scale-[1.02]"
                      : "bg-secondary/60 text-foreground hover:bg-secondary border border-border/70"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{lang === "ro" ? cat.name_ro : cat.name_en}</span>
                  <span
                    className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] ${
                      isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* SPECIAL SUBSECTION SELECTOR FOR CATEGORY 2. NORME */}
        {(selectedCat === "norme" || selectedCat === "all") && (
          <div className="mb-10 rounded-sm border-2 border-brand/25 bg-gradient-to-r from-secondary/70 via-secondary/30 to-card p-5 md:p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-brand mb-1">
                  <Layers className="h-3.5 w-3.5" />
                  {lang === "ro" ? "Arhitectura Subsecțiunilor de Norme CNCAN" : "Architecture of CNCAN Norms Subsections"}
                </div>
                <h3 className="font-display text-lg md:text-xl text-foreground font-semibold">
                  {lang === "ro"
                    ? "2. Norme de Securitate — Structurate pe Domenii și Ordine de Reglementare"
                    : "2. Safety Norms — Structured across Regulatory Domains and Orders"}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5 max-w-2xl">
                  {lang === "ro"
                    ? "Selectați din subsecțiunile aferente pentru a filtra direct normele de securitate radiologică, nucleară, fizică, garanții sau ordine specifice (ELI-NP, Ordinul 1/2015, Ordinul 96/2013 etc.)."
                    : "Select from the subsections to filter directly by radiation, nuclear, physical safety norms, safeguards, or specific orders (ELI-NP, Order 1/2015, Order 96/2013, etc.)."}
                </p>
              </div>

              {selectedCat === "norme" && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const allOpen: Record<string, boolean> = {};
                      NORME_SUBSECTIONS.forEach((s) => (allOpen[s.id] = true));
                      setExpandedSubCats(allOpen);
                    }}
                    className="px-3 py-1.5 rounded-sm bg-card border border-border hover:border-brand text-xs font-medium text-foreground transition-colors"
                  >
                    {lang === "ro" ? "Extinde toate" : "Expand all"}
                  </button>
                  <button
                    onClick={() => {
                      const allClosed: Record<string, boolean> = {};
                      NORME_SUBSECTIONS.forEach((s) => (allClosed[s.id] = false));
                      setExpandedSubCats(allClosed);
                    }}
                    className="px-3 py-1.5 rounded-sm bg-card border border-border hover:border-brand text-xs font-medium text-foreground transition-colors"
                  >
                    {lang === "ro" ? "Restrânge toate" : "Collapse all"}
                  </button>
                </div>
              )}
            </div>

            {/* QUICK PILL FILTER FOR 19 NORME SUBSECTIONS */}
            {selectedCat === "norme" && (
              <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-border/60">
                <button
                  onClick={() => setSelectedSubCat("all-sub")}
                  className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                    selectedSubCat === "all-sub"
                      ? "bg-brand text-primary-foreground shadow-sm"
                      : "bg-card text-muted-foreground hover:text-foreground border border-border/70"
                  }`}
                >
                  {lang === "ro" ? "Toate" : "All"}
                </button>

                {NORME_SUBSECTIONS.map((sub) => {
                  const subCount = allLegislationItems.filter((i) => i.subCatId === sub.id).length;
                  const isActive = selectedSubCat === sub.id;

                  return (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedSubCat(sub.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium transition-all ${
                        isActive
                          ? "bg-brand text-primary-foreground font-bold shadow-sm"
                          : "bg-card/80 text-foreground hover:bg-card border border-border/70"
                      }`}
                    >
                      <span className="font-mono text-[10px] opacity-80">{sub.code}</span>
                      <span className="truncate max-w-[200px]">
                        {lang === "ro" ? sub.title_ro : sub.title_en}
                      </span>
                      <span
                        className={`ml-1 px-1.5 py-0.2 rounded-full text-[9px] ${
                          isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {subCount}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* SPECIAL SUBSECTION SELECTOR FOR CATEGORY 4. INSPECTIE */}
        {(selectedCat === "inspectie" || selectedCat === "all") && (
          <div className="mb-10 rounded-sm border-2 border-brand/25 bg-gradient-to-r from-secondary/70 via-secondary/30 to-card p-5 md:p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-brand mb-1">
                  <Search className="h-3.5 w-3.5" />
                  {lang === "ro" ? "Etapele și Tipurile de Inspecții" : "Inspection Stages and Types"}
                </div>
                <h3 className="font-display text-lg md:text-xl text-foreground font-semibold">
                  {lang === "ro"
                    ? "4. Inspecție și Supraveghere"
                    : "4. Inspection and Control"}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5 max-w-2xl">
                  {lang === "ro"
                    ? "Selectați etapa sau tipul inspecției pentru a vizualiza reglementările și procedurile specifice aplicabile."
                    : "Select the inspection stage or type to view the specific applicable regulations and procedures."}
                </p>
              </div>

              {selectedCat === "inspectie" && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const allOpen: Record<string, boolean> = {};
                      INSPECTIE_SUBSECTIONS.forEach((s) => (allOpen[s.id] = true));
                      setExpandedSubCats((prev) => ({ ...prev, ...allOpen }));
                    }}
                    className="px-3 py-1.5 rounded-sm bg-card border border-border hover:border-brand text-xs font-medium text-foreground transition-colors"
                  >
                    {lang === "ro" ? "Extinde toate" : "Expand all"}
                  </button>
                  <button
                    onClick={() => {
                      const allClosed: Record<string, boolean> = {};
                      INSPECTIE_SUBSECTIONS.forEach((s) => (allClosed[s.id] = false));
                      setExpandedSubCats((prev) => ({ ...prev, ...allClosed }));
                    }}
                    className="px-3 py-1.5 rounded-sm bg-card border border-border hover:border-brand text-xs font-medium text-foreground transition-colors"
                  >
                    {lang === "ro" ? "Restrânge toate" : "Collapse all"}
                  </button>
                </div>
              )}
            </div>

            {selectedCat === "inspectie" && (
              <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-border/60">
                <button
                  onClick={() => setSelectedSubCat("all-sub")}
                  className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                    selectedSubCat === "all-sub"
                      ? "bg-brand text-primary-foreground shadow-sm"
                      : "bg-card text-muted-foreground hover:text-foreground border border-border/70"
                  }`}
                >
                  {lang === "ro" ? "Toate" : "All"}
                </button>

                {INSPECTIE_SUBSECTIONS.map((sub) => {
                  const subCount = allLegislationItems.filter((i) => i.subCatId === sub.id).length;
                  const isActive = selectedSubCat === sub.id;

                  return (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedSubCat(sub.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium transition-all ${
                        isActive
                          ? "bg-brand text-primary-foreground font-bold shadow-sm"
                          : "bg-card/80 text-foreground hover:bg-card border border-border/70"
                      }`}
                    >
                      <span className="font-mono text-[10px] opacity-80">{sub.code}</span>
                      <span className="truncate max-w-[200px]">
                        {lang === "ro" ? sub.title_ro : sub.title_en}
                      </span>
                      <span
                        className={`ml-1 px-1.5 py-0.2 rounded-full text-[9px] ${
                          isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {subCount}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* SPECIAL SUBSECTION SELECTOR FOR CATEGORY 3. GHIDURI */}
        {(selectedCat === "ghiduri" || selectedCat === "all") && (
          <div className="mb-10 rounded-sm border-2 border-brand/25 bg-gradient-to-r from-secondary/70 via-secondary/30 to-card p-5 md:p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-brand mb-1">
                  <BookOpen className="h-3.5 w-3.5" />
                  {lang === "ro" ? "Arhitectura Subsecțiunilor de Ghiduri CNCAN" : "Architecture of CNCAN Guidelines Subsections"}
                </div>
                <h3 className="font-display text-lg md:text-xl text-foreground font-semibold">
                  {lang === "ro"
                    ? "3. Ghiduri — Structurate pe 13 Domenii de Securitate și Reglementare"
                    : "3. Guidelines — Structured across 13 Safety and Regulatory Domains"}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5 max-w-2xl">
                  {lang === "ro"
                    ? "Selectați din cele 13 domenii (GSR, GSN, GIN, GGN, GPF, GMR, GTR, GDR, GMC, GUR, GRN, GPP, GCN) pentru a filtra rapid ghidurile de aplicare."
                    : "Select from the 13 domains (GSR, GSN, GIN, GGN, GPF, GMR, GTR, GDR, GMC, GUR, GRN, GPP, GCN) to quickly filter application guidelines."}
                </p>
              </div>

              {selectedCat === "ghiduri" && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const allOpen: Record<string, boolean> = {};
                      GHIDURI_SUBSECTIONS.forEach((s) => (allOpen[s.id] = true));
                      setExpandedSubCats((prev) => ({ ...prev, ...allOpen }));
                    }}
                    className="px-3 py-1.5 rounded-sm bg-card border border-border hover:border-brand text-xs font-medium text-foreground transition-colors"
                  >
                    {lang === "ro" ? "Extinde toate" : "Expand all"}
                  </button>
                  <button
                    onClick={() => {
                      const allClosed: Record<string, boolean> = {};
                      GHIDURI_SUBSECTIONS.forEach((s) => (allClosed[s.id] = false));
                      setExpandedSubCats((prev) => ({ ...prev, ...allClosed }));
                    }}
                    className="px-3 py-1.5 rounded-sm bg-card border border-border hover:border-brand text-xs font-medium text-foreground transition-colors"
                  >
                    {lang === "ro" ? "Restrânge toate" : "Collapse all"}
                  </button>
                </div>
              )}
            </div>

            {/* QUICK PILL FILTER FOR 13 GHIDURI SUBSECTIONS */}
            {selectedCat === "ghiduri" && (
              <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-border/60">
                <button
                  onClick={() => setSelectedSubCat("all-sub")}
                  className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                    selectedSubCat === "all-sub"
                      ? "bg-brand text-primary-foreground shadow-sm"
                      : "bg-card text-muted-foreground hover:text-foreground border border-border/70"
                  }`}
                >
                  {lang === "ro" ? "Toate" : "All"}
                </button>

                {GHIDURI_SUBSECTIONS.map((sub) => {
                  const subCount = allLegislationItems.filter((i) => i.subCatId === sub.id).length;
                  const isActive = selectedSubCat === sub.id;

                  return (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedSubCat(sub.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium transition-all ${
                        isActive
                          ? "bg-brand text-primary-foreground font-bold shadow-sm"
                          : "bg-card/80 text-foreground hover:bg-card border border-border/70"
                      }`}
                    >
                      <span className="font-mono text-[10px] opacity-80">{sub.code}</span>
                      <span className="truncate max-w-[200px]">
                        {lang === "ro" ? sub.title_ro : sub.title_en}
                      </span>
                      <span
                        className={`ml-1 px-1.5 py-0.2 rounded-full text-[9px] ${
                          isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {subCount}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* LISTING ORDERED BY THE 8 EXACT CATEGORIES */}
        {filteredItems.length === 0 ? (
          <div className="border border-border bg-card p-12 text-center flex flex-col items-center justify-center rounded-sm">
            <HelpCircle className="h-10 w-10 text-muted-foreground/60 mb-3 stroke-[1.5]" />
            <h3 className="font-display text-xl text-foreground">
              {lang === "ro" ? "Nu s-a găsit niciun act normativ" : "No legislative document found"}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-md">
              {lang === "ro"
                ? `Nu există rezultate pentru căutarea "${query}". Încercați o altă categorie sau expresie.`
                : `We couldn't find any act matching "${query}". Try selecting another category or phrase.`}
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {CATEGORIES.filter((c) => selectedCat === "all" || selectedCat === c.id).map((cat) => {
              const catItems = filteredItems.filter((i) => i.catId === cat.id);
              if (catItems.length === 0) return null;

              const Icon = cat.icon;

              // SPECIAL HANDLING FOR CATEGORY "NORME" - DISPLAY BY THE 19 SUBSECTIONS
              if (cat.id === "norme") {
                const subSectionsToDisplay = NORME_SUBSECTIONS.filter(
                  (sub) => selectedSubCat === "all-sub" || selectedSubCat === sub.id
                );

                return (
                  <div key={cat.id} id={cat.id} className="scroll-mt-24 space-y-6">
                    {/* MASTER CATEGORY HEADER */}
                    <div className="rounded-sm border border-border bg-card shadow-sm overflow-hidden">
                      <div className="bg-gradient-to-r from-secondary/80 via-secondary/40 to-transparent p-5 md:p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-sm bg-brand/10 text-brand mt-0.5">
                            <Icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-display text-xl md:text-2xl text-brand-deep font-bold tracking-tight">
                              {lang === "ro" ? cat.name_ro : cat.name_en}
                            </h3>
                            <p className="text-xs md:text-sm text-muted-foreground mt-1 max-w-2xl leading-relaxed">
                              {lang === "ro" ? cat.description_ro : cat.description_en}
                            </p>
                          </div>
                        </div>

                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-secondary border border-border text-xs font-mono font-semibold text-foreground shrink-0">
                          <span>{catItems.length}</span>
                          <span>{lang === "ro" ? "norme" : "norms"}</span>
                        </div>
                      </div>
                    </div>

                    {/* RENDER THE 19 EXACT SUBSECTIONS */}
                    <div className="space-y-4 pl-0 md:pl-3 border-l-0 md:border-l-2 border-brand/30">
                      {subSectionsToDisplay.map((sub) => {
                        const subItems = catItems.filter((i) => i.subCatId === sub.id);
                        const isExpanded = expandedSubCats[sub.id] ?? true;

                        return (
                          <div
                            key={sub.id}
                            id={sub.id}
                            className="rounded-sm border border-border bg-card shadow-sm overflow-hidden transition-all"
                          >
                            {/* SUBSECTION HEADER BAND */}
                            <div
                              onClick={() => toggleSubCat(sub.id)}
                              className="bg-secondary/40 hover:bg-secondary/70 p-4 md:p-5 flex items-center justify-between gap-4 cursor-pointer select-none transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <span className="inline-flex items-center justify-center min-w-[36px] h-7 rounded bg-brand text-primary-foreground font-mono text-xs font-bold">
                                  {sub.code}
                                </span>
                                <div>
                                  <h4 className="font-display text-base md:text-lg text-foreground font-bold leading-snug">
                                    {lang === "ro" ? sub.title_ro : sub.title_en}
                                  </h4>
                                  <p className="text-xs text-muted-foreground mt-0.5">
                                    {lang === "ro" ? sub.description_ro : sub.description_en}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 shrink-0">
                                <span className="px-2.5 py-1 rounded-full bg-secondary border border-border text-xs font-mono font-semibold text-foreground">
                                  {subItems.length} {lang === "ro" ? "acte" : "acts"}
                                </span>
                                {isExpanded ? (
                                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                                ) : (
                                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                )}
                              </div>
                            </div>

                            {/* SUBSECTION ITEMS CONTENT */}
                            {isExpanded && (
                              <div className="divide-y divide-border border-t border-border">
                                {subItems.length === 0 ? (
                                  <div className="p-6 text-center text-xs text-muted-foreground bg-card/40">
                                    {lang === "ro"
                                      ? "Această subsecțiune este configurată conform structurii solicitate. Urmează încărcarea documentației aferente."
                                      : "This subsection is configured according to the requested structure. Documentation will be loaded next."}
                                  </div>
                                ) : (
                                  subItems.map((item, idx) => (
                                    <article
                                      key={`${item.no}-${idx}`}
                                      className="p-4 md:p-5 grid gap-3 md:grid-cols-[140px_1fr_auto] items-center group hover:bg-secondary/30 transition-colors"
                                    >
                                      <div>
                                        <span className="inline-block px-2 py-0.5 rounded text-[10px] uppercase tracking-wider bg-brand/10 text-brand font-bold">
                                          {item.type}
                                        </span>
                                        <div className="font-mono text-xs font-bold text-foreground mt-1">
                                          nr. {item.no}
                                        </div>
                                        <div className="text-[11px] text-muted-foreground mt-0.5">
                                          {lang === "ro" ? "An emitere" : "Year"}: {item.year}
                                        </div>
                                      </div>

                                      <div>
                                        <h5 className="font-display text-sm md:text-base text-foreground font-semibold leading-snug group-hover:text-brand transition-colors">
                                          {lang === "ro" ? item.title_ro : item.title_en}
                                        </h5>
                                      </div>

                                      <div className="flex items-center gap-2 justify-end">
                                        <a
                                          href={item.pdfUrl || "#"}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-border hover:border-brand bg-card hover:bg-accent text-xs font-semibold text-foreground transition-all group-hover:border-brand/40"
                                        >
                                          <FileText className="h-3.5 w-3.5 text-brand" />
                                          <span>PDF</span>
                                          <ExternalLink className="h-3 w-3 text-muted-foreground" />
                                        </a>
                                      </div>
                                    </article>
                                  ))
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              // SPECIAL HANDLING FOR CATEGORY "GHIDURI" - DISPLAY BY THE 13 SUBSECTIONS
              if (cat.id === "ghiduri") {
                const subSectionsToDisplay = GHIDURI_SUBSECTIONS.filter(
                  (sub) => selectedSubCat === "all-sub" || selectedSubCat === sub.id
                );

                return (
                  <div key={cat.id} id={cat.id} className="scroll-mt-24 space-y-6">
                    {/* MASTER CATEGORY HEADER */}
                    <div className="rounded-sm border border-border bg-card shadow-sm overflow-hidden">
                      <div className="bg-gradient-to-r from-secondary/80 via-secondary/40 to-transparent p-5 md:p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-sm bg-brand/10 text-brand mt-0.5">
                            <Icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-display text-xl md:text-2xl text-brand-deep font-bold tracking-tight">
                              {lang === "ro" ? cat.name_ro : cat.name_en}
                            </h3>
                            <p className="text-xs md:text-sm text-muted-foreground mt-1 max-w-2xl leading-relaxed">
                              {lang === "ro" ? cat.description_ro : cat.description_en}
                            </p>
                          </div>
                        </div>

                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-secondary border border-border text-xs font-mono font-semibold text-foreground shrink-0">
                          <span>{catItems.length}</span>
                          <span>{lang === "ro" ? "ghiduri total" : "total guidelines"}</span>
                        </div>
                      </div>
                    </div>

                    {/* RENDER THE 13 EXACT SUBSECTIONS */}
                    <div className="space-y-4 pl-0 md:pl-3 border-l-0 md:border-l-2 border-brand/30">
                      {subSectionsToDisplay.map((sub) => {
                        const subItems = catItems.filter((i) => i.subCatId === sub.id);
                        const isExpanded = expandedSubCats[sub.id] ?? true;

                        return (
                          <div
                            key={sub.id}
                            id={sub.id}
                            className="rounded-sm border border-border bg-card shadow-sm overflow-hidden transition-all"
                          >
                            {/* SUBSECTION HEADER BAND */}
                            <div
                              onClick={() => toggleSubCat(sub.id)}
                              className="bg-secondary/40 hover:bg-secondary/70 p-4 md:p-5 flex items-center justify-between gap-4 cursor-pointer select-none transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <span className="inline-flex items-center justify-center min-w-[38px] h-7 rounded bg-brand text-primary-foreground font-mono text-xs font-bold">
                                  {sub.code}
                                </span>
                                <div>
                                  <h4 className="font-display text-base md:text-lg text-foreground font-bold leading-snug">
                                    {lang === "ro" ? sub.title_ro : sub.title_en}
                                  </h4>
                                  <p className="text-xs text-muted-foreground mt-0.5">
                                    {lang === "ro" ? sub.description_ro : sub.description_en}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 shrink-0">
                                <span className="px-2.5 py-1 rounded-full bg-secondary border border-border text-xs font-mono font-semibold text-foreground">
                                  {subItems.length} {lang === "ro" ? "ghiduri" : "guides"}
                                </span>
                                {isExpanded ? (
                                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                                ) : (
                                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                )}
                              </div>
                            </div>

                            {/* SUBSECTION ITEMS CONTENT */}
                            {isExpanded && (
                              <div className="divide-y divide-border border-t border-border">
                                {subItems.length === 0 ? (
                                  <div className="p-6 text-center text-xs text-muted-foreground bg-card/40">
                                    {lang === "ro"
                                      ? "Arhitectură reglementată conform nomenclatorului CNCAN. Ghidurile specifice din această secțiune urmează a fi încărcate după finalizarea digitalizării."
                                      : "Regulated architecture according to CNCAN nomenclature. Specific guidelines in this section will be loaded after digitization."}
                                  </div>
                                ) : (
                                  subItems.map((item, idx) => (
                                    <article
                                      key={`${item.no}-${idx}`}
                                      className="p-4 md:p-5 grid gap-3 md:grid-cols-[140px_1fr_auto] items-center group hover:bg-secondary/30 transition-colors"
                                    >
                                      <div>
                                        <span className="inline-block px-2 py-0.5 rounded text-[10px] uppercase tracking-wider bg-brand/10 text-brand font-bold">
                                          {item.type}
                                        </span>
                                        <div className="font-mono text-xs font-bold text-foreground mt-1">
                                          nr. {item.no}
                                        </div>
                                        <div className="text-[11px] text-muted-foreground mt-0.5">
                                          {lang === "ro" ? "An emitere" : "Year"}: {item.year}
                                        </div>
                                      </div>

                                      <div>
                                        <h5 className="font-display text-sm md:text-base text-foreground font-semibold leading-snug group-hover:text-brand transition-colors">
                                          {lang === "ro" ? item.title_ro : item.title_en}
                                        </h5>
                                      </div>

                                      <div className="flex items-center gap-2 justify-end">
                                        <a
                                          href={item.pdfUrl || "#"}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-border hover:border-brand bg-card hover:bg-accent text-xs font-semibold text-foreground transition-all group-hover:border-brand/40"
                                        >
                                          <FileText className="h-3.5 w-3.5 text-brand" />
                                          <span>PDF</span>
                                          <ExternalLink className="h-3 w-3 text-muted-foreground" />
                                        </a>
                                      </div>
                                    </article>
                                  ))
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              // SPECIAL HANDLING FOR CATEGORY "INSPECTIE"
              if (cat.id === "inspectie") {
                const subSectionsToDisplay = INSPECTIE_SUBSECTIONS.filter(
                  (sub) => selectedSubCat === "all-sub" || selectedSubCat === sub.id
                );

                return (
                  <div key={cat.id} id={cat.id} className="scroll-mt-24 space-y-6">
                    <div className="rounded-sm border border-border bg-card shadow-sm overflow-hidden">
                      <div className="bg-gradient-to-r from-secondary/80 via-secondary/40 to-transparent p-5 md:p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-sm bg-brand/10 text-brand mt-0.5">
                            <Icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-display text-xl md:text-2xl text-brand-deep font-bold tracking-tight">
                              {lang === "ro" ? cat.name_ro : cat.name_en}
                            </h3>
                            <p className="text-xs md:text-sm text-muted-foreground mt-1 max-w-2xl leading-relaxed">
                              {lang === "ro" ? cat.description_ro : cat.description_en}
                            </p>
                          </div>
                        </div>

                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-secondary border border-border text-xs font-mono font-semibold text-foreground shrink-0">
                          <span>{catItems.length}</span>
                          <span>{lang === "ro" ? "documente" : "documents"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 pl-0 md:pl-3 border-l-0 md:border-l-2 border-brand/30">
                      {subSectionsToDisplay.map((sub) => {
                        const subItems = catItems.filter((i) => i.subCatId === sub.id);
                        const isExpanded = expandedSubCats[sub.id] ?? true;

                        return (
                          <div
                            key={sub.id}
                            id={sub.id}
                            className="rounded-sm border border-border bg-card shadow-sm overflow-hidden transition-all"
                          >
                            <div
                              onClick={() => toggleSubCat(sub.id)}
                              className="bg-secondary/40 hover:bg-secondary/70 p-4 md:p-5 flex items-center justify-between gap-4 cursor-pointer select-none transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <span className="inline-flex items-center justify-center min-w-[38px] h-7 rounded bg-brand text-primary-foreground font-mono text-xs font-bold">
                                  {sub.code}
                                </span>
                                <div>
                                  <h4 className="font-display text-base md:text-lg text-foreground font-bold leading-snug">
                                    {lang === "ro" ? sub.title_ro : sub.title_en}
                                  </h4>
                                  <p className="text-xs text-muted-foreground mt-0.5">
                                    {lang === "ro" ? sub.description_ro : sub.description_en}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 shrink-0">
                                <span className="px-2.5 py-1 rounded-full bg-secondary border border-border text-xs font-mono font-semibold text-foreground">
                                  {subItems.length} {lang === "ro" ? "doc" : "docs"}
                                </span>
                                {isExpanded ? (
                                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                                ) : (
                                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                )}
                              </div>
                            </div>

                            {isExpanded && (
                              <div className="divide-y divide-border border-t border-border">
                                {subItems.length === 0 ? (
                                  <div className="p-6 text-center text-xs text-muted-foreground bg-card/40">
                                    {lang === "ro"
                                      ? "Documentele aferente acestei etape de inspecție urmează a fi publicate."
                                      : "Documents related to this inspection stage are to be published."}
                                  </div>
                                ) : (
                                  subItems.map((item, idx) => (
                                    <article
                                      key={`${item.no}-${idx}`}
                                      className="p-4 md:p-5 grid gap-3 md:grid-cols-[140px_1fr_auto] items-center group hover:bg-secondary/30 transition-colors"
                                    >
                                      <div>
                                        <span className="inline-block px-2 py-0.5 rounded text-[10px] uppercase tracking-wider bg-brand/10 text-brand font-bold">
                                          {item.type}
                                        </span>
                                        <div className="font-mono text-xs font-bold text-foreground mt-1">
                                          {item.no !== "N/A" && `nr. ${item.no}`}
                                        </div>
                                        <div className="text-[11px] text-muted-foreground mt-0.5">
                                          {item.year && `${lang === "ro" ? "An" : "Year"}: ${item.year}`}
                                        </div>
                                      </div>

                                      <div>
                                        <h5 className="font-display text-sm md:text-base text-foreground font-semibold leading-snug group-hover:text-brand transition-colors">
                                          {lang === "ro" ? item.title_ro : item.title_en}
                                        </h5>
                                      </div>

                                      <div className="flex items-center gap-2 justify-end">
                                        {item.pdfUrl ? (
                                          <a
                                            href={item.pdfUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-border hover:border-brand bg-card hover:bg-accent text-xs font-semibold text-foreground transition-all group-hover:border-brand/40"
                                          >
                                            <FileText className="h-3.5 w-3.5 text-brand" />
                                            <span>PDF</span>
                                            <ExternalLink className="h-3 w-3 text-muted-foreground" />
                                          </a>
                                        ) : item.pageUrl ? (
                                          <a
                                            href={item.pageUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-border hover:border-brand bg-card hover:bg-accent text-xs font-semibold text-foreground transition-all group-hover:border-brand/40"
                                          >
                                            <ExternalLink className="h-3.5 w-3.5 text-brand" />
                                            <span>{lang === "ro" ? "Deschide link" : "Open link"}</span>
                                          </a>
                                        ) : null}
                                      </div>
                                    </article>
                                  ))
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              // DEFAULT HANDLING FOR OTHER CATEGORIES
              return (
                <div
                  key={cat.id}
                  id={cat.id}
                  className="scroll-mt-24 rounded-sm border border-border bg-card shadow-sm overflow-hidden"
                >
                  {/* CATEGORY HEADER BAND */}
                  <div className="bg-gradient-to-r from-secondary/80 via-secondary/40 to-transparent p-5 md:p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-sm bg-brand/10 text-brand mt-0.5">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl md:text-2xl text-brand-deep font-bold tracking-tight">
                          {lang === "ro" ? cat.name_ro : cat.name_en}
                        </h3>
                        <p className="text-xs md:text-sm text-muted-foreground mt-1 max-w-2xl leading-relaxed">
                          {lang === "ro" ? cat.description_ro : cat.description_en}
                        </p>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-secondary border border-border text-xs font-mono font-semibold text-foreground shrink-0">
                      <span>{catItems.length}</span>
                      <span>{lang === "ro" ? "acte în categorie" : "acts in category"}</span>
                    </div>
                  </div>

                  {/* ITEMS TABLE / LIST IN CATEGORY */}
                  <div className="divide-y divide-border">
                    {catItems.map((item, idx) => (
                      <article
                        key={`${item.no}-${idx}`}
                        className="p-5 md:p-6 grid gap-4 md:grid-cols-[160px_1fr_auto] items-center group hover:bg-secondary/30 transition-colors"
                      >
                        <div>
                          <span className="inline-block px-2.5 py-0.5 rounded text-[10px] uppercase tracking-wider bg-brand/10 text-brand font-bold">
                            {item.type}
                          </span>
                          <div className="font-mono text-sm font-bold text-foreground mt-1.5">
                            nr. {item.no}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {lang === "ro" ? "An emitere" : "Year"}: {item.year}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-display text-base md:text-lg text-foreground font-semibold leading-snug group-hover:text-brand transition-colors">
                            {lang === "ro" ? item.title_ro : item.title_en}
                          </h4>
                        </div>

                        <div className="flex items-center gap-3 justify-end">
                          {item.pageUrl && (
                            <Link
                              to={item.pageUrl}
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-sm bg-secondary hover:bg-brand/15 text-xs font-semibold text-brand transition-colors"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              {lang === "ro" ? "Vezi Legea 111" : "View Law 111"}
                            </Link>
                          )}
                          <a
                            href={item.pdfUrl || "#"}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-sm border border-border hover:border-brand bg-card hover:bg-accent text-xs font-semibold text-foreground transition-all group-hover:border-brand/40"
                          >
                            <FileText className="h-3.5 w-3.5 text-brand" />
                            <span>PDF</span>
                            <ExternalLink className="h-3 w-3 text-muted-foreground" />
                          </a>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* BOTTOM HELPER BOX */}
        <div className="mt-12 rounded-sm border border-border/80 bg-secondary/30 p-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-4">
            <CheckCircle2 className="h-8 w-8 text-brand shrink-0" />
            <div>
              <h4 className="font-display text-base font-semibold text-foreground">
                {lang === "ro" ? "Arhiva legislativă completă și reglementări active" : "Full legislative archive and active norms"}
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                {lang === "ro"
                  ? "Toate actele normative publicate în Monitorul Oficial al României sunt verificate și actualizate periodic de direcțiile CNCAN."
                  : "All legal acts published in the Official Gazette of Romania are periodically reviewed and updated by CNCAN directories."}
              </p>
            </div>
          </div>
          <Link
            to="/autorizari"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm bg-brand text-primary-foreground text-xs font-semibold hover:bg-brand-deep transition-colors shrink-0 shadow-sm"
          >
            <span>{lang === "ro" ? "Vezi Ghidul de Autorizare" : "View Licensing Guide"}</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
