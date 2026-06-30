"use client";
import { Page } from "@/components/Page";
import { SignUpForm } from "@/components/SignUpForm";
import { SignUpFormFields } from "@/types";
import { useForm } from "react-hook-form";

export default function NoZod() {
  const { handleSubmit, control } = useForm<SignUpFormFields>({
    defaultValues: {
      email: "",
      password: "",
      terms: false,
    },
  });

  return (
    <Page title="No Zod">
      <p>This page uses no validation library.</p>
      <SignUpForm
        onSubmit={handleSubmit((data) => console.log(data))}
        control={control}
      />
    </Page>
  );
}
