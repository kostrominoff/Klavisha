"use client";

import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import Dropdown from "@/components/ui/dropdown";
import { IOption } from "@/components/ui/dropdown/option.interface";
import GroupSelector from "@/components/ui/group-selector";
import Input from "@/components/ui/input";
import { useAsyncOptions } from "@/hooks/async-options.hook";
import { useBoolean } from "@/hooks/boolean.hook";
import { useCreateUser } from "@/hooks/users.hooks";
import Api from "@/services";
import { InstitutionsResponse } from "@/types/responses/institutions.response";
import { yupResolver } from "@hookform/resolvers/yup";
import { ICreateUserDto, Roles } from "@klavisha/types";
import { AnimatePresence, motion } from "framer-motion";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  InferType,
  ObjectSchema,
  array,
  mixed,
  number,
  object,
  string,
} from "yup";

const schema: ObjectSchema<ICreateUserDto> = object({
  firstname: string().required("Введите имя!"),
  secondname: string().required("Введите фамилию!"),
  fathername: string().optional().nonNullable(),
  email: string().email("Проверьте почту!").required("Введите почту!"),
  institutionsId: array().of(number().nonNullable().required()).nonNullable(),
  groupId: number().notRequired().nonNullable(),
  subgroup: string().notRequired().nonNullable(),
  password: string().notRequired().nonNullable(),
  role: mixed<Roles>()
    .oneOf(Object.values(Roles))
    .required()
    .nonNullable()
    .default(Roles.USER),
});

type FormData = InferType<typeof schema>;

type Props = {
  institutions: InstitutionsResponse;
  isAdmin: boolean;
};

const makeOptionsFn = (institutions: InstitutionsResponse): IOption<number>[] =>
  institutions.map((institution) => ({
    value: institution.id,
    label: `${institution.name} (${institution.city})`,
  }));

const filterFnAdmin = async (filter: string) =>
  (await Api.institutions.findAll(filter)).institutions;

const filterFn = async () => await Api.institutions.findAllByUser();

const UserForm = ({ institutions, isAdmin }: Props) => {
  const [isStudent, { setTrue: setIsStudent, setFalse: setIsNotStudent }] =
    useBoolean();

  const { register, control, handleSubmit, formState, resetField } =
    useForm<FormData>({
      resolver: yupResolver(schema),
    });

  const { options, filter, setFilter } = useAsyncOptions({
    initialData: institutions,
    makeOptionsFn,
    filterFn: isAdmin ? filterFnAdmin : filterFn,
  });

  const { mutate, isLoading } = useCreateUser();

  const submitHandler: SubmitHandler<FormData> = (data) => {
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col gap-3"
    >
      <Input placeholder="Имя" {...register("firstname")} />
      <Input placeholder="Фамилия" {...register("secondname")} />
      <Input placeholder="Отчество" {...register("fathername")} />
      <Input placeholder="Почта" {...register("email")} />
      <Controller
        name="institutionsId"
        control={control}
        render={({ field: { ref, ...field } }) => (
          <Dropdown
            customRef={ref}
            options={options}
            filter={isAdmin ? filter : undefined}
            onFilterChange={isAdmin ? setFilter : undefined}
            placeholder="Администратор уч. заведений"
            disableFilter={isAdmin}
            multiple
            {...field}
          />
        )}
      />
      <div className="flex flex-col">
        <Checkbox
          label="Студент"
          checked={isStudent}
          onChange={(e) => {
            if (e.target.checked) return setIsStudent();
            setIsNotStudent();
            resetField("subgroup");
          }}
        />
        <AnimatePresence>
          {isStudent && (
            <>
              <GroupSelector
                institutions={institutions}
                control={control}
                error={formState.errors.groupId?.message}
                resetField={resetField}
              />
              <motion.div
                initial={{
                  height: 0,
                  opacity: 0,
                  marginTop: 0,
                }}
                animate={{
                  height: "auto",
                  opacity: 1,
                  marginTop: "0.75rem",
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                  marginTop: 0,
                }}
              >
                <Input
                  placeholder="Подгруппа"
                  {...register("subgroup")}
                  fullWidth
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
      {isAdmin && (
        <Controller
          name="role"
          control={control}
          render={({ field: { onChange, ...field } }) => (
            <Checkbox
              label="Администратор сайта"
              onChange={(e) =>
                onChange(e.target.checked ? Roles.ADMIN : Roles.USER)
              }
              {...field}
            />
          )}
        />
      )}
      <Button loading={isLoading} type="submit">
        Создать
      </Button>
    </form>
  );
};

export default UserForm;
