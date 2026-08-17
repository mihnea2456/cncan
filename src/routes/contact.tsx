import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
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
    { icon: MapPin, label: lang === "ro" ? "Adresă" : "Address", value: "Bd. Libertății nr. 14, Sector 5, București, 050706" },
    { icon: Phone, label: lang === "ro" ? "Telefon" : "Phone", value: "+40 21 316 05 63" },
    { icon: Mail, label: "E-mail", value: "office@cncan.ro" },
    { icon: Clock, label: lang === "ro" ? "Program cu publicul" : "Public hours", value: lang === "ro" ? "L–J 08:30–17:00 · V 08:30–14:30" : "Mon–Thu 08:30–17:00 · Fri 08:30–14:30" },
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
                  <div className="mt-1 font-display text-lg text-foreground">{it.value}</div>
                </div>
              </div>
            );
          })}
        </div>

        <form 
          className="border border-border bg-card p-7"
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
