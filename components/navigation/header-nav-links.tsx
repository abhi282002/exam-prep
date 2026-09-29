import Link from "next/link";

interface NavigationItemRecord {
  navigationLabel: string;
  destinationPath: string;
}

const headerNavigationItems: NavigationItemRecord[] = [
  { navigationLabel: "Exams", destinationPath: "/exams" },
  { navigationLabel: "My Attempts", destinationPath: "/attempts" },
  { navigationLabel: "Features", destinationPath: "/#features" },
  { navigationLabel: "Study Journey", destinationPath: "/#journey" },
];

export function HeaderNavLinks() {
  return (
    <nav className="hidden items-center gap-6 md:flex">
      {headerNavigationItems.map((item) => (
        <Link
          key={item.destinationPath}
          href={item.destinationPath}
          className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
        >
          {item.navigationLabel}
        </Link>
      ))}
    </nav>
  );
}
