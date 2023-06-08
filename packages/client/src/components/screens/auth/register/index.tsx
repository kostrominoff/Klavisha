import { InstitutionsResponse } from "@/types/responses/institutions.response";
import RegisterForm from "./form";
import Typography from "@/components/ui/typography";
import Link from "next/link";

type Props = {
  institutions: InstitutionsResponse;
};

const RegisterScreen = ({ institutions }: Props) => {
  return (
    <section className="flex flex-col gap-4 justify-center items-center min-h-screen">
      <Typography tag="h1" variant="h2">
        Регистрация
      </Typography>
      <RegisterForm institutions={institutions} />
      <Link href="/auth/login">
        <Typography tag="span" variant="text1">
          Есть аккаунт?
        </Typography>
      </Link>
    </section>
  );
};

export default RegisterScreen;
