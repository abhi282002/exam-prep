"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { AuthStatusMessage } from "./auth-status-message";
import { SignInFormFields } from "./sign-in-form-fields";

export function SignInForm() {
  const router = useRouter();
  const [userEmailAddress, setUserEmailAddress] = React.useState("");
  const [userAccountPassword, setUserAccountPassword] = React.useState("");
  const [isSubmittingCredentials, setIsSubmittingCredentials] = React.useState(false);
  const [authenticationErrorMessage, setAuthenticationErrorMessage] = React.useState<string | null>(null);

  const handleSignInSubmission = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmittingCredentials(true);
    setAuthenticationErrorMessage(null);
    const supabaseClient = createSupabaseBrowserClient();
    const { error: signInError } = await supabaseClient.auth.signInWithPassword({
      email: userEmailAddress,
      password: userAccountPassword,
    });
    if (signInError) {
      setAuthenticationErrorMessage(signInError.message);
      setIsSubmittingCredentials(false);
      return;
    }
    router.push("/exams");
    router.refresh();
  };

  return (
    <form onSubmit={handleSignInSubmission} className="space-y-4">
      <AuthStatusMessage errorMessageText={authenticationErrorMessage} />
      <SignInFormFields
        userEmailAddress={userEmailAddress}
        userAccountPassword={userAccountPassword}
        onChangeUserEmailAddress={setUserEmailAddress}
        onChangeUserAccountPassword={setUserAccountPassword}
      />
      <Button type="submit" className="w-full" disabled={isSubmittingCredentials}>
        {isSubmittingCredentials ? "Signing in..." : "Sign In to Account"}
      </Button>
    </form>
  );
}
