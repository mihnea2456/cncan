import os

file_path = os.path.abspath("src/routes/legislatie.tsx")
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

start_marker = "  // 2.14 Norme de securitate cibernetică în domeniul nuclear"
end_marker = "  // 3. GHIDURI"

start_idx = content.find(start_marker)
end_idx = content.rfind(end_marker)

if start_idx == -1 or end_idx == -1 or end_idx <= start_idx:
    print("MARKERS NOT FOUND OR INVALID!")
else:
    clean_block = """  // 2.14 Norme de securitate cibernetică în domeniul nuclear
  {
    no: "NSC-01 (Ordin 203/2021)",
    type: "Normă Securitate Cibernetică",
    title_ro: "NSC-01 — Norme privind protecția instalațiilor nucleare împotriva amenințărilor cibernetice (Ordin 203/2021)",
    title_en: "NSC-01 — Norms on Cyber Security Protection of Nuclear Installations against Cyber Threats (Order 203/2021)",
    year: 2021,
    catId: "norme",
    subCatId: "norme-cibernetica",
    pdfUrl: "/documents/legislatie/norme/norme-cibernetica/NSC_01_Norme_Securitate_Cibernetica_Ordin_203_2021.pdf",
  },
  // 2.15 Ordinul nr. 96/2013 privind modificarea și completarea Normelor de dozimetrie individuală
  {
    no: "Ordinul 96/2013",
    type: "Ordin / Dozimetrie",
    title_ro: "Ordinul nr. 96/2013 privind modificarea și completarea Normelor de dozimetrie individuală și monitorizare a personalului",
    title_en: "Order no. 96/2013 amending and supplementing Individual Dosimetry and Personnel Monitoring Norms",
    year: 2013,
    catId: "norme",
    subCatId: "ordin-96-2013",
    pdfUrl: "/documents/legislatie/norme/ordine/Ordin_96_2013_Modificare_Norme_Dozimetrie_Individuala.pdf",
  },
  // 2.16 Ordinul nr. 1/2015 din 06 ianuarie 2015
  {
    no: "Ordinul 1/2015",
    type: "Ordin / Lista Organisme Acreditate",
    title_ro: "Ordinul nr. 1/2015 din 06 ianuarie 2015 — Lista organismelor de dozimetrie individuală acreditate de CNCAN",
    title_en: "Order no. 1/2015 of January 6, 2015 — List of individual dosimetry bodies accredited by CNCAN",
    year: 2015,
    catId: "norme",
    subCatId: "ordin-1-2015",
    pdfUrl: "/documents/legislatie/norme/ordine/Ordin_01_2015_Lista_Organisme_Dozimetrie_Individuala.pdf",
  },
  // 2.17 Ordinul nr. 155/2017 ELI-NP
  {
    no: "Ordinul 155/2017",
    type: "Ordin / ELI-NP",
    title_ro: "Ordinul nr. 155/2017 pentru aprobarea Procedurii privind cerințele de autorizare pentru instalația de cercetare ELI-NP (Fizică nucleară)",
    title_en: "Order no. 155/2017 approving the Licensing Procedure for Extreme Light Infrastructure - Nuclear Physics (ELI-NP)",
    year: 2017,
    catId: "norme",
    subCatId: "ordin-155-2017-eli-np",
    pdfUrl: "/documents/legislatie/norme/ordine/Ordin_155_2017_Procedura_Autorizare_ELI_NP.pdf",
  },
  // 2.18 Ordinul nr. 176/2017
  {
    no: "Ordinul 176/2017",
    type: "Ordin CNCAN",
    title_ro: "Ordinul nr. 176/2017 privind aprobarea cerințelor de autorizare a activității de manipulare a instalațiilor radiologice",
    title_en: "Order no. 176/2017 approving licensing requirements for handling radiological equipment",
    year: 2017,
    catId: "norme",
    subCatId: "ordin-176-2017",
    pdfUrl: "/documents/legislatie/norme/ordine/Ordin_176_2017_Cerinte_Autorizare_Instalatii_Radiologice.pdf",
  },
  // 2.19 Ordinul nr. 14/2018
  {
    no: "Ordinul 14/2018",
    type: "Ordin / Avize",
    title_ro: "Ordinul nr. 14/2018 pentru aprobarea Procedurii privind cerințele de eliberare a avizelor pentru programele de pregătire în protecție radiologică",
    title_en: "Order no. 14/2018 approving the Procedure for issuing approvals for radiation protection training programs",
    year: 2018,
    catId: "norme",
    subCatId: "ordin-14-2018",
    pdfUrl: "/documents/legislatie/norme/ordine/Ordin_14_2018_Avize_Programe_Pregatire_Radioprotectie.pdf",
  },

  // =========================================================================
  // 3. GHIDURI"""
    new_content = content[:start_idx] + clean_block + content[end_idx:]
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_content)
    print("SUCCESSFULLY CLEANED AND RESTORED WITH RFIND!")
