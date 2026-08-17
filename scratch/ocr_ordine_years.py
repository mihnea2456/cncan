import os
import fitz
from rapidocr_onnxruntime import RapidOCR

ocr = RapidOCR()
folder = r"E:\documente cncan\Legislatie\norme"
temp_img = os.path.abspath("scratch/temp_ordine.png")

files = [
    "Ordin-96-din-20130001.pdf",
    "Ordin-nr.-1-2015-din-06-ianuarie-2015.pdf",
    "Ordinul-1552017.pdf",
    "Ordinul-1762017.pdf",
    "Ordinul-14-2018-pt-aprobarea-Procedurii-privind-cerintele-de-eliberare-a-avizelor-pt-programele-de-pregatire-in-protectie-radiologica.pdf.pdf"
]

for idx, f in enumerate(files):
    path = os.path.join(folder, f)
    if not os.path.exists(path):
        print(f"NOT FOUND: {f}")
        continue
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
    print(f"=== [{idx}] {f} ===")
    print(f"   {safe_out}\n")
