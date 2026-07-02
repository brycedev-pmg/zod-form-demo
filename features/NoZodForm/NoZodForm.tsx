"use client";

import { Page } from "@/components/Page";
import { SignUpFormFields } from "@/types";
import { useForm } from "react-hook-form";
import { SignUpForm } from "./SignUpForm";
import { checkEmail } from "@/app/actions";

export default function NoZodForm() {
  const { handleSubmit, control, clearErrors, setError } =
    useForm<SignUpFormFields>({
      /**
       * If you use the register function from useForm, then this mode will make validation happen on inputs that have been defined.
       *
       * The problem with 'register' is mostly the fact that it usually has to be directly or very closely aligned with native UI elements that make custom UI
       * harder to implement
       *
       * This will be a problem with very custom UI like a file picker, etc.
       */
      mode: "onChange",
    });

  const onSubmit = async (data: SignUpFormFields) => {
    const response = await checkEmail(data.email);

    if (response) {
      setError("email", {
        message: "Email is already taken",
      });
      return;
    }

    /**
     * Data transformation has to happen here to ensure don't mess up validation
     */
    let transformedData: SignUpFormFields;
    if (data.username) {
      transformedData = {
        ...data,
        username: `@${data.username}data55`,
      };
    } else {
      transformedData = {
        ...data,
        username: `@bryce2026data55`,
      };
    }

    console.log(transformedData);
    alert("Submission success");
  };

  return (
    <Page title="No Zod Form">
      <SignUpForm
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        clearErrors={clearErrors}
      />
    </Page>
  );
}
