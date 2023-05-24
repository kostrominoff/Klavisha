import { Meta, StoryObj } from "@storybook/react";

import Icons from "../icons";
import Button from ".";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  argTypes: {
    variant: {
      options: ["primary", "secondary", "tertiary"],
      control: {
        type: "radio",
      },
    },
    onClick: {
      action: "clicked",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Button",
    loading: false,
    disabled: false,
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    variant: "secondary",
  },
};

export const OnlyIcon: Story = {
  args: {
    ...Primary.args,
    children: <Icons.settings />,
    onlyIcon: true,
  },
};
