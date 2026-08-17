import os

file_path = os.path.abspath("src/routes/legislatie.tsx")
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. ADD INSPECTIE_SUBSECTIONS
ghiduri_end = """    description_en: "Guidelines on design, execution, and verification of nuclear structures.",
  },
];"""

inspectie_subsections = """    description_en: "Guidelines on design, execution, and verification of nuclear structures.",
  },
];

export interface InspectieSubSection {
  id: string;
  code: string;
  title_ro: string;
  title_en: string;
  description_ro: string;
  description_en: string;
}

export const INSPECTIE_SUBSECTIONS: InspectieSubSection[] = [
  {
    id: "insp-autorizare",
    code: "IA",
    title_ro: "Inspecții pentru autorizare",
    title_en: "Licensing Inspections",
    description_ro: "Inspecții efectuate pentru evaluarea îndeplinirii condițiilor de emitere a autorizațiilor.",
    description_en: "Inspections performed to evaluate compliance with licensing conditions.",
  },
  {
    id: "insp-curent",
    code: "CP",
    title_ro: "Control curent și periodic",
    title_en: "Current and Periodic Control",
    description_ro: "Activități regulate de verificare a respectării cerințelor de securitate în timpul exploatării.",
    description_en: "Regular activities to verify compliance with safety requirements during operation.",
  },
  {
    id: "insp-inopinate",
    code: "II",
    title_ro: "Inspecții inopinate",
    title_en: "Unannounced Inspections",
    description_ro: "Inspecții neanunțate pentru verificarea stării reale de securitate și conformitate.",
    description_en: "Unannounced inspections to verify the actual state of safety and compliance.",
  },
  {
    id: "insp-cultura",
    code: "CS",
    title_ro: "Evaluarea culturii de securitate",
    title_en: "Safety Culture Evaluation",
    description_ro: "Inspecții axate pe evaluarea atitudinilor și practicilor organizaționale privind securitatea nucleară.",
    description_en: "Inspections focused on assessing organizational attitudes and practices regarding nuclear safety.",
  },
  {
    id: "insp-cerinte",
    code: "CIE",
    title_ro: "Cerințe privind inspecțiile în exploatare",
    title_en: "In-Service Inspection Requirements",
    description_ro: "Norme și cerințe legale care stau la baza activităților de supraveghere și testare.",
    description_en: "Legal norms and requirements underlying surveillance and testing activities.",
  },
];"""

if "export const INSPECTIE_SUBSECTIONS" not in content:
    content = content.replace(ghiduri_end, inspectie_subsections, 1)

# 2. Add ITEMS to LEGISLATION_ITEMS
items_target = "export const LEGISLATION_ITEMS: LegItem[] = ["
new_items = """export const LEGISLATION_ITEMS: LegItem[] = [
  {
    no: "1/2022",
    type: "procedura",
    title_ro: "Procedura de control și inspecție CNCAN",
    title_en: "CNCAN Control and Inspection Procedure",
    year: 2022,
    catId: "inspectie",
    subCatId: "insp-curent",
    pdfUrl: "/documents/legislatie/inspectie/Procedura_de_Control_2022.pdf"
  },
  {
    no: "01.07.2020",
    type: "norma",
    title_ro: "Normele de securitate nucleară privind supravegherea, întreținerea, testarea și inspecțiile în exploatare pentru instalațiile nucleare",
    title_en: "Nuclear safety norms on surveillance, maintenance, testing, and in-service inspections for nuclear installations",
    year: 2020,
    catId: "inspectie",
    subCatId: "insp-cerinte",
    pageUrl: "https://lege5.ro/gratuit/gm3tqnjygqza/cerinte-privind-inspectiile-in-exploatare-norma?dp=gmytsobrgi3tcoi"
  },"""

if "Procedura_de_Control_2022.pdf" not in content:
    content = content.replace(items_target, new_items, 1)

# 3. Update INITIAL STATE in LegislatiePage
old_state = """    GHIDURI_SUBSECTIONS.forEach((s) => {
      initial[s.id] = true;
    });
    return initial;
  });"""

new_state = """    GHIDURI_SUBSECTIONS.forEach((s) => {
      initial[s.id] = true;
    });
    INSPECTIE_SUBSECTIONS.forEach((s) => {
      initial[s.id] = true;
    });
    return initial;
  });"""

if "INSPECTIE_SUBSECTIONS.forEach" not in content:
    content = content.replace(old_state, new_state, 1)

# 4. Update matchSubCategory
old_match = """    const matchSubCategory =
      (selectedCat !== "norme" && selectedCat !== "ghiduri") ||
      selectedSubCat === "all-sub" ||
      item.subCatId === selectedSubCat;"""

new_match = """    const matchSubCategory =
      (selectedCat !== "norme" && selectedCat !== "ghiduri" && selectedCat !== "inspectie") ||
      selectedSubCat === "all-sub" ||
      item.subCatId === selectedSubCat;"""

if 'selectedCat !== "inspectie"' not in content:
    content = content.replace(old_match, new_match, 1)


# 5. Add INSPECTIE SELECTOR
ghiduri_selector_end = """                })}
              </div>
            )}
          </div>
        )}"""

inspectie_selector = """                })}
              </div>
            )}
          </div>
        )}

        {/* SPECIAL SUBSECTION SELECTOR FOR CATEGORY 4. INSPECTIE */}
        {(selectedCat === "inspectie" || selectedCat === "all") && (
          <div className="mb-10 rounded-sm border-2 border-brand/25 bg-gradient-to-r from-secondary/70 via-secondary/30 to-card p-5 md:p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-brand mb-1">
                  <Search className="h-3.5 w-3.5" />
                  {lang === "ro" ? "Etapele și Tipurile de Inspecții" : "Inspection Stages and Types"}
                </div>
                <h3 className="font-display text-lg md:text-xl text-foreground font-semibold">
                  {lang === "ro"
                    ? "4. Inspecție și Supraveghere"
                    : "4. Inspection and Control"}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5 max-w-2xl">
                  {lang === "ro"
                    ? "Selectați etapa sau tipul inspecției pentru a vizualiza reglementările și procedurile specifice aplicabile."
                    : "Select the inspection stage or type to view the specific applicable regulations and procedures."}
                </p>
              </div>

              {selectedCat === "inspectie" && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const allOpen: Record<string, boolean> = {};
                      INSPECTIE_SUBSECTIONS.forEach((s) => (allOpen[s.id] = true));
                      setExpandedSubCats((prev) => ({ ...prev, ...allOpen }));
                    }}
                    className="px-3 py-1.5 rounded-sm bg-card border border-border hover:border-brand text-xs font-medium text-foreground transition-colors"
                  >
                    {lang === "ro" ? "Extinde toate" : "Expand all"}
                  </button>
                  <button
                    onClick={() => {
                      const allClosed: Record<string, boolean> = {};
                      INSPECTIE_SUBSECTIONS.forEach((s) => (allClosed[s.id] = false));
                      setExpandedSubCats((prev) => ({ ...prev, ...allClosed }));
                    }}
                    className="px-3 py-1.5 rounded-sm bg-card border border-border hover:border-brand text-xs font-medium text-foreground transition-colors"
                  >
                    {lang === "ro" ? "Restrânge toate" : "Collapse all"}
                  </button>
                </div>
              )}
            </div>

            {selectedCat === "inspectie" && (
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

                {INSPECTIE_SUBSECTIONS.map((sub) => {
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

if "SPECIAL SUBSECTION SELECTOR FOR CATEGORY 4. INSPECTIE" not in content:
    content = content.replace(ghiduri_selector_end, inspectie_selector, 1)


# 6. Add special handling for "inspectie" in render loop
default_handling = """              // DEFAULT HANDLING FOR OTHER CATEGORIES"""

inspectie_category_render = """              // SPECIAL HANDLING FOR CATEGORY "INSPECTIE"
              if (cat.id === "inspectie") {
                const subSectionsToDisplay = INSPECTIE_SUBSECTIONS.filter(
                  (sub) => selectedSubCat === "all-sub" || selectedSubCat === sub.id
                );

                return (
                  <div key={cat.id} id={cat.id} className="scroll-mt-24 space-y-6">
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
                          <span>{lang === "ro" ? "documente" : "documents"}</span>
                        </div>
                      </div>
                    </div>

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
                                  {subItems.length} {lang === "ro" ? "doc" : "docs"}
                                </span>
                                {isExpanded ? (
                                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                                ) : (
                                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                )}
                              </div>
                            </div>

                            {isExpanded && (
                              <div className="divide-y divide-border border-t border-border">
                                {subItems.length === 0 ? (
                                  <div className="p-6 text-center text-xs text-muted-foreground bg-card/40">
                                    {lang === "ro"
                                      ? "Documentele aferente acestei etape de inspecție urmează a fi publicate."
                                      : "Documents related to this inspection stage are to be published."}
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
                                          {item.no !== "N/A" && `nr. ${item.no}`}
                                        </div>
                                        <div className="text-[11px] text-muted-foreground mt-0.5">
                                          {item.year && `${lang === "ro" ? "An" : "Year"}: ${item.year}`}
                                        </div>
                                      </div>

                                      <div>
                                        <h5 className="font-display text-sm md:text-base text-foreground font-semibold leading-snug group-hover:text-brand transition-colors">
                                          {lang === "ro" ? item.title_ro : item.title_en}
                                        </h5>
                                      </div>

                                      <div className="flex items-center gap-2 justify-end">
                                        {item.pdfUrl ? (
                                          <a
                                            href={item.pdfUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-border hover:border-brand bg-card hover:bg-accent text-xs font-semibold text-foreground transition-all group-hover:border-brand/40"
                                          >
                                            <FileText className="h-3.5 w-3.5 text-brand" />
                                            <span>PDF</span>
                                            <ExternalLink className="h-3 w-3 text-muted-foreground" />
                                          </a>
                                        ) : item.pageUrl ? (
                                          <a
                                            href={item.pageUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-border hover:border-brand bg-card hover:bg-accent text-xs font-semibold text-foreground transition-all group-hover:border-brand/40"
                                          >
                                            <ExternalLink className="h-3.5 w-3.5 text-brand" />
                                            <span>{lang === "ro" ? "Deschide link" : "Open link"}</span>
                                          </a>
                                        ) : null}
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

if 'SPECIAL HANDLING FOR CATEGORY "INSPECTIE"' not in content:
    content = content.replace(default_handling, inspectie_category_render, 1)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated legislatie.tsx successfully!")
