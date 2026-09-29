"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { AuthStatusMessage } from "./auth-status-message";
import { SignUpFormFields } from "./sign-up-form-fields";

export function SignUpForm() {
  const [userFullName, setUserFullName] = React.useState("");
  const [userEmailAddress, setUserEmailAddress] = React.useState("");
  const [userAccountPassword, setUserAccountPassword] = React.useState("");
  const [isSubmittingRegistration, setIsSubmittingRegistration] = React.useState(false);
  const [registrationErrorMessage, setRegistrationErrorMessage] = React.useState<string | null>(null);
  const [registrationSuccessMessage, setRegistrationSuccessMessage] = React.useState<string | null>(null);

  const handleSignUpSubmission = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmittingRegistration(true);
    setRegistrationErrorMessage(null);
    const supabaseClient = createSupabaseBrowserClient();
    const { error: signUpError } = await supabaseClient.auth.signUp({
      email: userEmailAddress,
      password: userAccountPassword,
      options: { data: { full_name: userFullName } },
    });
    if (signUpError) {
      setRegistrationErrorMessage(signUpError.message);
      setIsSubmittingRegistration(false);
      return;
    }
    setRegistrationSuccessMessage("Account created successfully! Check your email to confirm or sign in.");
    setIsSubmittingRegistration(false);
  };

  return (
    <form onSubmit={handleSignUpSubmission} className="space-y-3.5">
      <AuthStatusMessage errorMessageText={registrationErrorMessage} successMessageText={registrationSuccessMessage} />
      <SignUpFormFields
        userFullName={userFullName}
        userEmailAddress={userEmailAddress}
        userAccountPassword={userAccountPassword}
        onChangeUserFullName={setUserFullName}
        onChangeUserEmailAddress={setUserEmailAddress}
        onChangeUserAccountPassword={setUserAccountPassword}
      />
      <Button type="submit" className="w-full" disabled={isSubmittingRegistration}>
        {isSubmittingRegistration ? "Creating account..." : "Create Student Account"}
      </Button>
    </form>
  );
}
