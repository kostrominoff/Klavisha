import { useBoolean } from "@/hooks/boolean.hook";
import Input, { Props } from "..";
import Icons from "../../icons";
import { forwardRef } from "react";

const Password = forwardRef<
  HTMLInputElement,
  Omit<Props, "iconRight" | "type">
>((props, ref) => {
  const [isPasswordHidden, { toggle: toggleIsPasswordHidden }] =
    useBoolean(true);
  return (
    <Input
      type={isPasswordHidden ? "password" : "text"}
      ref={ref}
      iconRight={
        <button type="button" className="flex" onClick={toggleIsPasswordHidden}>
          {isPasswordHidden ? <Icons.eye /> : <Icons.eyeOff />}
        </button>
      }
      {...props}
    />
  );
});

Password.displayName = "Password";

export default Password;
