import Link from 'next/link';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="font-suisse text-[11px] text-[var(--brand-cream)]/70 flex items-center gap-1.5 mb-1 select-none">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={item.label} className="inline-flex items-center gap-1.5">
            {index > 0 && <span className="opacity-40">/</span>}
            {isLast || !item.href ? (
              <span className="text-[var(--brand-cream)] font-medium" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="hover:text-[#E8DCC8] transition-colors underline-offset-2 hover:underline">
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
