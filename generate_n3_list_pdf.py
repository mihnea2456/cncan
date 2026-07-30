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
        self.cell(0, 8, 'CNCAN - REGISTRUL NATIONAL AL EXPERTILOR ACREDITATI (NIVEL 3)', border=0, align='C', new_x="LMARGIN", new_y="NEXT")
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
pdf.multi_cell(190, 7, clean_text("LISTA POSESORILOR PERMISULUI DE EXERCITARE NIVEL 3"), align='C')
pdf.set_font('helvetica', 'I', 9)
pdf.set_text_color(100, 100, 100)
pdf.multi_cell(190, 5, clean_text("Registrul Oficial CNCAN al Experților în Protecție Radiologică și Fizică Medicală (Acreditați Nivel 3)"), align='C')
pdf.ln(5)

# Table Header
pdf.set_font('helvetica', 'B', 8.5)
pdf.set_fill_color(27, 42, 74)
pdf.set_text_color(255, 255, 255)
pdf.cell(10, 7, "Nr", border=1, align='C', fill=True)
pdf.cell(45, 7, "Nume si Prenume", border=1, align='L', fill=True)
pdf.cell(32, 7, "Nr. Permis N3", border=1, align='C', fill=True)
pdf.cell(60, 7, "Domeniul / Specialitatea", border=1, align='L', fill=True)
pdf.cell(23, 7, "Valabilitate", border=1, align='C', fill=True)
pdf.cell(20, 7, "Status", border=1, align='C', fill=True, new_x="LMARGIN", new_y="NEXT")

# Sample data
persons = [
    ("Dr. Popescu Ion", "CNCAN-N3-2024-001", "Radioprotectie - Instalatii Medicale", "2024 - 2029", "ACTIV"),
    ("Dr. Ionescu Elena", "CNCAN-N3-2024-002", "Fizica Medicala - Radioterapie", "2024 - 2029", "ACTIV"),
    ("Ing. Radu Gheorghe", "CNCAN-N3-2023-014", "Expert Radioprotectie - Defectoscopie", "2023 - 2028", "ACTIV"),
    ("Dr. Dumitrescu Maria", "CNCAN-N3-2023-028", "Fizica Medicala - Medicina Nucleara", "2023 - 2028", "ACTIV"),
    ("Ing. Stoica Alexandru", "CNCAN-N3-2022-005", "Expert Radioprotectie - Generatori RX", "2022 - 2027", "ACTIV"),
    ("Dr. Marin Cristiana", "CNCAN-N3-2022-019", "Radiodiagnostic si Radiologie Interv.", "2022 - 2027", "ACTIV"),
    ("Ing. Vasile Mihai", "CNCAN-N3-2021-042", "Surse Inchise si Deschise Industriale", "2021 - 2026", "ACTIV"),
    ("Dr. Stanescu Dan", "CNCAN-N3-2021-055", "Acceleratori de Particule Medicali", "2021 - 2026", "ACTIV"),
    ("Ing. Petrescu Laura", "CNCAN-N3-2025-003", "Expert Radioprotectie Complex", "2025 - 2030", "ACTIV"),
    ("Dr. Constantinescu Victor", "CNCAN-N3-2025-010", "Fizica Medicala - Brachiterapie", "2025 - 2030", "ACTIV"),
]

pdf.set_font('helvetica', '', 8)
pdf.set_text_color(30, 30, 30)

for idx, (nume, permis, domeniu, val, status) in enumerate(persons, start=1):
    fill = (idx % 2 == 0)
    if fill:
        pdf.set_fill_color(240, 243, 248)
    else:
        pdf.set_fill_color(255, 255, 255)
        
    pdf.cell(10, 6, str(idx), border=1, align='C', fill=True)
    pdf.cell(45, 6, clean_text(nume), border=1, align='L', fill=True)
    pdf.cell(32, 6, clean_text(permis), border=1, align='C', fill=True)
    pdf.cell(60, 6, clean_text(domeniu), border=1, align='L', fill=True)
    pdf.cell(23, 6, clean_text(val), border=1, align='C', fill=True)
    pdf.cell(20, 6, clean_text(status), border=1, align='C', fill=True, new_x="LMARGIN", new_y="NEXT")

pdf.output('public/documents/Lista_Posesorilor_Permisului_de_Exercitare_Nivel_3.pdf')
print("Lista_Posesorilor_Permisului_de_Exercitare_Nivel_3.pdf generated successfully!")
