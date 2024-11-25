import { createProductGatewaySchema } from "@/trpc/api/gateway/types";
import { authProcedure, createTRPCRouter } from "@/trpc/trpc";
import { z } from "zod";

export const productsGateway = createTRPCRouter({
  create: authProcedure
    .input(createProductGatewaySchema)
    .mutation(({ ctx, input }) => {}),
});
