import * as z from "zod";

export const createOrderValidator = z.object({
  pizzaId: z.number(),
  additionalToppings: z.array(z.number()).optional(),
  qty: z.number().min(0),
});
