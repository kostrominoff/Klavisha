"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Password from "@/components/ui/input/password";
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
      <Password
        placeholder="Пароль"
        autoComplete="new-password"
        error={errors.password?.message}
        {...register("password")}
      />
      <Button type="submit">Войти</Button>
    </form>
  );
};

export default LoginForm;
