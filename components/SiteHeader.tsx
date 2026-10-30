"use client";

import { Logo } from "@/components/Logo";
import { Menu, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/templates", label: "Templates" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#categories", label: "Categories" },
  { href: "/#faq", label: "FAQ" }
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Logo compact />
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link" aria-current={pathname === link.href ? "page" : undefined}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/create" className="btn btn-primary hidden sm:inline-flex">
            <Sparkles size={16} /> Create biodata
          </Link>
          <button type="button" className="btn btn-icon btn-secondary md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {open ? (
        <div className="border-t border-ivory-300 bg-ivory-50 px-5 py-3 md:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link py-3" onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link href="/create" className="btn btn-primary mt-2" onClick={() => setOpen(false)}>
              <Sparkles size={16} /> Create biodata
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
