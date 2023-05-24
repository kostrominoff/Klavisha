import { Meta, StoryObj } from "@storybook/react";
import Input from ".";

const meta: Meta<typeof Input> = {
  title: "Input",
  component: Input,
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Hello, world!",
  },
};

export const WithLabel: Story = {
  args: {
    placeholder: "Hello, world!",
    label: "It is label",
  },
};

export const WithError: Story = {
  args: {
    placeholder: "Hello, world!",
    error: "It is error",
  },
};
