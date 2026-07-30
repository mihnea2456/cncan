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
        self.cell(0, 8, 'CNCAN - SISTEMUL DE AUTORIZARE A ACTIVITATILOR CU SURSE', border=0, align='C', new_x="LMARGIN", new_y="NEXT")
        self.set_draw_color(210, 210, 210)
        self.line(10, 15, 200, 15)
        self.ln(3)

    def footer(self):
        self.set_y(-15)
        self.set_font('helvetica', 'I', 8)
        self.set_text_color(130, 130, 130)
        self.cell(0, 10, f'Pagina {self.page_no()} / {{nb}}  -  CNCAN Portal Oficial (www.cncan.ro)', align='C')

os.makedirs('public/documents/autorizare', exist_ok=True)

docs = [
    ("Durata_Valabilitate_Autorizatie.pdf", "DURATA DE VALABILITATE A AUTORIZATIEI SI A INREGISTRARII", "Reglementari privind perioada de valabilitate a autorizatiilor eliberate de CNCAN conform Legii 111/1996 si Normelor NSR-01."),
    ("Prelungire_Reautorizare_Modificare.pdf", "PRELUNGIREA, REAUTORIZAREA, MODIFICAREA AUTORIZATIILOR", "Procedura legala si documentatia tehnica necesara pentru prelungirea, reautorizarea sau modificarea autorizatiilor existente."),
    ("Regimul_de_Sanctionare.pdf", "REGIMUL DE SANCTIONARE", "Prevederi contraventionale si penale privind nerespectarea conditiilor si limitelor din autorizatiile eliberate de CNCAN."),
    ("Incetarea_Activitatii.pdf", "INCETAREA ACTIVITATII", "Cerințe de securitate radiologica si proceduri de dezafectare, casare si decontaminare la incetarea activitatii autorizate.")
]

for filename, title, desc in docs:
    pdf = PDF()
    pdf.alias_nb_pages()
    pdf.add_page()
    
    pdf.set_font('helvetica', 'B', 13)
    pdf.set_text_color(27, 42, 74)
    pdf.multi_cell(190, 7, clean_text(title), align='C')
    pdf.ln(4)
    
    pdf.set_font('helvetica', 'I', 9.5)
    pdf.set_text_color(80, 80, 80)
    pdf.multi_cell(190, 5, clean_text(desc))
    pdf.ln(5)
    
    pdf.set_font('helvetica', '', 9.5)
    pdf.set_text_color(30, 30, 30)
    pdf.multi_cell(190, 5.5, clean_text("Conform Legii nr. 111/1996 privind desfasurarea in siguranta a activitatilor nucleare, republicata, cu modificarile si completarile ulterioare si a Normelor de securitate radiologica CNCAN."))

    pdf.output(f'public/documents/autorizare/{filename}')

print(f"Generated {len(docs)} autorizare PDF files in public/documents/autorizare/")
