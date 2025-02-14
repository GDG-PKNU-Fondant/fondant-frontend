import { Meta, StoryFn } from '@storybook/react';
import Carousel from '@components/Carousel';
import CarouselSlide from '@type/Carousel';
import { mockSlides } from '@mocks/handlers';
import '@styles/tailwind.css';

export default {
  title: 'Components/Carousel',
  component: Carousel,
  argTypes: {
    slides: {
      control: 'object',
    },
  },
} as Meta;

const Template: StoryFn<{ slides: CarouselSlide[] }> = (args) => (
  <Carousel {...args} />
);

export const Default = Template.bind({});
Default.args = {
  slides: mockSlides,
};

export const OnlyOneSlide = Template.bind({});
OnlyOneSlide.args = {
  slides: [mockSlides[0]],
};
