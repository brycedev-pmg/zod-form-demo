import { ZodSignUpFormFields } from "@/types";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useState } from "react";
import {
  Control,
  Controller,
  UseFormClearErrors,
  useFormState,
} from "react-hook-form";
import { EmailInput } from "../../components/EmailInput";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "../../components/ui/field";
import { Input } from "../../components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../components/ui/input-group";

export const ZodSignUpForm = ({
  onSubmit,
  control,
  clearErrors,
}: Readonly<SignUpFormProps>) => {
  const { isValid, isValidating, isDirty, isSubmitting } = useFormState({
    control,
  });
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
                  <EmailInput
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
            control={control}
            name="username"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  name={field.name}
                  onBlur={field.onBlur}
                  onChange={(e) => {
                    clearErrors("username");
                    field.onChange(e);
                  }}
                  value={field.value ?? ""}
                  type="text"
                  placeholder="user123"
                />
                <FieldDescription>
                  Username will be auto-generated if you do not add one yourself
                </FieldDescription>
                {!!fieldState.error && (
                  <FieldError>{fieldState.error.message}</FieldError>
                )}
              </Field>
            )}
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
        <Button
          type="submit"
          disabled={!isValid || isValidating || !isDirty || isSubmitting}
        >
          Create account
        </Button>
      </FieldSet>
    </form>
  );
};

export interface SignUpFormProps {
  onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
  control: Control<ZodSignUpFormFields>;
  clearErrors: UseFormClearErrors<ZodSignUpFormFields>;
}
