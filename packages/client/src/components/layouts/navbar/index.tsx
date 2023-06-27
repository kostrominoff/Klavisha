import Bar from "./bar";
import NavbarLayout from "./context";
import Navigation from "./navigation";
import User from "./user";

const Navbar = () => {
  return (
    <NavbarLayout>
      <Bar>
        <User />
        <Navigation />
      </Bar>
    </NavbarLayout>
  );
};

export default Navbar;
