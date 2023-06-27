import Typography from "@/components/ui/typography";
import UserForm from "./form";
import Api from "@/services";

const CreateUserScreen = async () => {
  const institutions = await Api.institutions.findAll();

  return (
    <section className="flex flex-col gap-3 justify-center items-center min-h-screen">
      <Typography tag="h1" variant="h2">
        Создание пользователя
      </Typography>
      <UserForm institutions={institutions.institutions} />
    </section>
  );
};

export default CreateUserScreen;
