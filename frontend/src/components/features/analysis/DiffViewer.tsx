import { cn } from "@/lib/utils";
import type { GitHubDiffFile } from "@/types/github";

interface DiffViewerProps {
  file: GitHubDiffFile;
}

export function DiffViewer({ file }: DiffViewerProps) {
  const lines = file.patch?.split("\n") ?? [];

  return (
    <div className="rounded-lg border border-border/60 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-muted/40 border-b border-border/40">
        <span className="text-xs font-mono text-foreground truncate">
          {file.filename}
        </span>
        <div className="flex items-center gap-3 text-xs shrink-0">
          <span className="text-green-500">+{file.additions}</span>
          <span className="text-red-500">-{file.deletions}</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <pre className="p-4 text-xs font-mono leading-relaxed">
          {lines.map((line, idx) => (
            <div
              key={idx}
              className={cn(
                "px-2 -mx-2 rounded-sm",
                line.startsWith("+") && !line.startsWith("+++")
                  ? "bg-green-500/10 text-green-400"
                  : line.startsWith("-") && !line.startsWith("---")
                  ? "bg-red-500/10 text-red-400"
                  : line.startsWith("@@")
                  ? "text-blue-400"
                  : "text-muted-foreground"
              )}
            >
              {line}
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
