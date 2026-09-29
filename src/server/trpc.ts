import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import type { TRPCContextType } from "./trpc-context";
import { verifyUserIsAdmin } from "@/lib/admin-auth";

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

export const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  const isAuthorizedAdmin = await verifyUserIsAdmin(
    ctx.authenticatedUser.id,
    ctx.authenticatedUser.email
  );

  if (!isAuthorizedAdmin) {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin privileges required" });
  }

  return next({ ctx });
});
