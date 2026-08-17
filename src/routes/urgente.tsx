import { createFileRoute } from "@tanstack/react-router";
import { ShieldAlert, Radio, Home, Pill, PhoneCall, ExternalLink } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PageHeader } from "@/components/page-header";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/urgente")({
  head: () => ({
    meta: [
      { title: "Urgențe nucleare — CNCAN" },
      { name: "description", content: "Ghid oficial CNCAN pentru pregătirea și răspunsul populației în situații de urgență radiologică sau nucleară." },
      { property: "og:title", content: "Urgențe nucleare — CNCAN" },
      { property: "og:description", content: "Ce trebuie să știți și cum să acționați." },
    ],
  }),
  component: EmergencyPage,
});

const steps = [
  { icon: Home, ro: "Adăpostiți-vă în interior", en: "Shelter indoors", desc_ro: "Închideți ferestrele, ușile și opriți ventilația. Rămâneți în camerele fără ferestre.", desc_en: "Close windows and doors, turn off ventilation. Stay in windowless rooms." },
  { icon: Radio, ro: "Ascultați sursele oficiale", en: "Follow official channels", desc_ro: "Radio public, TVR, comunicate CNCAN. Nu răspândiți informații neverificate.", desc_en: "Public radio, TVR, CNCAN releases. Do not share unverified information." },
  { icon: Pill, ro: "Iodura de potasiu", en: "Potassium iodide", desc_ro: "Administrată doar la instrucțiunea autorităților. Respectați dozele indicate pe vârste.", desc_en: "Only taken when instructed by authorities. Follow age-based dosages." },
  { icon: PhoneCall, ro: "Sunați 112 doar pentru urgențe medicale", en: "Call 112 only for medical emergencies", desc_ro: "Nu blocați liniile de urgență. Informațiile publice se difuzează prin canale oficiale.", desc_en: "Do not block emergency lines. Public information runs via official channels." },
];

function EmergencyPage() {
  const { t, lang } = useI18n();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("Prenume") as string;
    const lastName = formData.get("Nume") as string;
    const email = formData.get("Email") as string;
    const phone = formData.get("Telefon") as string;
    const location = formData.get("Locatie_Incident") as string;
    const details = formData.get("Detalii_Incident") as string;

    try {
      // 1. Salvare in Baza de Date (Supabase)
      const { error: dbError } = await supabase.from('incidents').insert([
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone,
          location: location,
          details: details,
          status: 'Nou'
        }
      ]);

      if (dbError) {
        console.error("Supabase Error:", dbError);
        alert(lang === "ro" ? "Eroare la salvarea în baza de date." : "Database save error.");
        setIsSubmitting(false);
        return;
      }

      // 2. Trimitere Notificare Email (Web3Forms)
      formData.append("access_key", "ff2f6934-7d06-4993-9561-ab0621ed2650");
      formData.append("subject", "Nou Raport de Incident - Portal CNCAN");
      formData.append("from_name", "Portal Incidente CNCAN");

      // We don't await this so it doesn't slow down the UI, but we still try to send it
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      }).catch(err => console.error("Web3Forms error:", err));

      // 3. Arata mesajul de succes
      setIsSubmitted(true);
    } catch (error) {
      alert(lang === "ro" ? "A apărut o eroare de conexiune." : "A connection error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <PageHeader eyebrow="04" title={t("em.title")} subtitle={t("em.sub")} tone="danger" />
      <section className="container-page py-16">
        <div className="border-l-4 border-danger bg-danger/5 p-6 md:p-8 rounded-sm">
          <div className="flex items-center gap-3">
            <ShieldAlert className="h-6 w-6 text-danger" />
            <div className="text-sm font-semibold text-danger uppercase tracking-widest">
              {lang === "ro" ? "În caz de accident nuclear" : "In case of a nuclear accident"}
            </div>
          </div>
          <p className="mt-4 text-lg leading-relaxed max-w-3xl">
            {lang === "ro"
              ? "România dispune de un sistem național de răspuns la urgențe nucleare, coordonat de CNCAN împreună cu IGSU. Măsurile de protecție a populației sunt anunțate exclusiv prin canale oficiale."
              : "Romania operates a national nuclear emergency response system, coordinated by CNCAN together with IGSU. Population protection measures are announced exclusively via official channels."}
          </p>
        </div>

        <div className="mt-16">
          <h2 className="font-display text-3xl text-brand-deep">
            {lang === "ro" ? "Cei 4 pași" : "The 4 steps"}
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="border border-border bg-card p-7 flex gap-5">
                  <div className="shrink-0 grid h-12 w-12 place-items-center bg-brand-deep text-white rounded-sm">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-brand">0{i + 1}</div>
                    <h3 className="mt-1 font-display text-xl text-brand-deep">{lang === "ro" ? s.ro : s.en}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{lang === "ro" ? s.desc_ro : s.desc_en}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTIUNE: PORTAL RAPORTARE INCIDENT */}
        <div className="mt-16">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/3">
              <h2 className="font-display text-3xl text-brand-deep">
                {lang === "ro" ? "Portal Raportare Incident" : "Incident Reporting Portal"}
              </h2>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                {lang === "ro"
                  ? "Utilizați acest formular pentru a notifica rapid CNCAN în legătură cu orice incident radiologic, pierdere a controlului asupra unei surse de radiații sau alte situații anormale."
                  : "Use this form to quickly notify CNCAN regarding any radiological incident, loss of control over a radiation source, or other abnormal situations."}
              </p>
              <div className="mt-6 p-4 bg-secondary/50 rounded-sm border border-border">
                <h4 className="font-semibold text-sm mb-2">{lang === "ro" ? "Notă importantă:" : "Important note:"}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {lang === "ro"
                    ? "Acest canal este monitorizat pentru incidente cu specific nuclear/radiologic. Pentru urgențe medicale sau de ordine publică apelați serviciul 112."
                    : "This channel is monitored for nuclear/radiological incidents. For medical or public order emergencies call 112."}
                </p>
              </div>
            </div>

            <div className="md:w-2/3">
              <div className="border border-border bg-card p-6 md:p-8 rounded-sm shadow-sm relative overflow-hidden">
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center text-center py-10 animate-in fade-in zoom-in duration-500">
                    <div className="h-16 w-16 bg-brand/10 text-brand rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="font-display text-2xl text-foreground mb-2">
                      {lang === "ro" ? "Incident raportat cu succes" : "Incident reported successfully"}
                    </h3>
                    <p className="text-muted-foreground max-w-md">
                      {lang === "ro" 
                        ? "Vă mulțumim. Mesajul dumneavoastră a fost trimis către centrul operațional CNCAN. Veți fi contactat în cel mai scurt timp pentru detalii suplimentare." 
                        : "Thank you. Your message has been sent to the CNCAN operational center. You will be contacted shortly for further details."}
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-8 rounded-sm"
                      onClick={() => setIsSubmitted(false)}
                    >
                      {lang === "ro" ? "Trimite un alt raport" : "Submit another report"}
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          {lang === "ro" ? "Prenume" : "First Name"} <span className="text-danger">*</span>
                        </Label>
                        <Input id="firstName" name="Prenume" required className="bg-secondary/30 rounded-sm" placeholder="Ion" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          {lang === "ro" ? "Nume" : "Last Name"} <span className="text-danger">*</span>
                        </Label>
                        <Input id="lastName" name="Nume" required className="bg-secondary/30 rounded-sm" placeholder="Popescu" />
                      </div>
                    </div>
                    
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          {lang === "ro" ? "Adresă de e-mail" : "Email Address"} <span className="text-danger">*</span>
                        </Label>
                        <Input id="email" name="Email" type="email" required className="bg-secondary/30 rounded-sm" placeholder="ion.popescu@exemplu.ro" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          {lang === "ro" ? "Număr de Telefon" : "Phone Number"} <span className="text-danger">*</span>
                        </Label>
                        <Input id="phone" name="Telefon" type="tel" required className="bg-secondary/30 rounded-sm" placeholder="07XX XXX XXX" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        {lang === "ro" ? "Locația Incidentului / Adresa" : "Incident Location / Address"} <span className="text-danger">*</span>
                      </Label>
                      <Input id="location" name="Locatie_Incident" required className="bg-secondary/30 rounded-sm" placeholder={lang === "ro" ? "Oraș, Stradă, Clădire..." : "City, Street, Building..."} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="incident" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        {lang === "ro" ? "Detalii Incident" : "Incident Details"} <span className="text-danger">*</span>
                      </Label>
                      <Textarea 
                        id="incident" 
                        name="Detalii_Incident" 
                        required 
                        className="min-h-[150px] bg-secondary/30 rounded-sm resize-y" 
                        placeholder={lang === "ro" ? "Descrieți succint situația, locația și potențialul pericol..." : "Briefly describe the situation, location, and potential danger..."} 
                      />
                    </div>

                    <div className="pt-2">
                      <Button type="submit" disabled={isSubmitting} size="lg" className="w-full sm:w-auto rounded-sm bg-brand hover:bg-brand-deep text-white gap-2 disabled:opacity-70">
                        <Send className={`h-4 w-4 ${isSubmitting ? "animate-pulse" : ""}`} />
                        {isSubmitting 
                          ? (lang === "ro" ? "Se transmite..." : "Submitting...") 
                          : (lang === "ro" ? "Transmite Raportul de Incident" : "Submit Incident Report")}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* MINI-SECTIUNE: PLATFORMA NATIONALA DE PREGATIRE PENTRU SITUATII DE URGENTA */}
        <div className="mt-16 border border-brand/40 bg-gradient-to-br from-brand-deep/5 via-card to-card p-8 rounded-sm shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-brand uppercase tracking-widest bg-brand/10 px-3 py-1 rounded-full">
                <ExternalLink className="h-3.5 w-3.5" />
                {lang === "ro" ? "Portal Oficial DSU / IGSU" : "Official DSU / IGSU Portal"}
              </div>
              <h2 className="font-display text-2xl md:text-3xl text-brand-deep">
                {lang === "ro"
                  ? "Platforma Națională de Pregătire pentru Situații de Urgență"
                  : "National Emergency Preparedness Platform"}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {lang === "ro"
                  ? "Consultați ghidul oficial complet pentru protecția populației în caz de accident nuclear sau radiologic, pus la dispoziție de Departamentul pentru Situații de Urgență (DSU) și Inspectoratul General pentru Situații de Urgență (IGSU) prin platforma națională „Fii Pregătit”."
                  : "Consult the comprehensive official guide for population protection in case of a nuclear or radiological accident, provided by the Department for Emergency Situations (DSU) and IGSU via the national 'Fii Pregătit' platform."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="https://fiipregatit.ro/ghiduri/-despre-8-5"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm bg-brand text-primary-foreground text-xs font-semibold hover:bg-brand-deep transition-colors shadow-sm"
              >
                <ShieldAlert className="h-4 w-4" />
                {lang === "ro" ? "Ghid în caz de accident nuclear" : "Nuclear Accident Guide"}
                <ExternalLink className="h-3.5 w-3.5 ml-0.5" />
              </a>

              <a
                href="https://fiipregatit.ro"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-sm border border-border bg-card text-foreground text-xs font-semibold hover:border-brand hover:text-brand transition-colors"
              >
                {lang === "ro" ? "Toate ghidurile fiipregatit.ro" : "All fiipregatit.ro guides"}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

