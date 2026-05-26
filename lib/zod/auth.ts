import { z } from "zod";
import { id } from "./shared";

export const email = z.email({ message: "Must be a valid email address" });
export const password = z.string().min(1, { message: "Password is required" });
export const first_name = z
    .string()
    .min(1, { message: "Your first name is required" })
    .max(256, { message: "Your first name must be less than 256 characters" });
export const last_name = z
    .string()
    .min(1, { message: "Your last name is required" })
    .max(256, { message: "Your last name must be less than 256 characters" });

export const signinSchema = z.object({ email, password });
export type SignInSchema = z.infer<typeof signinSchema>;

export const sessionSchema = z.object({
    id,
    email,
    first_name,
    last_name
});
