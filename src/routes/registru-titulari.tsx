import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { PageHeader } from "@/components/page-header";
import { FileText, Building2, Stethoscope, Factory, Wind, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/registru-titulari")({
  head: () => ({
    meta: [
      { title: "Registru Titulari — CNCAN" },
      { name: "description", content: "Registrul Național al Titularilor de Autorizație CNCAN." },
    ],
  }),
  component: RegistruTitulariPage,
});

const registries = [
  {
    id: "medical",
    icon: Stethoscope,
    ro: "Domeniul Medical",
    en: "Medical Sector",
    desc_ro: "Spitale, clinici și centre de imagistică autorizate pentru deținerea și utilizarea surselor de radiații.",
    desc_en: "Hospitals, clinics, and imaging centers authorized to possess and use radiation sources.",
    files: [
      { name_ro: "Registrul Național Medical - Radiodiagnostic", name_en: "National Medical Registry - Radiodiagnostics", path: "/documents/registru_medical_radiodiagnostic.pdf" },
      { name_ro: "Registrul Național Medical - Radioterapie", name_en: "National Medical Registry - Radiotherapy", path: "/documents/registru_medical_radioterapie.pdf" }
    ]
  },
  {
    id: "industrial",
    icon: Factory,
    ro: "Domeniul Industrial & Cercetare",
    en: "Industrial & Research Sector",
    desc_ro: "Companii autorizate pentru defectoscopie, control nedistructiv și laboratoare de cercetare.",
    desc_en: "Companies authorized for defectoscopy, non-destructive testing, and research laboratories.",
    files: [
      { name_ro: "Registrul Domeniului Industrial (Nondistructiv)", name_en: "Industrial Registry (NDT)", path: "/documents/registru_industrial.pdf" },
      { name_ro: "Laboratoare de Analiză Acreditate", name_en: "Accredited Analytical Laboratories", path: "/documents/laboratoare_cercetare.pdf" }
    ]
  },
  {
    id: "experti",
    icon: ShieldCheck,
    ro: "Experți și Organisme Notificate",
    en: "Experts and Notified Bodies",
    desc_ro: "Lista experților acreditați în protecție radiologică și a organismelor de dozimetrie.",
    desc_en: "List of accredited radiological protection experts and dosimetry bodies.",
    files: [
      { name_ro: "Lista Experților de Protecție Radiologică (Nivel 3)", name_en: "List of Radiological Protection Experts (Level 3)", path: "/documents/experti_protectie.pdf" },
      { name_ro: "Organisme de Dozimetrie Acreditate", name_en: "Accredited Dosimetry Bodies", path: "/documents/organisme_dozimetrie.pdf" }
    ]
  },
  {
    id: "radon",
    icon: Wind,
    ro: "Surse Naturale (Radon)",
    en: "Natural Sources (Radon)",
    desc_ro: "Firme autorizate pentru măsurători de concentrație a radonului în aer și apă.",
    desc_en: "Firms authorized for radon concentration measurements in air and water.",
    files: [
      { name_ro: "Laboratoare Autorizate - Măsurători Radon", name_en: "Authorized Laboratories - Radon Measurements", path: "/documents/laboratoare_radon.pdf" }
    ]
  }
];

function RegistruTitulariPage() {
  const { t, lang } = useI18n();

  return (
    <>
      <PageHeader 
        eyebrow={lang === "ro" ? "Transparență Publică" : "Public Transparency"} 
        title={lang === "ro" ? "Registru Titulari" : "Authorized Entities"} 
        subtitle={lang === "ro" ? "Baza de date națională a tuturor companiilor, clinicilor și experților autorizați de CNCAN." : "National database of all CNCAN authorized companies, clinics, and experts."} 
      />

      <section className="container-page py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          {registries.map((reg) => {
            const Icon = reg.icon;
            return (
              <div key={reg.id} className="border border-border bg-card rounded-sm p-8 shadow-sm flex flex-col">
                <div className="flex items-center gap-4 mb-4 text-brand">
                  <div className="p-3 bg-secondary/50 rounded-sm">
                    <Icon className="h-8 w-8" strokeWidth={1.5} />
                  </div>
                  <h2 className="font-display text-2xl text-brand-deep">
                    {lang === "ro" ? reg.ro : reg.en}
                  </h2>
                </div>
                <p className="text-muted-foreground mb-8">
                  {lang === "ro" ? reg.desc_ro : reg.desc_en}
                </p>
                <div className="mt-auto space-y-3">
                  {reg.files.map((file, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-secondary/30 rounded-sm border border-border/50 hover:border-brand/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-brand" />
                        <span className="font-medium text-sm">
                          {lang === "ro" ? file.name_ro : file.name_en}
                        </span>
                      </div>
                      <Button asChild size="sm" variant="outline" className="text-xs">
                        <a href={file.path} target="_blank" rel="noreferrer">
                          {lang === "ro" ? "Descarcă" : "Download"}
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
