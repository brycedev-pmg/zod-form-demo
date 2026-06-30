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
      /**
       * This mode value doesn't work as well without validation libraries. You will still need to add setError calls near onChange functions of controlled
       * components. If you use the register function from useForm, then this mode will make validation happen on inputs that have been defined.
       *
       * The problem with 'register' is mostly the fact that it usually has to be tied to directly or very closely aligned native UI elements.
       *
       * This will be a problem with very custom UI like a file picker, etc.
       */
      mode: "onChange",
    });

  const onSubmit = async (data: SignUpFormFields) => {
    /* Note: Without Zod or other validation, we have to check for the terms being accepted on first render 
    as it will not be validated if it is never touched. Zod and other libraries will always update validity of
    the form based on entire schema. But without it, we must check here */
    if (!data.terms) {
      setError("terms", {
        message: "You must accept our terms to create an account",
      });
      return;
    }

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
