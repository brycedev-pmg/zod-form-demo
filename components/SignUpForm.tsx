import { SignUpFormFields } from "@/types";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useState } from "react";
import {
  Control,
  Controller,
  UseFormClearErrors,
  UseFormSetError,
  useFormState,
} from "react-hook-form";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "./ui/field";
import { Input } from "./ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

export const SignUpForm = ({
  onSubmit,
  control,
  clearErrors,
}: Readonly<SignUpFormProps>) => {
  const { isValid } = useFormState({ control });
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={onSubmit}>
      <FieldSet>
        <FieldGroup>
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => {
              const isInvalid = !!fieldState.error;
              return (
                <Field aria-invalid={isInvalid}>
                  <FieldLabel htmlFor="email" aria-required>
                    Email
                  </FieldLabel>
                  <Input
                    id="email"
                    name={field.name}
                    onBlur={field.onBlur}
                    onChange={(e) => {
                      clearErrors("email");
                      field.onChange(e);
                    }}
                    value={field.value}
                    type="email"
                    placeholder="jane.doe@example.com"
                    required
                    aria-invalid={isInvalid}
                    aria-required
                  />
                  {!!fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              );
            }}
          />
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => {
              const isInvalid = !!fieldState.error;
              return (
                <Field aria-invalid={isInvalid}>
                  <FieldLabel
                    htmlFor="password"
                    aria-required
                    aria-invalid={isInvalid}
                  >
                    Password
                  </FieldLabel>
                  <FieldDescription>
                    Must be at least 8 characters long.
                  </FieldDescription>
                  <InputGroup>
                    <InputGroupInput
                      id="password"
                      name={field.name}
                      onBlur={field.onBlur}
                      onChange={(e) => {
                        clearErrors("password");
                        field.onChange(e);
                      }}
                      value={field.value}
                      type={!showPassword ? "password" : "text"}
                      placeholder="••••••••"
                      required
                      aria-invalid={isInvalid}
                      aria-required
                    />
                    <InputGroupAddon align="inline-end">
                      <span onClick={toggleShowPassword}>
                        {!showPassword && <EyeClosedIcon />}
                        {showPassword && <EyeIcon />}
                      </span>
                    </InputGroupAddon>
                  </InputGroup>

                  {!!fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              );
            }}
          />
          <Controller
            name="terms"
            control={control}
            render={({ field, fieldState }) => {
              const isInvalid = !!fieldState.error;
              return (
                <Field orientation="horizontal">
                  <Checkbox
                    id="terms"
                    name={field.name}
                    onBlur={field.onBlur}
                    onCheckedChange={(e) => {
                      clearErrors("terms");
                      field.onChange(e);
                    }}
                    checked={field.value}
                    aria-invalid={isInvalid}
                  />
                  <FieldContent>
                    <FieldLabel htmlFor="terms">
                      Terms and Conditions
                    </FieldLabel>
                    <FieldDescription>
                      You must accept our terms and conditions. Read more{" "}
                      <a>here</a>
                    </FieldDescription>
                  </FieldContent>
                </Field>
              );
            }}
          />
        </FieldGroup>
        <Button type="submit" disabled={!isValid}>
          Create account
        </Button>
      </FieldSet>
    </form>
  );
};

export interface SignUpFormProps {
  onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
  control: Control<SignUpFormFields>;
  clearErrors: UseFormClearErrors<SignUpFormFields>;
  setError?: UseFormSetError<SignUpFormFields>;
}
