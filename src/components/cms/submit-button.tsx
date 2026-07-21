"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import type { ComponentProps } from "react";

type SubmitButtonProps = ComponentProps<typeof Button> & {
  pendingLabel?: string;
};

export function SubmitButton({ children, disabled, pendingLabel = "Түр хүлээнэ үү...", ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button {...props} disabled={disabled || pending} type="submit">
      {pending ? <Loader2 className="animate-spin" /> : null}
      {pending ? pendingLabel : children}
    </Button>
  );
}
