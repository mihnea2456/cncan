import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { PageHeader } from "@/components/page-header";
import { ExternalLink, FileQuestion, Calculator, LineChart, ShoppingCart, FileSignature, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/informatii-publice")({
  head: () => ({
    meta: [
      { title: "Informații de interes public — CNCAN" },
      { name: "description", content: "Acces liber la informațiile de interes public ale CNCAN, conform Legii 544/2001: Buget, Achiziții, Bilanțuri." },
    ],
  }),
  component: PublicInfoPage,
});

const infoCategories = [
  {
    icon: FileQuestion,
    titleRo: "Solicitare informații. Legislație",
    titleEn: "Request information. Legislation",
    descRo: "Proceduri și formulare conform Legii 544/2001.",
    descEn: "Procedures and forms according to Law 544/2001.",
    link: "http://www.cncan.ro/informatii-de-interes-public/solicitare-informatii-legislatie/"
  },
  {
    icon: Calculator,
    titleRo: "Buget",
    titleEn: "Budget",
    descRo: "Bugetul anual aprobat și execuția bugetară.",
    descEn: "Approved annual budget and budgetary execution.",
    link: "http://www.cncan.ro/informatii-de-interes-public/buget/"
  },
  {
    icon: LineChart,
    titleRo: "Bilanțuri contabile",
    titleEn: "Balance Sheets",
    descRo: "Situațiile financiare anuale și trimestriale.",
    descEn: "Annual and quarterly financial statements.",
    link: "http://www.cncan.ro/informatii-de-interes-public/bilanturi-contabile/"
  },
  {
    icon: ShoppingCart,
    titleRo: "Achiziții publice",
    titleEn: "Public Procurement",
    descRo: "Programul anual al achizițiilor publice (PAAP) și contracte.",
    descEn: "Annual Public Procurement Program (PAAP) and contracts.",
    link: "http://www.cncan.ro/informatii-de-interes-public/achizitii-publice/"
  },
  {
    icon: FileSignature,
    titleRo: "Formulare",
    titleEn: "Forms",
    descRo: "Formulare tipizate pentru diverse solicitări.",
    descEn: "Standard forms for various requests.",
    link: "http://www.cncan.ro/informatii-de-interes-public/formulare/"
  },
  {
    icon: ShieldAlert,
    titleRo: "Protecția datelor personale",
    titleEn: "Data Protection (GDPR)",
    descRo: "Politici privind prelucrarea datelor cu caracter personal.",
    descEn: "Policies regarding personal data processing.",
    link: "http://www.cncan.ro/informatii-de-interes-public/protectia-datelor-cu-caracter-personal/"
  }
];

function PublicInfoPage() {
  const { t, lang } = useI18n();

  return (
    <>
      <PageHeader 
        eyebrow={lang === "ro" ? "Transparență" : "Transparency"} 
        title={lang === "ro" ? "Informații de interes public" : "Public Interest Information"}
        subtitle={lang === "ro" ? "Acces liber și neîngrădit la informațiile instituției, garantat prin Legea 544/2001." : "Free and unrestricted access to institutional information, guaranteed by Law 544/2001."} 
      />
      
      <section className="container-page py-16">
        <div className="max-w-5xl mx-auto">
          
          <div className="bg-brand-deep/5 border border-brand/20 p-6 rounded-md mb-12">
            <h3 className="font-semibold text-brand-deep mb-2">
              {lang === "ro" ? "Arhiva Documentelor" : "Document Archive"}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {lang === "ro" 
                ? "Pentru a vă oferi acces rapid la un volum masiv de documente istorice (zeci de fișiere de bugete, achiziții și bilanțuri din ultimii 15 ani), link-urile de mai jos vă vor direcționa în siguranță către arhiva serverului oficial CNCAN." 
                : "To provide you with quick access to a massive volume of historical documents, the links below will safely direct you to the CNCAN official server archive."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {infoCategories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <a 
                  key={idx}
                  href={cat.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col p-6 bg-card border border-border rounded-md hover:border-brand hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0">
                    <ExternalLink className="h-5 w-5 text-brand" />
                  </div>
                  
                  <div className="h-12 w-12 rounded-lg bg-secondary/50 flex items-center justify-center mb-6 group-hover:bg-brand/10 group-hover:scale-110 transition-all">
                    <Icon className="h-6 w-6 text-brand" strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="font-display text-lg text-foreground mb-2 group-hover:text-brand transition-colors">
                    {lang === "ro" ? cat.titleRo : cat.titleEn}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mt-auto leading-relaxed">
                    {lang === "ro" ? cat.descRo : cat.descEn}
                  </p>
                </a>
              );
            })}
          </div>
          
        </div>
      </section>
    </>
  );
}
