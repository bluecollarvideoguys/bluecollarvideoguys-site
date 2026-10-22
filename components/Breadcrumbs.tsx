import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/schemas";

type Crumb = { name: string; path: string };

/** Visible breadcrumbs plus matching BreadcrumbList schema. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <>
      <BreadcrumbSchema items={items} />
      <nav aria-label="Breadcrumb" className="text-xs text-slate-400">
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((c, i) => (
            <li key={c.path} className="flex items-center gap-2">
              {i < items.length - 1 ? (
                <>
                  <Link href={c.path} className="hover:text-[var(--v02-gold)]">
                    {c.name}
                  </Link>
                  <span aria-hidden="true">/</span>
                </>
              ) : (
                <span aria-current="page" className="text-slate-300">
                  {c.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
