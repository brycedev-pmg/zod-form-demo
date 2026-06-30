"use client";

import { Page } from "@/components/Page";
import { SignUpFormFields } from "@/types";
import { useForm } from "react-hook-form";
import { SignUpForm } from "./SignUpForm";
import { checkEmail } from "@/app/actions";

export default function NoZodForm() {
  const { handleSubmit, control, clearErrors, setError } =
    useForm<SignUpFormFields>({
      defaultValues: {
        email: "",
        password: "",
        terms: false,
      },
    });

  const onSubmit = async (data: SignUpFormFields) => {
    const response = await checkEmail(data.email);

    if (response) {
      setError("email", {
        message: "Email is already taken",
      });
      return;
    }

    alert("Submission success");
  };

  return (
    <Page title="No Zod Form">
      <SignUpForm
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        clearErrors={clearErrors}
        setError={setError}
      />
    </Page>
  );
}
