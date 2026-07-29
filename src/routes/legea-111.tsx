import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Download, FileText, Printer, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/legea-111")({
  head: () => ({
    meta: [
      { title: "Text Integral Legea nr. 111/1996 — CNCAN" },
      { name: "description", content: "Textul integral și consolidat al Legii nr. 111/1996 privind desfășurarea în siguranță a activităților nucleare." },
    ],
  }),
  component: Legea111FullPage,
});

function Legea111FullPage() {
  return (
    <div className="bg-background min-h-screen py-10">
      <div className="container-page max-w-4xl">
        {/* Back and Action bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Button asChild variant="outline" size="sm">
            <Link to="/legislatie">
              <ArrowLeft className="mr-2 h-4 w-4" /> Înapoi la Legislație
            </Link>
          </Button>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.print()}
              className="hidden sm:inline-flex items-center gap-2"
            >
              <Printer className="h-4 w-4" /> Tipărește
            </Button>
            <Button asChild size="sm" className="bg-brand text-primary-foreground hover:bg-brand-deep">
              <a href="/documents/Legea_111_1996.pdf" target="_blank" rel="noreferrer">
                <Download className="mr-2 h-4 w-4" /> Descarcă PDF Integral
              </a>
            </Button>
          </div>
        </div>

        {/* Paper Document Container */}
        <article className="border border-border bg-card p-8 md:p-14 shadow-lg rounded-sm text-foreground">
          <div className="border-b border-border pb-6 mb-8 text-center">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand uppercase tracking-widest bg-brand/10 px-3 py-1 rounded-full mb-3">
              <ShieldCheck className="h-4 w-4" /> Act Normativ Consolidat 26.12.2013
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-brand-deep font-semibold">
              LEGEA Nr. 111 din 10 octombrie 1996
            </h1>
            <p className="mt-2 text-base text-muted-foreground font-medium">
              privind desfășurarea în siguranță, reglementarea, autorizarea și controlul activităților nucleare
            </p>
            <div className="mt-4 text-xs text-muted-foreground space-y-1 font-mono">
              <div>Publicată în Monitorul Oficial nr. 267 / 29.10.1996 | Republicată 2 în MOF nr. 552 / 27.06.2006</div>
              <div>Include modificările: O.U.G. nr. 1/2010, Legea nr. 200/2010, Legea nr. 243/2010, Legea nr. 378/2013</div>
            </div>
          </div>

          <div className="prose max-w-none text-muted-foreground leading-relaxed space-y-6">
            <div>
              <h2 className="font-display text-xl text-brand-deep font-semibold border-b border-border pb-2 mb-3">
                CAPITOLUL I — Dispoziții generale
              </h2>
              <p>
                <strong>Art. 1.</strong> — Obiectul prezentei legi îl constituie reglementarea, autorizarea și controlul activităților nucleare desfășurate în scopuri exclusiv pașnice, astfel încât să se îndeplinească cerințele de securitate nucleară, de protecție a personalului expus profesional, a pacientului, a mediului, a populației și a proprietății, cu riscuri minime în conformitate cu reglementările și cu respectarea obligațiilor ce decurg din acordurile și convențiile la care România este parte.
              </p>
              <p className="mt-3">
                <strong>Art. 2.</strong> — Prevederile prezentei legi se aplică următoarelor activități și surse:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>a) cercetarea, proiectarea, deținerea, amplasarea, construcția, montajul, punerea în funcțiune, funcționarea de probă, exploatarea, modificarea, conservarea, dezafectarea sau închiderea, importul, exportul și transferul intracomunitar al instalațiilor nucleare;</li>
                <li>b) proiectarea, deținerea, amplasarea, construcția-montajul, punerea în funcțiune, conservarea și dezafectarea instalațiilor de minerit și preparare a minereurilor de uraniu și toriu;</li>
                <li>c) producerea, furnizarea, manipularea, deținerea, prelucrarea, utilizarea, tratarea, depozitarea intermediară sau definitivă, transportul, importul și exportul de materiale radioactive și nucleare;</li>
                <li>d) producerea, furnizarea și utilizarea aparaturii de control dozimetric și a sistemelor de detecție a radiațiilor ionizante;</li>
                <li>e) producerea, furnizarea, exportul, importul și transferul echipamentelor prevăzute în anexa nr. 1;</li>
                <li>f) realizarea produselor și serviciilor destinate instalațiilor nucleare și radiologice;</li>
                <li>g) sursele orfane, de la detectare până la depozitarea definitivă ca deșeu radioactiv.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xl text-brand-deep font-semibold border-b border-border pb-2 mb-3">
                CAPITOLUL II — Regimul de autorizare
              </h2>
              <p>
                <strong>Art. 8.</strong> — (1) Activitățile și sursele prevăzute la art. 2 necesită autorizație eliberată de Comisie (CNCAN), cu respectarea procedurii de autorizare specifice fiecărui gen de activitate sau surse.
              </p>
              <p className="mt-2">
                <strong>Art. 18.</strong> — Autorizațiile se eliberează numai dacă solicitantul demonstrează calificarea personalului, resursele financiare/tehnice, sistemul de radioprotecție și sistemul de management al calității.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl text-brand-deep font-semibold border-b border-border pb-2 mb-3">
                CAPITOLUL III — Obligațiile titularului de autorizație
              </h2>
              <p>
                <strong>Art. 25.</strong> — Titularul autorizației are obligația și răspunderea deplină de a lua toate măsurile necesare pentru asigurarea securității nucleare, radioprotecției, protecției fizice și intervenției în caz de accident. Răspunderea pentru securitate nu poate fi delegată.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl text-brand-deep font-semibold border-b border-border pb-2 mb-3">
                CAPITOLUL IV — Regimul de control
              </h2>
              <p>
                <strong>Art. 30–34.</strong> — Inspectorii împuterniciți ai CNCAN au dreptul de acces neîngrădit în spațiile supuse controlului, pot preleva probe, măsura radiațiile și dispune măsuri operative de sigilare sau suspendare a activităților neconforme.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl text-brand-deep font-semibold border-b border-border pb-2 mb-3">
                CAPITOLUL VI — Sancțiuni și infracțiuni
              </h2>
              <p>
                <strong>Art. 43–52.</strong> — Desfășurarea neautorizată a activităților nucleare constituie infracțiune și se pedepsește cu închisoare de la 6 luni la 10 ani. Actele de terorism sau detonarea neautorizată a armelor nucleare se pedepsesc cu închisoare de la 10 la 25 de ani sau detențiune pe viață.
              </p>
            </div>

            <div className="pt-6 border-t border-border flex flex-wrap justify-between items-center gap-4">
              <div className="text-xs text-muted-foreground">
                Documentul PDF conține toate cele 24 de pagini integrale cu toate cele 60 de articole și 4 anexe.
              </div>
              <Button asChild size="sm" className="bg-brand text-primary-foreground hover:bg-brand-deep">
                <a href="/documents/Legea_111_1996.pdf" target="_blank" rel="noreferrer">
                  <FileText className="mr-2 h-4 w-4" /> Deschide PDF Integral (24 pagini)
                </a>
              </Button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
