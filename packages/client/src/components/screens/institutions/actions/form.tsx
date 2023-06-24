"use client";

import Modal from "@/components/layouts/modal";
import Button from "@/components/ui/button";
import Dropdown from "@/components/ui/dropdown";
import Input from "@/components/ui/input";
import FileUploader from "@/components/ui/input/file";
import MarkdownEditor from "@/components/ui/markdown-editor";
import { useAsyncOptions } from "@/hooks/async-options.hook";
import { useBoolean } from "@/hooks/boolean.hook";
import { useCreateInstitution } from "@/hooks/institutions.hooks";
import Api from "@/services";
import { UsersResponse } from "@/types/responses/user.response";
import { yupResolver } from "@hookform/resolvers/yup";
import { ICreateInstitutionDto, IUpdateInstitutionDto } from "@klavisha/types";
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
  defaultValues?: IUpdateInstitutionDto;
};

const makeOptionsFn = (users: UsersResponse[]) =>
  users.map((user) => ({
    value: user.id,
    label: `${user.fullname} (${user.email})`,
  }));

const filterFn = async (name: string) =>
  (await Api.users.findAll({ name })).users;

// TODO: Initial value of file uploader
// Use file id instead of link
const InstitutionForm = ({ users, defaultValues }: Props) => {
  const { options, filter, setFilter } = useAsyncOptions({
    initialData: users,
    makeOptionsFn,
    filterFn,
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const [
    isModalOpen,
    { setFalse: setIsModalOpenFalse, setTrue: setIsModalOpenTrue },
  ] = useBoolean(false);

  const { mutate, isLoading } = useCreateInstitution();

  const submitHandler: SubmitHandler<FormData> = (data) => {
    mutate(data);
  };

  return (
    <>
      <Modal
        title="Описание"
        isOpen={isModalOpen}
        onClose={setIsModalOpenFalse}
      >
        <Controller
          name="description"
          control={control}
          render={({ field }) => <MarkdownEditor {...field} />}
        />
      </Modal>
      <form
        className="flex flex-col gap-3 max-w-[297px]"
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
              fullWidth
              {...field}
            />
          )}
        />
        <Button onClick={setIsModalOpenTrue} type="button" variant="secondary">
          Описание
        </Button>
        <Controller
          name="photo"
          control={control}
          render={({ field: { onChange, value, ...field } }) => (
            <FileUploader
              accept="image/*"
              stringValues={value ? [value] : undefined}
              onChange={(files) => files.length && onChange(files[0].filename)}
              {...field}
            >
              Загрузить фотографию
            </FileUploader>
          )}
        />
        <Button type="submit" loading={isLoading}>
          {defaultValues ? "Обновить" : "Создать"}
        </Button>
      </form>
    </>
  );
};

export default InstitutionForm;
