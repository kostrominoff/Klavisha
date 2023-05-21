import { ButtonHTMLAttributes } from "react";

type Props = {} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children }: Props) => {
  return <button>{children}</button>;
};

export default Button;
