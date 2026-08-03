import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
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
    description_ro: "Norme de securitate radiologică (NSR) și securitate nucleară (NSN) structurate în 19 subsecțiuni specializate.",
    description_en: "Radiological Safety Norms (NSR) and Nuclear Safety Norms (NSN) structured into 19 specialized subsections.",
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
    no: "222/2020 (NSN-01)",
    type: "Normă NSN",
    title_ro: "Norme de securitate nucleară pentru amplasarea, proiectarea și exploatarea centralelor nuclearoelectrice (NSN-01)",
    title_en: "Nuclear Safety Norms for the siting, design, and operation of nuclear power plants (NSN-01)",
    year: 2020,
    catId: "norme",
    subCatId: "norme-nucleara",
  },
  {
    no: "223/2020 (NSN-02)",
    type: "Normă NSN",
    title_ro: "Norme de securitate nucleară privind protecția împotriva incendiilor la instalațiile nucleare (NSN-02)",
    title_en: "Nuclear Safety Norms regarding fire protection at nuclear facilities (NSN-02)",
    year: 2020,
    catId: "norme",
    subCatId: "norme-nucleara",
  },
  // 2.3 Norme comune interdepartamentale în domeniul nuclear
  {
    no: "Ordin comun 64/2003",
    type: "Ordin comun",
    title_ro: "Norme privind procedurile comune interdepartamentale de control și supraveghere pe platformele nucleare (CNCAN-MS-MAI)",
    title_en: "Norms on interdepartmental common inspection and surveillance procedures at nuclear sites (CNCAN-MS-MAI)",
    year: 2003,
    catId: "norme",
    subCatId: "norme-interdepartamentale",
  },
  // 2.4 Norme de garanții nucleare
  {
    no: "367/2005 (NGN-01)",
    type: "Normă Garanții",
    title_ro: "Norme de garanții nucleare privind controlul, evidența și raportarea materialelor nucleare în România (NGN-01)",
    title_en: "Nuclear Safeguards Norms on accounting, control, and reporting of nuclear materials in Romania (NGN-01)",
    year: 2005,
    catId: "norme",
    subCatId: "norme-garantii",
  },
  // 2.5 Norme de protecție fizică în domeniul nuclear
  {
    no: "382/2004 (NPF-01)",
    type: "Normă Protecție Fizică",
    title_ro: "Norme fundamentale privind protecția fizică a materialelor și instalațiilor nucleare împotriva intruziunilor și sabotajului (NPF-01)",
    title_en: "Fundamental Norms on physical protection of nuclear materials and facilities against intrusion and sabotage (NPF-01)",
    year: 2004,
    catId: "norme",
    subCatId: "norme-protectie-fizica",
  },
  // 2.6 Norme de minerit radioactiv
  {
    no: "192/2002 (NMR-01)",
    type: "Normă Minerit",
    title_ro: "Norme de securitate radiologică pentru activitățile de explorare, exploatare și preparare a minereurilor de uraniu și toriu (NMR-01)",
    title_en: "Radiological Safety Norms for uranium and thorium ore exploration, mining, and milling activities (NMR-01)",
    year: 2002,
    catId: "norme",
    subCatId: "norme-minerit",
  },
  // 2.7 Norme de transport materiale radioactive
  {
    no: "357/2005 (NSR-04)",
    type: "Normă Transport",
    title_ro: "Norme de securitate radiologică pentru transportul în siguranță al materialelor radioactive (NSR-04)",
    title_en: "Radiological Safety Norms for the safe transport of radioactive materials (NSR-04)",
    year: 2005,
    catId: "norme",
    subCatId: "norme-transport",
  },
  // 2.8 Norme privind managementul deșeurilor radioactive
  {
    no: "56/2004 (NDR-01)",
    type: "Normă Deșeuri",
    title_ro: "Norme fundamentale privind gestionarea în siguranță a deșeurilor radioactive și a combustibilului nuclear uzat (NDR-01)",
    title_en: "Fundamental Norms on safe management of radioactive waste and spent nuclear fuel (NDR-01)",
    year: 2004,
    catId: "norme",
    subCatId: "norme-deseuri",
  },
  // 2.9 Norme de managementul calității în domeniul nuclear
  {
    no: "176/2000 (NMC-01)",
    type: "Normă Calitate SMC",
    title_ro: "Norme generale de managementul calității în domeniul nuclear - cerințe pentru sisteme de management integrat (NMC-01)",
    title_en: "General Quality Management Norms in the nuclear sector - requirements for integrated management systems (NMC-01)",
    year: 2000,
    catId: "norme",
    subCatId: "norme-calitate",
  },
  // 2.10 Norme privind managementul urgențelor radiologice
  {
    no: "242/2002 (NUR-01)",
    type: "Normă Urgențe",
    title_ro: "Norme privind planificarea, pregătirea și intervenția în caz de urgență nucleară sau radiologică (NUR-01)",
    title_en: "Norms on planning, preparedness, and response in case of nuclear or radiological emergency (NUR-01)",
    year: 2002,
    catId: "norme",
    subCatId: "norme-urgente",
  },
  // 2.11 Norme privind sursele naturale de radiații
  {
    no: "48/2018 (Radon & NORM)",
    type: "Normă Surse Naturale",
    title_ro: "Norme privind Planul Național de Acțiune pentru controlul expunerii la radon și surse naturale de radiații NORM",
    title_en: "Norms regarding the National Action Plan for radon control and NORM natural radiation sources",
    year: 2018,
    catId: "norme",
    subCatId: "norme-surse-naturale",
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
    no: "274/2004 (NCN-01)",
    type: "Normă Construcții",
    title_ro: "Norme de securitate nucleară pentru proiectarea, seismicitatea și execuția construcțiilor nucleare și civile speciale (NCN-01)",
    title_en: "Nuclear Safety Norms for design, seismicity, and execution of nuclear and special civil constructions (NCN-01)",
    year: 2004,
    catId: "norme",
    subCatId: "norme-constructii",
  },
  // 2.14 Norme de securitate cibernetică în domeniul nuclear
  {
    no: "115/2021 (NSC-01)",
    type: "Normă Securitate Cibernetică",
    title_ro: "Norme privind securitatea cibernetică și protecția digitală a instalațiilor, sistemelor SCADA și obiectivelor nucleare (NSC-01)",
    title_en: "Norms on cybersecurity and digital protection of facilities, SCADA systems, and nuclear objectives (NSC-01)",
    year: 2021,
    catId: "norme",
    subCatId: "norme-cibernetica",
  },
  // 2.15 Ordinul nr. 96/2013 privind modificarea și completarea Normelor de dozimetrie individuală
  {
    no: "Ordinul 96/2013",
    type: "Ordin CNCAN",
    title_ro: "Ordinul nr. 96/2013 privind modificarea și completarea Normelor de dozimetrie individuală și monitorizare a personalului",
    title_en: "Order no. 96/2013 amending and supplementing Individual Dosimetry and Personnel Monitoring Norms",
    year: 2013,
    catId: "norme",
    subCatId: "ordin-96-2013",
  },
  // 2.16 Ordinul nr. 1/2015 din 06 ianuarie 2015
  {
    no: "Ordinul 1/2015",
    type: "Ordin CNCAN",
    title_ro: "Ordinul Președintelui CNCAN nr. 1/2015 din 06 ianuarie 2015 privind modificări de reglementare tehnică",
    title_en: "CNCAN President Order no. 1/2015 of January 6, 2015 regarding technical regulatory amendments",
    year: 2015,
    catId: "norme",
    subCatId: "ordin-1-2015",
  },
  // 2.17 Ordinul nr. 155/2017 ELI-NP
  {
    no: "Ordinul 155/2017",
    type: "Ordin / ELI-NP",
    title_ro: "Ordinul nr. 155/2017 pentru aprobarea Procedurii privind cerințele de autorizare pentru instalația de cercetare Infrastructura Luminii Extreme - Fizică nucleară (ELI-NP)",
    title_en: "Order no. 155/2017 approving the Licensing Procedure for Extreme Light Infrastructure - Nuclear Physics (ELI-NP)",
    year: 2017,
    catId: "norme",
    subCatId: "ordin-155-2017-eli-np",
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
  },
  // 2.19 Ordinul nr. 14/2018
  {
    no: "Ordinul 14/2018",
    type: "Ordin / Avize",
    title_ro: "Ordinul nr. 14/2018 pentru aprobarea Procedurii privind cerințele de eliberare a avizelor pentru programele de pregătire în protecția radiologică",
    title_en: "Order no. 14/2018 approving the Procedure for issuing approvals for radiation protection training programs",
    year: 2018,
    catId: "norme",
    subCatId: "ordin-14-2018",
  },

  // =========================================================================
  // 3. GHIDURI
  // =========================================================================
  {
    no: "GSN-01",
    type: "Ghid Tehnic",
    title_ro: "Ghid privind evaluarea de securitate nucleară pentru elaborarea Rapoartelor de Securitate Preliminară și Finală",
    title_en: "Guideline on nuclear safety assessment for drafting Preliminary and Final Safety Reports",
    year: 2021,
    catId: "ghiduri",
  },
  {
    no: "GAU-02",
    type: "Ghid Autorizare",
    title_ro: "Ghidul solicitantului de autorizație pentru practicile cu surse de radiații ionizante în aplicații industriale",
    title_en: "Applicant Guideline for licensing practices with ionizing radiation sources in industrial applications",
    year: 2019,
    catId: "ghiduri",
  },
  {
    no: "GM-03",
    type: "Ghid Medical",
    title_ro: "Ghid tehnic de radioprotecție, dozimetrie și control de calitate pentru instalațiile radiologice medicale",
    title_en: "Technical guideline on radiation protection, dosimetry, and quality assurance for medical radiological equipment",
    year: 2022,
    catId: "ghiduri",
  },
  {
    no: "G-RADON",
    type: "Ghid Practic",
    title_ro: "Ghid de măsurare și remediere a concentrațiilor de radon în clădiri publice, școli și spații rezidențiale",
    title_en: "Guideline for measuring and remediating radon concentrations in public buildings, schools, and homes",
    year: 2020,
    catId: "ghiduri",
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
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [selectedSubCat, setSelectedSubCat] = useState<string>("all-sub");
  const [expandedSubCats, setExpandedSubCats] = useState<Record<string, boolean>>(() => {
    // Implicit toate cele 19 subsecțiuni din Norme sunt deschise
    const initial: Record<string, boolean> = {};
    NORME_SUBSECTIONS.forEach((s) => {
      initial[s.id] = true;
    });
    return initial;
  });

  const toggleSubCat = (id: string) => {
    setExpandedSubCats((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredItems = LEGISLATION_ITEMS.filter((item) => {
    const q = query.toLowerCase().trim();
    const matchQuery =
      !q ||
      item.no.toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q) ||
      item.title_ro.toLowerCase().includes(q) ||
      item.title_en.toLowerCase().includes(q);

    const matchCategory = selectedCat === "all" || item.catId === selectedCat;

    const matchSubCategory =
      selectedCat !== "norme" ||
      selectedSubCat === "all-sub" ||
      item.subCatId === selectedSubCat;

    return matchQuery && matchCategory && matchSubCategory;
  });

  const featuredItem = LEGISLATION_ITEMS.find((i) => i.featured);

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
                ? `Toate Categoriile (${LEGISLATION_ITEMS.length} acte)`
                : `All Categories (${LEGISLATION_ITEMS.length} acts)`}
            </button>

            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const count = LEGISLATION_ITEMS.filter((i) => i.catId === cat.id).length;
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
                  {lang === "ro" ? "Arhitectura celor 19 Subsecțiuni de Norme CNCAN" : "Architecture of the 19 CNCAN Norms Subsections"}
                </div>
                <h3 className="font-display text-lg md:text-xl text-foreground font-semibold">
                  {lang === "ro"
                    ? "2. Norme de Securitate — Structurate pe 19 Domenii și Ordine de Reglementare"
                    : "2. Safety Norms — Structured across 19 Regulatory Domains and Orders"}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5 max-w-2xl">
                  {lang === "ro"
                    ? "Selectați din cele 19 subsecțiuni solicitate pentru a filtra direct normele de securitate radiologică, nucleară, fizică, garanții sau ordine specifice (ELI-NP, Ordinul 1/2015, Ordinul 96/2013 etc.)."
                    : "Select from the 19 requested subsections to filter directly by radiation, nuclear, physical safety norms, safeguards, or specific orders (ELI-NP, Order 1/2015, Order 96/2013, etc.)."}
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
                    {lang === "ro" ? "Extinde toate 19" : "Expand all 19"}
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
                  {lang === "ro" ? "Toate 19 Subsecțiunile" : "All 19 Subsections"}
                </button>

                {NORME_SUBSECTIONS.map((sub) => {
                  const subCount = LEGISLATION_ITEMS.filter((i) => i.subCatId === sub.id).length;
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
                          <span>{lang === "ro" ? "norme în 19 subsecțiuni" : "norms across 19 subsections"}</span>
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
