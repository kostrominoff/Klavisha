"use client";

import Button from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import Input from "@/components/ui/input";
import { useBoolean } from "@/hooks/boolean.hook";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILoginUserDto } from "@klavisha/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { InferType, ObjectSchema, object, string } from "yup";

const schema: ObjectSchema<ILoginUserDto> = object({
  email: string().email("Проверьте почту!").required("Введите почту!"),
  password: string()
    .required("Введите пароль!")
    .min(8, "Введите пароль длиннее!"),
});

type FormData = InferType<typeof schema>;

const LoginForm = () => {
  const [isPasswordHidden, { toggle: toggleIsPasswordHidden }] =
    useBoolean(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const submitHandler: SubmitHandler<FormData> = (data) => {
    console.log(data);
    console.log("form sended!");
  };

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={handleSubmit(submitHandler)}
    >
      <Input
        placeholder="Почта"
        error={errors.email?.message}
        {...register("email")}
      />
      <Input
        placeholder="Пароль"
        type={isPasswordHidden ? "password" : "text"}
        error={errors.password?.message}
        iconRight={
          <button
            type="button"
            className="flex"
            onClick={toggleIsPasswordHidden}
          >
            {isPasswordHidden ? <Icons.eye /> : <Icons.eyeOff />}
          </button>
        }
        {...register("password")}
      />
      <Button type="submit">Войти</Button>
    </form>
  );
};

export default LoginForm;
