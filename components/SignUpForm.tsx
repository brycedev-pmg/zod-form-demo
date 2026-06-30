import { SignUpFormFields } from "@/types";
import { Control, Controller } from "react-hook-form";

export const SignUpForm = ({
  onSubmit,
  control,
}: Readonly<SignUpFormProps>) => {
  return (
    <form onSubmit={onSubmit}>
      <Controller
        name="email"
        control={control}
        render={({ field }) => {
          return (
            <input
              name={field.name}
              onBlur={field.onBlur}
              onChange={field.onChange}
              value={field.value}
              type="email"
            />
          );
        }}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => {
          return (
            <input
              name={field.name}
              onBlur={field.onBlur}
              onChange={field.onChange}
              value={field.value}
              type="password"
            />
          );
        }}
      />
      <Controller
        name="terms"
        control={control}
        render={({ field }) => {
          return (
            <input
              name={field.name}
              onBlur={field.onBlur}
              onChange={field.onChange}
              checked={field.value}
              type="password"
            />
          );
        }}
      />
    </form>
  );
};

export interface SignUpFormProps {
  onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
  control: Control<SignUpFormFields>;
}
