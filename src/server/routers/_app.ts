import { router } from "../trpc";
import { attemptRouter } from "./attempt";
import { examRouter } from "./exam";
import { adminRouter } from "./admin";
import { authRouter } from "./auth";

export const appRouter = router({
  attempt: attemptRouter,
  exam: examRouter,
  admin: adminRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
