import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UploadFormContainer } from "@/components/admin-upload/upload-form-container";

export default function AdminUploadPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-neutral-900">Upload Examination Paper</h1>
          <p className="text-xs text-neutral-500">Upload question paper & answer key PDFs to private bucket.</p>
        </div>
        <Link href="/admin"><Button variant="outline" size="sm">Back</Button></Link>
      </div>
      <UploadFormContainer />
    </div>
  );
}
