"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { UploadExamSelector } from "./upload-exam-selector";
import { UploadSetInputs } from "./upload-set-inputs";
import { UploadDropzoneFields } from "./upload-dropzone-fields";
import { useUploadSubmit } from "./use-upload-submit";
import { useUploadFormState } from "./use-upload-form-state";

export function UploadFormContainer() {
  const formState = useUploadFormState();
  const { isUploading, uploadProgress, submitForm } = useUploadSubmit();

  const handleFormSubmission = async (event: React.FormEvent) => {
    event.preventDefault();
    await submitForm(formState.getFormData());
  };

  const isSubmitDisabled = isUploading || !formState.isFormValid;

  return (
    <form
      onSubmit={handleFormSubmission}
      className="space-y-5 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
    >
      <UploadExamSelector
        selectedExamId={formState.selectedExamId}
        onSelectExamId={formState.setSelectedExamId}
        onSelectExamSlug={formState.setSelectedExamSlug}
      />
      <UploadSetInputs
        setName={formState.setName}
        yearNumber={formState.yearNumber}
        sessionText={formState.sessionText}
        onChangeSetName={formState.setSetName}
        onChangeYearNumber={formState.setYearNumber}
        onChangeSessionText={formState.setSessionText}
      />
      <UploadDropzoneFields
        questionPdf={formState.questionPdf}
        answerKeyPdf={formState.answerKeyPdf}
        onSelectQuestionPdf={formState.setQuestionPdf}
        onSelectAnswerKeyPdf={formState.setAnswerKeyPdf}
        uploadProgressPercentage={uploadProgress}
      />
      <Button type="submit" disabled={isSubmitDisabled} className="w-full">
        {isUploading ? `Uploading Paper (${uploadProgress}%)…` : "Upload & Register Set"}
      </Button>
    </form>
  );
}
