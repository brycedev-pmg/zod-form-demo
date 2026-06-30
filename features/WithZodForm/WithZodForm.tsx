"use client";

import { Page } from "@/components/Page";
import { SignUpForm } from "@/components/SignUpForm";
import { SignUpFormFields } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUpSchema } from "./signUp.schema";

export default function WithZodForm() {
  const { handleSubmit, control, clearErrors } = useForm<SignUpFormFields>({
    defaultValues: {
      email: "",
      password: "",
      terms: false,
    },
    mode: "onChange",
    resolver: zodResolver(signUpSchema),
  });

  return (
    <Page title="With Zod Form">
      <SignUpForm
        onSubmit={handleSubmit((data) => console.log(data))}
        control={control}
        clearErrors={clearErrors}
      />
    </Page>
  );
}
