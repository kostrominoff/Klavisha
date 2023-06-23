import Navigation from "./navigation";
import User from "./user";

const Navbar = () => {
  return (
    <aside className="col-span-1 min-h-screen rounded-r-3xl overflow-clip bg-slate-100">
      <User />
      <Navigation />
    </aside>
  );
};

export default Navbar;
