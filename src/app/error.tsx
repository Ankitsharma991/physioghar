"use client";

import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import { Hero } from "@/components/ui/hero";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Hero
      eyebrow="Something went wrong"
      title="We hit an unexpected problem"
      highlight="unexpected problem"
      lede="It is on our side, not yours. Try again, and if it keeps happening please let us know."
    >
      <div className="mt-8 flex flex-wrap gap-3 pb-16">
        <Button onClick={() => retry()}>Try again</Button>
        <ButtonLink href="/" variant="ghost">
          Back to Home
        </ButtonLink>
      </div>
    </Hero>
  );
}
