import Typography from "@/components/ui/typography";
import InstitutionForm from "./form";
import Api from "@/services";

const CreateInstitutionsScreen = async () => {
  const { users } = await Api.users.findAll();
  return (
    <section className="flex flex-col gap-3 justify-center items-center min-h-screen">
      <Typography className="text-center" tag="h1" variant="h2">
        Создание уч. заведения
      </Typography>
      <InstitutionForm users={users} />
    </section>
  );
};

export default CreateInstitutionsScreen;
