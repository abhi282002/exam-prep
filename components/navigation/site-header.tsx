import { HeaderBrand } from "./header-brand";
import { HeaderNavLinks } from "./header-nav-links";
import { HeaderActions } from "./header-actions";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <HeaderBrand />
        <HeaderNavLinks />
        <HeaderActions />
      </div>
    </header>
  );
}
