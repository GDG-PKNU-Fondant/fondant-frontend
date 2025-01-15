import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  {
    test: {
      include: ['tests/space0/*.test.{ts,js}'],
      name: 'space0',
    },
  },
  {
    test: {
      include: ['tests/space1/*.test.{ts,js}'],
      name: 'space1',
    },
  },
]);
