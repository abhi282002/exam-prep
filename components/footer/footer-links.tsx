import Link from "next/link";

interface FooterLinkItem {
  navigationLabel: string;
  destinationPath: string;
}

const platformFooterLinks: FooterLinkItem[] = [
  { navigationLabel: "All Exams", destinationPath: "/exams" },
  { navigationLabel: "UGC NET Paper 1", destinationPath: "/exams" },
  { navigationLabel: "Computer Science Paper 2", destinationPath: "/exams" },
  { navigationLabel: "Sign In", destinationPath: "/login" },
];

export function FooterLinks() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-500">
      {platformFooterLinks.map((individualFooterLink) => (
        <Link
          key={individualFooterLink.navigationLabel}
          href={individualFooterLink.destinationPath}
          className="transition-colors hover:text-neutral-900"
        >
          {individualFooterLink.navigationLabel}
        </Link>
      ))}
    </div>
  );
}
