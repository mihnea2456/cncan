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
        self.cell(0, 8, 'CNCAN - EXAMEN PERMIS DE EXERCITARE SURSE DE RADIATII IONIZANTE', border=0, align='C', new_x="LMARGIN", new_y="NEXT")
        self.set_draw_color(210, 210, 210)
        self.line(10, 15, 200, 15)
        self.ln(3)

    def footer(self):
        self.set_y(-15)
        self.set_font('helvetica', 'I', 8)
        self.set_text_color(130, 130, 130)
        self.cell(0, 10, f'Pagina {self.page_no()} / {{nb}}  -  CNCAN Portal Oficial (www.cncan.ro)', align='C')

os.makedirs('public/documents/intrebari', exist_ok=True)

exam_files = [
    # Nivel 1
    ("Examen_N1_Generatori_RX.pdf", "EXAMEN NIVEL 1", "Activitati cu risc radiologic nesemnificativ", "Tehnici nucleare - Activitati cu generatori RX"),
    ("Examen_N1_Surse_Deschise.pdf", "EXAMEN NIVEL 1", "Activitati cu risc radiologic nesemnificativ", "Tehnici nucleare - surse deschise"),
    ("Examen_N1_Surse_Inchise.pdf", "EXAMEN NIVEL 1", "Activitati cu risc radiologic nesemnificativ", "Tehnici nucleare - surse inchise"),
    
    # Nivel 2 - Radiodiagnostic
    ("Examen_N2_Rontgendiagnostic.pdf", "EXAMEN NIVEL 2", "Radiodiagnostic", "Rontgendiagnostic"),
    ("Examen_N2_Rontgendiagnostic_Dentar.pdf", "EXAMEN NIVEL 2", "Radiodiagnostic", "Rontgendiagnostic dentar"),
    ("Examen_N2_Ftiziologie.pdf", "EXAMEN NIVEL 2", "Radiodiagnostic", "Ftiziologie"),
    ("Examen_N2_Medicina_Nucleara.pdf", "EXAMEN NIVEL 2", "Radiodiagnostic", "Medicina nucleara"),
    ("Examen_N2_Radiologie_Interventionala.pdf", "EXAMEN NIVEL 2", "Radiodiagnostic", "Radiologie interventionala"),
    
    # Nivel 2 - Radioterapie
    ("Examen_N2_Rontgenterapie.pdf", "EXAMEN NIVEL 2", "Radioterapie", "Rontgenterapie"),
    ("Examen_N2_Terapie_Surse_Deschise.pdf", "EXAMEN NIVEL 2", "Radioterapie", "Terapie cu surse deschise"),
    ("Examen_N2_Terapie_Acceleratori.pdf", "EXAMEN NIVEL 2", "Radioterapie", "Terapie, terapie cu acceleratori de particule"),
    ("Examen_N2_Curieterapie_Brachiterapie.pdf", "EXAMEN NIVEL 2", "Radioterapie", "Curieterapie (brachiterapie)"),
    
    # Nivel 2 - Complex
    ("Examen_N2_Igiena_Radiatiilor.pdf", "EXAMEN NIVEL 2", "Complex", "Igiena radiatiilor"),
    
    # Nivel 2 - Generatori de radiatii
    ("Examen_N2_Generatori_Instalatii_Medicale.pdf", "EXAMEN NIVEL 2", "Generatori de radiatii", "Montare, reparare, intretinere, verificare - instalatii medicale"),
    ("Examen_N2_Generatori_Instalatii_Industriale.pdf", "EXAMEN NIVEL 2", "Generatori de radiatii", "Montare, reparare, intretinere, verificare - instalatii industriale"),
    ("Examen_N2_Control_Nedistructiv.pdf", "EXAMEN NIVEL 2", "Generatori de radiatii", "Control nedistructiv"),
    ("Examen_N2_Analize_Fizice.pdf", "EXAMEN NIVEL 2", "Generatori de radiatii", "Analize fizice"),
    ("Examen_N2_Rontgendiagnostic_Veterinar.pdf", "EXAMEN NIVEL 2", "Generatori de radiatii", "Rontgendiagnostic veterinar"),
    ("Examen_N2_Control_Bagaje_RX.pdf", "EXAMEN NIVEL 2", "Generatori de radiatii", "Control nedistructiv - control bagaje RX"),

    # Nivel 2 - Surse inchise de radiatii
    ("Examen_N2_SurseInchise_Instalatii_Medicale.pdf", "EXAMEN NIVEL 2", "Surse inchise de radiatii", "Montare, reparare, intretinere, verificare - instalatii medicale"),
    ("Examen_N2_SurseInchise_Instalatii_Industriale.pdf", "EXAMEN NIVEL 2", "Surse inchise de radiatii", "Montare, reparare, intretinere, verificare - instalatii industriale"),
    ("Examen_N2_SurseInchise_Control_Nedistructiv.pdf", "EXAMEN NIVEL 2", "Surse inchise de radiatii", "Control nedistructiv"),
    ("Examen_N2_SurseInchise_Iradieri_Materiale.pdf", "EXAMEN NIVEL 2", "Surse inchise de radiatii", "Iradieri materiale"),
    ("Examen_N2_SurseInchise_Alte_Aplicatii.pdf", "EXAMEN NIVEL 2", "Surse inchise de radiatii", "Alte aplicatii"),
    ("Examen_N2_SurseInchise_Control_Bagaje.pdf", "EXAMEN NIVEL 2", "Surse inchise de radiatii", "Control nedistructiv - control bagaje sisteme inchise"),

    # Nivel 2 - Surse deschise de radiatii
    ("Examen_N2_SurseDeschise_Montare.pdf", "EXAMEN NIVEL 2", "Surse deschise de radiatii", "Montare, reparare, intretinere, verificare"),
    ("Examen_N2_SurseDeschise_Radiochimie.pdf", "EXAMEN NIVEL 2", "Surse deschise de radiatii", "Radiochimie"),
    ("Examen_N2_SurseDeschise_Marcari.pdf", "EXAMEN NIVEL 2", "Surse deschise de radiatii", "Marcari"),

    # Nivel 2 - Acceleratori de particule
    ("Examen_N2_Acceleratori_Particule.pdf", "EXAMEN NIVEL 2", "Acceleratori de particule", "Acceleratori de particule"),
]

for filename, level, domeniu, specialitate in exam_files:
    pdf = PDF()
    pdf.alias_nb_pages()
    pdf.add_page()
    
    pdf.set_font('helvetica', 'B', 14)
    pdf.set_text_color(27, 42, 74)
    pdf.multi_cell(190, 7, clean_text(f"SET INTREBARI SI GRILE DE EXAMINARE"), align='C')
    pdf.set_font('helvetica', 'B', 12)
    pdf.set_text_color(170, 59, 255)
    pdf.multi_cell(190, 6, clean_text(level), align='C')
    pdf.ln(4)
    
    pdf.set_font('helvetica', 'B', 10)
    pdf.set_text_color(40, 40, 40)
    pdf.cell(190, 6, clean_text(f"Domeniul: {domeniu}"), new_x="LMARGIN", new_y="NEXT")
    pdf.cell(190, 6, clean_text(f"Specialitatea: {specialitate}"), new_x="LMARGIN", new_y="NEXT")
    pdf.ln(6)
    
    pdf.set_font('helvetica', 'I', 9.5)
    pdf.set_text_color(80, 80, 80)
    pdf.multi_cell(190, 5, clean_text("Document oficial CNCAN pentru pregatirea in vederea obtinerii Permisului de Exercitare in domeniul Surse de Radiatii Ionizante."))
    pdf.ln(5)
    
    questions = [
        "1. Care sunt limitele de doza echivalenta stabilite de normele CNCAN pentru personalul expus profesional?",
        "2. Descrieti masurile de securitate radiologic si procedurile de operare pentru domeniul specificat.",
        "3. Care sunt obligatiile titularului de permis de exercitare in cazul depasirii dozei maxime admise?",
        "4. Specificati modalitatea de raportare catre RNDSR si procedurile in caz de urgenta radiologica."
    ]
    
    pdf.set_font('helvetica', '', 9.5)
    pdf.set_text_color(30, 30, 30)
    for q in questions:
        pdf.multi_cell(190, 5, clean_text(q))
        pdf.ln(3)
        
    pdf.output(f'public/documents/intrebari/{filename}')

print(f"Generated {len(exam_files)} exam question PDF files successfully in public/documents/intrebari/")
