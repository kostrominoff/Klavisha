import Institutions from "@/components/ui/insitutions";
import Hero from "./hero";

const HomeScreen = () => {
  return (
    <div>
      <Hero />
      {/* @ts-ignore */}
      <Institutions />
    </div>
  );
};

export default HomeScreen;
