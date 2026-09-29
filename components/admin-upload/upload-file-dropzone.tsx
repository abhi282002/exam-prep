import { Label } from "@/components/ui/label";

interface FileDropzoneProperties {
  labelTitle: string;
  fieldId: string;
  selectedFile: File | null;
  onSelectFile: (file: File | null) => void;
  uploadProgressPercentage?: number;
  isRequired?: boolean;
}

export function UploadFileDropzone({
  labelTitle,
  fieldId,
  selectedFile,
  onSelectFile,
  uploadProgressPercentage,
  isRequired = false,
}: FileDropzoneProperties) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label htmlFor={fieldId}>{labelTitle}</Label>
        {!isRequired && <span className="text-[11px] text-neutral-400 font-medium">Optional</span>}
      </div>
      <div className="flex flex-col gap-2 rounded-xl border border-dashed border-neutral-300 p-4 text-center hover:border-blue-400">
        <input
          id={fieldId}
          type="file"
          accept=".pdf"
          onChange={(e) => onSelectFile(e.target.files?.[0] ?? null)}
          className="text-xs text-neutral-600 file:mr-3 file:rounded-md file:border-0 file:bg-blue-50 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
          required={isRequired}
        />
        {selectedFile && (
          <div className="text-left text-[11px] text-neutral-500">
            Selected: <span className="font-semibold text-neutral-800">{selectedFile.name}</span> ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
          </div>
        )}
        {uploadProgressPercentage !== undefined && uploadProgressPercentage > 0 && (
          <div className="w-full bg-neutral-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-blue-600 h-1.5 transition-all duration-300" style={{ width: `${uploadProgressPercentage}%` }} />
          </div>
        )}
      </div>
    </div>
  );
}
