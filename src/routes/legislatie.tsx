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
          "Registrul legislativ CNCAN structurat pe 8 categorii: Legi, Norme, Ghiduri, Inspecție și Supraveghere, Autorizare Personal Instalații Nucleare, Regulament taxe și tarife, Legislație comunitară, Tratate și convenții.",
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
    description_ro: "Norme de securitate radiologică (NSR) și securitate nucleară (NSN) obligatorii pentru toate instalațiile.",
    description_en: "Radiological Safety Norms (NSR) and Nuclear Safety Norms (NSN) mandatory for all facilities.",
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

export interface LegItem {
  no: string;
  type: string;
  title_ro: string;
  title_en: string;
  year: number;
  catId: string;
  pdfUrl?: string;
  pageUrl?: string;
  featured?: boolean;
}

export const LEGISLATION_ITEMS: LegItem[] = [
  // 1. LEGI & HOTĂRÂRI ALE GUVERNULUI (Arhiva completă E:\documente cncan\Legislatie\legi)
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

  // 2. NORME
  {
    no: "356/2005 (NSR-01)",
    type: "Ordin / Normă",
    title_ro: "Norme fundamentale de securitate radiologică (NSR-01) privind limitele de doză și controlul expunerii",
    title_en: "Fundamental Radiological Safety Norms (NSR-01) regarding dose limits and exposure control",
    year: 2005,
    catId: "norme",
  },
  {
    no: "222/2020 (NSN-01)",
    type: "Ordin / Normă",
    title_ro: "Norme de securitate nucleară pentru amplasarea, proiectarea și exploatarea centralelor nuclearoelectrice (NSN-01)",
    title_en: "Nuclear Safety Norms for the siting, design, and operation of nuclear power plants (NSN-01)",
    year: 2020,
    catId: "norme",
  },
  {
    no: "357/2005 (NSR-04)",
    type: "Ordin / Normă",
    title_ro: "Norme de securitate radiologică pentru transportul în siguranță al materialelor radioactive (NSR-04)",
    title_en: "Radiological Safety Norms for the safe transport of radioactive materials (NSR-04)",
    year: 2005,
    catId: "norme",
  },
  {
    no: "48/2018",
    type: "Ordin / Normă",
    title_ro: "Norme privind Planul Național de Acțiune pentru prevenirea și controlul riscului de expunere la radon",
    title_en: "Norms regarding the National Action Plan for preventing and controlling radon exposure risk",
    year: 2018,
    catId: "norme",
  },
  {
    no: "14/2000 (NSR-03)",
    type: "Ordin / Normă",
    title_ro: "Norme de securitate radiologică în practicile de radioterapie, medicină nucleară și radiodiagnostic (NSR-03)",
    title_en: "Radiological Safety Norms in radiotherapy, nuclear medicine, and radiodiagnostic practices (NSR-03)",
    year: 2000,
    catId: "norme",
  },

  // 3. GHIDURI
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

  // 4. INSPECȚIE ȘI SUPRAVEGHERE
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

  // 5. AUTORIZARE PERSONAL INSTALAȚII NUCLEARE
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

  // 6. REGULAMENT TAXE ȘI TARIFE
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

  // 7. LEGISLAȚIE COMUNITARĂ
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

  // 8. TRATATE, ACORDURI, CONVENȚII
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

  const filteredItems = LEGISLATION_ITEMS.filter((item) => {
    const q = query.toLowerCase().trim();
    const matchQuery =
      !q ||
      item.no.toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q) ||
      item.title_ro.toLowerCase().includes(q) ||
      item.title_en.toLowerCase().includes(q);

    const matchCategory = selectedCat === "all" || item.catId === selectedCat;

    return matchQuery && matchCategory;
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
              onClick={() => setSelectedCat("all")}
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
                  onClick={() => setSelectedCat(cat.id)}
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
