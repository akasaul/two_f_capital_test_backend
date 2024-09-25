import * as z from "zod";

export const restaurantSignUpSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  name: z.string(),
  location: z.string(),
  logo: z.string().url(),
  email: z.string().email(),
  password: z.string().min(8),
  phoneNumber: z.string().min(10),
});

export const restaurantUserRegisterSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string().min(10),
  password: z.string().min(8),
  role: z.number().min(1),
});

export const signUpSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string().min(10),
  password: z.string().min(8),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
