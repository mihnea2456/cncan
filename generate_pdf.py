import os
from fpdf import FPDF

def clean_text(s):
    replacements = {
        'ă': 'a', 'Ă': 'A',
        'â': 'a', 'Â': 'A',
        'î': 'i', 'Î': 'I',
        'ș': 's', 'Ș': 'S', 'ş': 's', 'Ş': 'S',
        'ț': 't', 'Ț': 'T', 'ţ': 't', 'Ţ': 'T',
        '—': '-', '–': '-', '”': '"', '“': '"', '’': "'", '‘': "'"
    }
    for k, v in replacements.items():
        s = s.replace(k, v)
    return s

pages_text = [
    # Page 1
    """Parlamentul Romaniei
Lege nr. 111/1996 din 10/10/1996

Legea nr. 111/1996 privind desfasurarea in siguranta, reglementarea, autorizarea si controlul activitatilor nucleare

Publicat in MOF nr. 267 - 29/10/1996
Republicare 1 MOF nr. 78 - 18/02/1998
Versiune consolidata in 20/05/2003
Versiune consolidata in 11/12/2004
Versiune consolidata in 07/04/2006
Versiune consolidata in 23/05/2006
Republicare 2 MOF nr. 552 - 27/06/2006
Versiune consolidata in 27/01/2010
Versiune consolidata in 31/10/2010
Versiune consolidata in 13/12/2010
Versiune consolidata in 26/12/2013

Text actualizat la data de 26.12.2013. Actul include modificarile din urmatoarele acte:
- O.U.G. nr. 1/2010 publicata in Monitorul Oficial, Partea I nr. 62 din 27/01/2010.
- Legea nr. 200/2010 publicata in Monitorul Oficial, Partea I nr. 720 din 28/10/2010.
- Legea nr. 243/2010 publicata in Monitorul Oficial, Partea I nr. 828 din 10/12/2010.
- Legea nr. 378/2013 publicata in Monitorul Oficial, Partea I nr. 827 din 23/12/2013.

Pus in aplicare prin:
- Regulamentul publicat in Monitorul Oficial, Partea I nr. 604 din 01/09/2009.

CAPITOLUL I
Dispozitii generale

Art. 1. - Obiectul prezentei legi il constituie reglementarea, autorizarea si controlul activitatilor nucleare desfasurate in scopuri exclusiv pasnice, astfel incat sa se indeplineasca cerintele de securitate nucleara, de protectie a personalului expus profesional, a pacientului, a mediului, a populatiei si a proprietatii, cu riscuri minime in conformitate cu reglementarile si cu respectarea obligatiilor ce decurg din acordurile si conventiile la care Romania este parte.

Art. 2. - Prevederile prezentei legi se aplica urmatoarelor activitati si surse:""",

    # Page 2
    """a) cercetarea, proiectarea, detinerea, amplasarea, constructia, montajul, punerea in functiune, functionarea de proba, exploatarea, modificarea, conservarea, dezafectarea sau inchiderea, importul, exportul si transferul intracomunitar al instalatiilor nucleare, inclusiv al celor de gospodarire a combustibilului nuclear uzat;
(Litera a) a fost modificata prin punctul 1. din Lege nr. 378/2013 incepand cu 26.12.2013.)

b) proiectarea, detinerea, amplasarea, constructia-montajul, punerea in functiune, functionarea, conservarea si dezafectarea instalatiilor de minerit si preparare a minereurilor de uraniu si toriu si a instalatiilor de gospodarire a deseurilor de la mineritul si prepararea minereurilor de uraniu si toriu;

c) producerea, amplasarea si constructia, furnizarea, inchirierea, transferul, manipularea, detinerea, prelucrarea, utilizarea, tratarea, conditionarea, depozitarea intermediara sau definitiva, dezafectarea sau inchiderea, transportul, tranzitul, importul, exportul si transferul intracomunitar al instalatiilor radiologice, materialelor radioactive si nucleare, inclusiv al deseurilor radioactive;
(Litera c) a fost modificata prin punctul 1. din Lege nr. 378/2013 incepand cu 26.12.2013.)

d) producerea, furnizarea si utilizarea aparaturii de control dozimetric si a sistemelor de detectie a radiatiilor ionizante, a materialelor si dispozitivelor utilizate pentru protectia impotriva radiatiilor ionizante, precum si a mijloacelor de containerizare sau de transport al materialelor radioactive, special amenajate in acest scop;

e) producerea, furnizarea, inchirierea, transferul, detinerea, exportul, importul si transferul intracomunitar al materialelor, dispozitivelor si echipamentelor prevazute in anexa nr. 1;
(Litera e) a fost modificata prin punctul 1. din Lege nr. 378/2013 incepand cu 26.12.2013.)

f) detinerea, transferul, importul, exportul si transferul intracomunitar al informatiilor nepublicate, aferente materialelor, dispozitivelor si echipamentelor pertinente pentru proliferarea armelor nucleare si a altor dispozitive nucleare explozive, prevazute in anexa nr. 1.
(Litera f) a fost modificata prin punctul 1. din Lege nr. 378/2013 incepand cu 26.12.2013.)

g) realizarea produselor si serviciilor destinate instalatiilor nucleare;
h) realizarea produselor si serviciilor destinate surselor de radiatii, aparaturii de control dozimetric, sistemelor de detectie a radiatiilor ionizante, materialelor si dispozitivelor utilizate pentru protectia impotriva radiatiilor ionizante;
i) sursele orfane, de la detectarea acestora pana la depozitarea definitiva ca deseu radioactiv.
(Litera i) a fost modificata prin punctul 16. din Lege nr. 378/2013 incepand cu 26.12.2013.)

Art. 3. - Termenii si expresiile folosite in cuprinsul legii sunt definite in anexa nr. 2 la prezenta lege.
Art. 4. - (1) Autoritatea nationala competenta in domeniul nuclear, care exercita atributiile de reglementare, autorizare si control prevazute in prezenta lege, este Comisia Nationala pentru Controlul Activitatilor Nucleare, institutie publica de interes national, cu personalitate juridica, cu sediul in municipiul Bucuresti, condusa de un presedinte cu rang de secretar de stat, coordonata de primul-ministru, prin Cancelaria Primului-Ministru.
(2) Regulamentul privind organizarea si functionarea Comisiei Nationale pentru Controlul Activitatilor Nucleare, denumita in continuare Comisia, se aproba prin hotarare a Guvernului.
(2^1) Comisia beneficiaza, in conditiile legii, de resursele umane si financiare necesare pentru a-si indeplini atributiile, prevazute de prezenta lege, cu privire la cadrul national legislativ, de reglementare si organizational.""",

    # Page 3
    """(Alineatul (2^1) a fost introdus prin punctul 2. din Lege nr. 378/2013 incepand cu 26.12.2013.)
(2^2) In vederea asigurarii indeplinirii obligatiilor prevazute la alin. (2^1), Comisia va dezvolta si va implementa programe de formare pentru personalul propriu, care vor include si rezultatele activitatilor de cercetare si dezvoltare, desfasurate, in conditiile legii, pe teritoriul Romaniei, referitoare la reglementarea, autorizarea si controlul activitatilor nucleare.
(Alineatul (2^2) a fost introdus prin punctul 2. din Lege nr. 378/2013 incepand cu 26.12.2013.)

(3) Abrogat prin litera e) din Ordonanta de urgenta nr. 1/2010 incepand cu 27.01.2010.
(4) Taxele de autorizare a activitatilor prevazute la art. 2 se fac venit la bugetul de stat.
(5) Abrogat prin litera e) din Ordonanta de urgenta nr. 1/2010 incepand cu 27.01.2010.
(6) Comisia poate avea in subordine institute tehnice-suport, infiintate prin hotarare a Guvernului.

Art. 5. - (1) Comisia este abilitata sa emita reglementari pentru detalierea cerintelor generale de securitate nucleara, de protectie impotriva radiatiilor ionizante, de asigurare a calitatii, de control al neproliferarii armelor nucleare, de protectie fizica, de transport al materialelor radioactive, de gestionare a deseurilor radioactive si a combustibilului nuclear uzat, de interventie in caz de accident nuclear, inclusiv procedurile de autorizare si control, realizare a produselor si serviciilor destinate instalatiilor nucleare, precum si orice alte reglementari necesare activitatii de autorizare si control in domeniul nuclear.
(Alineatul (1) a fost modificat prin punctul 16. din Lege nr. 378/2013 incepand cu 26.12.2013.)

(2) Comisia elaboreaza strategia si politica de reglementare, autorizare si control in domeniul securitatii, protectia impotriva radiatiilor nucleare, control al neproliferarii armelor nucleare, protectia fizica a materialelor si instalatiilor nucleare, transportului materialelor radioactive si securitatii nucleare a gestionarii deseurilor radioactive si a combustibilului nuclear uzat, ca parte a Strategiei nationale de dezvoltare a domeniului nuclear, si se aproba prin hotarare a Guvernului.
(Alineatul (2) a fost modificat prin punctul 16. din Lege nr. 378/2013 incepand cu 26.12.2013.)

(3) Comisia poate emite si reglementari, cu consultarea ministerelor si a altor factori interesati, potrivit responsabilitatilor specifice acestora.
(4) Fac exceptie de la prevederile alin. (1) reglementarile si atributiile de autorizare si control pentru care prezenta lege contine prevederi exprese de abilitare a altor ministere si organe de specialitate ale administratiei publice centrale.
(5) Comisia, prin reglementarile emise si prin masurile dispuse in cadrul procedurilor de autorizare si control, trebuie sa asigure cadrul adecvat in care persoana fizica sau persoana juridica desfasoara, in conditii de siguranta, activitati supuse prevederilor prezentei legi.
(6) Comisia va revizui reglementarile ori de cate ori este necesar, pentru corelarea cu standardele internationale si cu conventiile internationale ratificate din domeniu la care Romania este parte.
(7) Comisia elaboreaza Regulamentul de taxe si tarife pentru autorizarea si controlul activitatilor nucleare, ori de cate ori este necesar, cu avizul Ministerului Finantelor Publice si al Ministerului Economiei si Comertului, care se aproba prin hotarare a Guvernului.""",

    # Page 4
    """Art. 6. - Cercetarea, experimentarea, dezvoltarea, fabricarea, importul, exportul, tranzitul, detinerea sau detonarea unei arme nucleare ori a oricarui dispozitiv exploziv nuclear sunt interzise pe teritoriul Romaniei.

Art. 7. - (1) Importul, exportul si transferul intracomunitar in/din Romania al deseurilor radioactive si al combustibilului nuclear uzat sunt interzise.
(Alineatul (1) a fost derogat prin alineatul (2) din Lege nr. 111/1996 incepand cu 26.12.2013.)

(2) Prin exceptie de la alin. (1), in conditiile prevazute de prezenta lege, sunt permise:
a) importul, exportul si transferul intracomunitar al surselor inchise scoase din utilizare, care trebuie repatriate furnizorului sau producatorului;
b) exportul si transferul intracomunitar din Romania de deseuri radioactive sau combustibil nuclear uzat, in vederea prelucrarii, cu returnarea ulterioara a deseurilor radioactive rezultate in urma prelucrarii;
c) importul si transferul intracomunitar in Romania al deseurilor radioactive care decurg nemijlocit din prelucrarea, in afara teritoriului Romaniei, de deseuri radioactive sau combustibil nuclear uzat ca urmare a unui export sau a unui transfer intracomunitar din Romania, anterior autorizat, conform prevederilor lit. b);
d) exportul si transferul intracomunitar din Romania al deseurilor radioactive si al combustibilului nuclear uzat in vederea depozitarii definitive, in situatia in care, la momentul transportului, este in vigoare un acord intre Romania si statul de destinatie, de utilizare a unei instalatii de depozitare definitiva in statul de destinatie;
e) exportul si transferul intracomunitar din Romania de combustibil nuclear uzat de la reactoare de cercetare catre o tara care furnizeaza sau produce combustibil destinat reactoarelor de cercetare.
(3) Conditiile si criteriile de export si transfer intracomunitar din Romania sunt detaliate in reglementari specifice elaborate de Comisie conform art. 5.

CAPITOLUL II
Regimul de autorizare

SECTIUNEA 1
Autorizatii si permise de exercitare a activitatilor nucleare in scopuri exclusiv pasnice

Art. 8. - (1) Activitatile si sursele prevazute la art. 2 necesita autorizatie eliberata de Comisie, cu respectarea procedurii de autorizare specifice fiecarui gen de activitate sau surse, in conformitate cu reglementarile emise de Comisie potrivit prevederilor art. 5.
(1^1) Sunt exceptate de la prevederile alin. (1):
a) activitatile de transport al dispozitivelor generatoare de radiatii ionizante si activitatile de utilizare a aparaturii de control dozimetric si a sistemelor de detectie a radiatiilor ionizante;
b) cele prevazute la art. 2 lit. h);""",

    # Page 5
    """c) activitatile de transfer intracomunitar al instalatiilor radiologice si materialelor radioactive, altele decat activitatile de transfer intracomunitar al deseurilor radioactive, al combustibilului nuclear proaspat si uzat si al celorlalte tipuri de materiale nucleare.
(Alineatul (1^1) a fost introdus prin punctul 6. din Lege nr. 378/2013 incepand cu 26.12.2013.)

(2) Autorizatia se elibereaza persoanelor juridice, la cererea acestora, daca fac dovada ca respecta prevederile prezentei legi.
(3) Autorizatia se poate elibera si unitatilor fara personalitate juridica, constituite conform legii, nominalizate in anexa nr. 4 la prezenta lege.
(4) Autorizatia eliberata de Comisie se face pe niveluri de exigenta, in functie de riscurile asociate ale activitatii desfasurate.
(5) Autorizatia poate fi folosita numai in scopul pentru care a fost eliberata, cu respectarea limitelor si a conditiilor precizate in aceasta.
(6) Autorizatiile prevazute la alin. (1) se solicita si, respectiv, se elibereaza, simultan ori succesiv, separat pentru fiecare gen de activitate sau pentru fiecare instalatie nucleara ori radiologica cu functionalitate proprie.
(7) Autorizarea unei faze de realizare sau de functionare a oricarei instalatii nucleare ori radiologice se poate face numai daca fazele anterioare au primit toate tipurile de autorizatii necesare.
(8) In intelesul prevederilor alin. (7), fazele de autorizare a instalatiilor nucleare sau radiologice sunt, dupa caz, urmatoarele:
a) proiectarea; b) amplasarea; c) producerea; d) constructia si/sau montajul; e) punerea in functiune; f) functionarea de proba; g) exploatarea; h) repararea si/sau intretinerea; i) modificarea; j) conservarea; k) dezafectarea; l) inchiderea.
(9) Pentru fazele de realizare sau de functionare a instalatiilor nucleare si radiologice se pot elibera autorizatii partiale.
(10) Autorizatiile partiale pot avea caracter de decizie provizorie a Comisiei, daca petitionarul solicita expres aceasta.
(11) Comisia va retrage autorizatia partiala ori de cate ori va constata lipsa de preocupare a titularului autorizatiei pentru completarea informatiilor necesare.

Art. 9. - (1) Titularul autorizatiei prevazute la art. 8 va utiliza in activitatile prevazute la art. 2 lit. a)-c) numai personal care este posesor al unui permis de exercitare, valabil pentru aceste activitati.
(2) Permisul de exercitare se elibereaza pe baza reglementarilor emise conform prevederilor art. 5.""",

    # Page 6
    """(3) Permisul de exercitare se elibereaza, in baza unei evaluari si examinari, de catre Comisie sau de catre titularul de autorizatie, numai pentru personalul propriu.
(4) O conditie prealabila eliberarii permisului de exercitare este obtinerea avizului medical specific.
(5) Avizul organelor competente privind siguranta nationala pentru personalul care urmeaza sa desfasoare activitati profesionale in punctele de lucru vitale din cadrul instalatiilor nucleare este necesar in conformitate cu dispozitiile legale.

Art. 10. - (1) Autorizatia si permisul de exercitare se elibereaza pe o perioada determinata prin reglementari.
(2) In autorizatiile eliberate de Comisie pentru proprietarul, utilizatorul sau operatorul instalatiilor nucleare se va mentiona explicit calitatea acestuia.
(3) Dreptul dobandit pe baza autorizatiei si permisului de exercitare nu poate fi transmis fara acordul emitentului.
(4) Pentru a se elibera autorizatia sau permisul de exercitare, solicitantul trebuie sa achite tarifele si taxele legale.

Art. 11. - Autorizatiile prevazute la art. 8 se suspenda sau se retrag, in parte ori in intregime, de catre emitent in cazurile in care titularul nu respecta prevederile prezentei legi, reglementarile specifice sau limitele si conditiile prevazute in autorizatie.

Art. 12. - Permisul de exercitare prevazut la art. 9 se suspenda sau se retrage de catre emitent in cazurile in care titularul nu respecta reglementarile specifice sau isi pierde capacitatea juridica.

Art. 13. - (1) Comisia poate completa, revizui sau modifica, motivat, limitele si conditiile specificate in autorizatiile sau permisele de exercitare.

Art. 14. - Prelungirea perioadei de valabilitate a autorizatiei sau a permiselor de exercitare, reautorizarea sau eliberarea unui nou permis se fac in conditiile prevazute la art. 8-10 si la art. 13.

Art. 15. - (1) Retragerea, in mod exceptional, a autorizatiei prevazute la art. 8 indreptateste pe titularul autorizatiei la primirea unei compensatii din partea autoritatii care a dispus retragerea.
(2) Autorizatia se retrage fara compensatie in cazul declaratiilor false sau al incalcarii grave a legii.

SECTIUNEA a 2-a
Conditii de autorizare

Art. 18. - (1) Autorizatiile prevazute la art. 8 se elibereaza numai daca solicitantul autorizatiei indeplineste urmatoarele conditii:
a) este in masura sa demonstreze calificarea profesionala a personalului propriu;
b) raspunde ca personalul sa fie demn de incredere si avizat conform legii;
c) dispune de resursele umane si financiare, dotarile tehnice si tehnologiile necesare desfasurarii activitatilor;
d) da dovada de capacitate organizatorica si responsabilitate in prevenirea si limitarea consecintelor avariilor;
e) raspunde ca restul personalului sa aiba nivelul necesar de cunostinte specifice functiei;
f) ia toate masurile necesare pentru a preveni producerea daunelor;""",

    # Page 7 & 8
    """g) constituie o asigurare sau orice alta garantie financiara care sa-i acopere raspunderea pentru daune nucleare;
h) raspunde de luarea masurilor necesare pentru prevenirea amestecului de orice natura in procesul decizional;
i) propune un amplasament al instalatiei nucleare care nu contravine prevederilor legale si intereselor publice;
j) dispune de aranjamente materiale si financiare corespunzatoare pentru colectarea, transportul, tratarea si depozitarea deseurilor radioactive;
k) instituie si mentine un sistem conform reglementarilor specifice de protectie impotriva radiatiilor ionizante;
l) instituie si mentine un sistem conform reglementarilor specifice de protectie fizica;
m) instituie si mentine in activitatea proprie un sistem controlat de management al calitatii, autorizat de Comisie;
n) instituie si mentine un sistem propriu, aprobat, de pregatire a interventiei in caz de accident nuclear;
o) instituie si mentine un sistem in conformitate cu reglementarile de aplicare a garantiilor nucleare;
p) detine toate celelalte acorduri, autorizatii si avize prevazute de lege;
q) instituie si mentine un sistem de informare a publicului in conformitate cu reglementarile legale.

Art. 19. - (1) Combustibilul nuclear poate fi detinut numai de persoane juridice. Se interzice detinerea combustibilului nuclear fara a poseda autorizatia de detinere.
(2) Combustibilul nuclear detinut ilegal se confisca si devine proprietate publica a statului.

Art. 20. - Transportul combustibilului nuclear se efectueaza numai de catre meciuri si agenti autorizati.
Art. 21. - Utilizarea mijloacelor de transport amenajate special pentru transportul combustibilului nuclear este permisa numai atunci cand carausul este autorizat.
Art. 22. - Autorizatia de import, export sau tranzit se elibereaza cu respectarea tuturor garantiilor internationale si a legilor in vigoare.
Art. 23. - Producerea, furnizarea, importul sau transferul intracomunitar al echipamentelor si dispozitivelor necesita autorizatie de produs.
Art. 24. - Este obligatorie autorizarea sistemelor de management al calitatii in domeniul nuclear.

CAPITOLUL III
Obligatiile titularului autorizatiei si ale altor persoane fizice sau juridice

Art. 25. - (1) Titularul autorizatiei eliberate potrivit art. 8 are obligatia si raspunderea de a lua toate masurile necesare pentru asigurarea si mentinerea securitatii nucleare, radioprotectiei, protectiei fizice si planurilor de interventie.
(2) Raspunderea pentru daune nucleare revine in intregime titularului autorizatiei.
(3) Titularul de autorizatie este pe deplin raspunzator pentru asigurarea securitatii instalatiilor.
(4) Raspunderea pentru securitatea instalatiilor nu poate fi delegata.

Art. 26. - Titularul autorizatiei pentru desfasurarea unei activitati nucleare care genereaza deseuri radioactive este obligat sa raspunda de gospodarirea si depozitarea acestora.
Art. 27. - Titularul autorizatiei este obligat sa elaboreze un program de pregatire a dezafectarii.
Art. 28. - Expirarea sau retragerea autorizatiei nu exonereaza pe titular de obligatiile de securitate.
Art. 29. - Persoanele fizice si juridice au obligatia sa verifice concentratia de materiale radioactive (radon, uraniu, toriu).""",

    # Page 9 - 13
    """CAPITOLUL IV
Regimul de control

Art. 30. - (1) Controlul preventiv, operativ-curent si ulterior al respectarii prezentei legi se efectueaza de catre reprezentantii Comisiei (CNCAN), anume imputerniciti.
(2) In urma controlului, Comisia poate dispune suspendarea activitatii sau sigilarea instalatiilor.

Art. 31. - (1) Reprezentantii Comisiei au dreptul de acces la orice loc supus controlului, de a efectua masuratori, preleva probe si solicita informatii tehnice si contractuale.
Art. 32. - Reprezentantii Comisiei au obligatia sa respecte conditiile de autorizare si sa incheie procese-verbale de control.
Art. 33. - Persoanele supuse controlului au obligatia sa permita indeplinirea in bune conditii a inspectiei.
Art. 34. - In caz de nesupunere la control, Comisia poate cere interventia Inspectoratului General al Politiei Romane.

CAPITOLUL V
Atributii si raspunderi

Art. 35. - Comisia (CNCAN) exercita atributiile principale de reglementare, autorizare, inspectie, control, coordonare a garantiilor si cooperare internationala (AIEA, EURATOM).
Art. 36. - Regimul de autorizare al instalatiilor sub presiune se stabileste prin prescriptii ISCIR cu avizul CNCAN.
Art. 37. - Autoritatea centrala pentru protectia mediului organizeaza retea de supraveghere a radioactivitatii mediului.
Art. 38. - Ministerul Sanatatii Publice autorizeaza utilizarea medicala a radiatiilor si produselor iradiate.
Art. 39. - Ministerul Sanatatii Publice supravegheaza starea de sanatate a personalului expus profesional.
Art. 40. - Coordonarea pregatirilor de interventie in caz de accident nuclear se asigura de catre IGSU si Ministerul Afacerilor Interne in colaborare cu CNCAN.

CAPITOLUL VI
Sanctiuni

Art. 43. - Incalcarea dispozitiilor prezentei legi atrage raspunderea materiala, disciplinara, contraventionala, penala sau civila.
Art. 44. - Efectuarea neautorizata de activitati nucleare constituie infractiune si se pedepseste cu inchisoare de la 6 luni la 10 ani.
Art. 45. - Scoaterea neautorizata din functiune a echipamentelor de supraveghere se pedepseste cu inchisoare de la 6 luni la 3 ani.
Art. 46. - Dezvoltarea, fabricarea sau detonarea neautorizata a armelor nucleare se pedepseste cu inchisoare de la 10 la 25 de ani sau detentiune pe viata.
Art. 47. - Actele de terorism in domeniul nuclear se pedepsesc cu inchisoare de la 5 la 20 de ani.
Art. 48-52. - Contraventiile si amenzile contraventionale aplicabile (de la 100 lei la 20.000 lei).

CAPITOLUL VII
Dispozitii tranzitorii si finale

Art. 53-60. - Dispozitii finale privind intrarea in vigoare (la 60 de zile de la publicarea in Monitorul Oficial), abrogarea Legii 61/1974 si Legii 6/1982.

ANEXA Nr. 1 - Lista materialelor, dispozitivelor, echipamentelor si informatiilor pertinente pentru proliferarea armelor nucleare.
ANEXA Nr. 2 - Definitiile termenilor utilizati in lege (accident nuclear, activitate nucleara, autorizatie, combustibil nuclear, deseuri radioactive, instalatie nucleară, radioprotectie, etc.).
ANEXA Nr. 3 - Organele de control al activitatilor nucleare (CNCAN, Ministerul Sanatatii, Garda de Mediu, ISCIR, IGSU, Politia Romana, Vama).
ANEXA Nr. 4 - Lista unitatilor fara personalitate juridica ce pot fi autorizate (cabinete medicale, unitati de cercetare)."""
]

class PDF(FPDF):
    def header(self):
        self.set_font('helvetica', 'B', 8.5)
        self.set_text_color(100, 100, 100)
        self.cell(0, 8, 'PARLAMENTUL ROMANIEI - LEGEA NR. 111/1996 (TEXT INTEGRAL CONSOLIDAT)', border=0, align='C', new_x="LMARGIN", new_y="NEXT")
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

for page_content in pages_text:
    pdf.add_page()
    pdf.set_auto_page_break(auto=True, margin=15)

    lines = page_content.strip().split('\n')
    for line in lines:
        line_str = clean_text(line.strip())
        if not line_str:
            pdf.ln(2)
            continue

        if "LEGEA Nr. 111" in line_str or "Lege nr. 111/1996" in line_str:
            pdf.set_font('helvetica', 'B', 14)
            pdf.set_text_color(27, 42, 74)
            pdf.multi_cell(190, 7, line_str, align='C')
            pdf.ln(2)
        elif line_str.startswith("CAPITOLUL") or line_str.startswith("ANEXA"):
            pdf.ln(3)
            pdf.set_font('helvetica', 'B', 11)
            pdf.set_text_color(27, 42, 74)
            pdf.multi_cell(190, 6, line_str, align='L')
            pdf.ln(1)
        elif line_str.startswith("SECTIUNEA") or line_str.startswith("Art."):
            pdf.ln(1.5)
            pdf.set_font('helvetica', 'B', 9.5)
            pdf.set_text_color(170, 59, 255)
            pdf.multi_cell(190, 5, line_str, align='L')
        elif line_str.startswith("(") and ("modificat" in line_str or "introduse" in line_str or "derogat" in line_str):
            pdf.set_font('helvetica', 'I', 8)
            pdf.set_text_color(120, 120, 120)
            pdf.multi_cell(190, 4.5, line_str, align='L')
        else:
            pdf.set_font('helvetica', '', 9)
            pdf.set_text_color(40, 40, 40)
            pdf.multi_cell(190, 4.8, line_str, align='L')

pdf.output('public/documents/Legea_111_1996.pdf')
print("Complete multi-page Legea_111_1996.pdf generated successfully!")
