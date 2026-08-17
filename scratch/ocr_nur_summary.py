import os
import fitz
from rapidocr_onnxruntime import RapidOCR

ocr = RapidOCR()
folder = r"E:\documente cncan\Legislatie\norme\norme urgente radiologice"
temp_img = os.path.abspath("scratch/temp_nur_sum.png")

for idx, f in enumerate(sorted(os.listdir(folder))):
    if not f.endswith(".pdf"):
        continue
    path = os.path.join(folder, f)
    doc = fitz.open(path)
    safe_f = f.encode("ascii", "ignore").decode("ascii")
    print(f"=== [{idx}] {safe_f} ===")
    pix = doc[0].get_pixmap(dpi=120)
    pix.save(temp_img)
    res, _ = ocr(temp_img)
    if res:
        text = "\n".join([item[1] for item in res])
        lines = [l.strip() for l in text.split("\n") if l.strip()]
        for line in lines[8:25]:
            print("   ->", line.encode("ascii", "ignore").decode("ascii"))
    print()
