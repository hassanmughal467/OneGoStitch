import { cn } from "@/lib/utils";

export function Logo({ className, invert = false }: { className?: string; invert?: boolean }) {
  return (
    <img
      src="/logo.png"
      alt="OneGo Stitch"
      width={320}
      height={291}
      className={cn("w-auto max-w-[min(100%,11rem)] object-contain sm:max-w-[13rem]", invert ? "h-14 sm:h-20 lg:h-24" : "h-11 sm:h-16 lg:h-20", className)}
    />
  );
}
