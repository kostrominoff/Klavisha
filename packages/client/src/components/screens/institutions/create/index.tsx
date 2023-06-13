import Typography from "@/components/ui/typography";
import CreateInstitutionForm from "./form";

const CreateInstitutionsScreen = () => {
  return (
    <section>
      <Typography tag="h1">Создание уч. заведения</Typography>
      <CreateInstitutionForm />
    </section>
  );
};

export default CreateInstitutionsScreen;
