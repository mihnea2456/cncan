import os
import fitz

folder = r"E:\documente cncan\Legislatie\norme"
files = [
    "Ordin-96-din-20130001.pdf",
    "Ordin-nr.-1-2015-din-06-ianuarie-2015.pdf",
    "Ordinul-1552017.pdf",
    "Ordinul-1762017.pdf",
    "Ordinul-14-2018-pt-aprobarea-Procedurii-privind-cerintele-de-eliberare-a-avizelor-pt-programele-de-pregatire-in-protectie-radiologica.pdf.pdf"
]

for idx, f in enumerate(files):
    path = os.path.join(folder, f)
    doc = fitz.open(path)
    text = doc[0].get_text("text").strip()
    lines = [l.strip() for l in text.split("\n") if l.strip()]
    safe_out = (" | ".join(lines[:12])).encode("ascii", "ignore").decode("ascii")
    print(f"=== [{idx}] {f} (len={len(text)}) ===")
    print(f"   {safe_out}\n")
