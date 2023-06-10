"use client";

import Button from "@/components/ui/button";
import GroupSelector from "./group-selector";
import { InferType, ObjectSchema, number, object, string } from "yup";
import { IRegisterUserDto } from "@klavisha/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/ui/input";
import { InstitutionsResponse } from "@/types/responses/institutions.response";
import Password from "@/components/ui/input/password";

type Props = {
  institutions: InstitutionsResponse;
};

const schema: ObjectSchema<IRegisterUserDto> = object({
  firstname: string().required("Введите имя!"),
  secondname: string().required("Введите фамилию!"),
  fathername: string().optional(),
  email: string().email("Проверьте почту!").required("Введите почту!"),
  password: string()
    .required("Введите пароль!")
    .min(8, "Введите пароль длиннее!"),
  groupId: number().required("Укажите группу!"),
});

type FormData = InferType<typeof schema>;

const RegisterForm = ({ institutions }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    resetField,
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
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col gap-3"
    >
      <Input
        placeholder="Имя"
        error={errors.firstname?.message}
        {...register("firstname")}
      />
      <Input
        placeholder="Фамилия"
        error={errors.secondname?.message}
        {...register("secondname")}
      />
      <Input placeholder="Отчество" {...register("fathername")} />
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
      <GroupSelector
        control={control}
        institutions={institutions}
        resetField={resetField}
        error={errors.groupId?.message}
      />
      <Button type="submit">Создать</Button>
    </form>
  );
};

export default RegisterForm;
