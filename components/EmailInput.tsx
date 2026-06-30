import { useState } from "react";
import { Input } from "./ui/input";
import { debounce } from "lodash";

export const EmailInput = (props: React.ComponentProps<"input">) => {
  const [internalValue, setInternalValue] = useState<string>(
    String(props.value),
  );

  return (
    <Input
      {...props}
      //   type="email"
      //   value={internalValue}
      //   onChange={(e) => {
      //     setInternalValue(e.target.value);
      //     debounce(
      //       () => {
      //         console.log("Change");
      //         props.onChange?.(e);
      //       },
      //       300,
      //       {
      //         leading: true,
      //       },
      //     );
      //   }}
    />
  );
};
