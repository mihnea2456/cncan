import os
import re

folder = r"E:\documente cncan\Legislatie\norme\norme si ghiduri de securitate nucleara"
files = sorted(os.listdir(folder))

for f in files:
    path = os.path.join(folder, f)
    with open(path, "rb") as fp:
        raw = fp.read()
    
    txt = raw.decode("latin1", errors="ignore")
    # search for /Title (...) or /Title <...>
    title_m = re.search(r"/Title\s*[\(<]([^\)>]+)[\)>]", txt)
    subj_m = re.search(r"/Subject\s*[\(<]([^\)>]+)[\)>]", txt)
    
    t = title_m.group(1) if title_m else ""
    s = subj_m.group(1) if subj_m else ""
    
    # Clean hex or ascii
    def clean_val(v):
        if not v:
            return ""
        if v.startswith("FEFF") or re.match(r"^[0-9A-Fa-f]+$", v):
            try:
                b = bytes.fromhex(v)
                return b.decode("utf-16be", errors="ignore")
            except Exception:
                pass
        return re.sub(r"[\000-\037]", "", v)
    
    print(f"{f:<24} | Title: {clean_val(t):<50} | Subject: {clean_val(s)}")
