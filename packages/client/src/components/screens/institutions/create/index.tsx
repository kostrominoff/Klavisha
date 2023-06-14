import Typography from "@/components/ui/typography";
import CreateInstitutionForm from "./form";
import Api from "@/services";

const CreateInstitutionsScreen = async () => {
  const { users } = await Api.users.findAll();
  return (
    <section className="flex flex-col gap-3 justify-center items-center min-h-screen">
      <Typography tag="h1" variant="h2">
        Создание уч. заведения
      </Typography>
      <CreateInstitutionForm users={users} />
    </section>
  );
};

export default CreateInstitutionsScreen;
