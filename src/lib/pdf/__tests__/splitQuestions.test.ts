import { describe, it, expect } from "vitest";
import { splitQuestions, makeChunks } from "../splitQuestions";

describe("splitQuestions", () => {
  const samplePaper = `
Q.1 Which pedagogical strategy promotes inquiry?
(A) Lecture (B) Active learning (C) Memorization (D) None

Q.2 What is the foundation of scientific research?
(A) Faith (B) Empirical data (C) Anecdote (D) Tradition

Question 3: In communication, semantic noise refers to:
(A) Echo (B) Language ambiguity (C) Radio static (D) Tone
`;

  it("extracts all questions with correct numbering", () => {
    const questions = splitQuestions(samplePaper);
    expect(questions.length).toBe(3);
    expect(questions[0].questionNumber).toBe(1);
    expect(questions[1].questionNumber).toBe(2);
    expect(questions[2].questionNumber).toBe(3);
  });

  it("chunks questions according to batch size", () => {
    const questions = splitQuestions(samplePaper);
    const chunks = makeChunks(questions, 2);
    expect(chunks.length).toBe(2);
    expect(chunks[0].length).toBe(2);
    expect(chunks[1].length).toBe(1);
  });
});
