import Typography from "@/components/ui/typography";
import Link from "next/link";
import LoginForm from "./form";

const LoginScreen = () => {
  return (
    <section className="flex flex-col gap-4 justify-center items-center min-h-screen">
      <Typography tag="h1" variant="h2">
        Вход
      </Typography>
      <LoginForm />
      <Link href="/auth/register">
        <Typography tag="span" variant="text1">
          Нет аккаунта?
        </Typography>
      </Link>
    </section>
  );
};

export default LoginScreen;
