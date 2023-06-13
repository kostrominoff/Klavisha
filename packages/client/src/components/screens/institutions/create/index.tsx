import Typography from "@/components/ui/typography";
import CreateInstitutionForm from "./form";
import Api from "@/services";

const CreateInstitutionsScreen = async () => {
  const { users } = await Api.users.findAll();
  return (
    <section>
      <Typography tag="h1">Создание уч. заведения</Typography>
      <CreateInstitutionForm users={users} />
    </section>
  );
};

export default CreateInstitutionsScreen;
