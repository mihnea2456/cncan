import os
import fitz

folder = r"E:\documente cncan\Legislatie\norme\norme urgente radiologice"
for idx, f in enumerate(sorted(os.listdir(folder))):
    if not f.endswith(".pdf"):
        continue
    path = os.path.join(folder, f)
    doc = fitz.open(path)
    text = ""
    for page_num in range(min(3, len(doc))):
        t = doc[page_num].get_text("text").strip()
        if t:
            text += " " + t
    safe_f = f.encode("ascii", "ignore").decode("ascii")
    print(f"=== [{idx}] {safe_f} ===")
    safe_t = text[:600].replace("\n", " ").encode("ascii", "ignore").decode("ascii")
    print(f"   {safe_t}\n")
