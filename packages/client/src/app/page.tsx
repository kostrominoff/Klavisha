"use client";

import Dropdown from "@/components/ui/dropdown";
import { useState } from "react";

const Home = () => {
  const [value, setValue] = useState<number | null>(null);
  return (
    <div>
      <Dropdown
        value={value}
        onChange={(value) => {
          setValue(value);
        }}
        placeholder="Выберите"
        nullable
        options={[
          { value: 1, label: "first" },
          { value: 2, label: "second" },
          { value: 3, label: "third" },
          { value: 4, label: "first" },
          { value: 5, label: "second" },
          { value: 6, label: "third" },
        ]}
      ></Dropdown>
    </div>
  );
};

export default Home;
