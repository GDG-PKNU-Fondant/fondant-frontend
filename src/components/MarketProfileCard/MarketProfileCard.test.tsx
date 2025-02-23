import { render, screen, fireEvent, cleanup} from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MarketProfileCard from '@components/MarketProfileCard';
import MOCK_MARKET_PROFILES from '@mocks/constants/mockMarketProfiles';

describe('MarketProfileCard Component', () => {

  it('좋아요 버튼 클릭 시 색상이 변경된다.', () => {
    render(<MarketProfileCard {...MOCK_MARKET_PROFILES[0]} />);
    const likeButton = screen.getByRole('button');
    const heartIcon = likeButton.querySelector('svg');

    expect(heartIcon).toHaveAttribute('fill', 'none');

    fireEvent.click(likeButton);
    expect(heartIcon).toHaveAttribute('fill', '#FF80A6');

    fireEvent.click(likeButton);
    expect(heartIcon).toHaveAttribute('fill', 'none');
  });

  it('좋아요 클릭 시 숫자가 증가/감소한다.', () => {
    const profile = MOCK_MARKET_PROFILES[0];
    render(<MarketProfileCard {...profile} />);

    const likeButton = screen.getByRole('button');
    const likeCountElement = screen.getByText(profile.likes.toString());

    expect(likeCountElement).toBeInTheDocument();

    fireEvent.click(likeButton);
    expect(screen.getByText((profile.likes + 1).toString())).toBeInTheDocument();

    fireEvent.click(likeButton);
    expect(screen.getByText(profile.likes.toString())).toBeInTheDocument();
  });

  it('Mock 데이터가 올바르게 렌더링된다.', () => {
    MOCK_MARKET_PROFILES.forEach((profile) => {
      cleanup();
      render(<MarketProfileCard {...profile} />);

      expect(screen.getByText(profile.marketName)).toBeInTheDocument();
      expect(screen.getByText(profile.description)).toBeInTheDocument();
      expect(screen.getByText(profile.rating.toFixed(1))).toBeInTheDocument();

      if (profile.profileImageUrl) {
        const profileImage = screen.getAllByRole('img').find(
          (img) => img.getAttribute('src') === profile.profileImageUrl
        );
        expect(profileImage).toBeInTheDocument();
      }

      const allImages = screen.getAllByRole('img');
      const thumbnails = allImages.filter(
        (img) => profile.thumbnailUrls.includes(img.getAttribute('src') || '')
      );

      expect(thumbnails.length).toBe(profile.thumbnailUrls.length);
    });
  });
});