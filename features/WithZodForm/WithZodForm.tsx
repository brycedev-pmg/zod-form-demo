"use client";

import { checkEmail } from "@/app/actions";
import { Page } from "@/components/Page";
import { ZodSignUpFormFields } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUpSchema } from "./signUp.schema";
import { ZodSignUpForm } from "./ZodSignUpForm";

export default function WithZodForm() {
  const { handleSubmit, control, clearErrors, setError } =
    useForm<ZodSignUpFormFields>({
      defaultValues: {
        email: "",
        password: "",
        terms: false,
      },
      mode: "onChange",
      resolver: zodResolver(signUpSchema),
    });

  const onSubmit = async (data: ZodSignUpFormFields) => {
    const response = await checkEmail(data.email);

    if (response) {
      setError("email", {
        message: "Email is already taken",
      });
      return;
    }

    alert("Submission success");
    console.log(data);
  };

  return (
    <Page title="With Zod Form">
      <ZodSignUpForm
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        clearErrors={clearErrors}
      />
    </Page>
  );
}
