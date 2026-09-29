interface AuthTabsProperties {
  activeAuthenticationTab: "signin" | "signup";
  onSelectAuthenticationTab: (selectedTab: "signin" | "signup") => void;
}

export function AuthTabsNavigation({
  activeAuthenticationTab,
  onSelectAuthenticationTab,
}: AuthTabsProperties) {
  return (
    <div className="flex w-full rounded-xl bg-neutral-100 p-1">
      <button
        type="button"
        onClick={() => onSelectAuthenticationTab("signin")}
        className={`w-1/2 cursor-pointer rounded-lg py-2 text-xs font-semibold transition-all ${
          activeAuthenticationTab === "signin"
            ? "bg-white text-neutral-900 shadow-sm"
            : "text-neutral-500 hover:text-neutral-900"
        }`}
      >
        Sign In
      </button>
      <button
        type="button"
        onClick={() => onSelectAuthenticationTab("signup")}
        className={`w-1/2 cursor-pointer rounded-lg py-2 text-xs font-semibold transition-all ${
          activeAuthenticationTab === "signup"
            ? "bg-white text-neutral-900 shadow-sm"
            : "text-neutral-500 hover:text-neutral-900"
        }`}
      >
        Create Account
      </button>
    </div>
  );
}
