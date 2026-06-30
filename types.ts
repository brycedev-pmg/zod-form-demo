import z from "zod";
import { signUpSchema } from "./features/WithZodForm/signUp.schema";

/**
 * This is typically how you will see types made for forms (If they are even in Typescript)
 *
 * Having to come back here and update these form field value types when you are adding things elsewhere. This is usually the hardest part about Typescript
 * when compared to Javascript. Having to define these things and potentially duplicating it and conflicting later happens almost all the time.
 */
export interface SignUpFormFields {
  email: string;
  password: string;
  terms: boolean;
  username?: string;
}

/**
 * Being able to infer types for the Zod schema lets us never have to worry about coming back to update our form field types when we want to add to it.
 */
export type ZodSignUpFormFields = z.infer<typeof signUpSchema>;
