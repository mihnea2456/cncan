import os
import shutil

source_dir = r"E:\documente cncan\Legislatie\norme\norme constructii"
dest_dir = os.path.abspath("public/documents/legislatie/norme/norme-constructii")

os.makedirs(dest_dir, exist_ok=True)

files = sorted(os.listdir(source_dir))
for f in files:
    if not f.endswith(".pdf"):
        continue
    src_path = os.path.join(source_dir, f)
    if "NCN" in f or "(NCN-01)" in f:
        dest_name = "NCN_01_Norme_Autorizare_Constructii_Nucleare_2005.pdf"
    else:
        dest_name = "NCN_01_Ordin_134_2024_Modificare_Constructii_Nucleare.pdf"
    dest_path = os.path.join(dest_dir, dest_name)
    shutil.copy2(src_path, dest_path)
    print(f"Copied {f.encode('ascii', 'ignore').decode('ascii')} -> {dest_name}")
