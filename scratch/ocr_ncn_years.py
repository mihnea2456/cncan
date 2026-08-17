import os
import fitz
from rapidocr_onnxruntime import RapidOCR

ocr = RapidOCR()
folder = r"E:\documente cncan\Legislatie\norme\norme constructii"
temp_img = os.path.abspath("scratch/temp_ncn.png")

for idx, f in enumerate(sorted(os.listdir(folder))):
    if not f.endswith(".pdf"):
        continue
    path = os.path.join(folder, f)
    doc = fitz.open(path)
    text = doc[0].get_text("text").strip()
    if len(text) < 50:
        pix = doc[0].get_pixmap(dpi=110)
        pix.save(temp_img)
        res, _ = ocr(temp_img)
        if res:
            text = " ".join([item[1] for item in res])
        else:
            text = ""
    lines = [l.strip() for l in text.split("\n") if l.strip()]
    safe_out = (" | ".join(lines[:10])).encode("ascii", "ignore").decode("ascii")
    safe_f = f.encode("ascii", "ignore").decode("ascii")
    print(f"=== [{idx}] {safe_f} ===")
    print(f"   {safe_out}\n")
