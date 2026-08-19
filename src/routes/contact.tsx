import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Clock, Facebook } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — CNCAN" },
      { name: "description", content: "Date de contact CNCAN: adresă, telefon, e-mail, program cu publicul și puncte de contact pentru presă." },
      { property: "og:title", content: "Contact CNCAN" },
      { property: "og:description", content: "Puncte de contact instituționale și pentru presă." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t, lang } = useI18n();
  const items = [
    { icon: MapPin, label: lang === "ro" ? "Sediul Principal" : "Main Office", value: "Bd. Libertății nr. 14, Sector 5, București" },
    { icon: Clock, label: lang === "ro" ? "Program" : "Public hours", value: lang === "ro" ? "Luni-Joi 08:00-16:30 · Vineri 08:00-14:00" : "Mon-Thu 08:00-16:30 · Fri 08:00-14:00" },
    { icon: Mail, label: "E-mail (General)", value: "office@cncan.ro" },
    { icon: Facebook, label: "Facebook", value: "CNCAN.RO", link: "https://www.facebook.com/CNCAN.RO" },
    { icon: Phone, label: lang === "ro" ? "Registratură și Informații" : "Registry & Information", value: "021 317 38 15  /  031 805 59 40" },
    { icon: Phone, label: lang === "ro" ? "Dir. Autorizare (DAURI)" : "Authorization Dept. (DAURI)", value: "021 316 34 76" },
    { icon: Phone, label: lang === "ro" ? "Dir. Supraveghere (DSURI)" : "Surveillance Dept. (DSURI)", value: "021 316 04 26" },
    { icon: Phone, label: lang === "ro" ? "Relații Internaționale și Comunicare" : "International Relations & Comms", value: "021 317 38 07" },
    { icon: Phone, label: lang === "ro" ? "Cabinet Președinte / Relații Publice" : "President's Cabinet / PR", value: "021 316 05 72" },
    { icon: Phone, label: lang === "ro" ? "Dir. Ciclul Combustibilului Nuclear (DCCN)" : "Nuclear Fuel Cycle Dept. (DCCN)", value: "021 316 24 41" },
    { icon: Phone, label: lang === "ro" ? "Dir. Economică / Juridic / HR" : "Economic / Legal / HR Dept.", value: "021 794 05 40" },
    { icon: Phone, label: lang === "ro" ? "Situații de Urgență (COSU)" : "Emergency Situations (COSU)", value: "021 351 50 89" },
  ];

  return (
    <>
      <PageHeader eyebrow="06" title={t("contact.title")} subtitle={t("contact.sub")} />
      <section className="container-page py-16 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="grid gap-4">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <div key={i} className="border border-border bg-card p-6 flex gap-5">
                <div className="grid h-11 w-11 place-items-center bg-secondary rounded-sm text-brand">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{it.label}</div>
                  <div className="mt-1 font-display text-lg text-foreground">
                    {it.link ? (
                      <a href={it.link} target="_blank" rel="noopener noreferrer" className="hover:text-brand hover:underline transition-colors">
                        {it.value}
                      </a>
                    ) : (
                      it.value
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <form 
          className="border border-border bg-card p-7 self-start"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const subject = fd.get('subject') || 'Mesaj de pe site-ul CNCAN';
            const body = `Nume: ${fd.get('name')}\nEmail: ${fd.get('email')}\n\n${fd.get('message')}`;
            window.location.href = `mailto:office@cncan.ro?subject=${encodeURIComponent(subject as string)}&body=${encodeURIComponent(body)}`;
          }}
        >
          <h2 className="font-display text-2xl text-brand-deep">
            {lang === "ro" ? "Scrieți-ne" : "Write to us"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {lang === "ro" ? "Răspundem în maximum 30 de zile lucrătoare, conform Legii 544/2001." : "We respond within 30 working days, per Law 544/2001."}
          </p>
          <div className="mt-6 grid gap-4">
            <input name="name" required placeholder={lang === "ro" ? "Nume și prenume" : "Full name"} className="h-11 px-4 bg-secondary/50 border border-border rounded-sm text-sm outline-none focus:border-brand" />
            <input name="email" required type="email" placeholder="E-mail" className="h-11 px-4 bg-secondary/50 border border-border rounded-sm text-sm outline-none focus:border-brand" />
            <input name="subject" required placeholder={lang === "ro" ? "Subiect" : "Subject"} className="h-11 px-4 bg-secondary/50 border border-border rounded-sm text-sm outline-none focus:border-brand" />
            <textarea name="message" required rows={5} placeholder={lang === "ro" ? "Mesajul dvs." : "Your message"} className="px-4 py-3 bg-secondary/50 border border-border rounded-sm text-sm outline-none focus:border-brand resize-none" />
            <button type="submit" className="h-11 bg-brand text-primary-foreground rounded-sm font-medium hover:bg-brand-deep transition-colors">
              {lang === "ro" ? "Trimite mesajul" : "Send message"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
