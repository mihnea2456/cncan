import os
import shutil

source_dir = r"E:\documente cncan\Legislatie\norme\norme de securitate cibernetica"
dest_dir = os.path.abspath("public/documents/legislatie/norme/norme-cibernetica")

os.makedirs(dest_dir, exist_ok=True)

files = sorted(os.listdir(source_dir))
for f in files:
    if not f.endswith(".pdf"):
        continue
    src_path = os.path.join(source_dir, f)
    dest_name = "NSC_01_Norme_Securitate_Cibernetica_Ordin_203_2021.pdf"
    dest_path = os.path.join(dest_dir, dest_name)
    shutil.copy2(src_path, dest_path)
    print(f"Copied {f.encode('ascii', 'ignore').decode('ascii')} -> {dest_name}")
