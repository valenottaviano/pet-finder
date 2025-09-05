"use client";

import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { verifyEmail, resendVerificationCode } from "../_actions/verify-email";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";

export function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const onSubmit = () => {
    setError("");
    setSuccess("");

    startTransition(() => {
      verifyEmail(email, otp).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);

        if (data?.success && data?.redirectTo) {
          setTimeout(() => {
            window.location.href = data.redirectTo;
          }, 1500);
        }
      });
    });
  };

  const onResend = () => {
    setError("");
    setSuccess("");

    startTransition(() => {
      resendVerificationCode(email).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Verify Email</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-4">
              Please enter the verification code sent to:{" "}
              <strong>{email}</strong>
            </p>
          </div>
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
              disabled={isPending}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            onClick={onSubmit}
            className="w-full"
            disabled={isPending || otp.length !== 6}
          >
            Verify Email
          </Button>
          <Button
            variant="outline"
            onClick={onResend}
            className="w-full"
            disabled={isPending}
          >
            Resend Code
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
