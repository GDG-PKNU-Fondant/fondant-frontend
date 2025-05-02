import { Meta, StoryFn } from '@storybook/react';
import Carousel from '@components/Carousel';
import CarouselSlide from '@type/Carousel';
import MOCK_CAROUSEL_SLIDES from '@mocks/constants/mockCarouselSlides';
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
  slides: MOCK_CAROUSEL_SLIDES,
};

export const OnlyOneSlide = Template.bind({});
OnlyOneSlide.args = {
  slides: [MOCK_CAROUSEL_SLIDES[0]],
};
