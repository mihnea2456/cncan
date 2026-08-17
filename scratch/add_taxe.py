import os

file_path = os.path.abspath("src/routes/legislatie.tsx")
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

items_target = "export const LEGISLATION_ITEMS: LegItem[] = ["
new_items = """export const LEGISLATION_ITEMS: LegItem[] = [
  {
    no: "N/A",
    type: "regulament",
    title_ro: "Regulament taxe și tarife",
    title_en: "Fees and Tariffs Regulations",
    year: None,
    catId: "taxe-si-tarife",
    pdfUrl: "/documents/legislatie/taxe/Regulament_taxe_si_tarife.pdf"
  },"""

if "Regulament_taxe_si_tarife.pdf" not in content:
    content = content.replace(items_target, new_items, 1)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Added Regulament taxe si tarife to legislatie.tsx!")
else:
    print("Already added.")
