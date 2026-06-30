import { SignUpFormFields } from "@/types";
import { Control, Controller } from "react-hook-form";
import { Checkbox } from "./ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export const SignUpForm = ({
  onSubmit,
  control,
}: Readonly<SignUpFormProps>) => {
  return (
    <form onSubmit={onSubmit}>
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Controller
              name="email"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    name={field.name}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    value={field.value}
                    type="email"
                  />
                );
              }}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Controller
              name="password"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    name={field.name}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    value={field.value}
                    type="password"
                  />
                );
              }}
            />
          </Field>
          <Field orientation="horizontal">
            <Controller
              name="terms"
              control={control}
              render={({ field }) => {
                return (
                  <Checkbox
                    name={field.name}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    checked={field.value}
                  />
                );
              }}
            />
            <FieldContent>
              <FieldLabel htmlFor="terms">Terms and Conditions</FieldLabel>
              <FieldDescription>
                You must accept our terms and conditions. Read more <a>here</a>
              </FieldDescription>
            </FieldContent>
          </Field>
        </FieldGroup>
        <Button type="submit">Create account</Button>
      </FieldSet>
    </form>
  );
};

export interface SignUpFormProps {
  onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
  control: Control<SignUpFormFields>;
}
