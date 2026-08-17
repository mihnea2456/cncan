import os
import fitz
from rapidocr_onnxruntime import RapidOCR

ocr = RapidOCR()
folder = r"E:\documente cncan\Legislatie\norme\norme comune interdepartamentale"
temp_img = os.path.abspath("scratch/temp_nin.png")

for f in sorted(os.listdir(folder)):
    if not f.endswith(".pdf"):
        continue
    path = os.path.join(folder, f)
    doc = fitz.open(path)
    text = doc[0].get_text("text").strip()
    if len(text) < 50:
        pix = doc[0].get_pixmap(dpi=150)
        pix.save(temp_img)
        res, _ = ocr(temp_img)
        if res:
            text = " ".join([item[1] for item in res])
        else:
            text = ""
    lines = [l.strip() for l in text.split("\n") if l.strip()]
    safe_out = (" | ".join(lines[:6])).encode("ascii", "ignore").decode("ascii")
    print(f"=== {f} ===")
    print(f"   {safe_out}\n")
