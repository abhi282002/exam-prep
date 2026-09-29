"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useHeaderAuth } from "./use-header-auth";

export function HeaderAuthButton() {
  const { isLoading, isAuthenticated, isUserAdmin, handleSignOut } = useHeaderAuth();

  if (isLoading) return null;

  if (!isAuthenticated) {
    return (
      <Link href="/login">
        <Button variant="ghost" size="sm">
          Sign In
        </Button>
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {isUserAdmin && (
        <Link href="/admin">
          <Button
            variant="outline"
            size="sm"
            className="border-purple-300 text-purple-700 hover:bg-purple-50"
          >
            Admin
          </Button>
        </Link>
      )}
      <Button variant="ghost" size="sm" onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  );
}
