import os
from fpdf import FPDF

def clean_text(s):
    replacements = {
        'ă': 'a', 'Ă': 'A',
        'â': 'a', 'Â': 'A',
        'î': 'i', 'Î': 'I',
        'ș': 's', 'Ș': 'S', 'ş': 's', 'Ş': 'S',
        'ț': 't', 'Ț': 'T', 'ţ': 't', 'Ţ': 'T',
        '—': '-', '–': '-', '”': '"', '“': '"', '’': "'", '‘': "'", '•': '*'
    }
    for k, v in replacements.items():
        s = s.replace(k, v)
    return s

class PDF(FPDF):
    def header(self):
        self.set_font('helvetica', 'B', 8.5)
        self.set_text_color(100, 100, 100)
        self.cell(0, 8, 'CNCAN - DOCUMENTATIE PRELUNGIRE PERMIS DE EXERCITARE NIVEL 3 (EXPERTI)', border=0, align='C', new_x="LMARGIN", new_y="NEXT")
        self.set_draw_color(210, 210, 210)
        self.line(10, 15, 200, 15)
        self.ln(3)

    def footer(self):
        self.set_y(-15)
        self.set_font('helvetica', 'I', 8)
        self.set_text_color(130, 130, 130)
        self.cell(0, 10, f'Pagina {self.page_no()} / {{nb}}  -  CNCAN Portal Oficial (www.cncan.ro)', align='C')

os.makedirs('public/documents', exist_ok=True)

pdf = PDF()
pdf.alias_nb_pages()
pdf.add_page()

pdf.set_font('helvetica', 'B', 13)
pdf.set_text_color(27, 42, 74)
pdf.multi_cell(190, 7, clean_text("DOCUMENTATIA PENTRU PRELUNGIREA PERIOADEI DE VALABILITATE A PERMISULUI DE EXERCITARE DE NIVEL 3 (EXPERTI)"), align='C')
pdf.ln(5)

items = [
    "1. Extras din evidenta titularilor/solicitantilor de autorizatii pentru care a oferit consultanta;",
    "2. Raport privind participarea solicitantului, in ultimii 5 ani la cursuri de radioprotectie in calitate de lector sau cursant;",
    "3. Dovada participarii, in perioada de valabilitate a permisului de nivel 3, la elaborarea de standarde, norme, lucrari stiintifice in domeniul radioprotectiei;",
    "4. Raport privind incidente/accidente radiologice petrecute in unitatile pentru care a oferit consultanta, analiza cauzelor care au condus la aparitia acestora precum si masurile corective si preventive care au fost recomandate pentru preintampinarea repetarii unor astfel de evenimente;",
    "5. Raport privind contributia personala la aplicarea principiului ALARA in evaluarile de securitate pe care le-a efectuat;",
    "6. Semnalarea altor observatii, comentarii sau evenimente care merita a fi analizate din punct de vedere al securitatii radiologice;",
    "7. Raport al sanctiunilor primite privind incalcari ale normelor de securitate radiologica."
]

pdf.set_font('helvetica', '', 10)
pdf.set_text_color(30, 30, 30)
for item in items:
    pdf.multi_cell(190, 6, clean_text(item))
    pdf.ln(3)

pdf.output('public/documents/Cerere_Raport_Prelungire_Nivel3.pdf')
print("Cerere_Raport_Prelungire_Nivel3.pdf generated successfully!")
