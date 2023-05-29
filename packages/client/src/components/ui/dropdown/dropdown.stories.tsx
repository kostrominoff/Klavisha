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

export const WithLimit: Story = {
  args: {
    placeholder: "Выберите элемент",
    options,
    limit: 1,
  },
};

export const Nullable: Story = {
  args: {
    options,
    placeholder: "Выберите элемент",
    nullable: true,
  },
};

export const WithLabel: Story = {
  args: {
    options,
    placeholder: "Выберите элемент",
    label: "It is label",
  },
};

export const WithError: Story = {
  args: {
    options,
    placeholder: "Выберите элемент",
    error: "It is error",
  },
};
