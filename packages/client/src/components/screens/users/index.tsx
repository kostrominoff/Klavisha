import Typography from "@/components/ui/typography";
import { UsersResponse } from "@/types/responses/user.response";
import { Roles } from "@klavisha/types";

type Props = {
  users: UsersResponse;
};

const UsersScreen = ({ users }: Props) => {
  return (
    <section className="py-5">
      <Typography variant="h2" tag="h1" className="mb-5">
        Пользователи
      </Typography>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">ФИО</th>
            <th className="text-left">Почта</th>
            <th className="text-left">Админ</th>
            <th className="text-left">Админ уч. заведений</th>
            <th className="text-left">Действия</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.fullname}</td>
              <td>{user.email}</td>
              <td>{user.role === Roles.ADMIN ? "Да" : "Нет"}</td>
              <td>{user.institutions.length > 0 ? "Да" : "Нет"}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default UsersScreen;
