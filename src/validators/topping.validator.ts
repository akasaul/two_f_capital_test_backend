import * as z from "zod";

export const createToppingValidator = z.object({
  name: z.string(),
  price: z.number().min(1),
});
