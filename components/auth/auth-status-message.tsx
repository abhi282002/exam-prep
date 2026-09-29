interface AuthStatusMessageProperties {
  errorMessageText?: string | null;
  successMessageText?: string | null;
}

export function AuthStatusMessage({
  errorMessageText,
  successMessageText,
}: AuthStatusMessageProperties) {
  if (errorMessageText) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
        {errorMessageText}
      </div>
    );
  }
  if (successMessageText) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800">
        {successMessageText}
      </div>
    );
  }
  return null;
}
