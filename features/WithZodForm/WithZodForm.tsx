"use client";

import { checkEmail } from "@/app/actions";
import { Page } from "@/components/Page";
import { ZodSignUpFormFields } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { signUpSchema } from "./signUp.schema";
import { ZodSignUpForm } from "./ZodSignUpForm";

export default function WithZodForm() {
  const { handleSubmit, control, clearErrors, setError } =
    useForm<ZodSignUpFormFields>({
      mode: "onChange",
      resolver: zodResolver(signUpSchema),
    });

  const usernameWatch = useWatch({
    control,
    name: "username",
  });

  console.log(usernameWatch);

  const onSubmit = async (data: ZodSignUpFormFields) => {
    const response = await checkEmail(data.email);

    if (response) {
      setError("email", {
        message: "Email is already taken",
      });
      return;
    }

    if (!data.username) {
      const transformedData = {
        ...data,
        username: `@bryce2026data55`,
      };

      console.log(transformedData);
    } else {
      console.log(data);
    }

    alert("Submission success");
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
