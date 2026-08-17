import os
import fitz
from rapidocr_onnxruntime import RapidOCR

ocr = RapidOCR()
path = r"E:\documente cncan\Legislatie\norme\norma de protectie fizica in domeniul nuclear\npf03.pdf"
doc = fitz.open(path)
text = doc[0].get_text("text").strip()
if len(text) < 50:
    temp_img = os.path.abspath("scratch/temp_npf03.png")
    pix = doc[0].get_pixmap(dpi=150)
    pix.save(temp_img)
    res, _ = ocr(temp_img)
    if res:
        text = " ".join([item[1] for item in res])
    else:
        text = ""
lines = [l.strip() for l in text.split("\n") if l.strip()]
safe_out = (" | ".join(lines[:8])).encode("ascii", "ignore").decode("ascii")
print("=== npf03.pdf ===")
print(f"   {safe_out}")
