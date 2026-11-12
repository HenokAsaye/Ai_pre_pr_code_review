import { cn } from "@/lib/utils";
import type { GitHubDiffFile } from "@/types/github";

interface DiffViewerProps {
  file: GitHubDiffFile;
}

export function DiffViewer({ file }: DiffViewerProps) {
  const lines = file.patch?.split("\n") ?? [];

  return (
    <div className="border border-border">
      <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-2.5">
        <span className="truncate font-mono text-xs text-foreground">{file.filename}</span>
        <div className="flex shrink-0 items-center gap-3 font-mono text-xs">
          <span className="text-diff-add">+{file.additions}</span>
          <span className="text-diff-del">-{file.deletions}</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <pre className="p-4 font-mono text-xs leading-relaxed">
          {lines.map((line, idx) => (
            <div
              key={idx}
              className={cn(
                "px-2",
                line.startsWith("+") && !line.startsWith("+++")
                  ? "bg-diff-add-bg text-diff-add"
                  : line.startsWith("-") && !line.startsWith("---")
                    ? "bg-diff-del-bg text-diff-del"
                    : line.startsWith("@@")
                      ? "text-muted-foreground"
                      : "text-foreground/80",
              )}
            >
              {line || " "}
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
