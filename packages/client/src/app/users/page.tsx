import UsersScreen from "@/components/screens/users";
import Api from "@/services";

const UsersPage = async () => {
  const users = await Api.users.findAll();
  return <UsersScreen users={users.users} />;
};

export default UsersPage;
