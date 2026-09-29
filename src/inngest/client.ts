import { Inngest } from "inngest";

export const inngestClient = new Inngest({
  id: "examprep",
  eventKey: process.env.INNGEST_EVENT_KEY,
});
