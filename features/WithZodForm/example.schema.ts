import z from "zod";

const firstNameSchema = z.string().min(1);

const lastNameSchema = z
  .string()
  .min(1)
  .refine((name) => !name.endsWith("bad"), {
    error: "You put a bad word in your last name",
  });

const preferredNameSchema = z.string().optional();

export const exampleSchema = z.object({
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  preferredName: preferredNameSchema,
});
