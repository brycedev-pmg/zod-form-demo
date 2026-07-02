import { SignUpFormFields } from "@/types";
import { emailRegex, passwordRegex, usernameRegex } from "@/utils/regex";
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

export const SignUpForm = ({
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
            rules={{
              /**
               * You must set this to get the required check. Zod does this automatically by default
               */
              required: true,
              validate: (email) => {
                /**
                 * You will see this a lot within this file. Without something like Zod taking care of this, you will have to make sure
                 * validation is ran effectively and rules are set in each component.
                 *
                 * Other point to consider here is that you are will lose visibility once you start to break components out to their own files.
                 *
                 * The validation having to stay so close to the component definition makes this functionality harder to maintain in the future
                 * when something might go wrong in your validation or when someone other than you comes back to update a component making use
                 * of this validation but not necessarially making sure the form is still validating correctly.
                 *
                 * One idea is to make validation functions you can reuse, but you can do the same with the Zod schema
                 */
                if (!emailRegex.test(email)) {
                  return "This email is not valid";
                }

                return true;
              },
            }}
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
            rules={{
              validate: (username) => {
                if (username && !usernameRegex.test(username)) {
                  return "Username can only have lowercase letters and numbers";
                }

                return true;
              },
            }}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="username">Username (Optional)</FieldLabel>
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
                  placeholder="@username"
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
            rules={{
              required: true,
              min: 8,
              validate: (password) => {
                if (password.length < 8) {
                  return "Password must be at least 8 characters";
                } else if (!passwordRegex.test(password)) {
                  return "Paswword must have at leaston 1 uppercase letter, at least 1 number, and at least 1 special character";
                }

                return true;
              },
            }}
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
            rules={{
              required: true,
              validate: (checked) => checked,
            }}
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
                    {!!fieldState.error && (
                      <FieldError>{fieldState.error.message}</FieldError>
                    )}
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
  control: Control<SignUpFormFields>;
  clearErrors: UseFormClearErrors<SignUpFormFields>;
}
