import RegisterScreen from "@/components/screens/auth/register";
import Api from "@/services";

const RegisterPage = async () => {
  const institutions = await Api.institutions.findAll().catch(() => ({
    institutions: [],
  }));

  return <RegisterScreen institutions={institutions.institutions} />;
};

export default RegisterPage;
