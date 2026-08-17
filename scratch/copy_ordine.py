import os
import shutil

source_dir = r"E:\documente cncan\Legislatie\norme"
dest_dir = os.path.abspath("public/documents/legislatie/norme/ordine")

os.makedirs(dest_dir, exist_ok=True)

mapping = {
    "Ordin-96-din-20130001.pdf": "Ordin_96_2013_Modificare_Norme_Dozimetrie_Individuala.pdf",
    "Ordin-nr.-1-2015-din-06-ianuarie-2015.pdf": "Ordin_01_2015_Lista_Organisme_Dozimetrie_Individuala.pdf",
    "Ordinul-1552017.pdf": "Ordin_155_2017_Procedura_Autorizare_ELI_NP.pdf",
    "Ordinul-1762017.pdf": "Ordin_176_2017_Cerinte_Autorizare_Instalatii_Radiologice.pdf",
    "Ordinul-14-2018-pt-aprobarea-Procedurii-privind-cerintele-de-eliberare-a-avizelor-pt-programele-de-pregatire-in-protectie-radiologica.pdf.pdf": "Ordin_14_2018_Avize_Programe_Pregatire_Radioprotectie.pdf"
}

count = 0
for orig, dest in mapping.items():
    src_path = os.path.join(source_dir, orig)
    dest_path = os.path.join(dest_dir, dest)
    if os.path.exists(src_path):
        shutil.copy2(src_path, dest_path)
        count += 1
        print(f"Copied {orig} -> {dest}")
    else:
        print(f"WARNING: Not found {orig}")

print(f"Total CNCAN orders copied: {count}")
