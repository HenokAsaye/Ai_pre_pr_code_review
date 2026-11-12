import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  label?: string;
}

const sizeMap = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
};

export function LoadingSpinner({ className, size = "md", label }: LoadingSpinnerProps) {
  return (
    <div className={cn("flex items-center gap-2", className)} role="status">
      <Loader2
        className={cn("animate-spin text-muted-foreground", sizeMap[size])}
        aria-hidden="true"
      />
      {label ? <span className="text-sm text-muted-foreground">{label}</span> : null}
      {!label ? <span className="sr-only">Loading</span> : null}
    </div>
  );
}

export function PageLoader({ label = "Loading" }: { label?: string }) {
  return (
    <div
      className="mx-auto flex min-h-[50vh] w-full max-w-4xl items-center px-4 sm:px-6"
      role="status"
    >
      <div>
        <p className="kicker">Please wait</p>
        <p className="mt-3 font-heading text-4xl tracking-tight text-foreground">{label}</p>
      </div>
    </div>
  );
}
