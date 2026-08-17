import os
import re
from pypdf import PdfReader

folder = r"E:\documente cncan\Legislatie\norme\norme si ghiduri de securitate nucleara"
files = sorted(os.listdir(folder))

for f in files:
    if not f.endswith(".pdf"):
        continue
    path = os.path.join(folder, f)
    try:
        reader = PdfReader(path)
        text = ""
        for i in range(min(2, len(reader.pages))):
            page_text = reader.pages[i].extract_text() or ""
            text += " " + page_text
        
        # clean text
        lines = [line.strip() for line in text.split("\n") if line.strip()]
        
        # Look for the title: typically starting with "NORME", "ORDIN", "GHID", "REGLEMENTARE"
        title_lines = []
        capture = False
        for line in lines:
            if any(k in line.upper() for k in ["NORME", "ORDIN", "GHID", "REGLEMENTARE", "HOTĂRÂRE", "NSN-"]):
                capture = True
            if capture:
                title_lines.append(line)
                if len(title_lines) >= 4 or len(" ".join(title_lines)) > 250:
                    break
        
        full_title = " ".join(title_lines)
        if not full_title:
            full_title = " ".join(lines[:4])
        
        # replace multiple spaces and clean non-ascii for console print
        full_title = " ".join(full_title.split())
        safe_print = full_title.encode("ascii", "ignore").decode("ascii")
        print(f"=== {f} ===")
        print(f"    {safe_print}\n")
    except Exception as e:
        print(f"=== {f} === [ERROR: {e}]\n")
