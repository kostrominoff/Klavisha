import { Meta, StoryObj } from "@storybook/react";
import Dropdown from ".";

const meta: Meta<typeof Dropdown> = {
  title: "Dropdown",
  component: Dropdown,
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

const options = [
  { value: "1", label: "Первый элемент" },
  { value: "2", label: "Второй элемент" },
  { value: "3", label: "Третий элемент" },
];

export const Default: Story = {
  args: {
    placeholder: "Выберите элемент",
    options,
  },
};

export const Nullable: Story = {
  args: {
    options,
    placeholder: "Выберите элемент",
    nullable: true
  },
};
