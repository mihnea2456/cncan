import os
import fitz
from rapidocr_onnxruntime import RapidOCR

ocr = RapidOCR()
folder = r"E:\documente cncan\Legislatie\norme\norme urgente radiologice"
temp_img = os.path.abspath("scratch/temp_nur_p1.png")

for idx, f in enumerate(sorted(os.listdir(folder))):
    if not f.endswith(".pdf"):
        continue
    path = os.path.join(folder, f)
    doc = fitz.open(path)
    safe_f = f.encode("ascii", "ignore").decode("ascii")
    print(f"=== [{idx}] {safe_f} ===")
    for p_num in range(min(4, len(doc))):
        pix = doc[p_num].get_pixmap(dpi=100)
        pix.save(temp_img)
        res, _ = ocr(temp_img)
        text = ""
        if res:
            text = " ".join([item[1] for item in res])
        if "Comisia" in text or "Ordin" in text or "Hotarare" in text or "Norm" in text or "Regulament" in text:
            safe_t = text[:600].encode("ascii", "ignore").decode("ascii")
            print(f"   [page {p_num}] {safe_t}\n")
            break
