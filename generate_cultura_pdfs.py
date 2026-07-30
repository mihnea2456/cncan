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
        self.cell(0, 8, 'CNCAN - INSTALATII NUCLEARE - CULTURA DE SECURITATE NUCLEARA', 0, 1, 'R')
        self.ln(3)

    def footer(self):
        self.set_y(-15)
        self.set_font('helvetica', 'I', 8)
        self.set_text_color(128, 128, 128)
        self.cell(0, 10, f'Pagina {self.page_no()}', 0, 0, 'C')

docs = [
    (
        "Cultura_de_Securitate_Nucleara.pdf",
        "CULTURA DE SECURITATE NUCLEARA",
        "Ghid si Principii Fundamentale - CNCAN Romania",
        "Acest document descrie cerintele, angajamentul managementului, atitudinea de interogare (questioning attitude), comunicarea transparenta si procesele organizationale care compun o cultura sanatoasa de securitate nucleara in cadrul instalatiilor nucleare din Romania, conform reglementarilor CNCAN si standardelor AIEA.\n\nPrincipii cheie:\n1. Angajamentul conducerii pentru securitate nucleara\n2. Atitudinea interogativa si vigilenta continua\n3. Mediul deschis si respectuos pentru semnalarea problemelor\n4. Comunicarea transparenta a valorilor de securitate\n5. Invatarea continua si analiza experientei operationale."
    ),
    (
        "Traits_of_a_Healthy_Nuclear_Safety_Culture.pdf",
        "TRAITS OF A HEALTHY NUCLEAR SAFETY CULTURE",
        "INPO / WANO / IAEA Alignment Document",
        "This document details the core traits of a healthy nuclear safety culture:\n\n- Personal Accountability: All individuals take personal responsibility for safety.\n- Questioning Attitude: Individuals avoid complacency and continuously challenge existing conditions.\n- Safety Communication: Communications maintain a focus on safety.\n- Leadership Safety Values and Actions: Leaders demonstrate a commitment to safety in their decisions and behaviors.\n- Decision-Making: Decisions that support or affect nuclear safety are systematic and thorough.\n- Respectful Work Environment: Trust and respect permeate the organization.\n- Continuous Learning: Opportunities to learn are valued and sought out.\n- Problem Identification and Resolution: Issues potentially affecting safety are promptly identified, fully evaluated, and promptly corrected.\n- Environment for Raising Concerns: A safety-conscious work environment is maintained where personnel feel free to raise safety concerns without fear of retaliation."
    ),
    (
        "Traits_of_a_Healthy_Nuclear_Safety_Culture_Addendum_I.pdf",
        "TRAITS OF A HEALTHY NUCLEAR SAFETY CULTURE - ADDENDUM I",
        "Supplementary Guidelines & Behavioral Attributes",
        "Addendum I provides detailed behavioral attributes, assessment methodologies, and practical examples for evaluating and strengthening safety culture traits across operations, maintenance, and technical support teams at nuclear facilities.\n\nSection 1: Assessment Methodologies\nSection 2: Behavioral Observation Indicators\nSection 3: Contractor and Partner Safety Culture Integration\nSection 4: Periodic Safety Culture Review Checklists."
    ),
    (
        "Traits_of_a_Healthy_Nuclear_Safety_Culture_Addendum_II.pdf",
        "TRAITS OF A HEALTHY NUCLEAR SAFETY CULTURE - ADDENDUM II",
        "Case Studies & Cross-Functional Integration",
        "Addendum II focuses on cross-functional alignment, supplier safety culture integration, contractor oversight, and historical case studies illustrating the critical importance of maintaining safety margin and vigilant oversight.\n\nKey contents:\n- Lessons learned from international operating experience\n- Cross-functional communication protocols\n- Oversight of external vendors and suppliers in nuclear safety activities."
    )
]

os.makedirs("public/documents/cultura", exist_ok=True)

for filename, title, subtitle, desc in docs:
    pdf = PDF()
    pdf.add_page()
    
    pdf.set_font('helvetica', 'B', 16)
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
    pdf.multi_cell(0, 5, clean_text("Nota: Acesta este documentul PDF pregatit pentru portalul CNCAN.ro. Puteti inlocui oricand acest fisier in public/documents/cultura/ cu documentatia dorita."))
    
    filepath = os.path.join("public/documents/cultura", filename)
    pdf.output(filepath)
    print(f"Generated {filepath}")
