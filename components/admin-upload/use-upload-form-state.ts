"use client";

import * as React from "react";
import type { UploadSubmitParameters } from "./upload-types";

export function useUploadFormState() {
  const [selectedExamId, setSelectedExamId] = React.useState("");
  const [selectedExamSlug, setSelectedExamSlug] = React.useState("");
  const [setName, setSetName] = React.useState("");
  const [yearNumber, setYearNumber] = React.useState(2024);
  const [sessionText, setSessionText] = React.useState("June");
  const [questionPdf, setQuestionPdf] = React.useState<File | null>(null);
  const [answerKeyPdf, setAnswerKeyPdf] = React.useState<File | null>(null);

  const getFormData = (): UploadSubmitParameters => ({
    examId: selectedExamId,
    examSlug: selectedExamSlug,
    setName,
    yearNumber,
    sessionText,
    questionPdf,
    answerKeyPdf,
  });

  const isFormValid = Boolean(questionPdf && selectedExamId);

  return {
    selectedExamId,
    setSelectedExamId,
    setSelectedExamSlug,
    setName,
    setSetName,
    yearNumber,
    setYearNumber,
    sessionText,
    setSessionText,
    questionPdf,
    setQuestionPdf,
    answerKeyPdf,
    setAnswerKeyPdf,
    getFormData,
    isFormValid,
  };
}
