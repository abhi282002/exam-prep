"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { trpc } from "@/src/trpc/client";
import { uploadPdfToSignedUrl } from "./upload-file-to-storage";
import type { UploadSubmitParameters } from "./upload-types";

export function useUploadSubmit() {
  const router = useRouter();
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const createSetMutation = trpc.admin.createSet.useMutation();
  const getUploadUrlMutation = trpc.admin.getUploadUrl.useMutation();

  const uploadFile = async (
    setId: string,
    examSlug: string,
    kind: "question" | "answer_key",
    file: File
  ) => {
    const { signedUrl } = await getUploadUrlMutation.mutateAsync({ examSlug, setId, kind });
    await uploadPdfToSignedUrl(signedUrl, file);
  };

  const submitForm = async (params: UploadSubmitParameters) => {
    if (!params.questionPdf || !params.examId) return;
    setIsUploading(true);
    try {
      const createdSet = await createSetMutation.mutateAsync({
        examId: params.examId,
        name: params.setName,
        year: params.yearNumber,
        session: params.sessionText,
        totalMarks: 100,
      });
      setUploadProgress(30);
      await uploadFile(createdSet.id, params.examSlug, "question", params.questionPdf);
      setUploadProgress(70);
      if (params.answerKeyPdf) {
        await uploadFile(createdSet.id, params.examSlug, "answer_key", params.answerKeyPdf);
      }
      setUploadProgress(100);
      router.push("/admin");
    } finally {
      setIsUploading(false);
    }
  };

  return { isUploading, uploadProgress, submitForm };
}
