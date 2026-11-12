import Link from "next/link";
import { cn } from "@/lib/utils";

interface WordmarkProps {
  href?: string;
  className?: string;
}

export function Wordmark({ href = "/", className }: WordmarkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-baseline gap-2 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
        className,
      )}
    >
      <span className="font-heading text-[1.35rem] leading-none tracking-tight text-foreground">
        ReviewAI
      </span>
      <span className="hidden font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground uppercase sm:inline">
        pre-PR
      </span>
    </Link>
  );
}
