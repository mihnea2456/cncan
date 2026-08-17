import fitz
doc = fitz.open(r"E:\documente cncan\Legislatie\norme\norme de minerit radioactiv\NMR-03.pdf")
text = doc[0].get_text("text")
print(text[350:800].encode("ascii", "ignore").decode("ascii"))
