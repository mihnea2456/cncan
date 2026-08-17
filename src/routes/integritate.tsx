import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { PageHeader } from "@/components/page-header";
import { Download, FileText, ShieldCheck, Scale, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/integritate")({
  head: () => ({
    meta: [
      { title: "Integritate Instituțională — CNCAN" },
      { name: "description", content: "Secțiunea de integritate instituțională a CNCAN. Cod de conduită, SNA și liste de bunuri." },
    ],
  }),
  component: IntegrityPage,
});

const freeGoodsReports = [
  { year: "2025", file: "Lista-centralizatoare-2025.pdf" },
  { year: "2024", file: "Lista-centralizatoare-2024.pdf" },
  { year: "2023", file: "Lista-centralizatoare-2023.pdf" },
  { year: "2022", file: "Lista-centralizatoare-2022.pdf" },
];

const snaDocuments = [
  {
    titleRo: "Codul de etică și conduită profesională",
    titleEn: "Code of Ethics and Professional Conduct",
    subtitleRo: "Aprobat prin Ordinul președintelui CNCAN nr. 210/2021",
    subtitleEn: "Approved by CNCAN President Order no. 210/2021",
    file: "/documents/integritate/Cod-etica-210-2021.pdf",
    isExternal: false
  },
  {
    titleRo: "Declarație privind asumarea agendei de integritate organizațională",
    titleEn: "Declaration on assuming the organizational integrity agenda",
    subtitleRo: "În coordonatele strategiei naționale anticorupție 2021-2025",
    subtitleEn: "In the coordinates of the national anti-corruption strategy 2021-2025",
    file: "/documents/integritate/Declaratie-asumare-SNA-2021-2025.pdf",
    isExternal: false
  },
  {
    titleRo: "Plan de integritate CNCAN 2025",
    titleEn: "CNCAN Integrity Plan 2025",
    subtitleRo: "SNA 2021-2025 (Aprobat prin Ordinul nr. 18/13.02.2025)",
    subtitleEn: "SNA 2021-2025 (Approved by Order no. 18/13.02.2025)",
    file: "/documents/integritate/Plan-integritate-2025.pdf",
    isExternal: false
  },
  {
    titleRo: "Plan de integritate CNCAN 2022",
    titleEn: "CNCAN Integrity Plan 2022",
    subtitleRo: "SNA 2021-2025",
    subtitleEn: "SNA 2021-2025",
    file: "https://www.cncan.ro/",
    isExternal: true
  }
];

function IntegrityPage() {
  const { t, lang } = useI18n();

  return (
    <>
      <PageHeader 
        eyebrow={lang === "ro" ? "Transparență" : "Transparency"} 
        title={lang === "ro" ? "Integritate Instituțională" : "Institutional Integrity"}
        subtitle={lang === "ro" ? "Aderarea la cele mai înalte standarde de etică profesională și transparență publică." : "Adherence to the highest standards of professional ethics and public transparency."} 
      />
      
      <section className="container-page py-16">
        <div className="max-w-4xl mx-auto space-y-20">
          
          {/* SNA Section */}
          <div>
            <div className="flex items-center gap-4 mb-8 pb-4 border-b border-border">
              <Scale className="h-8 w-8 text-brand" />
              <h2 className="font-display text-2xl text-brand-deep">
                {lang === "ro" ? "Strategia Națională Anticorupție (SNA) și Codul de Etică" : "National Anti-Corruption Strategy (SNA) and Code of Ethics"}
              </h2>
            </div>
            
            <p className="text-muted-foreground mb-8 text-lg">
              {lang === "ro" 
                ? "CNCAN își asumă cu fermitate obiectivele de integritate organizațională. Mai jos puteți consulta documentele cadru și planurile de integritate aferente strategiei naționale." 
                : "CNCAN firmly assumes the objectives of organizational integrity. Below you can consult the framework documents and integrity plans related to the national strategy."}
            </p>

            <div className="grid gap-4">
              {snaDocuments.map((doc, i) => (
                <a 
                  key={i}
                  href={doc.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-md border border-border bg-card hover:border-brand hover:shadow-md transition-all duration-300 gap-4"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative flex items-start sm:items-center gap-4 z-10">
                    <div className="h-10 w-10 shrink-0 rounded-full bg-brand/10 flex items-center justify-center group-hover:bg-brand/20 transition-colors">
                      <Scale className="h-5 w-5 text-brand" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-lg">{lang === "ro" ? doc.titleRo : doc.titleEn}</div>
                      <div className="text-sm text-muted-foreground mt-1">{lang === "ro" ? doc.subtitleRo : doc.subtitleEn}</div>
                    </div>
                  </div>
                  
                  <div className="relative z-10 shrink-0 flex items-center justify-end">
                    {doc.isExternal ? (
                      <span className="flex items-center gap-2 text-xs font-medium text-muted-foreground group-hover:text-brand transition-colors bg-muted px-3 py-1.5 rounded-full">
                        <ExternalLink className="h-3.5 w-3.5" />
                        {lang === "ro" ? "Website vechi" : "Old website"}
                      </span>
                    ) : (
                      <Download className="h-5 w-5 text-muted-foreground group-hover:text-brand transition-colors" />
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Free Goods Section */}
          <div>
            <div className="flex items-center gap-4 mb-8 pb-4 border-b border-border">
              <ShieldCheck className="h-8 w-8 text-brand" />
              <h2 className="font-display text-2xl text-brand-deep">
                {lang === "ro" ? "Bunuri primite cu titlu gratuit" : "Goods received free of charge"}
              </h2>
            </div>
            
            <p className="text-muted-foreground mb-8 text-lg">
              {lang === "ro" 
                ? "În conformitate cu prevederile legale privind integritatea în exercitarea funcțiilor publice, CNCAN publică anual lista centralizatoare a bunurilor primite cu titlu gratuit prilejuite de acțiuni de protocol în exercitarea mandatului sau a funcției." 
                : "In accordance with legal provisions regarding integrity in the exercise of public functions, CNCAN publishes annually the centralized list of goods received free of charge during protocol actions in the exercise of the mandate or function."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {freeGoodsReports.map((report) => (
                <a 
                  key={report.year}
                  href={`/documents/integritate/${report.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden flex items-center justify-between p-5 rounded-md border border-border bg-card hover:border-brand hover:shadow-md transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative flex items-center gap-4 z-10">
                    <div className="h-10 w-10 rounded-full bg-brand/10 flex items-center justify-center group-hover:bg-brand/20 transition-colors">
                      <FileText className="h-5 w-5 text-brand" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{lang === "ro" ? "Lista Centralizatoare" : "Centralized List"}</div>
                      <div className="text-sm text-muted-foreground">{lang === "ro" ? `Anul ${report.year}` : `Year ${report.year}`}</div>
                    </div>
                  </div>
                  
                  <Download className="relative z-10 h-5 w-5 text-muted-foreground group-hover:text-brand transition-colors" />
                </a>
              ))}
            </div>
          </div>
          
        </div>
      </section>
    </>
  );
}
