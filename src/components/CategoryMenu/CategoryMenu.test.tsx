import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CategoryMenu from '@components/CategoryMenu';
import { mockDynamicCategories } from '@mocks/handlers';

describe('CategoryMenu', () => {
  it('동적 데이터가 올바르게 받아와진다.', async () => {
    render(<CategoryMenu details={{ category: mockDynamicCategories[1] }} />);

    const element = await screen.findByAltText(
      mockDynamicCategories[1].categoryName,
    );
    expect(element).toBeInTheDocument();
  });

  it('조건부 스타일링이 알맞게 적용된다.', async () => {
    render(
      <CategoryMenu
        details={{
          category: mockDynamicCategories.find(
            (c) => c.categoryName === '퐁당 PICK',
          )!,
        }}
      />,
    );

    const primaryElement = screen.getByText('퐁당 PICK');
    expect(primaryElement).toHaveClass('text-pink font-semibold');
  });
});
