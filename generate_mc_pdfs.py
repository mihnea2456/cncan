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
        self.cell(0, 8, 'CNCAN - ANEXA LA NORMELE DE MANAGEMENTUL CALITATII (ORDIN 65/2003)', border=0, align='C', new_x="LMARGIN", new_y="NEXT")
        self.set_draw_color(210, 210, 210)
        self.line(10, 15, 200, 15)
        self.ln(3)

    def footer(self):
        self.set_y(-15)
        self.set_font('helvetica', 'I', 8)
        self.set_text_color(130, 130, 130)
        self.cell(0, 10, f'Pagina {self.page_no()} / {{nb}}  -  CNCAN Portal Oficial (www.cncan.ro)', align='C')

os.makedirs('public/documents', exist_ok=True)

# -------------------------------------------------------------
# 1. CERERE AUTORIZARE SMC (Anexa 1)
# -------------------------------------------------------------
cerere_text = """ANEXA Nr. 1
la Normele privind cerintele de autorizare pentru sistemele de management al calitatii aplicate la realizarea, functionarea si dezafectarea instalatiilor nucleare

MODEL CERERE AUTORIZARE

DOMNULE PRESEDINTE,

Subsemnatul, .................................................... cu functia de ....................................
reprezentantul imputernicit al .............................. (denumirea organizatiei) .............................
cu sediul in: tara ......... localitatea ......... judetul/sector .............. str. ...................., nr. ........., cod ..............
va rog sa dispuneti autorizarea sistemului de management al calitatii conform prevederilor Legii nr. 111/1996, privind desfasurarea in siguranta a activitatilor nucleare, cu modificarile si completarile ulterioare si Normelor privind autorizarea sistemelor de management al calitatii aplicate la realizarea, functionarea si dezafectarea instalatiilor nucleare, pentru urmatoarele activitati:
........................................................................................................................
incadrate in clasa de aplicare acordata sistemului de management al calitatii pentru activitatile de fabricare a produselor si de furnizare a serviciilor destinate instalatiilor nucleare.

Prin prezenta, va asiguram ca toate prevederile sistemului de management al calitatii sunt implementate in conformitate cu cerintele:
* Legii 111/1996, privind desfasurarea in siguranta a activitatilor nucleare, cu modificarile si completarile ulterioare;
* Normelor privind autorizarea sistemelor de management al calitatii aplicate la realizarea, functionarea si dezafectarea instalatiilor nucleare;
* Normelor privind cerintele generale pentru sistemele de management al calitatii aplicate la realizarea, functionarea si dezafectarea instalatiilor nucleare;
* Normelor privind cerintele specifice pentru sistemele de management (se completeaza numele normelor aplicabile),
si toate celelalte prevederi legale, in cadrul ..................................................................

Anexam la prezenta urmatoarele documente:
a) Chestionar tip, completat;
b) Manualul calitatii si procedurile proceselor manageriale ale organizatiei responsabile;
c) Procedura pentru clasificarea structurilor, sistemelor, echipamentelor, componentelor, proceselor si serviciilor in functie de importanta lor pentru securitatea nucleara;
d) Procedura de elaborare a planului calitatii (dupa caz);
e) Planurile anuale de audit intern si planurile de audit la participanti sau contractori, inclusiv subfurnizorii acestora;
f) Documentul prin care este desemnata persoana responsabila pentru stabilirea si implementarea sistemului de management al calitatii, precum si numarul atestatului/autorizatiei emise de CNCAN;
g) Lista personalului entitatii organizatorice cu responsabilitatea evaluarii independente a sistemului de management al calitatii;
h) Documentul prin care este desemnata persoana care coordoneaza activitatea de constructii-montaj, punere in functiune sau dezafectarea;
i) Documentul prin care este desemnata persoana care coordoneaza activitatea de autoevaluare a managementului;
j) Copie dupa Certificatul de Inmatriculare la Camera de Comert si Industrie;
k) Copie dupa Statutul societatii si a hotararii de infiintare;
l) Copie dupa ordinele de plata pentru achitarea taxei si tarifului prevazute de Legea nr. 111/1996;
m) Copii dupa certificarile sistemului de management al calitatii (daca este cazul).

REPREZENTANTUL IMPUTERNICIT AL ORGANIZATIEI SOLICITANTE
(nume, functie, semnatura, stampila)
"""

pdf1 = PDF()
pdf1.alias_nb_pages()
pdf1.add_page()
pdf1.set_auto_page_break(auto=True, margin=15)

for line in cerere_text.strip().split('\n'):
    l = clean_text(line.strip())
    if not l:
        pdf1.ln(2)
        continue
    if "MODEL CERERE AUTORIZARE" in l or "DOMNULE PRESEDINTE" in l:
        pdf1.set_font('helvetica', 'B', 12)
        pdf1.set_text_color(27, 42, 74)
        pdf1.multi_cell(190, 6, l, align='C')
        pdf1.ln(2)
    elif l.startswith("ANEXA") or l.startswith("REPREZENTANTUL"):
        pdf1.set_font('helvetica', 'B', 10)
        pdf1.set_text_color(170, 59, 255)
        pdf1.multi_cell(190, 5.5, l, align='C' if "REPREZENTANTUL" in l else 'L')
    else:
        pdf1.set_font('helvetica', '', 9.5)
        pdf1.set_text_color(40, 40, 40)
        pdf1.multi_cell(190, 5, l)

pdf1.output('public/documents/Cerere_Autorizare_SMC_Model_Anexa1.pdf')
print("Cerere_Autorizare_SMC_Model_Anexa1.pdf generated successfully!")

# -------------------------------------------------------------
# 2. CHESTIONAR EVALUARE SMC (Anexa 2)
# -------------------------------------------------------------
chestionar_text = """Anexa nr. 2 la Normele privind cerintele de autorizare pentru sistemele de management al calitatii aplicate la realizarea, functionarea si dezafectarea instalatiilor nucleare

MODEL CHESTIONAR DE EVALUARE SMC

1. Denumirea organizatiei: ................................................................................................................
2. Adresa:
   - Tara: ........................................... Localitatea: ...................................................
   - Judet/Sector: .............................. Strada: ..................................................... nr: .......... Cod: ............
3. Telefon: .......................................... Fax: ................................................................
4. E-mail: ............................................
5. Filiale / Unitati / Sectii / Puncte de lucru: ...............................................................................
6. Cod unic de inregistrare la Registrul Comertului (CUI): ................................................................
7. Documentul pe baza caruia s-a infiintat societatea: ......................................................................
8. Statutul autentificat cu nr: .............................. din data de: .................... de catre: ........................
9. Activitatea desfasurata (profil, caracteristici): .........................................................................
10. Experienta in activitate: ............................................................................................................
11. Experienta in domeniul nuclear: ................................................................................................
12. Echipa manageriala (Nume, prenume, functie):
    ........................................................................................................................................
13. Personal (calificari, experienta, atestate, autorizatii):
    ........................................................................................................................................
14. Personal de evaluare independenta a sistemului de management al calitatii:
    ........................................................................................................................................
15. Cifra de afaceri pe ultimii 3 ani: ...................................................................................................
16. Resurse tehnice si materiale: ...................................................................................................
17. Lista principalilor clienti si a activitatilor contractate: ..............................................................
18. Lista principalilor furnizori: .....................................................................................................
19. Spatii si capacitati: ..................................................................................................................
20. Capabilitate tehnica (dotare, calificare, atestate, autorizatii CNCAN):
    ........................................................................................................................................

CONFIRMAT ORGANIZATIA RESPONSABILA
(nume, functie, semnatura, stampila)
"""

pdf2 = PDF()
pdf2.alias_nb_pages()
pdf2.add_page()
pdf2.set_auto_page_break(auto=True, margin=15)

for line in chestionar_text.strip().split('\n'):
    l = clean_text(line.strip())
    if not l:
        pdf2.ln(2)
        continue
    if "MODEL CHESTIONAR DE EVALUARE SMC" in l or "CONFIRMAT ORGANIZATIA" in l:
        pdf2.set_font('helvetica', 'B', 12)
        pdf2.set_text_color(27, 42, 74)
        pdf2.multi_cell(190, 6, l, align='C')
        pdf2.ln(2)
    elif l.startswith("Anexa nr. 2"):
        pdf2.set_font('helvetica', 'B', 10)
        pdf2.set_text_color(170, 59, 255)
        pdf2.multi_cell(190, 5.5, l, align='L')
    else:
        pdf2.set_font('helvetica', '', 9.5)
        pdf2.set_text_color(40, 40, 40)
        pdf2.multi_cell(190, 5, l)

pdf2.output('public/documents/Chestionar_Evaluare_SMC_Model_Anexa2.pdf')
print("Chestionar_Evaluare_SMC_Model_Anexa2.pdf generated successfully!")
