import { serve } from "inngest/next";
import { inngestClient } from "@/src/inngest/client";
import { extractPaperFunction } from "@/src/inngest/functions/extract-paper";

export const { GET, POST, PUT } = serve({
  client: inngestClient,
  functions: [extractPaperFunction],
});
