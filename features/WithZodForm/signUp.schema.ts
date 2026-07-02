import { passwordRegex, usernameRegex } from "@/utils/regex";
import z from "zod";

/**
 * Schema objects from zod are required by default and will require explicit designation to what properties are optional.
 *
 * This is great because most times inputs are required for a form. Without a validation library, you will likely run into
 * many times where forms will allow submission prematurely since there is no validation implemented.
 *
 * Zod objects will come with factory functions that handle certain validation automatically
 */
export const signUpSchema = z.object({
  /**
   * z.email() will automatically contain the correct validation needed to ensure a valid email is entered.
   *
   * Regexing for email is very hard and most of the time avoid entirely and left to the backend to figure out
   */
  email: z.email({
    error: "This email is not valid",
  }),
  password: z
    .string()
    /**
     * z.string() has access to many functions that we naturally will recreate in many of our projects. It has built in handling for
     * string length, regexing, trimming of value data, and way more
     */
    .trim()
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
      "Username can only have lowercase letters and numbers and @ at the beginning.",
    )
    /**
     * Some of the most important functionality Zod ships with is the ability to make custom validation functions within the Zod schema objects
     *
     * This helps to streamline validation of our forms by allowing us to reuse functions that we would use for validating the input of something very custom.
     *
     * This could be used to help ensure slash-commands exist in an inputted value or if there are special characters
     */
    .refine((value) => {
      if (value && value.includes("alien")) {
        console.log("Infiltration complete 👾");
      }

      return true;
    })
    /**
     * Zod can also handle transforming our input data after the submission of the form. We can combine this with regexing to prevent the user from inputting
     * similar values before we transform it.
     *
     * This function can be async as well
     */
    .transform((value) => {
      if (!value) {
        return "";
      }

      return (
        (value.charAt(0) !== "@" ? "@" + value : value).toLowerCase() + "data55"
      );
    })
    .optional(),
  terms: z.literal(true, {
    error: "You must accept our terms to create an account",
  }),
});
