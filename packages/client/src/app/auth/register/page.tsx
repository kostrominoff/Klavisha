import RegisterScreen from "@/components/screens/auth/register";
import Api from "@/services";

const RegisterPage = async () => {
  try {
    const institutions = await Api.institutions.findAll();
    return <RegisterScreen institutions={institutions.institutions} />;
  } catch {
    return <div></div>;
  }
};

export default RegisterPage;
