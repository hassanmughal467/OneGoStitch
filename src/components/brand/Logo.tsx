import { cn } from "@/lib/utils";

export function Logo({ className, invert = false }: { className?: string; invert?: boolean }) {
  return (
    <img
      src="/logo.png"
      alt="OneGo Stitch"
      width={320}
      height={291}
      className={cn("h-20 w-auto object-contain", invert && "h-24", className)}
    />
  );
}
