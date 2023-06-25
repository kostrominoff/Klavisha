import clsx from "clsx";
import Navigation from "./navigation";
import User from "./user";

const Bar = () => {
  return (
    <aside
      className={clsx(
        "min-h-screen z-50 rounded-r-3xl shadow md:col-span-1 max-md:fixed overflow-clip bg-slate-100 max-md:w-[260px]"
      )}
    >
      <User />
      <Navigation />
    </aside>
  );
};

export default Bar;
