import os
import fitz
from rapidocr_onnxruntime import RapidOCR

ocr = RapidOCR()
folder = r"E:\documente cncan\Legislatie\norme\norme urgente radiologice"
temp_img = os.path.abspath("scratch/temp_nur.png")

for idx, f in enumerate(sorted(os.listdir(folder))):
    if not f.endswith(".pdf"):
        continue
    path = os.path.join(folder, f)
    doc = fitz.open(path)
    safe_f = f.encode("ascii", "ignore").decode("ascii")
    print(f"=== [{idx}] {safe_f} (pages: {len(doc)}) ===")
    pix = doc[0].get_pixmap(dpi=100)
    pix.save(temp_img)
    res, _ = ocr(temp_img)
    text = ""
    if res:
        text = " ".join([item[1] for item in res])
    safe_t = text[:500].encode("ascii", "ignore").decode("ascii")
    print(f"   {safe_t}\n")
