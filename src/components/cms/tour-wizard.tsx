"use client";

import { useEffect, useMemo, useState } from "react";
import { HelpCircle } from "lucide-react";

import { TourProvider, useTour, type TourStep } from "@/components/tour";
import { Button } from "@/components/ui/button";

type CmsTourStep = {
  selectorId: string;
  title: string;
  body: string;
  position?: TourStep["position"];
};

type TourWizardProps = {
  storageKey: string;
  steps: CmsTourStep[];
};

export function TourWizard({ storageKey, steps }: TourWizardProps) {
  const localStorageKey = `cms-tour:${storageKey}`;
  const [completed, setCompleted] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setCompleted(window.localStorage.getItem(localStorageKey) === "seen");
    setReady(true);
  }, [localStorageKey]);

  const tourSteps = useMemo<TourStep[]>(
    () =>
      steps.map((step) => ({
        selectorId: step.selectorId,
        position: step.position || "right",
        padding: 10,
        borderRadius: 8,
        closeable: true,
        content: (
          <div className="pr-10">
            <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.body}</p>
          </div>
        ),
      })),
    [steps],
  );

  if (!ready) {
    return (
      <Button type="button" variant="outline">
        <HelpCircle />
        Гарын авлага
      </Button>
    );
  }

  return (
    <TourProvider
      closeable
      isTourCompleted={completed}
      onComplete={() => {
        window.localStorage.setItem(localStorageKey, "seen");
        setCompleted(true);
      }}
      onSkip={() => {
        window.localStorage.setItem(localStorageKey, "seen");
        setCompleted(true);
      }}
      tours={[{ id: storageKey, steps: tourSteps }]}
    >
      <TourStartButton storageKey={storageKey} />
    </TourProvider>
  );
}

function TourStartButton({ storageKey }: { storageKey: string }) {
  const { startTour, setIsTourCompleted } = useTour();

  const start = () => {
    setIsTourCompleted(false);
    requestAnimationFrame(() => startTour(storageKey));
  };

  useEffect(() => {
    const key = `cms-tour:${storageKey}`;

    if (window.localStorage.getItem(key) === "seen") {
      return;
    }

    const timeout = window.setTimeout(start, 400);
    return () => window.clearTimeout(timeout);
  }, [storageKey]);

  return (
    <Button type="button" variant="outline" onClick={start}>
      <HelpCircle />
      Гарын авлага
    </Button>
  );
}
