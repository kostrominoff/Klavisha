import Bar from "./bar";
import Navigation from "./navigation";
import User from "./user";

const Navbar = () => {
  return (
    <Bar>
      <User />
      <Navigation />
    </Bar>
  );
};

export default Navbar;
