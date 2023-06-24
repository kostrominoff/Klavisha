import Typography from "@/components/ui/typography";
import Api from "@/services";
import InstitutionForm from "./form";
import { InstitutionFindOneResponse } from "@/types/responses/institutions.response";

type Props = {
  institution: InstitutionFindOneResponse;
};

const UpdateInstitutionsScreen = async ({ institution }: Props) => {
  const { users } = await Api.users.findAll();
  return (
    <section className="flex flex-col gap-3 justify-center items-center min-h-screen">
      <Typography tag="h1" variant="h2">
        Обновление уч. заведения
      </Typography>
      <InstitutionForm
        users={users}
        defaultValues={{
          ...institution,
          owners: institution.owners.map((owner) => owner.id),
        }}
      />
    </section>
  );
};

export default UpdateInstitutionsScreen;
