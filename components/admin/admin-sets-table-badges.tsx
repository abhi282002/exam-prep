import { Badge } from "@/components/ui/badge";

export function SetStatusBadge({ isActive }: { isActive: boolean }) {
  return (
    <Badge variant={isActive ? "default" : "outline"} className="text-[10px]">
      {isActive ? "Published" : "Draft"}
    </Badge>
  );
}

export function PaperUploadBadge({ hasFile }: { hasFile: boolean }) {
  return (
    <Badge variant={hasFile ? "secondary" : "outline"} className="text-[10px]">
      {hasFile ? "Uploaded" : "Pending"}
    </Badge>
  );
}
