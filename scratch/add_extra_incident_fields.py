import os

file_path = os.path.abspath("src/routes/urgente.tsx")
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

old_email_section = """                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        {lang === "ro" ? "Adresă de e-mail" : "Email Address"} <span className="text-danger">*</span>
                      </Label>
                      <Input id="email" name="Email" type="email" required className="bg-secondary/30 rounded-sm" placeholder="ion.popescu@exemplu.ro" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="incident" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        {lang === "ro" ? "Detalii Incident" : "Incident Details"} <span className="text-danger">*</span>
                      </Label>"""

new_email_phone_location_section = """                    <div className="grid gap-6 md:grid-cols-2">
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
                      </Label>"""

if old_email_section in content:
    content = content.replace(old_email_section, new_email_phone_location_section)
    print("Added Phone and Location fields!")
else:
    print("Could not find the target section in urgente.tsx")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
