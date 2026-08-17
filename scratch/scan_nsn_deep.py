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
    
    # find all streams
    streams = re.findall(rb"stream[\r\n]+(.*?)(?:[\r\n]+endstream)", raw, re.DOTALL)
    text_lines = []
    for st in streams:
        try:
            dec = zlib.decompress(st)
            # check if it looks like content stream with TJ/Tj/Td
            txt = dec.decode("latin1", errors="ignore")
            # extract string literals in parentheses (...)
            parens = re.findall(r"\(([^\(\)\\]{3,})\)", txt)
            for p in parens:
                clean = re.sub(r"[\000-\037]", "", p).strip()
                if len(clean) > 3:
                    text_lines.append(clean)
        except Exception:
            pass
    
    print(f"=== {f} ===")
    # find lines that have keywords
    keywords = ["norm", "ghid", "securit", "nuclear", "amplasar", "cne", "exploat", "proiecta", "calita", "react", "cercetar", "deseur", "incendi", "dezas"]
    matched = [l for l in text_lines if any(k in l.lower() for k in keywords) and len(l) > 10]
    # unique preserving order
    seen = set()
    uniq = []
    for m in matched:
        if m not in seen:
            seen.add(m)
            uniq.append(m)
    safe_out = " | ".join(uniq[:10]).encode("ascii", "ignore").decode("ascii")
    print("   " + safe_out)
