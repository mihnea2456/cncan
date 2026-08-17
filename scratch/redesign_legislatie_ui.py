import os

file_path = os.path.abspath("src/routes/legislatie.tsx")
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Insert GHIDURI_SUBSECTIONS right after NORME_SUBSECTIONS
norme_end_marker = """    description_ro: "Procedura CNCAN de evaluare și avizare a cursurilor de pregătire profesională în radioprotecție organizate de furnizori.",
    description_en: "CNCAN procedure for evaluating and approving professional radiation protection training courses organized by providers.",
  },
];"""

ghiduri_subsections_code = """    description_ro: "Procedura CNCAN de evaluare și avizare a cursurilor de pregătire profesională în radioprotecție organizate de furnizori.",
    description_en: "CNCAN procedure for evaluating and approving professional radiation protection training courses organized by providers.",
  },
];

// 13 SUBSECȚIUNI EXACTE PENTRU CATEGORIA 3. GHIDURI (conform cerinței)
export interface GhiduriSubSection {
  id: string;
  code: string;
  title_ro: string;
  title_en: string;
  description_ro: string;
  description_en: string;
}

export const GHIDURI_SUBSECTIONS: GhiduriSubSection[] = [
  {
    id: "ghiduri-radiologica",
    code: "GSR",
    title_ro: "Ghiduri de securitate radiologică (GSR)",
    title_en: "Radiological Safety Guidelines (GSR)",
    description_ro: "Ghiduri tehnice pentru radioprotecție, monitorizare și practici cu surse de radiații ionizante.",
    description_en: "Technical guidelines for radiation protection, monitoring, and practices with ionizing radiation sources.",
  },
  {
    id: "ghiduri-nucleara",
    code: "GSN",
    title_ro: "Ghiduri de securitate nucleară (GSN)",
    title_en: "Nuclear Safety Guidelines (GSN)",
    description_ro: "Ghiduri privind elaborarea Rapoartelor de Securitate Preliminară și Finală pentru instalații nucleare.",
    description_en: "Guidelines on drafting Preliminary and Final Safety Reports for nuclear facilities.",
  },
  {
    id: "ghiduri-comune",
    code: "GIN",
    title_ro: "Ghiduri comune interdepartamentale în domeniul nuclear (GIN)",
    title_en: "Interdepartmental Joint Guidelines in Nuclear Sector (GIN)",
    description_ro: "Ghiduri interinstituționale pentru coordonarea activităților în domeniul nuclear și radiologic.",
    description_en: "Inter-institutional guidelines for coordinating nuclear and radiological activities.",
  },
  {
    id: "ghiduri-garantii",
    code: "GGN",
    title_ro: "Ghiduri de garanții nucleare (GGN)",
    title_en: "Nuclear Safeguards Guidelines (GGN)",
    description_ro: "Ghiduri pentru controlul, evidența și raportarea materialelor nucleare.",
    description_en: "Guidelines for accounting, control, and reporting of nuclear materials.",
  },
  {
    id: "ghiduri-protectie-fizica",
    code: "GPF",
    title_ro: "Ghiduri de protecție fizică în domeniul nuclear (GPF)",
    title_en: "Physical Protection Guidelines in Nuclear Sector (GPF)",
    description_ro: "Ghiduri tehnice pentru securitatea fizică a amplasamentelor și materialelor nucleare.",
    description_en: "Technical guidelines for physical security of nuclear sites and materials.",
  },
  {
    id: "ghiduri-minerit",
    code: "GMR",
    title_ro: "Ghiduri de minerit radioactiv (GMR)",
    title_en: "Radioactive Mining Guidelines (GMR)",
    description_ro: "Ghiduri pentru activitățile de prospectare, exploatare și prelucrare a minereurilor radioactive.",
    description_en: "Guidelines for prospecting, mining, and processing radioactive ores.",
  },
  {
    id: "ghiduri-transport",
    code: "GTR",
    title_ro: "Ghiduri de transport materiale radioactive (GTR)",
    title_en: "Radioactive Materials Transport Guidelines (GTR)",
    description_ro: "Ghiduri privind ambalarea, etichetarea și transportul în siguranță al coletelor radioactive.",
    description_en: "Guidelines on packaging, labeling, and safe transport of radioactive packages.",
  },
  {
    id: "ghiduri-deseuri",
    code: "GDR",
    title_ro: "Ghiduri privind managementul deșeurilor radioactive (GDR)",
    title_en: "Radioactive Waste Management Guidelines (GDR)",
    description_ro: "Ghiduri privind tratarea, condiționarea, depozitarea și dezafectarea deșeurilor radioactive.",
    description_en: "Guidelines on treatment, conditioning, storage, and disposal of radioactive waste.",
  },
  {
    id: "ghiduri-calitate",
    code: "GMC",
    title_ro: "Ghiduri de managementul calității în domeniul nuclear (GMC)",
    title_en: "Quality Management Guidelines in Nuclear Sector (GMC)",
    description_ro: "Ghiduri pentru implementarea și evaluarea sistemelor de management integrat și al calității.",
    description_en: "Guidelines for implementing and evaluating integrated quality management systems.",
  },
  {
    id: "ghiduri-urgente",
    code: "GUR",
    title_ro: "Ghiduri privind managementul urgențelor radiologice (GUR)",
    title_en: "Radiological Emergency Management Guidelines (GUR)",
    description_ro: "Ghiduri pentru planificarea, intervenția și protecția populației în caz de urgență radiologică.",
    description_en: "Guidelines for planning, intervention, and public protection in radiological emergencies.",
  },
  {
    id: "ghiduri-surse-naturale",
    code: "GRN",
    title_ro: "Ghiduri privind sursele naturale de radiații (GRN)",
    title_en: "Natural Radiation Sources Guidelines (GRN)",
    description_ro: "Ghiduri de monitorizare și remediere a expunerii la radon și la surse naturale de radiații.",
    description_en: "Guidelines on monitoring and remediation of exposure to radon and natural radiation sources.",
  },
  {
    id: "ghiduri-pregatire",
    code: "GPP",
    title_ro: "Ghiduri privind pregătirea și atestarea personalului în domeniul nuclear (GPP)",
    title_en: "Personnel Training and Certification Guidelines (GPP)",
    description_ro: "Ghiduri de avizare a programelor de instruire, examinare și atestare în securitate radiologică.",
    description_en: "Guidelines for approving training programs, exams, and radiological safety certification.",
  },
  {
    id: "ghiduri-constructii",
    code: "GCN",
    title_ro: "Ghiduri construcții nucleare (GCN)",
    title_en: "Nuclear Construction Guidelines (GCN)",
    description_ro: "Ghiduri de proiectare, execuție și verificare a structurilor cu specific nuclear.",
    description_en: "Guidelines on design, execution, and verification of nuclear structures.",
  },
];"""

if norme_end_marker in content and "export const GHIDURI_SUBSECTIONS" not in content:
    content = content.replace(norme_end_marker, ghiduri_subsections_code, 1)
    print("Added GHIDURI_SUBSECTIONS array.")
else:
    print("GHIDURI_SUBSECTIONS already present or marker not found.")

# 2. Assign subCatId to existing ghiduri items
content = content.replace(
    '    catId: "ghiduri",\n  },\n  {\n    no: "GAU-02",',
    '    catId: "ghiduri",\n    subCatId: "ghiduri-nucleara",\n  },\n  {\n    no: "GAU-02",'
)
content = content.replace(
    '    year: 2019,\n    catId: "ghiduri",\n  },\n  {\n    no: "GM-03",',
    '    year: 2019,\n    catId: "ghiduri",\n    subCatId: "ghiduri-radiologica",\n  },\n  {\n    no: "GM-03",'
)
content = content.replace(
    '    year: 2022,\n    catId: "ghiduri",\n  },\n  {\n    no: "G-RADON",',
    '    year: 2022,\n    catId: "ghiduri",\n    subCatId: "ghiduri-radiologica",\n  },\n  {\n    no: "G-RADON",'
)
content = content.replace(
    '    year: 2020,\n    catId: "ghiduri",\n  },',
    '    year: 2020,\n    catId: "ghiduri",\n    subCatId: "ghiduri-surse-naturale",\n  },'
)

# 3. Update initial state and matchSubCategory logic in LegislatiePage
old_state_init = """  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [selectedSubCat, setSelectedSubCat] = useState<string>("all-sub");
  const [expandedSubCats, setExpandedSubCats] = useState<Record<string, boolean>>(() => {
    // Implicit toate cele 19 subsecțiuni din Norme sunt deschise
    const initial: Record<string, boolean> = {};
    NORME_SUBSECTIONS.forEach((s) => {
      initial[s.id] = true;
    });
    return initial;
  });"""

new_state_init = """  // Initializăm cu "norme" astfel încât utilizatorul să nu fie obligat să facă scroll inutil,
  // navigând modular prin butoanele categoriilor (Legi, Norme, Ghiduri etc.)
  const [selectedCat, setSelectedCat] = useState<string>("norme");
  const [selectedSubCat, setSelectedSubCat] = useState<string>("all-sub");
  const [expandedSubCats, setExpandedSubCats] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    NORME_SUBSECTIONS.forEach((s) => {
      initial[s.id] = true;
    });
    GHIDURI_SUBSECTIONS.forEach((s) => {
      initial[s.id] = true;
    });
    return initial;
  });"""

if old_state_init in content:
    content = content.replace(old_state_init, new_state_init, 1)
    print("Updated state initialization.")

old_filter_logic = """    const matchSubCategory =
      selectedCat !== "norme" ||
      selectedSubCat === "all-sub" ||
      item.subCatId === selectedSubCat;"""

new_filter_logic = """    const matchSubCategory =
      (selectedCat !== "norme" && selectedCat !== "ghiduri") ||
      selectedSubCat === "all-sub" ||
      item.subCatId === selectedSubCat;"""

if old_filter_logic in content:
    content = content.replace(old_filter_logic, new_filter_logic, 1)
    print("Updated filter logic.")

# 4. Add GHIDURI SPECIAL SUBSECTION SELECTOR and RENDERER
ghiduri_selector_and_renderer = """        {/* SPECIAL SUBSECTION SELECTOR FOR CATEGORY 3. GHIDURI */}
        {(selectedCat === "ghiduri" || selectedCat === "all") && (
          <div className="mb-10 rounded-sm border-2 border-brand/25 bg-gradient-to-r from-secondary/70 via-secondary/30 to-card p-5 md:p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-brand mb-1">
                  <BookOpen className="h-3.5 w-3.5" />
                  {lang === "ro" ? "Arhitectura Subsecțiunilor de Ghiduri CNCAN" : "Architecture of CNCAN Guidelines Subsections"}
                </div>
                <h3 className="font-display text-lg md:text-xl text-foreground font-semibold">
                  {lang === "ro"
                    ? "3. Ghiduri — Structurate pe 13 Domenii de Securitate și Reglementare"
                    : "3. Guidelines — Structured across 13 Safety and Regulatory Domains"}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5 max-w-2xl">
                  {lang === "ro"
                    ? "Selectați din cele 13 domenii (GSR, GSN, GIN, GGN, GPF, GMR, GTR, GDR, GMC, GUR, GRN, GPP, GCN) pentru a filtra rapid ghidurile de aplicare."
                    : "Select from the 13 domains (GSR, GSN, GIN, GGN, GPF, GMR, GTR, GDR, GMC, GUR, GRN, GPP, GCN) to quickly filter application guidelines."}
                </p>
              </div>

              {selectedCat === "ghiduri" && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const allOpen: Record<string, boolean> = {};
                      GHIDURI_SUBSECTIONS.forEach((s) => (allOpen[s.id] = true));
                      setExpandedSubCats((prev) => ({ ...prev, ...allOpen }));
                    }}
                    className="px-3 py-1.5 rounded-sm bg-card border border-border hover:border-brand text-xs font-medium text-foreground transition-colors"
                  >
                    {lang === "ro" ? "Extinde toate" : "Expand all"}
                  </button>
                  <button
                    onClick={() => {
                      const allClosed: Record<string, boolean> = {};
                      GHIDURI_SUBSECTIONS.forEach((s) => (allClosed[s.id] = false));
                      setExpandedSubCats((prev) => ({ ...prev, ...allClosed }));
                    }}
                    className="px-3 py-1.5 rounded-sm bg-card border border-border hover:border-brand text-xs font-medium text-foreground transition-colors"
                  >
                    {lang === "ro" ? "Restrânge toate" : "Collapse all"}
                  </button>
                </div>
              )}
            </div>

            {/* QUICK PILL FILTER FOR 13 GHIDURI SUBSECTIONS */}
            {selectedCat === "ghiduri" && (
              <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-border/60">
                <button
                  onClick={() => setSelectedSubCat("all-sub")}
                  className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                    selectedSubCat === "all-sub"
                      ? "bg-brand text-primary-foreground shadow-sm"
                      : "bg-card text-muted-foreground hover:text-foreground border border-border/70"
                  }`}
                >
                  {lang === "ro" ? "Toate" : "All"}
                </button>

                {GHIDURI_SUBSECTIONS.map((sub) => {
                  const subCount = LEGISLATION_ITEMS.filter((i) => i.subCatId === sub.id).length;
                  const isActive = selectedSubCat === sub.id;

                  return (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedSubCat(sub.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium transition-all ${
                        isActive
                          ? "bg-brand text-primary-foreground font-bold shadow-sm"
                          : "bg-card/80 text-foreground hover:bg-card border border-border/70"
                      }`}
                    >
                      <span className="font-mono text-[10px] opacity-80">{sub.code}</span>
                      <span className="truncate max-w-[200px]">
                        {lang === "ro" ? sub.title_ro : sub.title_en}
                      </span>
                      <span
                        className={`ml-1 px-1.5 py-0.2 rounded-full text-[9px] ${
                          isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {subCount}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}"""

old_norme_selector_end = """              </div>
            )}
          </div>
        )}

        {/* LISTING ORDERED BY THE 8 EXACT CATEGORIES */}"""

if old_norme_selector_end in content and "SPECIAL SUBSECTION SELECTOR FOR CATEGORY 3. GHIDURI" not in content:
    content = content.replace(old_norme_selector_end, old_norme_selector_end.replace("        {/* LISTING ORDERED BY THE 8 EXACT CATEGORIES */}", ghiduri_selector_and_renderer + "\n\n        {/* LISTING ORDERED BY THE 8 EXACT CATEGORIES */}"), 1)
    print("Added GHIDURI SUBSECTION SELECTOR.")

# 5. Add GHIDURI RENDER BY 13 SUBSECTIONS in CATEGORIES.map
old_default_handling = """              // DEFAULT HANDLING FOR OTHER CATEGORIES"""

ghiduri_category_render = """              // SPECIAL HANDLING FOR CATEGORY "GHIDURI" - DISPLAY BY THE 13 SUBSECTIONS
              if (cat.id === "ghiduri") {
                const subSectionsToDisplay = GHIDURI_SUBSECTIONS.filter(
                  (sub) => selectedSubCat === "all-sub" || selectedSubCat === sub.id
                );

                return (
                  <div key={cat.id} id={cat.id} className="scroll-mt-24 space-y-6">
                    {/* MASTER CATEGORY HEADER */}
                    <div className="rounded-sm border border-border bg-card shadow-sm overflow-hidden">
                      <div className="bg-gradient-to-r from-secondary/80 via-secondary/40 to-transparent p-5 md:p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-sm bg-brand/10 text-brand mt-0.5">
                            <Icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-display text-xl md:text-2xl text-brand-deep font-bold tracking-tight">
                              {lang === "ro" ? cat.name_ro : cat.name_en}
                            </h3>
                            <p className="text-xs md:text-sm text-muted-foreground mt-1 max-w-2xl leading-relaxed">
                              {lang === "ro" ? cat.description_ro : cat.description_en}
                            </p>
                          </div>
                        </div>

                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-secondary border border-border text-xs font-mono font-semibold text-foreground shrink-0">
                          <span>{catItems.length}</span>
                          <span>{lang === "ro" ? "ghiduri total" : "total guidelines"}</span>
                        </div>
                      </div>
                    </div>

                    {/* RENDER THE 13 EXACT SUBSECTIONS */}
                    <div className="space-y-4 pl-0 md:pl-3 border-l-0 md:border-l-2 border-brand/30">
                      {subSectionsToDisplay.map((sub) => {
                        const subItems = catItems.filter((i) => i.subCatId === sub.id);
                        const isExpanded = expandedSubCats[sub.id] ?? true;

                        return (
                          <div
                            key={sub.id}
                            id={sub.id}
                            className="rounded-sm border border-border bg-card shadow-sm overflow-hidden transition-all"
                          >
                            {/* SUBSECTION HEADER BAND */}
                            <div
                              onClick={() => toggleSubCat(sub.id)}
                              className="bg-secondary/40 hover:bg-secondary/70 p-4 md:p-5 flex items-center justify-between gap-4 cursor-pointer select-none transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <span className="inline-flex items-center justify-center min-w-[38px] h-7 rounded bg-brand text-primary-foreground font-mono text-xs font-bold">
                                  {sub.code}
                                </span>
                                <div>
                                  <h4 className="font-display text-base md:text-lg text-foreground font-bold leading-snug">
                                    {lang === "ro" ? sub.title_ro : sub.title_en}
                                  </h4>
                                  <p className="text-xs text-muted-foreground mt-0.5">
                                    {lang === "ro" ? sub.description_ro : sub.description_en}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 shrink-0">
                                <span className="px-2.5 py-1 rounded-full bg-secondary border border-border text-xs font-mono font-semibold text-foreground">
                                  {subItems.length} {lang === "ro" ? "ghiduri" : "guides"}
                                </span>
                                {isExpanded ? (
                                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                                ) : (
                                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                )}
                              </div>
                            </div>

                            {/* SUBSECTION ITEMS CONTENT */}
                            {isExpanded && (
                              <div className="divide-y divide-border border-t border-border">
                                {subItems.length === 0 ? (
                                  <div className="p-6 text-center text-xs text-muted-foreground bg-card/40">
                                    {lang === "ro"
                                      ? "Arhitectură reglementată conform nomenclatorului CNCAN. Ghidurile specifice din această secțiune urmează a fi încărcate după finalizarea digitalizării."
                                      : "Regulated architecture according to CNCAN nomenclature. Specific guidelines in this section will be loaded after digitization."}
                                  </div>
                                ) : (
                                  subItems.map((item, idx) => (
                                    <article
                                      key={`${item.no}-${idx}`}
                                      className="p-4 md:p-5 grid gap-3 md:grid-cols-[140px_1fr_auto] items-center group hover:bg-secondary/30 transition-colors"
                                    >
                                      <div>
                                        <span className="inline-block px-2 py-0.5 rounded text-[10px] uppercase tracking-wider bg-brand/10 text-brand font-bold">
                                          {item.type}
                                        </span>
                                        <div className="font-mono text-xs font-bold text-foreground mt-1">
                                          nr. {item.no}
                                        </div>
                                        <div className="text-[11px] text-muted-foreground mt-0.5">
                                          {lang === "ro" ? "An emitere" : "Year"}: {item.year}
                                        </div>
                                      </div>

                                      <div>
                                        <h5 className="font-display text-sm md:text-base text-foreground font-semibold leading-snug group-hover:text-brand transition-colors">
                                          {lang === "ro" ? item.title_ro : item.title_en}
                                        </h5>
                                      </div>

                                      <div className="flex items-center gap-2 justify-end">
                                        <a
                                          href={item.pdfUrl || "#"}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-border hover:border-brand bg-card hover:bg-accent text-xs font-semibold text-foreground transition-all group-hover:border-brand/40"
                                        >
                                          <FileText className="h-3.5 w-3.5 text-brand" />
                                          <span>PDF</span>
                                          <ExternalLink className="h-3 w-3 text-muted-foreground" />
                                        </a>
                                      </div>
                                    </article>
                                  ))
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              // DEFAULT HANDLING FOR OTHER CATEGORIES"""

if old_default_handling in content and 'SPECIAL HANDLING FOR CATEGORY "GHIDURI"' not in content:
    content = content.replace(old_default_handling, ghiduri_category_render, 1)
    print("Added GHIDURI CATEGORY RENDER BY 13 SUBSECTIONS.")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("SUCCESSFULLY UPDATED LEGISLATIE.TSX WITH NEW GHIDURI UI AND NO-SCROLL NAVIGATION!")
