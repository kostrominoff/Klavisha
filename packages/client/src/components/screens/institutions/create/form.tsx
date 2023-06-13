"use client";

import Dropdown from "@/components/ui/dropdown";
import Input from "@/components/ui/input";
import { ICreateInstitutionDto } from "@klavisha/types";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { InferType, ObjectSchema, array, number, object, string } from "yup";

// TODO: Add errors
const schema: ObjectSchema<ICreateInstitutionDto> = object({
  name: string().required().nonNullable(),
  phone: string().notRequired().nonNullable(),
  photo: string().notRequired().nonNullable(),
  description: string().notRequired().nonNullable(),
  website: string().notRequired().nonNullable(),
  city: string().required().nonNullable(),
  owners: array()
    .of(number().nonNullable().required())
    .nonNullable()
    .required(),
});

type FormData = InferType<typeof schema>;

const CreateInstitutionForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const submitHandler: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

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
