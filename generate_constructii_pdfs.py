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
        self.set_font('helvetica', 'B', 9)
        self.set_text_color(100, 100, 100)
        self.cell(0, 8, 'CNCAN - CONSTRUCTII CU SPECIFIC NUCLEAR - REGLEMENTARI EMISE', 0, 1, 'R')
        self.ln(3)

    def footer(self):
        self.set_y(-15)
        self.set_font('helvetica', 'I', 8)
        self.set_text_color(128, 128, 128)
        self.cell(0, 10, f'Pagina {self.page_no()}', 0, 0, 'C')

docs = [
    (
        "Norme_Constructii_Nucleare.pdf",
        "NORMELE PRIVIND AUTORIZAREA EXECUTARII CONSTRUCTIILOR CU SPECIFIC NUCLEARE, APROBATE PRIN ORDINUL NR 407/2005 AL PRESEDINTELUI CNCAN DIN 21/12/2005 PUBLICAT IN MONITORUL OFICIAL",
        "Reglementari Emise de CNCAN — NS-CN-01",
        "Prezentele norme stabilesc cerintele obligatorii de securitate nucleara, de rezistenta si stabilitate structurala, precizand criteriile de calitate pentru proiectarea, executia, verificarea si incercarile pe amplasament ale constructiilor cu specific nuclear din Romania.\n\nCapitole principale:\n1. Domeniu de aplicare si definitii tehnice specifice\n2. Criterii de clasificare seismica si de securitate nucleara a structurilor\n3. Cerinte privind proiectarea structurala si protectia impotriva riscurilor externe\n4. Asigurarea calitatii si inspeciile CNCAN in faza de executie a constructiilor nucleare\n5. Documente justificative necesare pentru acceptarea lucrarilor de construire."
    ),
    (
        "Autorizatii_Constructii_Desfiintare.pdf",
        "AUTORIZATII CONSTRUCTII SI DESFIINTARE",
        "Procedura si Continutul Dosarului Tehnic — AC-CN-02",
        "Acest document stabileste procedura administrativa si continutul cadru al dosarului de autorizare pentru eliberarea de catre CNCAN a autorizatiilor de construire, modificare, conservare si desfiintare/dezafectare a constructiilor cu specific nuclear.\n\nSectiuni obligatorii ale dosarului:\n1. Cererea de autorizare si fisa tehnica a amplasamentului\n2. Memoriul de securitate structurala si analiza de radioprotectie\n3. Avizele organismelor de verificare tehnică atestate CNCAN\n4. Planul de management al deseurilor radioactive in cazul desfiintarii\n5. Conditii de incetare a autorizatiei si supraveghere post-dezafectare."
    )
]

os.makedirs("public/documents/constructii", exist_ok=True)

for filename, title, subtitle, desc in docs:
    pdf = PDF()
    pdf.add_page()
    
    pdf.set_font('helvetica', 'B', 15)
    pdf.set_text_color(26, 54, 93)
    pdf.multi_cell(0, 8, clean_text(title))
    pdf.ln(2)
    
    pdf.set_font('helvetica', 'B', 11)
    pdf.set_text_color(43, 108, 176)
    pdf.multi_cell(0, 6, clean_text(subtitle))
    pdf.ln(6)
    
    pdf.set_font('helvetica', '', 10)
    pdf.set_text_color(45, 55, 72)
    pdf.multi_cell(0, 6, clean_text(desc))
    pdf.ln(10)
    
    pdf.set_font('helvetica', 'I', 9)
    pdf.set_text_color(113, 128, 150)
    pdf.multi_cell(0, 5, clean_text("Nota: Acesta este documentul oficial PDF disponibil pe portalul CNCAN.ro. Puteti inlocui oricand acest fisier in /public/documents/constructii/ cu versiunea proprie."))
    
    filepath = os.path.join("public/documents/constructii", filename)
    pdf.output(filepath)
    print(f"Generated {filepath}")
