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
    desc_ro: "Spitale, clinici și centre autorizate pentru deținerea și utilizarea surselor de radiații, inclusiv furnizori.",
    desc_en: "Hospitals, clinics, and centers authorized to possess and use radiation sources, including suppliers.",
    files: [
      { name_ro: "Lista furnizori instalații medicale", name_en: "List of Medical Installations Suppliers", path: "/documents/registru_titulari/domeniu_medical/Lista-furnizori-instalatii-medicale.pdf" },
      { name_ro: "Lista furnizori echipamente radioprotecție", name_en: "List of Radiation Protection Equipment Suppliers", path: "/documents/registru_titulari/domeniu_medical/Lista-furnizori-echipamente-radioprotectie.pdf" },
      { name_ro: "Lista agenților autorizați pentru manipularea instalațiilor", name_en: "List of Agents Authorized for Handling Installations", path: "/documents/registru_titulari/domeniu_medical/Lista-agentilor-economici-autorizati-sa-desfasoare-activitati-de-manipulare-a-instalatiilor-radiologice.pdf" }
    ]
  },
  {
    id: "industrial",
    icon: Factory,
    ro: "Domeniul Cercetării & Laboratoare",
    en: "Research & Laboratories Sector",
    desc_ro: "Companii autorizate și laboratoare desemnate pentru analize și încercări.",
    desc_en: "Authorized companies and designated laboratories for analysis and testing.",
    files: [
      { name_ro: "Lista laboratoarelor desemnate CNCAN", name_en: "List of CNCAN Designated Laboratories", path: "/documents/registru_titulari/domeniu_cercetarii_si_labs/Lista-laboratoare-desemnate-CNCANianuarie-2026.pdf" }
    ]
  },
  {
    id: "experti",
    icon: ShieldCheck,
    ro: "Experți",
    en: "Experts",
    desc_ro: "Lista experților acreditați în protecție radiologică, fizică medicală și instalații nucleare.",
    desc_en: "List of accredited radiological protection, medical physics, and nuclear installations experts.",
    files: [
      { name_ro: "Lista experți în protecție radiologică (Nivel 3)", name_en: "List of Radiological Protection Experts (Level 3)", path: "/documents/registru_titulari/domeniu_experti/LISTA-EXPERTI-IN-RADIOPROTECTIE-nivel-3-ACTUALIZATA-IN-10-iunie-2026-.pdf" },
      { name_ro: "Lista experți în fizică medicală", name_en: "List of Medical Physics Experts", path: "/documents/registru_titulari/domeniu_experti/LISTA-EXPERTI-IN-FIZICA-MEDICALA-actualizata-in-IULIE-2026.pdf" },
      { name_ro: "Lista experți materie primă nucleară", name_en: "List of Nuclear Raw Material Experts", path: "/documents/registru_titulari/domeniu_experti/Lista-experti-CNCAN-in-domeniul-materie-prima-nucleara.pdf" },
      { name_ro: "Lista experți instalații nucleare, deșeuri și radon", name_en: "List of Nuclear Installations, Waste & Radon Experts", path: "/documents/registru_titulari/domeniu_experti/Lista-expertilorinstalatii-nucleare-deseuri-radioactive-dezafectare-protectia-mediului-surse-naturale-radon2026.pdf" }
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
      { name_ro: "Laboratoare Autorizate - Măsurători Radon (în curând)", name_en: "Authorized Laboratories - Radon Measurements (coming soon)", path: "#" }
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
                <p className="text-muted-foreground mb-6">
                  {lang === "ro" ? reg.desc_ro : reg.desc_en}
                </p>
                <div className="space-y-3">
                  {reg.files.map((file, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-secondary/30 rounded-sm border border-border/50 hover:border-brand/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-brand" />
                        <span className="font-medium text-sm">
                          {lang === "ro" ? file.name_ro : file.name_en}
                        </span>
                      </div>
                      <Button asChild size="sm" variant="outline" className="text-xs">
                        <a href={file.path} target="_blank" rel="noreferrer" download>
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
