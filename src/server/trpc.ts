import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import type { TRPCContextType } from "./trpc-context";

const trpcInstance = initTRPC.context<TRPCContextType>().create({
  transformer: superjson,
});

export const router = trpcInstance.router;
export const publicProcedure = trpcInstance.procedure;

export const protectedProcedure = trpcInstance.procedure.use(({ ctx, next }) => {
  if (!ctx.authenticatedUser) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "User session required" });
  }
  return next({ ctx: { ...ctx, authenticatedUser: ctx.authenticatedUser } });
});

export const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  const adminEmailsList = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((singleEmailAddress) => singleEmailAddress.trim().toLowerCase());

  const currentEmail = ctx.authenticatedUser.email?.toLowerCase();
  if (!currentEmail || !adminEmailsList.includes(currentEmail)) {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin privileges required" });
  }

  return next({ ctx });
});
