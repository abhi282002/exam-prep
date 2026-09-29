"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AuthCardHeader } from "./auth-card-header";
import { AuthTabsNavigation } from "./auth-tabs-navigation";
import { SignInForm } from "./sign-in-form";
import { SignUpForm } from "./sign-up-form";
import { AuthFooterNote } from "./auth-footer-note";

interface AuthContainerProperties {
  initialAuthenticationMode?: "signin" | "signup";
}

export function AuthContainer({
  initialAuthenticationMode = "signin",
}: AuthContainerProperties) {
  const [currentAuthenticationTab, setCurrentAuthenticationTab] = React.useState<"signin" | "signup">(initialAuthenticationMode);

  return (
    <Card className="w-full max-w-md border-neutral-200 bg-white/95 shadow-xl backdrop-blur-sm">
      <CardContent className="flex flex-col space-y-5 p-6 sm:p-8">
        <AuthCardHeader />
        <AuthTabsNavigation
          activeAuthenticationTab={currentAuthenticationTab}
          onSelectAuthenticationTab={setCurrentAuthenticationTab}
        />
        {currentAuthenticationTab === "signin" ? <SignInForm /> : <SignUpForm />}
        <AuthFooterNote />
      </CardContent>
    </Card>
  );
}
