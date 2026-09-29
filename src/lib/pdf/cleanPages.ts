export function cleanPages(pageTextList: string[]): string[] {
  const pageNumberRegex = /^(?:Page\s*\d+\s*(?:of\s*\d+)?|\d+\s*\/\s*\d+|\d+)$/im;
  const commonExamHeaderRegex = /^(?:UGC\s*NET|NTA\s*UGC|NATIONAL\s*TESTING\s*AGENCY|Subject\s*:.*)$/im;

  return pageTextList.map((rawPageText) => {
    const rawLines = rawPageText.split(/\r?\n/);
    const cleanedLines = rawLines.filter((singleLine) => {
      const trimmedLine = singleLine.trim();
      if (!trimmedLine) return true;
      if (pageNumberRegex.test(trimmedLine)) return false;
      if (commonExamHeaderRegex.test(trimmedLine)) return false;
      return true;
    });

    return cleanedLines.join("\n").trim();
  });
}
