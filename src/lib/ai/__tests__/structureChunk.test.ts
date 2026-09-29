import { describe, it, expect } from "vitest";
import { stripFences } from "../structureChunk";
import { chunkExtractionSchema } from "../extractionSchema";

describe("structureChunk parsing and validation", () => {
  const validChunk = [
    {
      number: 1,
      text: "Which protocol secures web traffic?",
      passage: null,
      options: [
        { key: "A", text: "HTTP" },
        { key: "B", text: "FTP" },
        { key: "C", text: "HTTPS" },
        { key: "D", text: "SMTP" },
      ],
    },
  ];

  it("passes validation with valid JSON and exactly 4 options", () => {
    const parsed = chunkExtractionSchema.parse(validChunk);
    expect(parsed.length).toBe(1);
    expect(parsed[0].options.length).toBe(4);
  });

  it("fails zod validation when only 3 options are provided", () => {
    const invalidChunk = [
      {
        number: 1,
        text: "Test question",
        passage: null,
        options: [
          { key: "A", text: "One" },
          { key: "B", text: "Two" },
          { key: "C", text: "Three" },
        ],
      },
    ];
    expect(() => chunkExtractionSchema.parse(invalidChunk)).toThrow();
  });

  it("strips markdown code fences cleanly", () => {
    const fencedJson = '```json\n[{"test": 1}]\n```';
    expect(stripFences(fencedJson)).toBe('[{"test": 1}]');
  });
});
