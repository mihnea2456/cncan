import os
import fitz

folder = r"E:\documente cncan\Legislatie\norme\norme si ghiduri de securitate nucleara"
files = sorted(os.listdir(folder))

for f in files:
    path = os.path.join(folder, f)
    doc = fitz.open(path)
    page_count = len(doc)
    text_len = len(doc[0].get_text())
    imgs = len(doc[0].get_images())
    print(f"{f:<25} | pages: {page_count:<3} | page1_chars: {text_len:<5} | page1_images: {imgs}")
