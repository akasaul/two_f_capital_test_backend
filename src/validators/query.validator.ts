import * as z from "zod";

export const queryValidators = {
  limit: z.string().optional(),
  page: z.string().optional(),
};
