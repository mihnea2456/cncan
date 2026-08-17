import os
import re

folder = r"E:\documente cncan\Legislatie\norme\norme si ghiduri de securitate nucleara"
files = sorted(os.listdir(folder))

for f in files:
    if not f.endswith(".pdf"):
        continue
    path = os.path.join(folder, f)
    with open(path, "rb") as fp:
        raw = fp.read(100000)
    text = raw.decode("latin1", errors="ignore")
    # also try extracting parentheses in pdf syntax like (Norme privind...)
    pdf_strings = re.findall(r"\(([A-Za-z0-9 \-\.,/;\(\)ăâîșțĂÂÎȘȚ]{10,})\)", text)
    print(f"=== {f} ===")
    matches = []
    for s in pdf_strings:
        if any(w in s for w in ["Norm", "Ordin", "CNCAN", "privind", "securit", "nuclear", "Ghid", "NSN", "CNE"]):
            matches.append(s)
    print(" -> ".join(matches[:4]))
