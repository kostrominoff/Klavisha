"use client";

import Button from "@/components/ui/button";
import Dropdown from "@/components/ui/dropdown";
import Input from "@/components/ui/input";
import FileUploader from "@/components/ui/input/file";
import { useAsyncOptions } from "@/hooks/async-options.hook";
import { useCreateInstitution } from "@/hooks/institutions.hooks";
import Api from "@/services";
import { UsersResponse } from "@/types/responses/user.response";
import { yupResolver } from "@hookform/resolvers/yup";
import { ICreateInstitutionDto } from "@klavisha/types";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { InferType, ObjectSchema, array, number, object, string } from "yup";

const schema: ObjectSchema<ICreateInstitutionDto> = object({
  name: string().required("Введите название!"),
  phone: string().notRequired().nonNullable(),
  photo: string().notRequired().nonNullable(),
  description: string().notRequired().nonNullable(),
  website: string().notRequired().nonNullable(),
  city: string().required("Введите город!").nonNullable(),
  owners: array()
    .of(number().nonNullable().required())
    .min(1, "Выберите кого-то!")
    .nonNullable()
    .required(),
});

type FormData = InferType<typeof schema>;

type Props = {
  users: UsersResponse[];
};

const makeOptionsFn = (users: UsersResponse[]) =>
  users.map((user) => ({
    value: user.id,
    label: `${user.fullname} (${user.email})`,
  }));

const filterFn = async (name: string) =>
  (await Api.users.findAll({ name })).users;

const CreateInstitutionForm = ({ users }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { mutate, isLoading } = useCreateInstitution();

  const submitHandler: SubmitHandler<FormData> = (data) => {
    console.log(data);
    mutate(data);
  };

  const { options, filter, setFilter } = useAsyncOptions({
    initialData: users,
    makeOptionsFn,
    filterFn,
  });

  // TODO: Add photo uploader and create markdown editor
  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={handleSubmit(submitHandler)}
    >
      <Input
        placeholder="Название"
        error={errors.name?.message}
        {...register("name")}
      />
      <Input
        placeholder="Город"
        error={errors.city?.message}
        {...register("city")}
      />
      <Input placeholder="Номер телефона" {...register("phone")} />
      <Input placeholder="Ссылка на сайт" {...register("website")} />
      <Controller
        name="owners"
        control={control}
        render={({ field: { ref, ...field } }) => (
          <Dropdown
            placeholder="Администраторы"
            options={options}
            filter={filter}
            onFilterChange={setFilter}
            error={errors.owners?.message}
            customRef={ref}
            multiple
            disableFilter
            {...field}
          />
        )}
      />
      <FileUploader accept="image/*" />
      <Button type="submit" loading={isLoading}>
        Создать
      </Button>
    </form>
  );
};

export default CreateInstitutionForm;
