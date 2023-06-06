import Api from "@/services";

const Home = async () => {
  const user = await Api.auth.getMe();
  return <div>{user.email}</div>;
};

export default Home;
