import { passwordRegex, usernameRegex } from "@/utils/regex";
import z from "zod";

//Schema object properties are required by default
export const signUpSchema = z.object({
  email: z.email({
    error: "This email is not valid",
  }),
  password: z
    .string()
    .min(8, {
      error: "Password must be at least 8 characters",
      abort: true,
    })
    .regex(passwordRegex, {
      error:
        "Paswword must have at leaston 1 uppercase letter, at least 1 number, and at least 1 special character",
    }),
  username: z
    .string()
    .regex(
      usernameRegex,
      "Username can only have lowercase letters and numbers",
    )
    .optional(),
  terms: z.boolean({
    error: "You must accept our terms to create an account",
  }),
});
