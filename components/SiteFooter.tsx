import { Logo } from "@/components/Logo";
import { categoryLabels, categoryOrder } from "@/utils/fields";
import { Heart, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-ivory-300 bg-ivory-50">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-7 text-mute">
            Design a beautiful marriage biodata in minutes. Pick a template, add your details and photo, and download a print-ready A4 PDF. Free, with no
            sign-up.
          </p>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">
            <ShieldCheck size={14} /> Your details never leave your browser
          </p>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-gold-700">Create</h3>
          <ul className="mt-4 space-y-3 text-sm font-medium text-ink/80">
            <li>
              <Link href="/create" className="hover:text-maroon-700">
                Create biodata
              </Link>
            </li>
            <li>
              <Link href="/templates" className="hover:text-maroon-700">
                All templates
              </Link>
            </li>
            <li>
              <Link href="/#how-it-works" className="hover:text-maroon-700">
                How it works
              </Link>
            </li>
            <li>
              <Link href="/#faq" className="hover:text-maroon-700">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-gold-700">Biodata by community</h3>
          <ul className="mt-4 space-y-3 text-sm font-medium text-ink/80">
            {categoryOrder.map((category) => (
              <li key={category}>
                <Link href={`/templates?category=${category}`} className="hover:text-maroon-700">
                  {categoryLabels[category]} marriage biodata
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-gold-700">Good to know</h3>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-mute">
            <li>Every template prints on standard A4 paper.</li>
            <li>Drafts are saved on this device automatically.</li>
            <li>Export a JSON backup to continue on another device.</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory-300">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-mute sm:flex-row sm:px-8">
          <span>© {new Date().getFullYear()} Shadi BioData. All rights reserved.</span>
          <span className="inline-flex items-center gap-1.5">
            Made with <Heart size={12} className="fill-maroon-600 text-maroon-600" /> for families across India
          </span>
        </div>
      </div>
    </footer>
  );
}
