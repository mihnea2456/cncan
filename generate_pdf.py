import os
from fpdf import FPDF

class PDF(FPDF):
    def header(self):
        self.set_font('helvetica', 'B', 9)
        self.set_text_color(100, 100, 100)
        self.cell(0, 8, 'PARLAMENTUL ROMANIEI - LEGEA NR. 111/1996 (CONSOLIDATA)', border=0, align='C', new_x="LMARGIN", new_y="NEXT")
        self.set_draw_color(200, 200, 200)
        self.line(10, 18, 200, 18)
        self.ln(5)

    def footer(self):
        self.set_y(-15)
        self.set_font('helvetica', 'I', 8)
        self.set_text_color(128, 128, 128)
        self.cell(0, 10, f'Pagina {self.page_no()}/{{nb}} - CNCAN Portal Oficial', align='C')

os.makedirs('public/documents', exist_ok=True)

pdf = PDF()
pdf.alias_nb_pages()
pdf.add_page()
pdf.set_auto_page_break(auto=True, margin=15)

# Title Header
pdf.set_font('helvetica', 'B', 15)
pdf.set_text_color(27, 42, 74)
pdf.cell(0, 10, 'LEGEA Nr. 111 / 10.10.1996', align='C', new_x="LMARGIN", new_y="NEXT")

pdf.set_font('helvetica', 'B', 10.5)
pdf.set_text_color(170, 59, 255)
pdf.multi_cell(190, 6, 'privind desfasurarea in siguranta, reglementarea, autorizarea si controlul activitatilor nucleare', align='C')
pdf.ln(3)

# Meta info
pdf.set_font('helvetica', 'I', 8.5)
pdf.set_text_color(100, 100, 100)
meta_text = (
    "Publicat in Monitorul Oficial nr. 267 / 29.10.1996 | Republicat 1 in MOF nr. 78 / 18.02.1998\n"
    "Republicat 2 in Monitorul Oficial nr. 552 / 27.06.2006\n"
    "Versiune consolidata la data de 26.12.2013 (include modificarile OUG 1/2010, Legea 200/2010, Legea 243/2010, Legea 378/2013)"
)
pdf.multi_cell(190, 5, meta_text, align='C')
pdf.ln(4)

pdf.set_draw_color(170, 59, 255)
pdf.line(10, pdf.get_y(), 200, pdf.get_y())
pdf.ln(6)

# Main Text
text_content = """CAPITOLUL I - Dispozitii generale

Art. 1. - Obiectul prezentei legi il constituie reglementarea, autorizarea si controlul activitatilor nucleare desfasurate in scopuri exclusiv pasnice, astfel incat sa se indeplineasca cerintele de securitate nucleara, de protectie a personalului expus profesional, a pacientului, a mediului, a populatiei si a proprietatii, cu riscuri minime in conformitate cu reglementarile si cu respectarea obligatiilor ce decurg din acordurile si conventiile la care Romania este parte.

Art. 2. - Prevederile prezentei legi se aplica urmatoarelor activitati si surse:
a) cercetarea, proiectarea, detinerea, amplasarea, constructia, montajul, punerea in functiune, functionarea de proba, exploatarea, modificarea, conservarea, dezafectarea sau inchiderea, importul, exportul si transferul intracomunitar al instalatiilor nucleare, inclusiv al celor de gospodarire a combustibilului nuclear uzat;
b) proiectarea, detinerea, amplasarea, constructia-montajul, punerea in functiune, functionarea, conservarea si dezafectarea instalatiilor de minerit si preparare a minereurilor de uraniu si toriu si a instalatiilor de gospodarire a deseurilor de la mineritul si prepararea minereurilor de uraniu si toriu;
c) producerea, amplasarea si constructia, furnizarea, inchirierea, transferul, manipularea, detinerea, prelucrarea, utilizarea, tratarea, conditionarea, depozitarea intermediara sau definitiva, dezafectarea sau inchiderea, transportul, tranzitul, importul, exportul si transferul intracomunitar al instalatiilor radiologice, materialelor radioactive si nucleare, inclusiv al deseurilor radioactive;
d) producerea, furnizarea si utilizarea aparaturii de control dozimetric si a sistemelor de detectie a radiatiilor ionizante, a materialelor si dispozitivelor utilizate pentru protectia impotriva radiatiilor ionizante, precum si a mijloacelor de containerizare sau de transport al materialelor radioactive, special amenajate in acest scop;
e) producerea, furnizarea, inchirierea, transferul, detinerea, exportul, importul si transferul intracomunitar al materialelor, dispozitivelor si echipamentelor prevazute in anexa nr. 1;
f) detinerea, transferul, importul, exportul si transferul intracomunitar al informatiilor nepublicate, aferente materialelor, dispozitivelor si echipamentelor pertinente pentru proliferarea armelor nucleare si a altor dispozitive nucleare explozive, prevazute in anexa nr. 1;
g) realizarea produselor si serviciilor destinate instalatiilor nucleare;
h) realizarea produselor si serviciilor destinate surselor de radiatii, aparaturii de control dozimetric, sistemelor de detectie a radiatiilor ionizante, materialelor si dispozitivelor utilizate pentru protectia impotriva radiatiilor ionizante;
i) sursele orfane, de la detectarea acestora pana la depozitarea definitiva ca deseu radioactiv.

Art. 3. - Termenii si expresiile folosite in cuprinsul legii sunt definite in anexa nr. 2 la prezenta lege.

Art. 4. - (1) Autoritatea nationala competenta in domeniul nuclear, care exercita atributiile de reglementare, autorizare si control prevazute in prezenta lege, este Comisia Nationala pentru Controlul Activitatilor Nucleare (CNCAN), institutie publica de interes national, cu personalitate juridica, cu sediul in municipiul Bucuresti, condusa de un presedinte cu rang de secretar de stat, coordonata de primul-ministru, prin Cancelaria Primului-Ministru.
(2) Regulamentul privind organizarea si functionarea Comisiei Nationale pentru Controlul Activitatilor Nucleare se aproba prin hotarare a Guvernului.

CAPITOLUL II - Regimul de autorizare

SECTIUNEA 1 - Autorizatii si permise de exercitare
Art. 8. - (1) Activitatile si sursele prevazute la art. 2 necesita autorizatie eliberata de Comisie, cu respectarea procedurii de autorizare specifice fiecarui gen de activitate sau surse, in conformitate cu reglementarile emise de Comisie potrivit prevederilor art. 5.
(2) Autorizatia se elibereaza persoanelor juridice, la cererea acestora, daca fac dovada ca respecta prevederile prezentei legi.

SECTIUNEA a 2-a - Conditii de autorizare
Art. 18. - (1) Autorizatiile prevazute la art. 8 se elibereaza numai daca solicitantul autorizatiei indeplineste urmatoarele conditii:
a) este in masura sa demonstreze calificarea profesionala, pe functii, a personalului propriu;
b) raspunde ca personalul sa fie demn de incredere si avizat conform legii;
c) dispune de resursele umane si financiare, dotarile tehnice si tehnologiile necesare;
d) da dovada de capacitate organizatorica in prevenirea si limitarea consecintelor avariilor;
e) instituie si mentine un sistem conform reglementarilor specifice de protectie impotriva radiatiilor ionizante;
f) instituie si mentine un sistem controlat de management al calitatii, autorizat de Comisie.

CAPITOLUL III - Obligatiile titularului autorizatiei
Art. 25. - (1) Titularul autorizatiei eliberate potrivit art. 8 are obligatia si raspunderea de a lua toate masurile necesare pentru asigurarea securitatii nucleare, radioprotectiei si protectiei fizice.
Art. 26. - Titularul autorizatiei pentru desfasurarea unei activitati nucleare care genereaza deseuri radioactive este obligat sa raspunda pentru gospodarirea deseurilor radioactive generate din activitatea proprie.

CAPITOLUL IV - Regimul de control
Art. 30. - (1) Controlul preventiv, operativ-curent si ulterior al respectarii prevederilor prezentei legi se efectueaza de catre reprezentantii Comisiei (CNCAN), anume imputerniciti.

CAPITOLUL V - Atributii si raspunderi
Art. 35. - Comisia exercita atributii de reglementare, autorizare, inspectie si control al activitatilor nucleare din Romania.

CAPITOLUL VI - Sactiuni
Art. 43-52. - Incalcarea dispozitiilor prezentei legi atrage raspunderea materiala, disciplinara, contraventionala sau penala, dupa caz.

CAPITOLUL VII - Dispozitii tranzitorii si finale
Art. 53-60. - Reglementari privind intrarea in vigoare, abrogarea legislatiei anterioare (Legea 61/1974, Legea 6/1982) si punerea in aplicare.

ANEXA Nr. 1 - Lista materialelor, dispozitivelor si echipamentelor
ANEXA Nr. 2 - Definitiile termenilor utilizati in lege
ANEXA Nr. 3 - Organele de control al activitatilor nucleare
ANEXA Nr. 4 - Lista unitatilor fara personalitate juridica ce pot fi autorizate
"""

pdf.set_font('helvetica', '', 9.5)
pdf.set_text_color(30, 30, 30)

for line in text_content.strip().split('\n'):
    if line.startswith("CAPITOLUL") or line.startswith("ANEXA"):
        pdf.ln(3)
        pdf.set_font('helvetica', 'B', 11)
        pdf.set_text_color(27, 42, 74)
        pdf.cell(0, 7, line, new_x="LMARGIN", new_y="NEXT")
        pdf.set_font('helvetica', '', 9.5)
        pdf.set_text_color(30, 30, 30)
    elif line.startswith("SECTIUNEA") or line.startswith("Art."):
        pdf.ln(2)
        pdf.set_font('helvetica', 'B', 10)
        pdf.set_text_color(170, 59, 255)
        pdf.multi_cell(190, 5.5, line)
        pdf.set_font('helvetica', '', 9.5)
        pdf.set_text_color(30, 30, 30)
    elif line.strip() == "":
        pdf.ln(2)
    else:
        pdf.multi_cell(190, 5, line)

pdf.output('public/documents/Legea_111_1996.pdf')
print("PDF Legea_111_1996.pdf generated successfully!")
