import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { Provider } from 'jotai';
import { MemoryRouter } from 'react-router-dom';
import BottomTab from '@components/BottomTab';
import TABS from '@components/BottomTab/tabs';

const mockNavigate = vi.fn();
const mockLocation = { pathname: '/' };

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => mockLocation,
  };
});

describe('BottomTab', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderBottomTab = (initialPath: string = '/') => {
    mockLocation.pathname = initialPath;
    return render(
      <Provider>
        <MemoryRouter initialEntries={[initialPath]}>
          <BottomTab />
        </MemoryRouter>
      </Provider>,
    );
  };

  it('모든 탭이 올바르게 렌더링된다.', () => {
    renderBottomTab();

    TABS.forEach(({ label }) => {
      const tab = screen.getByText(label);
      expect(tab).toBeInTheDocument();
    });
  });

  it('탭 클릭 시 해당 경로로 이동한다.', () => {
    renderBottomTab();

    TABS.forEach(({ label, path }) => {
      const tab = screen.getByText(label);
      fireEvent.click(tab);

      expect(mockNavigate).toHaveBeenCalledWith(path);
    });
  });

  it('Enter 키로 탭 이동이 가능하다.', () => {
    renderBottomTab();

    TABS.forEach(({ label, path }) => {
      const tab = screen.getByText(label);
      fireEvent.keyDown(tab.parentElement!, { key: 'Enter' });

      expect(mockNavigate).toHaveBeenCalledWith(path);
    });
  });

  it('활성화된 탭의 아이콘 색상이 변경된다.', () => {
    renderBottomTab();

    const homeTab = screen.getByText('홈').parentElement!;
    const homeIcon = homeTab.querySelector('svg');
    expect(homeIcon).toHaveAttribute('fill', '#BC8462');

    TABS.slice(1).forEach(({ label }) => {
      const tab = screen.getByText(label).parentElement!;
      const icon = tab.querySelector('svg');
      expect(icon).toHaveAttribute('fill', 'none');
    });
  });

  it('하위 경로에서도 올바른 탭이 활성화된다.', () => {
    renderBottomTab('/category/bread');

    const categoryTab = screen.getByText('카테고리').parentElement!;
    const categoryIcon = categoryTab.querySelector('svg');
    expect(categoryIcon).toHaveAttribute('fill', '#BC8462');

    ['홈', '검색', '위시', 'my'].forEach((label) => {
      const tab = screen.getByText(label).parentElement!;
      const icon = tab.querySelector('svg');
      expect(icon).toHaveAttribute('fill', 'none');
    });
  });

  it('쿼리 파라미터가 있는 경로에서도 올바른 탭이 활성화된다.', () => {
    renderBottomTab('/search?keyword=candy');

    const searchTab = screen.getByText('검색').parentElement!;
    const searchIcon = searchTab.querySelector('svg');
    expect(searchIcon).toHaveAttribute('fill', '#BC8462');

    ['홈', '카테고리', '위시', 'my'].forEach((label) => {
      const tab = screen.getByText(label).parentElement!;
      const icon = tab.querySelector('svg');
      expect(icon).toHaveAttribute('fill', 'none');
    });
  });

  it('존재하지 않는 경로에서는 홈 탭이 활성화된다.', () => {
    renderBottomTab('/non-existent-path');

    const homeTab = screen.getByText('홈').parentElement!;
    const homeIcon = homeTab.querySelector('svg');
    expect(homeIcon).toHaveAttribute('fill', '#BC8462');
  });

  it('연속적인 탭 전환이 정상적으로 동작한다.', () => {
    renderBottomTab();

    TABS.forEach(({ label }) => {
      const tab = screen.getByText(label).parentElement!;
      fireEvent.click(tab);

      TABS.forEach(({ label: tabLabel }) => {
        const currentTab = screen.getByText(tabLabel).parentElement!;
        const icon = currentTab.querySelector('svg');
        expect(icon).toHaveAttribute(
          'fill',
          tabLabel === label ? '#BC8462' : 'none',
        );
      });
    });
  });

  it('탭 상태가 URL과 동기화된다.', () => {
    TABS.forEach(({ label, path }) => {
      cleanup();
      renderBottomTab(path);

      const currentTab = screen.getByText(label).parentElement!;
      const icon = currentTab.querySelector('svg');
      expect(icon).toHaveAttribute('fill', '#BC8462');
    });
  });
});
