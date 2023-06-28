import Typography from "@/components/ui/typography";
import UserForm from "./form";
import Api from "@/services";
import { Roles } from "@klavisha/types";

const CreateUserScreen = async () => {
  const institutions = await Api.institutions.findAll();
  const user = await Api.auth.getMe();

  return (
    <section className="flex flex-col gap-3 justify-center items-center py-5 min-h-screen">
      <Typography tag="h1" variant="h2">
        Создание пользователя
      </Typography>
      <UserForm
        isAdmin={user.role === Roles.ADMIN}
        institutions={institutions.institutions}
      />
    </section>
  );
};

export default CreateUserScreen;
