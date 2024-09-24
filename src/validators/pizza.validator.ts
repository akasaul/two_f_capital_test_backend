import * as z from "zod";

export const createPizzaValidator = z.object({
  name: z.string().min(5),
  defaultToppings: z.array(z.string()),
  price: z.number().min(0),
  pizzaCover: z.string().url(),
});
