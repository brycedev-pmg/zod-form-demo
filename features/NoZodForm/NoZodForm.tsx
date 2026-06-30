"use client";

import { Page } from "@/components/Page";
import { SignUpForm } from "@/components/SignUpForm";
import { SignUpFormFields } from "@/types";
import { useForm } from "react-hook-form";

export default function NoZodForm() {
  const { handleSubmit, control, clearErrors } = useForm<SignUpFormFields>({
    defaultValues: {
      email: "",
      password: "",
      terms: false,
    },
  });

  return (
    <Page title="No Zod Form">
      <SignUpForm
        onSubmit={handleSubmit((data) => console.log(data))}
        control={control}
        clearErrors={clearErrors}
      />
    </Page>
  );
}
