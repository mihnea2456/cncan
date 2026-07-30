import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/despre")({
  head: () => ({
    meta: [
      { title: "Despre CNCAN" },
      { name: "description", content: "Comisia Națională pentru Controlul Activităților Nucleare — autoritatea de reglementare nucleară a României, înființată prin Legea 111/1996." },
      { property: "og:title", content: "Despre CNCAN" },
      { property: "og:description", content: "Autoritatea națională de reglementare nucleară a României." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t, lang } = useI18n();
  return (
    <>
      <PageHeader eyebrow="05" title={t("about.title")} subtitle={t("about.sub")} />
      <section className="container-page py-16 grid gap-12 lg:grid-cols-[2fr_1fr]">
        <div className="prose max-w-none">
          <h2 className="font-display text-3xl text-brand-deep">{lang === "ro" ? "Misiune" : "Mission"}</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {lang === "ro"
              ? "CNCAN reglementează, autorizează și supraveghează activitățile nucleare desfășurate pe teritoriul României, asigurând conformitatea cu standardele internaționale AIEA și obligațiile europene EURATOM."
              : "CNCAN regulates, licenses and oversees nuclear activities carried out in Romania, ensuring compliance with international IAEA standards and European EURATOM obligations."}
          </p>

          <h2 className="mt-12 font-display text-3xl text-brand-deep">{lang === "ro" ? "Atribuții principale" : "Main responsibilities"}</h2>
          <ul className="mt-6 space-y-3 text-muted-foreground">
            {[
              lang === "ro" ? "Autorizarea activităților nucleare și radiologice" : "Licensing of nuclear and radiological activities",
              lang === "ro" ? "Inspecția și supravegherea titularilor de autorizație" : "Inspection and oversight of licensees",
              lang === "ro" ? "Reglementarea securității nucleare și radioprotecției" : "Regulation of nuclear safety and radiation protection",
              lang === "ro" ? "Controlul materialelor nucleare (garanții)" : "Nuclear material control (safeguards)",
              lang === "ro" ? "Pregătirea și răspunsul la urgențe radiologice" : "Preparedness and response to radiological emergencies",
            ].map((li, i) => (
              <li key={i} className="pl-5 relative before:content-[''] before:absolute before:left-0 before:top-3 before:h-px before:w-3 before:bg-brand">
                {li}
              </li>
            ))}
          </ul>
        </div>

        <aside className="border border-border bg-card p-7 h-fit">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">{lang === "ro" ? "Cadru legal" : "Legal framework"}</div>
          <div className="mt-3 font-display text-2xl text-brand-deep">Legea 111 / 1996</div>
          <p className="mt-3 text-sm text-muted-foreground">
            {lang === "ro"
              ? "Legea privind desfășurarea în siguranță, reglementarea, autorizarea și controlul activităților nucleare."
              : "The law on safe conduct, regulation, licensing and control of nuclear activities."}
          </p>
          <div className="mt-8 pt-6 border-t border-border">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{lang === "ro" ? "Președinte" : "President"}</div>
            <div className="mt-2 font-display text-lg text-foreground">Cantemir Marian Ciurea-Ercău</div>
          </div>
        </aside>
      </section>
    </>
  );
}
