const STANDARD_OPTION_KEYS = ["A", "B", "C", "D"] as const;

interface RawOptionInput {
  key?: string | number;
  text?: string | null;
}

interface RawQuestionInput {
  number?: number | string;
  text?: string | null;
  passage?: string | null;
  options?: RawOptionInput[];
}

export function sanitizeQuestionItem(
  rawQuestion: RawQuestionInput,
  fallbackQuestionIndex: number
) {
  const questionNumber = Number(rawQuestion?.number) || fallbackQuestionIndex + 1;
  const questionText = (typeof rawQuestion?.text === "string" && rawQuestion.text.trim())
    ? rawQuestion.text.trim()
    : "Question text unavailable";

  const rawOptionList = Array.isArray(rawQuestion?.options) ? rawQuestion.options : [];
  const normalizedOptions = STANDARD_OPTION_KEYS.map((keyLetter, keyIndex) => {
    const foundOption = rawOptionList.find(
      (opt) => String(opt?.key).toUpperCase() === keyLetter || String(opt?.key) === String(keyIndex + 1)
    ) || rawOptionList[keyIndex];

    const optionText = typeof foundOption?.text === "string" && foundOption.text.trim()
      ? foundOption.text.trim()
      : "-";

    return { key: keyLetter, text: optionText };
  });

  return {
    number: questionNumber,
    text: questionText,
    passage: typeof rawQuestion?.passage === "string" ? rawQuestion.passage.trim() : null,
    options: normalizedOptions,
  };
}
