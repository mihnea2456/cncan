import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/comunicate")({
  head: () => ({
    meta: [
      { title: "Comunicate și evenimente — CNCAN" },
      { name: "description", content: "Comunicate oficiale, decizii și consultări publice ale CNCAN." },
      { property: "og:title", content: "Comunicate CNCAN" },
      { property: "og:description", content: "Comunicate oficiale, decizii, consultări publice." },
    ],
  }),
  component: NewsPage,
});

const news = [
  {
    date: "24.04.2026",
    tag_ro: "Program",
    tag_en: "Program",
    title_ro: "Deschiderea perioadei de depunere a candidaturilor pentru Programul Oficial de Internship 2026",
    title_en: "Application period opens for the Official Government Internship Program 2026",
    excerpt_ro: "Perioada de depunere a candidaturilor s-a deschis pe 24 aprilie 2026. Înscrierile se realizează exclusiv online pe portalul Guvernului României.",
    excerpt_en: "The application period opened on 24 April 2026. Registration is exclusively online on the Government portal.",
    link: "https://internship.gov.ro",
  },
  {
    date: "22.08.2025",
    tag_ro: "Tarife",
    tag_en: "Fees",
    title_ro: "Formular actualizat pentru taxele și tarifele pentru autorizarea și controlul activităților nucleare",
    title_en: "Updated form for authorization and control fees",
    excerpt_ro: "Noua versiune a formularului include câmpuri suplimentare pentru validare rapidă a plăților.",
    excerpt_en: "The new form version includes fields for faster payment validation.",
  },
  {
    date: "02.05.2025",
    tag_ro: "Jurisprudență",
    tag_en: "Case law",
    title_ro: "Principii ce rezultă din jurisprudența CEDO privind neexecutarea hotărârilor judecătorești",
    title_en: "Principles from ECHR case law on non-enforcement of court decisions",
    excerpt_ro: "Sinteză a principiilor CEDO privind neexecutarea hotărârilor pronunțate împotriva unui debitor public.",
    excerpt_en: "Summary of ECHR principles on non-enforcement of decisions against public debtors.",
  },
  {
    date: "02.05.2025",
    tag_ro: "Urgență",
    tag_en: "Emergency",
    title_ro: "Ce să faceți în cazul unui accident nuclear",
    title_en: "What to do in case of a nuclear accident",
    excerpt_ro: "Ghid oficial de protecție a populației în situații de urgență radiologică sau nucleară.",
    excerpt_en: "Official public protection guide for radiological or nuclear emergencies.",
    link: "/urgente",
  },
  {
    date: "18.03.2025",
    tag_ro: "Consultare",
    tag_en: "Consultation",
    title_ro: "Consultare publică: proiect de normă privind protecția fizică a instalațiilor nucleare",
    title_en: "Public consultation: draft norm on physical protection of nuclear installations",
    excerpt_ro: "Perioada de consultare: 18 martie – 18 aprilie 2025. Observațiile se transmit la office@cncan.ro.",
    excerpt_en: "Consultation period: 18 March – 18 April 2025. Comments to office@cncan.ro.",
  },
];

function NewsPage() {
  const { t, lang } = useI18n();
  return (
    <>
      <PageHeader eyebrow="03" title={t("news.title")} subtitle={t("news.sub")} />
      <section className="container-page py-12">
        <div className="divide-y divide-border border-t border-b border-border">
          {news.map((n, i) => {
            const isExternal = n.link?.startsWith("http");
            return (
              <article key={i} className="py-8 grid gap-6 md:grid-cols-[180px_1fr] group">
                <div>
                  <div className="font-mono text-sm text-muted-foreground">{n.date}</div>
                  <div className="mt-2 inline-block px-2 py-0.5 bg-accent text-accent-foreground rounded-sm uppercase tracking-wider text-[10px] font-semibold">
                    {lang === "ro" ? n.tag_ro : n.tag_en}
                  </div>
                </div>
                <div>
                  <h2 className="font-display text-2xl text-foreground leading-snug group-hover:text-brand transition-colors">
                    {n.link ? (
                      <a
                        href={n.link}
                        target={isExternal ? "_blank" : "_self"}
                        rel={isExternal ? "noreferrer" : ""}
                        className="hover:underline"
                      >
                        {lang === "ro" ? n.title_ro : n.title_en}
                      </a>
                    ) : (
                      lang === "ro" ? n.title_ro : n.title_en
                    )}
                  </h2>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{lang === "ro" ? n.excerpt_ro : n.excerpt_en}</p>
                  
                  {n.link ? (
                    <a
                      href={n.link}
                      target={isExternal ? "_blank" : "_self"}
                      rel={isExternal ? "noreferrer" : ""}
                      className="mt-4 inline-flex items-center gap-2 text-sm text-brand font-semibold hover:text-brand-deep transition-colors"
                    >
                      {lang === "ro" ? "Citește comunicatul" : "Read the release"}
                      {isExternal ? <ExternalLink className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                    </a>
                  ) : (
                    <div className="mt-4 inline-flex items-center gap-2 text-sm text-brand font-medium">
                      {lang === "ro" ? "Citește comunicatul" : "Read the release"} <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
