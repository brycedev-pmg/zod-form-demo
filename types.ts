import z from "zod";
import { signUpSchema } from "./features/WithZodForm/signUp.schema";

export interface SignUpFormFields {
  email: string;
  password: string;
  terms: boolean;
  username?: string;
}

export type ZodSignUpFormFields = z.infer<typeof signUpSchema>;
