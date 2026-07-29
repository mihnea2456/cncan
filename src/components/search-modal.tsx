import * as React from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  FileText,
  ShieldAlert,
  Search,
  Atom,
  Radiation,
  Truck,
  Trash2,
  Building2,
  FileCheck,
  Newspaper,
  BookOpen,
  Phone,
  Info,
  HelpCircle,
} from "lucide-react";

import { useI18n } from "@/lib/i18n";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const { lang } = useI18n();
  const navigate = useNavigate();

  const handleSelect = (to: string) => {
    onOpenChange(false);
    navigate({ to });
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder={
          lang === "ro"
            ? "Căutați legi, norme, autorizări, comunicate (ex: autorizare, radon)..."
            : "Search laws, norms, authorizations, releases..."
        }
      />
      <CommandList className="max-h-[380px] p-2">
        <CommandEmpty className="py-10 text-center text-sm text-muted-foreground flex flex-col items-center justify-center gap-2">
          <HelpCircle className="h-8 w-8 text-muted-foreground/60 stroke-[1.5]" />
          <div className="font-medium text-foreground text-base">
            {lang === "ro" ? "Nu există niciun rezultat" : "No results found"}
          </div>
          <div className="text-xs max-w-[260px]">
            {lang === "ro"
              ? "Nu am găsit niciun document sau pagină care să se potrivească cu termenul căutat."
              : "We couldn't find any document or page matching your query."}
          </div>
        </CommandEmpty>

        {/* LEGISLATIE SI NORME */}
        <CommandGroup heading={lang === "ro" ? "Legislație și Norme CNCAN" : "Legislation & CNCAN Norms"}>
          <CommandItem onSelect={() => handleSelect("/legislatie")} className="cursor-pointer">
            <FileText className="mr-2 h-4 w-4 text-brand" />
            <div className="flex flex-col">
              <span className="font-medium">
                {lang === "ro"
                  ? "Legea 111/1996 — Autorizarea și controlul activităților nucleare"
                  : "Law 111/1996 — Licensing & control of nuclear activities"}
              </span>
              <span className="text-[11px] text-muted-foreground">Cadru general · Lege</span>
            </div>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("/legislatie")} className="cursor-pointer">
            <FileText className="mr-2 h-4 w-4 text-brand" />
            <div className="flex flex-col">
              <span className="font-medium">
                {lang === "ro"
                  ? "Ordinul 155/2005 — Taxe și tarife pentru autorizare"
                  : "Order 155/2005 — Authorization fees and charges"}
              </span>
              <span className="text-[11px] text-muted-foreground">Tarife · Ordin</span>
            </div>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("/legislatie")} className="cursor-pointer">
            <FileText className="mr-2 h-4 w-4 text-brand" />
            <div className="flex flex-col">
              <span className="font-medium">
                {lang === "ro"
                  ? "OUG 115/2020 — Securitatea persoanelor expuse la radiații ionizante"
                  : "OUG 115/2020 — Safety of persons exposed to ionizing radiation"}
              </span>
              <span className="text-[11px] text-muted-foreground">Radioprotecție · OUG</span>
            </div>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("/legislatie")} className="cursor-pointer">
            <FileText className="mr-2 h-4 w-4 text-brand" />
            <div className="flex flex-col">
              <span className="font-medium">
                {lang === "ro"
                  ? "Ordinul 63/2018 — Autorizarea personalului cu responsabilități nucleare"
                  : "Order 63/2018 — Licensing of personnel with nuclear responsibilities"}
              </span>
              <span className="text-[11px] text-muted-foreground">Personal · Ordin</span>
            </div>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("/legislatie")} className="cursor-pointer">
            <FileText className="mr-2 h-4 w-4 text-brand" />
            <div className="flex flex-col">
              <span className="font-medium">
                {lang === "ro"
                  ? "Ordinul 48/2018 — Planul național de acțiune pentru radon"
                  : "Order 48/2018 — National action plan for radon"}
              </span>
              <span className="text-[11px] text-muted-foreground">Radon · Ordin</span>
            </div>
          </CommandItem>
        </CommandGroup>

        {/* PROCEDURI AUTORIZARE */}
        <CommandGroup heading={lang === "ro" ? "Proceduri de Autorizare" : "Authorization Procedures"}>
          <CommandItem onSelect={() => handleSelect("/autorizari")} className="cursor-pointer">
            <Atom className="mr-2 h-4 w-4 text-brand" />
            <span>{lang === "ro" ? "Instalații nucleare (amplasare, construcție, exploatare)" : "Nuclear installations (siting, construction, operation)"}</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("/autorizari")} className="cursor-pointer">
            <Radiation className="mr-2 h-4 w-4 text-brand" />
            <span>{lang === "ro" ? "Surse de radiații ionizante (deținere, producție, import/export)" : "Ionizing radiation sources (possession, import/export)"}</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("/autorizari")} className="cursor-pointer">
            <Truck className="mr-2 h-4 w-4 text-brand" />
            <span>{lang === "ro" ? "Transport materiale radioactive și nucleare" : "Radioactive and nuclear material transport"}</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("/autorizari")} className="cursor-pointer">
            <Trash2 className="mr-2 h-4 w-4 text-brand" />
            <span>{lang === "ro" ? "Gestiune și depozitare deșeuri radioactive" : "Radioactive waste management & disposal"}</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("/autorizari")} className="cursor-pointer">
            <FileCheck className="mr-2 h-4 w-4 text-brand" />
            <span>{lang === "ro" ? "Permise de exercitare personal expus profesional" : "Occupationally exposed staff permits"}</span>
          </CommandItem>
        </CommandGroup>

        {/* COMUNICATE & EVENIMENTE */}
        <CommandGroup heading={lang === "ro" ? "Comunicate și Anunțuri" : "News & Announcements"}>
          <CommandItem onSelect={() => handleSelect("/comunicate")} className="cursor-pointer">
            <Newspaper className="mr-2 h-4 w-4 text-brand" />
            <span>{lang === "ro" ? "Programul Oficial de Internship 2026" : "Official Government Internship Program 2026"}</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("/comunicate")} className="cursor-pointer">
            <Newspaper className="mr-2 h-4 w-4 text-brand" />
            <span>{lang === "ro" ? "Formular actualizat pentru taxele și tarifele CNCAN" : "Updated form for CNCAN authorization fees"}</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("/comunicate")} className="cursor-pointer">
            <Newspaper className="mr-2 h-4 w-4 text-brand" />
            <span>{lang === "ro" ? "Consultare publică: protecția fizică a instalațiilor" : "Public consultation: physical protection"}</span>
          </CommandItem>
        </CommandGroup>

        {/* PAGINI SITE */}
        <CommandGroup heading={lang === "ro" ? "Pagini Site" : "Site Pages"}>
          <CommandItem onSelect={() => handleSelect("/")} className="cursor-pointer">
            <BookOpen className="mr-2 h-4 w-4 text-brand" />
            <span>{lang === "ro" ? "Pagina Principală (Home)" : "Home Page"}</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("/autorizari")} className="cursor-pointer">
            <Building2 className="mr-2 h-4 w-4 text-brand" />
            <span>{lang === "ro" ? "Autorizări și Tarife" : "Authorizations & Fees"}</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("/legislatie")} className="cursor-pointer">
            <FileText className="mr-2 h-4 w-4 text-brand" />
            <span>{lang === "ro" ? "Registrul Legislativ CNCAN" : "CNCAN Legislative Registry"}</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("/urgente")} className="cursor-pointer">
            <ShieldAlert className="mr-2 h-4 w-4 text-danger" />
            <span>{lang === "ro" ? "Urgențe Nucleare 24/7" : "Nuclear Emergencies 24/7"}</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("/despre")} className="cursor-pointer">
            <Info className="mr-2 h-4 w-4 text-brand" />
            <span>{lang === "ro" ? "Despre CNCAN" : "About CNCAN"}</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("/contact")} className="cursor-pointer">
            <Phone className="mr-2 h-4 w-4 text-brand" />
            <span>{lang === "ro" ? "Contact și Adresă" : "Contact & Address"}</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
