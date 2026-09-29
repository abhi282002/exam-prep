"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SignInFormFieldsProperties {
  userEmailAddress: string;
  userAccountPassword: string;
  onChangeUserEmailAddress: (value: string) => void;
  onChangeUserAccountPassword: (value: string) => void;
}

export function SignInFormFields({
  userEmailAddress,
  userAccountPassword,
  onChangeUserEmailAddress,
  onChangeUserAccountPassword,
}: SignInFormFieldsProperties) {
  return (
    <>
      <div className="space-y-1.5">
        <Label htmlFor="signin-email">Email Address</Label>
        <Input
          id="signin-email"
          type="email"
          placeholder="student@example.com"
          value={userEmailAddress}
          onChange={(event) => onChangeUserEmailAddress(event.target.value)}
          required
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="signin-password">Password</Label>
        <Input
          id="signin-password"
          type="password"
          placeholder="••••••••"
          value={userAccountPassword}
          onChange={(event) => onChangeUserAccountPassword(event.target.value)}
          required
        />
      </div>
    </>
  );
}
