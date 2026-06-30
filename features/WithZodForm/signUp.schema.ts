import z from "zod";

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
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
      error:
        "Paswword must have at leaston 1 uppercase letter, at least 1 number, and at least 1 special character",
    }),
  terms: z.boolean().refine((checked) => checked, {
    error: "You must accept our terms to create an account",
  }),
});
