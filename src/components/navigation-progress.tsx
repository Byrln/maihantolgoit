"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

export function NavigationProgress() {
  return (
    <Suspense fallback={null}>
      <NavigationProgressInner />
    </Suspense>
  );
}

function NavigationProgressInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setLoading(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, [pathname, searchParams]);

  useEffect(() => {
    const start = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest("a[href]") as HTMLAnchorElement | null;

      if (!link || event.defaultPrevented || event.button !== 0 || link.target === "_blank" || link.origin !== window.location.origin) {
        return;
      }

      const next = new URL(link.href);
      if (`${next.pathname}${next.search}` === `${window.location.pathname}${window.location.search}`) return;

      setLoading(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setLoading(false), 12000);
    };

    document.addEventListener("click", start, true);
    return () => {
      document.removeEventListener("click", start, true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return <div aria-hidden className={`navigation-progress ${loading ? "is-loading" : ""}`} />;
}
