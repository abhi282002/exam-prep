import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SetInputsProperties {
  setName: string;
  yearNumber: number;
  sessionText: string;
  onChangeSetName: (val: string) => void;
  onChangeYearNumber: (val: number) => void;
  onChangeSessionText: (val: string) => void;
}

export function UploadSetInputs({
  setName,
  yearNumber,
  sessionText,
  onChangeSetName,
  onChangeYearNumber,
  onChangeSessionText,
}: SetInputsProperties) {
  return (
    <>
      <div className="space-y-1.5">
        <Label htmlFor="set-name">Set / Shift Title</Label>
        <Input
          id="set-name"
          placeholder="e.g. June 2024 - Shift 1 General Paper 1"
          value={setName}
          onChange={(e) => onChangeSetName(e.target.value)}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="set-year">Year</Label>
          <Input
            id="set-year"
            type="number"
            value={yearNumber}
            onChange={(e) => onChangeYearNumber(parseInt(e.target.value, 10) || 2024)}
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="set-session">Session</Label>
          <Input
            id="set-session"
            placeholder="June / December"
            value={sessionText}
            onChange={(e) => onChangeSessionText(e.target.value)}
            required
          />
        </div>
      </div>
    </>
  );
}
