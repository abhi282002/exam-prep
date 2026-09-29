import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface QuestionsToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
}

export function AdminQuestionsToolbar({
  searchQuery,
  onSearchChange,
  onExpandAll,
  onCollapseAll,
}: QuestionsToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
      <Input
        placeholder="Filter by question text or number..."
        value={searchQuery}
        onChange={(event) => onSearchChange(event.target.value)}
        className="max-w-md bg-white text-xs h-9"
      />
      <div className="flex items-center gap-2 self-end sm:self-auto">
        <Button variant="outline" size="sm" onClick={onExpandAll} className="h-8 text-xs">
          Expand All
        </Button>
        <Button variant="outline" size="sm" onClick={onCollapseAll} className="h-8 text-xs">
          Collapse All
        </Button>
      </div>
    </div>
  );
}
