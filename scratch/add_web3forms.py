import os

file_path = os.path.abspath("src/routes/urgente.tsx")
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Replace the handleSubmit and add isSubmitting state
old_submit_logic = """  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // In a real app, you would send the data to a backend here
  };"""

new_submit_logic = """  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "ff2f6934-7d06-4993-9561-ab0621ed2650");
    formData.append("subject", "Nou Raport de Incident - Portal CNCAN");
    formData.append("from_name", "Portal Incidente CNCAN");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert(lang === "ro" ? "A apărut o eroare. Vă rugăm să încercați din nou." : "An error occurred. Please try again.");
      }
    } catch (error) {
      alert(lang === "ro" ? "Eroare de conexiune. Vă rugăm să verificați conexiunea la internet." : "Connection error. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };"""

if old_submit_logic in content:
    content = content.replace(old_submit_logic, new_submit_logic)
    print("Replaced submit logic.")

# 2. Add 'name' attributes to inputs
content = content.replace(
    '<Input id="firstName" required className="bg-secondary/30 rounded-sm" placeholder="Ion" />',
    '<Input id="firstName" name="Prenume" required className="bg-secondary/30 rounded-sm" placeholder="Ion" />'
)
content = content.replace(
    '<Input id="lastName" required className="bg-secondary/30 rounded-sm" placeholder="Popescu" />',
    '<Input id="lastName" name="Nume" required className="bg-secondary/30 rounded-sm" placeholder="Popescu" />'
)
content = content.replace(
    '<Input id="email" type="email" required className="bg-secondary/30 rounded-sm" placeholder="ion.popescu@exemplu.ro" />',
    '<Input id="email" name="Email" type="email" required className="bg-secondary/30 rounded-sm" placeholder="ion.popescu@exemplu.ro" />'
)
content = content.replace(
    '<Textarea \n                        id="incident" \n                        required \n                        className="min-h-[150px] bg-secondary/30 rounded-sm resize-y" \n                        placeholder={lang === "ro" ? "Descrieți succint situația, locația și potențialul pericol..." : "Briefly describe the situation, location, and potential danger..."} \n                      />',
    '<Textarea \n                        id="incident" \n                        name="Detalii_Incident" \n                        required \n                        className="min-h-[150px] bg-secondary/30 rounded-sm resize-y" \n                        placeholder={lang === "ro" ? "Descrieți succint situația, locația și potențialul pericol..." : "Briefly describe the situation, location, and potential danger..."} \n                      />'
)

# 3. Add loading state to button
old_button = """                      <Button type="submit" size="lg" className="w-full sm:w-auto rounded-sm bg-brand hover:bg-brand-deep text-white gap-2">
                        <Send className="h-4 w-4" />
                        {lang === "ro" ? "Transmite Raportul de Incident" : "Submit Incident Report"}
                      </Button>"""

new_button = """                      <Button type="submit" disabled={isSubmitting} size="lg" className="w-full sm:w-auto rounded-sm bg-brand hover:bg-brand-deep text-white gap-2 disabled:opacity-70">
                        <Send className={`h-4 w-4 ${isSubmitting ? "animate-pulse" : ""}`} />
                        {isSubmitting 
                          ? (lang === "ro" ? "Se transmite..." : "Submitting...") 
                          : (lang === "ro" ? "Transmite Raportul de Incident" : "Submit Incident Report")}
                      </Button>"""

if old_button in content:
    content = content.replace(old_button, new_button)
    print("Replaced button.")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Form integration complete!")
