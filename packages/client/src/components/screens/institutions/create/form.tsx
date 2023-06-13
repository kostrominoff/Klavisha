"use client";

import Dropdown from "@/components/ui/dropdown";
import Input from "@/components/ui/input";
import { useAsyncOptions } from "@/hooks/async-options.hook";
import Api from "@/services";
import { UsersResponse } from "@/types/responses/user.response";
import { ICreateInstitutionDto } from "@klavisha/types";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { InferType, ObjectSchema, array, number, object, string } from "yup";

const schema: ObjectSchema<ICreateInstitutionDto> = object({
  name: string().required("Введите название!").nonNullable(),
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
  } = useForm<FormData>();

  const submitHandler: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  const { options, filter, setFilter } = useAsyncOptions({
    initialData: users,
    makeOptionsFn,
    filterFn,
  });

  // TODO: Add photo uploader and create markdown editor
  // TODO: Async options (Dropdown)
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
      <Input {...register("phone")} />
      <Input {...register("website")} />
      <Controller
        name="owners"
        control={control}
        render={({ field: { ref, ...field } }) => (
          <Dropdown
            options={options}
            filter={filter}
            onFilterChange={setFilter}
            error={errors.owners?.message}
            customRef={ref}
            {...field}
            multiple
            disableFilter
          />
        )}
      />
    </form>
  );
};

export default CreateInstitutionForm;
