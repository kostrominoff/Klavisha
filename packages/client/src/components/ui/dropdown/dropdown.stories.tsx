import { Meta, StoryObj } from "@storybook/react";
import Dropdown from ".";

const meta: Meta<typeof Dropdown> = {
  title: "Dropdown",
  component: Dropdown,
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: {
    options: [
      { value: "1", label: "first" },
      { value: "2", label: "second" },
      { value: "3", label: "third" },
    ],
    // value: "1",
  },
};
