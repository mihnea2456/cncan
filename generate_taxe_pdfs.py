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
        self.cell(0, 8, 'CNCAN - FORMULAR TAXE SI TARIFE AUTORIZARE PERSONAL', border=0, align='C', new_x="LMARGIN", new_y="NEXT")
        self.set_draw_color(210, 210, 210)
        self.line(10, 15, 200, 15)
        self.ln(3)

    def footer(self):
        self.set_y(-15)
        self.set_font('helvetica', 'I', 8)
        self.set_text_color(130, 130, 130)
        self.cell(0, 10, f'Pagina {self.page_no()} / {{nb}}  -  CNCAN Portal Oficial (www.cncan.ro)', align='C')

os.makedirs('public/documents/taxe', exist_ok=True)

# 1. Nivel 1
pdf1 = PDF()
pdf1.alias_nb_pages()
pdf1.add_page()
pdf1.set_font('helvetica', 'B', 13)
pdf1.set_text_color(27, 42, 74)
pdf1.multi_cell(190, 7, clean_text("FORMULAR DE TAXE SI TARIFE PENTRU OBTINEREA PERMISULUI DE EXERCITARE DE NIVEL 1"), align='C')
pdf1.ln(5)
pdf1.set_font('helvetica', '', 10)
pdf1.set_text_color(30, 30, 30)
pdf1.multi_cell(190, 6, clean_text("Conform Ordinului CNCAN 155/2005 privind Regulamentul taxelor si tarifelor pentru autorizarea si controlul activitatilor nucleare."))
pdf1.ln(3)
pdf1.multi_cell(190, 6, clean_text("Tarif examinare si eliberare permis Nivel 1: 480 RON (valabilitate 5 ani)."))
pdf1.output('public/documents/taxe/Formular_Taxe_Tarife_Permis_Nivel_1.pdf')

# 2. Nivel 2
pdf2 = PDF()
pdf2.alias_nb_pages()
pdf2.add_page()
pdf2.set_font('helvetica', 'B', 13)
pdf2.set_text_color(27, 42, 74)
pdf2.multi_cell(190, 7, clean_text("FORMULARE DE TAXE SI TARIFE PENTRU OBTINEREA PERMISULUI DE NIVEL 2"), align='C')
pdf2.ln(5)
pdf2.set_font('helvetica', '', 10)
pdf2.set_text_color(30, 30, 30)
pdf2.multi_cell(190, 6, clean_text("Conform Ordinului CNCAN 155/2005 privind Regulamentul taxelor si tarifelor pentru autorizarea si controlul activitatilor nucleare."))
pdf2.ln(3)
pdf2.multi_cell(190, 6, clean_text("Tarif examinare si eliberare permis Nivel 2 (RSR / Responsabil Securitate Radiologica): 480 RON (valabilitate 5 ani)."))
pdf2.output('public/documents/taxe/Formular_Taxe_Tarife_Permis_Nivel_2.pdf')

print("Taxe PDF files generated successfully in public/documents/taxe/")
