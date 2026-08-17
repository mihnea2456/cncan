import os

file_path = os.path.abspath("src/routes/urgente.tsx")
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Need to add imports
import_target = 'import { PageHeader } from "@/components/page-header";'
new_imports = """import { PageHeader } from "@/components/page-header";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";"""

if "import { Input }" not in content:
    content = content.replace(import_target, new_imports)
    # Also add Send, CheckCircle2 to lucide-react imports if not there
    if "Send" not in content:
        content = content.replace("ExternalLink } from \"lucide-react\";", "ExternalLink, Send, CheckCircle2 } from \"lucide-react\";")

# Add form state to EmergencyPage
state_target = """function EmergencyPage() {
  const { t, lang } = useI18n();"""
new_state = """function EmergencyPage() {
  const { t, lang } = useI18n();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // In a real app, you would send the data to a backend here
  };"""

if "const [isSubmitted" not in content:
    content = content.replace(state_target, new_state)

# Add the form section
form_target = "        {/* MINI-SECTIUNE: PLATFORMA NATIONALA DE PREGATIRE PENTRU SITUATII DE URGENTA */}"

form_content = """        {/* SECTIUNE: PORTAL RAPORTARE INCIDENT */}
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
                        <Input id="firstName" required className="bg-secondary/30 rounded-sm" placeholder="Ion" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          {lang === "ro" ? "Nume" : "Last Name"} <span className="text-danger">*</span>
                        </Label>
                        <Input id="lastName" required className="bg-secondary/30 rounded-sm" placeholder="Popescu" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        {lang === "ro" ? "Adresă de e-mail" : "Email Address"} <span className="text-danger">*</span>
                      </Label>
                      <Input id="email" type="email" required className="bg-secondary/30 rounded-sm" placeholder="ion.popescu@exemplu.ro" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="incident" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        {lang === "ro" ? "Detalii Incident" : "Incident Details"} <span className="text-danger">*</span>
                      </Label>
                      <Textarea 
                        id="incident" 
                        required 
                        className="min-h-[150px] bg-secondary/30 rounded-sm resize-y" 
                        placeholder={lang === "ro" ? "Descrieți succint situația, locația și potențialul pericol..." : "Briefly describe the situation, location, and potential danger..."} 
                      />
                    </div>

                    <div className="pt-2">
                      <Button type="submit" size="lg" className="w-full sm:w-auto rounded-sm bg-brand hover:bg-brand-deep text-white gap-2">
                        <Send className="h-4 w-4" />
                        {lang === "ro" ? "Transmite Raportul de Incident" : "Submit Incident Report"}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* MINI-SECTIUNE: PLATFORMA NATIONALA DE PREGATIRE PENTRU SITUATII DE URGENTA */}"""

if "PORTAL RAPORTARE INCIDENT" not in content:
    content = content.replace(form_target, form_content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated urgente.tsx with Incident Reporting form!")
