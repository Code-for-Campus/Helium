import { initTRPC, /* TRPCError */ } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { db } from "@helium/db";

export const createTRPCContext = /* async */ (/* opts: {
  headers: Headers;
  session: Session | null;
} */) => {
  // const session = opts.session ?? (await auth());
  // const source = opts.headers.get("x-trpc-source") ?? "unknown";
  //
  // console.log(">>> tRPC Request from", source, "by", session?.user);

  return {
    // session,
    db,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

const enforceUserIsAuthed = t.middleware(({ /* ctx, */ next }) => {
  // if (!ctx.session?.user) {
  //   throw new TRPCError({ code: "UNAUTHORIZED" });
  // }
  return next({
    ctx: {
      // session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
