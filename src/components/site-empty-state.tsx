import Link from "next/link";

type SiteEmptyStateProps = {
  actionHref?: string;
  actionLabel?: string;
  description: string;
  title: string;
};

export function SiteEmptyState({ actionHref, actionLabel, description, title }: SiteEmptyStateProps) {
  return (
    <div className="mx-auto max-w-[620px] border border-[#d8d1c5] bg-[#faf9f6] px-8 py-14 text-center">
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#9a8a74]">Coming soon</p>
      <h2 className="mt-5 text-[22px] font-medium uppercase tracking-[0.14em] text-[#4e5359]">{title}</h2>
      <span className="thin-rule mx-auto mt-5" />
      <p className="body-copy mx-auto mt-6 max-w-[430px]">{description}</p>
      {actionHref && actionLabel ? (
        <Link href={actionHref} className="green-outline mt-8">
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
