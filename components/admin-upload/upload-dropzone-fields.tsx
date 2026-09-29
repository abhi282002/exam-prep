import { UploadFileDropzone } from "./upload-file-dropzone";

interface DropzoneFieldsProps {
  questionPdf: File | null;
  answerKeyPdf: File | null;
  onSelectQuestionPdf: (file: File | null) => void;
  onSelectAnswerKeyPdf: (file: File | null) => void;
  uploadProgressPercentage: number;
}

export function UploadDropzoneFields({
  questionPdf,
  answerKeyPdf,
  onSelectQuestionPdf,
  onSelectAnswerKeyPdf,
  uploadProgressPercentage,
}: DropzoneFieldsProps) {
  return (
    <>
      <UploadFileDropzone
        labelTitle="Question Paper PDF"
        fieldId="question-pdf"
        selectedFile={questionPdf}
        onSelectFile={onSelectQuestionPdf}
        uploadProgressPercentage={uploadProgressPercentage}
        isRequired={true}
      />
      <UploadFileDropzone
        labelTitle="Official Answer Key PDF"
        fieldId="answer-key-pdf"
        selectedFile={answerKeyPdf}
        onSelectFile={onSelectAnswerKeyPdf}
        isRequired={false}
      />
    </>
  );
}
