import os
import re
import zlib

folder = r"E:\documente cncan\Legislatie\norme\norme si ghiduri de securitate nucleara"
files = sorted(os.listdir(folder))

for f in files:
    if not f.endswith(".pdf"):
        continue
    path = os.path.join(folder, f)
    with open(path, "rb") as fp:
        raw = fp.read()
    
    # find all streams and try to decompress with zlib
    streams = re.findall(rb"stream[\r\n]+(.*?)(?:[\r\n]+endstream)", raw, re.DOTALL)
    extracted_text = []
    for st in streams[:20]:
        try:
            dec = zlib.decompress(st)
            txt = dec.decode("utf-8", errors="ignore")
            lines = [line.strip() for line in txt.split("\n") if len(line.strip()) > 10]
            extracted_text.extend(lines)
        except Exception:
            pass
    
    # filter for titles
    titles = []
    for line in extracted_text:
        clean = re.sub(r"[\[\]\(\)<>\\/TJtjdfo0-9\-\+\.\*]", " ", line)
        clean = " ".join(clean.split())
        if len(clean) > 15 and any(w in clean.lower() for w in ["norme", "ordin", "cncan", "privind", "securit", "nuclear", "ghid", "nsn", "cne", "cerint", "amplasar", "exploatar"]):
            titles.append(clean)
    
    print(f"=== {f} ===")
    if titles:
        safe_str = (" | ".join(titles[:3])).encode('ascii', 'ignore').decode('ascii')
        print("   " + safe_str)
    else:
        print("   (no stream text found)")
