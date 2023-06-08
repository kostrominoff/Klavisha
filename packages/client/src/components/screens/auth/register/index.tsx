"use client";

import Dropdown from "@/components/ui/dropdown";
import Input from "@/components/ui/input";
import { useAsyncOptions } from "@/hooks/async-options.hook";
import Api from "@/services";
import { InstitutionsResponse } from "@/types/responses/institutions.response";
import { IRegisterUserDto } from "@klavisha/types";
import { useForm } from "react-hook-form";

type Props = {
  institutions: InstitutionsResponse;
};

const makeOptionsFn = (institutions: InstitutionsResponse) =>
  institutions.map((institution) => ({
    label: `${institution.name} (${institution.city})`,
    value: institution.id,
  }));

const filterFn = async (filter: string) =>
  (await Api.institutions.findAll(filter)).institutions;

const RegisterScreen = ({ institutions }: Props) => {
  const { register } = useForm<IRegisterUserDto>();

  const {
    filter: institutionFilter,
    setFilter: setInstitutionFilter,
    options: institutionOptions,
  } = useAsyncOptions({
    initialData: institutions,
    makeOptionsFn,
    filterFn,
  });

  return (
    <section className="flex justify-center items-center min-h-screen">
      <form>
        <Input {...register("firstname")} />
        <Input {...register("secondname")} />
        <Input {...register("fathername")} />
        <Input {...register("email")} />
        <Input {...register("password")} />
        <Dropdown
          options={institutionOptions}
          filter={institutionFilter}
          onFilterChange={setInstitutionFilter}
          disableFilter
        />
      </form>
    </section>
  );
};

export default RegisterScreen;
