"use client";

import Dropdown from "@/components/ui/dropdown";
import { useState } from "react";

const Home = () => {
  const [state, setState] = useState<number[]>([]);
  console.log(state);
  return (
    <div>
      Home page
      <Dropdown
        options={[
          {
            value: 1,
            label: "Первый",
          },
          {
            value: 2,
            label: "Второй",
          },
          {
            value: 2,
            label: "Третий",
          },
        ]}
        value={state}
        onChange={(v) => setState(v)}
        multiple
      />
    </div>
  );
};

export default Home;
