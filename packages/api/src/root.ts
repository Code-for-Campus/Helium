import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({/* schemas go here as procedures */});

export type AppRouter = typeof appRouter;
