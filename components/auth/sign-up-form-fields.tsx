"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SignUpFormFieldsProperties {
  userFullName: string;
  userEmailAddress: string;
  userAccountPassword: string;
  onChangeUserFullName: (value: string) => void;
  onChangeUserEmailAddress: (value: string) => void;
  onChangeUserAccountPassword: (value: string) => void;
}

export function SignUpFormFields({
  userFullName,
  userEmailAddress,
  userAccountPassword,
  onChangeUserFullName,
  onChangeUserEmailAddress,
  onChangeUserAccountPassword,
}: SignUpFormFieldsProperties) {
  return (
    <>
      <div className="space-y-1">
        <Label htmlFor="signup-name">Full Name</Label>
        <Input
          id="signup-name"
          placeholder="Priya Sharma"
          value={userFullName}
          onChange={(event) => onChangeUserFullName(event.target.value)}
          required
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="signup-email">Email Address</Label>
        <Input
          id="signup-email"
          type="email"
          placeholder="student@example.com"
          value={userEmailAddress}
          onChange={(event) => onChangeUserEmailAddress(event.target.value)}
          required
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="signup-password">Password</Label>
        <Input
          id="signup-password"
          type="password"
          placeholder="••••••••"
          value={userAccountPassword}
          onChange={(event) => onChangeUserAccountPassword(event.target.value)}
          required
          minLength={6}
        />
      </div>
    </>
  );
}
