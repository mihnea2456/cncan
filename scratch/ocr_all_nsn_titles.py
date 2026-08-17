import os
import fitz
from rapidocr_onnxruntime import RapidOCR

ocr = RapidOCR()
folder = r"E:\documente cncan\Legislatie\norme\norme si ghiduri de securitate nucleara"
files = sorted(os.listdir(folder))
temp_img = os.path.abspath("scratch/temp_p1.png")

for f in files:
    if not f.endswith(".pdf"):
        continue
    path = os.path.join(folder, f)
    try:
        doc = fitz.open(path)
        text = doc[0].get_text("text").strip()
        if len(text) < 50:
            pix = doc[0].get_pixmap(dpi=150)
            pix.save(temp_img)
            result, _ = ocr(temp_img)
            if result:
                text = " ".join([item[1] for item in result])
            else:
                text = ""
        
        lines = [l.strip() for l in text.split("\n") if l.strip()]
        if not lines:
            # if single line from ocr
            lines = [l.strip() for l in text.split(".") if l.strip()]
            
        title_lines = []
        capture = False
        for l in lines:
            lu = l.upper()
            if any(k in lu for k in ["NORME", "ORDIN", "GHID", "REGLEMENTARE", "HOTĂRÂRE", "NSN", "COMISIA", "PRIVIND", "ART."]):
                capture = True
            if capture:
                title_lines.append(l)
                if len(title_lines) >= 6 or len(" ".join(title_lines)) > 300:
                    break
        
        title = " ".join(title_lines)
        if not title:
            title = text[:300]
        
        title = " ".join(title.split())
        safe_out = title.encode("ascii", "ignore").decode("ascii")
        print(f"=== {f} ===")
        print(f"    {safe_out}\n")
    except Exception as e:
        print(f"=== {f} === [ERROR: {e}]\n")
