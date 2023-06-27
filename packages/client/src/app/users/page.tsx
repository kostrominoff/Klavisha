import Api from "@/services";

const UsersPage = async () => {
  const users = await Api.users.findAll();
  console.log(users);
  return <div>UsersPage</div>;
};

export default UsersPage;
