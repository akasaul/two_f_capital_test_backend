import * as z from "zod";

export const createPizzaValidator = z.object({
  name: z.string().min(5),
  toppings: z.string(),
  price: z.string().regex(/^\d+$/, {
    message: "Price must be a number",
  }),
  pizzaCover: z.string().url(),
});
