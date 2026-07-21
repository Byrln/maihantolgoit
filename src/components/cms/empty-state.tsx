import Link from "next/link";
import type { ComponentType } from "react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  actionHref?: string;
  actionLabel?: string;
  className?: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  title: string;
};

export function EmptyState({
  actionHref,
  actionLabel,
  className,
  description,
  icon: Icon,
  title,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-[280px] flex-col items-center justify-center rounded-lg border border-dashed bg-[linear-gradient(135deg,_rgba(16,185,129,0.06),_rgba(14,165,233,0.04))] px-6 py-12 text-center",
        className,
      )}
    >
      <div className="flex size-14 items-center justify-center rounded-lg border bg-background text-primary shadow-sm">
        <Icon className="size-6" />
      </div>
      <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{description}</p>
      {actionHref && actionLabel ? (
        <Button asChild className="mt-6">
          <Link href={actionHref}>
            {actionLabel}
            <ArrowRight />
          </Link>
        </Button>
      ) : null}
    </div>
  );
}
