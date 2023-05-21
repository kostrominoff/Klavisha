"use client";
import Button from "@/components/ui/button";

const Home = () => {
  return (
    <div>
      <Button>Hello world</Button>
      <Button disabled onClick={() => console.log("test")}>Hello world</Button>
    </div>
  );
};

export default Home;
