import { Meta, StoryObj } from "@storybook/react";
import Typography from ".";

const meta: Meta<typeof Typography> = {
  title: "Typography",
  component: Typography,
  argTypes: {
    variant: {
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "text1",
        "text2",
        "text3",
        "text4",
      ],
      control: {
        type: "radio",
      },
    },
    tag: {
      options: ["h1", "h2", "h3", "h4", "h5", "p", "span"],
      control: {
        type: "radio",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Typography>;

export const Heading1: Story = {
  args: {
    children: "Heading 1",
    tag: "h1",
    variant: "h1",
  },
};

export const Heading2: Story = {
  args: {
    children: "Heading 2",
    tag: "h2",
    variant: "h2",
  },
};

export const Heading3: Story = {
  args: {
    children: "Heading 3",
    tag: "h3",
    variant: "h3",
  },
};

export const Heading4: Story = {
  args: {
    children: "Heading 4",
    tag: "h4",
    variant: "h4",
  },
};

export const Heading5: Story = {
  args: {
    children: "Heading 5",
    tag: "h5",
    variant: "h5",
  },
};

export const Text1: Story = {
  args: {
    children: "Text 1",
    tag: "p",
    variant: "text1",
  },
};

export const Text2: Story = {
  args: {
    children: "Text 2",
    tag: "p",
    variant: "text2",
  },
};

export const Text3: Story = {
  args: {
    children: "Text 3",
    tag: "p",
    variant: "text3",
  },
};

export const Text4: Story = {
  args: {
    children: "Text 4",
    tag: "p",
    variant: "text4",
  },
};

