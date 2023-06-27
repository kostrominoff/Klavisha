import Dropdown from "@/components/ui/dropdown";
import { IOption } from "@/components/ui/dropdown/option.interface";
import { useAsyncOptions } from "@/hooks/async-options.hook";
import Api from "@/services";
import { InstitutionsResponse } from "@/types/responses/institutions.response";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Control, Controller, UseFormResetField } from "react-hook-form";

const makeOptionsFn = (institutions: InstitutionsResponse) =>
  institutions.map((institution) => ({
    label: `${institution.name} (${institution.city})`,
    value: institution.id,
  }));

const filterFn = async (filter: string) =>
  (await Api.institutions.findAll(filter)).institutions;

type Props = {
  institutions: InstitutionsResponse;
  control: Control<any>;
  resetField: UseFormResetField<any>;
  error?: string;
};

const GroupSelector = ({ institutions, control, error, resetField }: Props) => {
  const [institutionId, setInstitutionId] = useState<number | null>(null);
  const [groupsOptions, setGroupsOptions] = useState<IOption<number>[]>([]);

  const {
    filter: institutionFilter,
    setFilter: setInstitutionFilter,
    options: institutionOptions,
  } = useAsyncOptions({
    initialData: institutions,
    makeOptionsFn,
    filterFn,
  });

  useEffect(() => {
    if (!institutionId) return resetField("groupId");

    const getGroups = async () => {
      const { groups } = await Api.groups.findAll(institutionId);

      if (!groups.length) {
        setGroupsOptions([]);
        return resetField("groupId");
      }

      setGroupsOptions(
        groups.map((group) => ({
          value: group.id,
          label: group.name,
        }))
      );
    };

    getGroups();
  }, [institutionId, resetField]);

  const institutionError = () => {
    if (institutionId && !groupsOptions.length) return "Нет групп!";
    else if (!institutionId && error) return "Выберите уч. заведение!";
    return;
  };

  return (
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
      <Dropdown
        value={institutionId}
        onChange={setInstitutionId}
        options={institutionOptions}
        filter={institutionFilter}
        onFilterChange={setInstitutionFilter}
        placeholder="Выберите учебное заведение"
        error={institutionError()}
        disableFilter
      />
      {institutionId && !!groupsOptions.length && (
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
          <Controller
            control={control}
            name="groupId"
            render={({ field: { ref, ...field } }) => (
              <Dropdown
                placeholder="Выберите группу"
                options={groupsOptions}
                customRef={ref}
                error={error}
                {...field}
              />
            )}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default GroupSelector;
