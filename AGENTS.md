<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Question content rules (added)
- Every question has a `type`: mcq | match | passage | statements | assertion_reason.
- Structured parts live in `questions.content` (jsonb). NEVER flatten lists, statements,
  or tables into one string.
- Never guess pairings in match questions. The options define the pairing.
- Rendering goes through ONE component, `QuestionRenderer`, which switches on `type`.
- Math is stored as LaTeX and rendered with KaTeX. Diagrams and unparseable layouts use
  `image_url` (cropped page region).
- Every question stores `source_page` so the review screen can show the original page.
