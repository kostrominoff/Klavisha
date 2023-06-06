"use client";

import Dropdown from "@/components/ui/dropdown";
import Input from "@/components/ui/input";
import Api from "@/services";
import { InstitutionsResponse } from "@/types/responses/institutions.response";
import { IRegisterUserDto } from "@klavisha/types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
  institutions: InstitutionsResponse;
};

// TODO: It is test, maybe need zustand

const RegisterScreen = ({ institutions }: Props) => {
  const { register } = useForm<IRegisterUserDto>();
  const [institutionOptions, setInstitutionOptions] = useState(
    institutions.map((institution) => ({
      label: `${institution.name} (${institution.city})`,
      value: institution.id,
    }))
  );

  const [institutionFilter, setInstitutionFilter] = useState("");
  console.log(institutionFilter, institutionOptions);

  useEffect(() => {
    if (!institutionFilter)
      return setInstitutionOptions(
        institutions.map((institution) => ({
          label: `${institution.name} (${institution.city})`,
          value: institution.id,
        }))
      );
    const getNewInstitutions = async () => {
      const { institutions } = await Api.institutions.findAll(
        institutionFilter
      );
      setInstitutionOptions(
        institutions.map((institution) => ({
          label: `${institution.name} (${institution.city})`,
          value: institution.id,
        }))
      );
    };

    getNewInstitutions();
  }, [institutionFilter, institutions]);

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
