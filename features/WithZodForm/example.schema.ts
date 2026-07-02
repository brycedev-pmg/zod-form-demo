import z from "zod";

export const exampleSchema = z.object({
  firstName: z.string().min(1),
  lastName: z
    .string()
    .min(1)
    .refine((name) => !name.endsWith("bad"), {
      error: "You put a bad word in your last name",
    }),
  preferredName: z.string().optional(),
});
