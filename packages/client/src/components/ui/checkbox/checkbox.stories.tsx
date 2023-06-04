import { Meta, StoryObj } from "@storybook/react";
import Checkbox from ".";

const meta: Meta<typeof Checkbox> = {
  title: "Checkbox",
  component: Checkbox,
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: "Hello, world",
  },
};
