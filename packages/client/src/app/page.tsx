"use client";

import Dropdown from "@/components/ui/dropdown";
import { useState } from "react";

const Home = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <div>
      <Dropdown
        value={value}
        onChange={(v) => setValue(v)}
        options={[
          { value: "1", label: "first" },
          { value: "2", label: "second" },
          { value: "3", label: "third" },
        ]}
      ></Dropdown>
    </div>
  );
};

export default Home;
