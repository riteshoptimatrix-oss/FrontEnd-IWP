import { Container } from "@/components/container";
import { Skeleton } from "@/components/skeleton";

/**
 * Route-level loading UI with premium skeleton experience.
 * Rendered via Suspense while a page segment streams.
 */
export default function Loading() {
  return (
    <div className="flex flex-col">
      {/* Hero skeleton */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary/20 via-background to-background">
        <Container className="flex min-h-[60svh] items-center py-24 sm:py-32">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <Skeleton className="mx-auto h-7 w-28 rounded-full" />
            <Skeleton className="mx-auto h-16 w-full max-w-2xl rounded-xl" />
            <Skeleton className="mx-auto h-16 w-2/3 max-w-xl rounded-xl" />
            <Skeleton className="mx-auto h-6 w-full max-w-lg rounded-lg" />
            <div className="flex justify-center gap-3 pt-4">
              <Skeleton className="h-12 w-40 rounded-xl" />
              <Skeleton className="h-12 w-36 rounded-xl" />
            </div>
          </div>
        </Container>
      </section>

      {/* Content skeleton */}
      <Container className="py-20">
        <Skeleton className="mx-auto h-10 w-72 rounded-xl" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="aspect-video w-full rounded-2xl" />
          ))}
        </div>
      </Container>
    </div>
  );
}
