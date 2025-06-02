import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PopularSearches from '@components/PopularSearches';
import MOCK_POPULAR_SEARCHES from '@mocks/constants/mockPopularSearches';

describe('PopularSearches Component', () => {
  it('컴포넌트가 정상적으로 렌더링된다.', () => {
    render(<PopularSearches searches={MOCK_POPULAR_SEARCHES} />);
    expect(screen.getByText('인기 검색어')).toBeInTheDocument();
  });

  it('모든 인기 검색어가 올바르게 표시된다.', () => {
    render(<PopularSearches searches={MOCK_POPULAR_SEARCHES} />);

    MOCK_POPULAR_SEARCHES.forEach((search) => {
      expect(screen.getByText(search.rank.toString())).toBeInTheDocument();
      expect(screen.getByText(search.keyword)).toBeInTheDocument();
    });
  });

  it('업데이트 시간이 올바르게 표시된다.', () => {
    render(<PopularSearches searches={MOCK_POPULAR_SEARCHES} />);

    const currentHour = new Date().getHours().toString().padStart(2, '0');
    const expectedUpdateTime = `${currentHour}시 업데이트`;
    expect(screen.getByText(expectedUpdateTime)).toBeInTheDocument();
  });
});
