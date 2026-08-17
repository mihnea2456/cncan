import os
import shutil

source_dir = r"E:\documente cncan\Legislatie\norme\norme privind sursele naturale de radiatii"
dest_dir = os.path.abspath("public/documents/legislatie/norme/norme-surse-naturale")

os.makedirs(dest_dir, exist_ok=True)

files = sorted(os.listdir(source_dir))
for f in files:
    if not f.endswith(".pdf"):
        continue
    src_path = os.path.join(source_dir, f)
    if "Metodologie" in f or "radon" in f.lower():
        dest_name = "Metodologie_Determinare_Radon_Ordin_153_2023.pdf"
    else:
        dest_name = "Norme_Securitate_Surse_Naturale_Radiatii_Ordin_316_2018.pdf"
    dest_path = os.path.join(dest_dir, dest_name)
    shutil.copy2(src_path, dest_path)
    print(f"Copied {f.encode('ascii', 'ignore').decode('ascii')} -> {dest_name}")
