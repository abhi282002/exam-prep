import { router } from "../trpc";
import { attemptRouter } from "./attempt";
import { examRouter } from "./exam";
import { adminRouter } from "./admin";

export const appRouter = router({
  attempt: attemptRouter,
  exam: examRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
