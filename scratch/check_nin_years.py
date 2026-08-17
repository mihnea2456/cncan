import os
import fitz

folder = r"E:\documente cncan\Legislatie\norme\norme comune interdepartamentale"
for f in sorted(os.listdir(folder)):
    if not f.endswith(".pdf"):
        continue
    doc = fitz.open(os.path.join(folder, f))
    txt = doc[0].get_text("text")
    lines = [l.strip() for l in txt.split("\n") if len(l.strip()) > 3]
    print(f"=== {f} ===")
    print(" | ".join(lines[:4]))
