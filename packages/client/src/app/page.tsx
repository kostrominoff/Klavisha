"use client";
import Button, { ButtonStyles } from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <Button>Hello world</Button>
      <Button disabled onClick={() => console.log("test")}>
        Hello world
      </Button>
      <Link className={ButtonStyles("primary")} href={"/fff"}>
        Hello
      </Link>
    </div>
  );
};

export default Home;
