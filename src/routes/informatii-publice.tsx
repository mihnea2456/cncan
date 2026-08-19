import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { PageHeader } from "@/components/page-header";
import { Calculator, LineChart, ShoppingCart, FileSignature, Users, FileText, ChevronRight, Download, Archive } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";

const searchSchema = z.object({
  cat: z.string().optional().catch("buget"),
});

export const Route = createFileRoute("/informatii-publice")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Informații de interes public — CNCAN" },
      { name: "description", content: "Acces liber la informațiile de interes public ale CNCAN." },
    ],
  }),
  component: PublicInfoPage,
});

const categories = [
  { id: "buget", icon: Calculator, ro: "Buget", en: "Budget" },
  { id: "achizitii", icon: ShoppingCart, ro: "Achiziții Publice", en: "Public Procurement" },
  { id: "bilanturi", icon: LineChart, ro: "Bilanțuri Contabile", en: "Accounting Balances" },
  { id: "declaratii", icon: Users, ro: "Declarații de Avere", en: "Wealth Declarations" },
  { id: "formulare", icon: FileSignature, ro: "Formulare Tip", en: "Standard Forms" },
];

function FileRow({ title, lang, url = "#" }: { title: string, lang: string, url?: string }) {
  return (
    <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-sm border border-border/50 hover:border-brand/30 transition-colors">
      <div className="flex items-center gap-3">
        <FileText className="h-5 w-5 text-brand" />
        <span className="font-medium text-sm text-foreground/90">{title}</span>
      </div>
      <Button asChild size="sm" variant="ghost" className="text-xs text-brand hover:bg-brand hover:text-white">
        <a href={url} target="_blank" rel="noreferrer" download>
          <Download className="h-3.5 w-3.5 mr-1.5" />
          {lang === "ro" ? "Descarcă PDF" : "Download PDF"}
        </a>
      </Button>
    </div>
  );
}

function CompactFileRow({ title, url = "#" }: { title: string, url?: string }) {
  return (
    <a href={url} target="_blank" rel="noreferrer" download className="group flex items-center justify-between p-3 bg-secondary/20 rounded-sm border border-border/50 hover:border-brand/40 hover:bg-brand/5 transition-all">
      <div className="flex items-center gap-2.5 overflow-hidden">
        <FileText className="h-4 w-4 text-brand shrink-0" />
        <span className="font-medium text-[13px] text-foreground/80 group-hover:text-brand-deep truncate">{title}</span>
      </div>
      <Download className="h-3.5 w-3.5 text-muted-foreground group-hover:text-brand shrink-0 ml-2" />
    </a>
  );
}

function BugetContent({ lang }: { lang: string }) {
  const executie2026 = [
    { title: "31 Ianuarie 2026", url: "/documents/buget/executie_bugetara/Executie-la-data-de-31anuarie-2026.pdf" },
    { title: "28 Februarie 2026", url: "/documents/buget/executie_bugetara/Executia-bugetara-la-data-de-28-februarie-2026.pdf" },
    { title: "31 Martie 2026", url: "/documents/buget/executie_bugetara/Executia-bugetara-la-data-de-31-martie-2026.pdf" },
    { title: "30 Aprilie 2026", url: "/documents/buget/executie_bugetara/Executia-bugetara-la-data-de-30-aprilie-2026.pdf" },
    { title: "31 Mai 2026", url: "/documents/buget/executie_bugetara/Executia-bugetara-la-data-de-31-mai-2026.pdf" },
    { title: "30 Iunie 2026", url: "/documents/buget/executie_bugetara/Executia-bugetara-la-data-de-30-iunie-2026.pdf" },
    { title: "31 Iulie 2026", url: "/documents/buget/executie_bugetara/Executia-bugetara-la-data-de-31-iulie-2026.pdf" },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <h2 className="font-display text-3xl text-brand-deep mb-6">{lang === "ro" ? "Buget" : "Budget"}</h2>
      <p className="text-muted-foreground mb-8">
        {lang === "ro" 
          ? "În această secțiune sunt prezentate documentele referitoare la execuția bugetară, bugetul defalcat pe surse financiare și veniturile salariale." 
          : "This section presents documents regarding budgetary execution, budget broken down by financial sources, and salary incomes."}
      </p>
      
      <div className="space-y-10">
        {/* Sub-sectiune: Buget pe surse financiare */}
        <div>
          <h3 className="text-lg font-semibold text-brand-deep mb-4 border-b border-border pb-2">
            {lang === "ro" ? "Buget pe surse financiare" : "Budget by financial sources"}
          </h3>
          <div className="space-y-3">
            <FileRow title={lang === "ro" ? "Buget de venituri și cheltuieli (2026)" : "Income and Expenditure Budget (2026)"} lang={lang} url="/documents/buget/Buget_2026.pdf" />
            <FileRow title={lang === "ro" ? "Buget de venituri și cheltuieli (2025)" : "Income and Expenditure Budget (2025)"} lang={lang} url="/documents/buget/Buget_2025.pdf" />
            <FileRow title={lang === "ro" ? "Buget de venituri și cheltuieli (Ordin 10)" : "Income and Expenditure Budget (Order 10)"} lang={lang} url="/documents/buget/Buget_Ordin10.pdf" />
          </div>
        </div>

        {/* Sub-sectiune: Executie bugetara */}
        <div>
          <h3 className="text-lg font-semibold text-brand-deep mb-4 border-b border-border pb-2">
            {lang === "ro" ? "Execuție bugetară" : "Budgetary execution"}
          </h3>
          <div className="bg-secondary/10 border border-border/50 rounded-md p-4">
            <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
              {lang === "ro" ? "Anul 2026" : "Year 2026"}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2.5">
              {executie2026.map((doc, idx) => (
                <CompactFileRow key={idx} title={doc.title} url={doc.url} />
              ))}
            </div>
          </div>
        </div>

        {/* Sub-sectiune: Venituri salariale */}
        <div>
          <h3 className="text-lg font-semibold text-brand-deep mb-4 border-b border-border pb-2">
            {lang === "ro" ? "Venituri salariale" : "Salary incomes"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2.5">
            <CompactFileRow 
              title={lang === "ro" ? "Venituri brute (31 Martie 2026)" : "Gross incomes (March 31, 2026)"} 
              url="/documents/buget/venituri_salariale/Venituri-brute-31-martie-2026.pdf" 
            />
            <CompactFileRow 
              title={lang === "ro" ? "Venituri brute (30 Septembrie 2025)" : "Gross incomes (September 30, 2025)"} 
              url="/documents/buget/venituri_salariale/Venituri-brute-30-septembrie-2025.pdf" 
            />
            <CompactFileRow 
              title={lang === "ro" ? "Venituri brute (31 Martie 2025)" : "Gross incomes (March 31, 2025)"} 
              url="/documents/buget/venituri_salariale/Venituri-brute-31-martie-2025.pdf" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function AchizitiiContent({ lang }: { lang: string }) {
  const paap2026 = [
    { title: "PAAP 2026 (Revizia III)", url: "/documents/achizitii_publice/PAAP-III-2026.pdf" },
    { title: "PAAP 2026 (Revizia II)", url: "/documents/achizitii_publice/PAAP-II-2026.pdf" },
    { title: "PAAP 2026 (Revizia I)", url: "/documents/achizitii_publice/PAAP-I-2026.pdf" },
  ];

  const paap2025 = [
    { title: "PAAP 2025 (Revizia V)", url: "/documents/achizitii_publice/PAAP-V-2025.pdf" },
    { title: "PAAP 2025 (Revizia IV)", url: "/documents/achizitii_publice/PAAP-IV-2025.pdf" },
    { title: "PAAP 2025 (Revizia III)", url: "/documents/achizitii_publice/Programul-Anual-al-Achizitiilor-publice-2025-III.pdf" },
    { title: "PAAP 2025 (Revizia II)", url: "/documents/achizitii_publice/PAAP-II-2025.pdf" },
    { title: "PAAP 2025 (Revizia I)", url: "/documents/achizitii_publice/Plan-Achizitii-Publice-I-2025.pdf" },
  ];

  const paap2024 = [
    { title: "PAAP 2024 (Revizia IV)", url: "/documents/achizitii_publice/paap-4-2024.pdf" },
    { title: "PAAP 2024 (Revizia III)", url: "/documents/achizitii_publice/PAAP-3-24.pdf" },
    { title: "PAAP 2024 (Revizia II)", url: "/documents/achizitii_publice/PAAP.2-final-2024.pdf" },
    { title: "PAAP 2024 (Revizia I)", url: "/documents/achizitii_publice/paap-1-2024.pdf" },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-3xl text-brand-deep">{lang === "ro" ? "Achiziții Publice" : "Public Procurement"}</h2>
        <Button variant="outline" size="sm" className="gap-2">
          <Archive className="h-4 w-4" />
          {lang === "ro" ? "Arhivă anii precedenți" : "Previous years archive"}
        </Button>
      </div>
      <p className="text-muted-foreground mb-8">
        {lang === "ro" 
          ? "Programul Anual al Achizițiilor Publice (PAAP) structurat pe ani și revizii." 
          : "Annual Public Procurement Program (PAAP) structured by year and revisions."}
      </p>
      
      <div className="space-y-8">
        <div className="bg-secondary/10 border border-border/50 rounded-md p-4">
          <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
            {lang === "ro" ? "Anul 2026" : "Year 2026"}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2.5">
            {paap2026.map((doc, idx) => (
              <CompactFileRow key={idx} title={doc.title} url={doc.url} />
            ))}
          </div>
        </div>

        <div className="bg-secondary/10 border border-border/50 rounded-md p-4">
          <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
            {lang === "ro" ? "Anul 2025" : "Year 2025"}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2.5">
            {paap2025.map((doc, idx) => (
              <CompactFileRow key={idx} title={doc.title} url={doc.url} />
            ))}
          </div>
        </div>

        <div className="bg-secondary/10 border border-border/50 rounded-md p-4">
          <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
            {lang === "ro" ? "Anul 2024" : "Year 2024"}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2.5">
            {paap2024.map((doc, idx) => (
              <CompactFileRow key={idx} title={doc.title} url={doc.url} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BilanturiContent({ lang }: { lang: string }) {
  const bilanturi2025 = [
    { title: "31 Decembrie 2025", url: "/documents/bilanturi_contabile/Bilant-decembrie-2025.pdf" },
    { title: "30 Septembrie 2025", url: "/documents/bilanturi_contabile/Bilant-septembrie-2025.pdf" },
    { title: "30 Iunie 2025", url: "/documents/bilanturi_contabile/Bilant-iunie-2025.pdf" },
    { title: "31 Martie 2025", url: "/documents/bilanturi_contabile/Bilant-la-data-de-31-martie-2025.pdf" },
  ];

  const bilanturi2024 = [
    { title: "31 Decembrie 2024", url: "/documents/bilanturi_contabile/Bilant-la-data-de-31-decembrie-2024.pdf" },
    { title: "30 Septembrie 2024", url: "/documents/bilanturi_contabile/Bilant-la-data-de-30-septembrie-2024.pdf" },
    { title: "30 Iunie 2024", url: "/documents/bilanturi_contabile/Bilant-la-data-de-30-iunie-2024.pdf" },
    { title: "31 Martie 2024", url: "/documents/bilanturi_contabile/Bilant-la-31-martie-2024.pdf" },
  ];

  const bilanturi2023 = [
    { title: "31 Decembrie 2023", url: "/documents/bilanturi_contabile/Bilant-la-data-de-31-decembrie-2023.pdf" },
    { title: "30 Septembrie 2023", url: "/documents/bilanturi_contabile/Bilant30septembrie2023.pdf" },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <h2 className="font-display text-3xl text-brand-deep mb-6">{lang === "ro" ? "Bilanțuri Contabile" : "Accounting Balances"}</h2>
      <p className="text-muted-foreground mb-8">
        {lang === "ro" 
          ? "Situațiile financiare trimestriale și anuale ale instituției." 
          : "Quarterly and annual financial statements of the institution."}
      </p>
      
      <div className="space-y-8">
        <div className="bg-secondary/10 border border-border/50 rounded-md p-4">
          <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
            {lang === "ro" ? "Anul 2025" : "Year 2025"}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2.5">
            {bilanturi2025.map((doc, idx) => (
              <CompactFileRow key={idx} title={`${lang === "ro" ? "Bilanț la" : "Balance as of"} ${doc.title}`} url={doc.url} />
            ))}
          </div>
        </div>

        <div className="bg-secondary/10 border border-border/50 rounded-md p-4">
          <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
            {lang === "ro" ? "Anul 2024" : "Year 2024"}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2.5">
            {bilanturi2024.map((doc, idx) => (
              <CompactFileRow key={idx} title={`${lang === "ro" ? "Bilanț la" : "Balance as of"} ${doc.title}`} url={doc.url} />
            ))}
          </div>
        </div>

        <div className="bg-secondary/10 border border-border/50 rounded-md p-4">
          <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
            {lang === "ro" ? "Anul 2023" : "Year 2023"}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2.5">
            {bilanturi2023.map((doc, idx) => (
              <CompactFileRow key={idx} title={`${lang === "ro" ? "Bilanț la" : "Balance as of"} ${doc.title}`} url={doc.url} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DeclaratiiContent({ lang }: { lang: string }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <h2 className="font-display text-3xl text-brand-deep mb-6">{lang === "ro" ? "Declarații de Avere și Interese" : "Wealth and Interest Declarations"}</h2>
      <p className="text-muted-foreground mb-8">
        {lang === "ro" 
          ? "Tabelul nominal cu angajații CNCAN și declarațiile aferente vor fi publicate în această secțiune în curând." 
          : "The nominal table of CNCAN employees and their declarations will be published in this section soon."}
      </p>
      <div className="border-2 border-dashed border-border/60 rounded-md p-12 flex flex-col items-center justify-center text-center bg-secondary/10">
        <Users className="h-12 w-12 text-muted-foreground/50 mb-4" />
        <h3 className="font-medium text-lg text-foreground/80">
          {lang === "ro" ? "Secțiune în curs de actualizare" : "Section under update"}
        </h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-sm">
          {lang === "ro" 
            ? "Declarațiile angajaților vor fi încărcate imediat ce datele sunt procesate și verificate." 
            : "Employee declarations will be uploaded as soon as the data is processed and verified."}
        </p>
      </div>
    </div>
  );
}

function FormulareContent({ lang }: { lang: string }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <h2 className="font-display text-3xl text-brand-deep mb-6">{lang === "ro" ? "Formulare Tip" : "Standard Forms"}</h2>
      <p className="text-muted-foreground mb-8">
        {lang === "ro" 
          ? "Modele de documente necesare pentru a formula cereri, petiții și reclamații conform legislației în vigoare." 
          : "Document templates required to formulate requests, petitions, and complaints according to the legislation in force."}
      </p>
      <div className="space-y-3">
        <FileRow 
          title={lang === "ro" ? "Reclamație administrativă 1" : "Administrative complaint 1"} 
          lang={lang} 
          url="/documents/formulare/Reclamatie-administrativa-1.pdf" 
        />
        <FileRow 
          title={lang === "ro" ? "Reclamație administrativă 2" : "Administrative complaint 2"} 
          lang={lang} 
          url="/documents/formulare/Reclamatie-administrativa-2.pdf" 
        />
        <FileRow 
          title={lang === "ro" ? "Formular petiție (Ordonanța 27/2016)" : "Petition form (Ordinance 27/2016)"} 
          lang={lang} 
          url="/documents/formulare/Formular-petitie-Ordonanta-27-din-2016.pdf" 
        />
      </div>
    </div>
  );
}

function PublicInfoPage() {
  const { lang } = useI18n();
  const search = Route.useSearch();
  const activeCat = search.cat || "buget";

  return (
    <>
      <PageHeader 
        eyebrow={lang === "ro" ? "Transparență" : "Transparency"} 
        title={lang === "ro" ? "Informații de interes public" : "Public Interest Information"}
        subtitle={lang === "ro" ? "Acces liber și neîngrădit la informațiile instituției, garantat prin Legea 544/2001." : "Free and unrestricted access to institutional information, guaranteed by Law 544/2001."} 
      />
      
      <section className="container-page py-16 grid lg:grid-cols-[300px_1fr] gap-12 items-start">
        {/* Sidebar */}
        <div className="flex flex-col gap-2 sticky top-28">
          {categories.map((c) => {
            const Icon = c.icon;
            const isActive = activeCat === c.id;
            return (
              <Link
                key={c.id}
                to="/informatii-publice"
                search={{ cat: c.id }}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-sm transition-all ${isActive ? "bg-brand text-white shadow-md font-medium" : "bg-card border border-border hover:border-brand/40 text-foreground/80 hover:text-foreground"}`}
              >
                <Icon className="h-5 w-5" />
                <span>{lang === "ro" ? c.ro : c.en}</span>
                {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
              </Link>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="min-h-[600px] bg-card border border-border p-8 md:p-10 rounded-sm shadow-sm">
          {activeCat === "buget" && <BugetContent lang={lang} />}
          {activeCat === "achizitii" && <AchizitiiContent lang={lang} />}
          {activeCat === "bilanturi" && <BilanturiContent lang={lang} />}
          {activeCat === "declaratii" && <DeclaratiiContent lang={lang} />}
          {activeCat === "formulare" && <FormulareContent lang={lang} />}
        </div>
      </section>
    </>
  );
}
