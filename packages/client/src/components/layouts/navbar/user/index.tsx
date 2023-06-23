import Typography from "@/components/ui/typography";
import Api, { baseURL } from "@/services";
import Image from "next/image";
import Link from "next/link";

const User = async () => {
  try {
    const user = await Api.auth.getMe();
    return (
      <Link
        className="block p-2 rounded-b-lg transition cursor-pointer hover:bg-slate-200"
        href="/profile"
      >
        {user.avatar && (
          <Image
            src={`${baseURL}/uploads/${user.avatar}`}
            width={40}
            height={40}
            alt={user.fullname}
          />
        )}
        <div>
          <Typography className="font-semibold" variant="text1" tag="p">
            {user.secondname} {user.firstname}
          </Typography>
          <Typography variant="text2" tag="p">
            {user.email}
          </Typography>
        </div>
      </Link>
    );
  } catch {
    return (
      <Link
        className="block p-2 rounded-b-lg transition cursor-pointer hover:bg-slate-200"
        href="/profile"
      >
        <Typography variant="text1" tag="p">
          Вы не авторизованы
        </Typography>
        <Typography variant="text2" tag="p">
          Нажмите для авторизации
        </Typography>
      </Link>
    );
  }
};

export default User;
