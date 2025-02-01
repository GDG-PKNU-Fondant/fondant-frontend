import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CategoryMenu from '@components/CategoryMenu';
import { mockDynamicCategories } from '@mocks/handlers';

describe('CategoryMenu', () => {
  it('동적 데이터가 올바르게 받아와진다.', async () => {
    render(<CategoryMenu categories={mockDynamicCategories} />);

    const elements = await Promise.all(
      mockDynamicCategories.map((category) =>
        screen.findByAltText(category.name)
      )
    );

    elements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });
});
