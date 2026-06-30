# Zod And React Hook Form

## About This Demo

This project is a side-by-side comparison of building the same sign-up form with
[React Hook Form](https://react-hook-form.com) **with and without** [Zod](https://zod.dev)
for validation. Both forms collect the same fields (email, username, password, and a
terms checkbox) and enforce the same rules — the only thing that changes is _how_ that
validation is wired up.

|             | Feature                                        | What it shows                              |
| ----------- | ---------------------------------------------- | ------------------------------------------ |
| Without Zod | [`features/NoZodForm`](features/NoZodForm)     | Validation written by hand, field by field |
| With Zod    | [`features/WithZodForm`](features/WithZodForm) | Validation declared once in a schema       |

### Without Zod: manual validation

In [`NoZodForm`](features/NoZodForm/SignUpForm.tsx), every field has to validate itself
inside its own `onChange` handler. Each one manually calls `clearErrors` and then re-runs
the rules and calls `setError` when something is wrong:

```tsx
onChange={(e) => {
  clearErrors("password");
  field.onChange(e);

  if (e.target.value.length < 8) {
    setError("password", { message: "Password must be at least 8 characters" });
  } else if (!passwordRegex.test(e.target.value)) {
    setError("password", { message: "Password must have 1 uppercase letter, 1 number, and 1 special character" });
  }
}}
```

This works, but the validation logic is scattered across the markup, the error messages
are duplicated wherever a rule appears, and the component is responsible for both
_rendering_ and _validating_. The form's "rules" don't live in any single place you can
read or reuse.

### With Zod: schema-driven validation

In [`WithZodForm`](features/WithZodForm/WithZodForm.tsx), all of the rules live in one
[`signUp.schema.ts`](features/WithZodForm/signUp.schema.ts) file and are handed to React
Hook Form through the `zodResolver`:

```ts
export const signUpSchema = z.object({
  email: z.email({ error: "This email is not valid" }),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters", abort: true })
    .regex(passwordRegex, {
      error:
        "Password must have 1 uppercase letter, 1 number, and 1 special character",
    }),
  username: z
    .string()
    .regex(
      usernameRegex,
      "Username can only have lowercase letters and numbers",
    )
    .optional(),
  terms: z.boolean({ error: "You must accept our terms to create an account" }),
});
```

```ts
useForm({ mode: "onChange", resolver: zodResolver(signUpSchema) });
```

The form fields ([`ZodSignUpForm`](features/WithZodForm/ZodSignUpForm.tsx)) become much
simpler — their `onChange` handlers just update the value. The resolver runs the schema
on every change and feeds errors back to React Hook Form automatically.

## Why use Zod for validation?

- **Single source of truth.** All validation rules and error messages live in one schema
  instead of being scattered across `onChange` handlers, so there's exactly one place to
  read or change them.
- **Cleaner components.** The UI goes back to just rendering inputs and displaying errors.
  Compare the two `onChange` handlers above — the Zod version has no validation logic in
  the markup at all.
- **No duplicated logic.** Each rule (and its message) is written once. With manual
  validation the same checks tend to get copy-pasted between fields and across forms.
- **Static types for free.** A schema can produce its TypeScript type with
  `z.infer<typeof signUpSchema>`, so your form values and your validation can never drift
  apart.
- **Reusable beyond the form.** The same schema can validate the payload on the server
  (e.g. in a Server Action or API route), so the client and server agree on what "valid"
  means.
- **Composable and expressive.** Chaining, optional fields, custom messages, early-exit
  with `abort`, and refinements are all built in, so complex rules stay readable.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
