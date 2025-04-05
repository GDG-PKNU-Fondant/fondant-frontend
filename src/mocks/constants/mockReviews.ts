import Review from '@type/Review.ts';

interface ProductReview {
  [productId: number]: {
    reviews: Review[];
  };
}

const MOCK_REVIEWS: ProductReview = {
  1: {
    reviews: [
      {
        id: 0,
        profileImageUrl:
          'https://img.freepik.com/premium-photo/3d-woman-icon-female-figure-gender-illustration-logo_762678-59588.jpg?uid=P147264344&ga=GA1.1.591335944.1732282521&semt=ais_hybrid&w=740',
        username: '김채린',
        rating: 5,
        averageRating: 4.9,
        reviews: 52,
        comment:
          '정말 맛있어요! 바삭하고 적당히 달아서 한 입 먹으면 기분이 좋아지네요. 초콜릿 칩이 풍부하게 들어가 있어서 더 맛있었어요. 차 한잔과 함께 먹으니 더 완벽한 조합이에요.',
        images: [
          {
            id: 0,
            imageUrl:
              'https://img.freepik.com/premium-photo/close-up-served-food_1048944-2456389.jpg?uid=P147264344&ga=GA1.1.591335944.1732282521&semt=ais_hybrid&w=740',
          },
          {
            id: 1,
            imageUrl:
              'https://img.freepik.com/premium-photo/slices-traditional-pumpkin-pie-light-bright-setting_1105327-6743.jpg?uid=P147264344&ga=GA1.1.591335944.1732282521&semt=ais_hybrid&w=740',
          },
          {
            id: 2,
            imageUrl:
              'https://img.freepik.com/premium-photo/high-angle-view-sliced-strawberry-fruits-pancakes-stack-plate_1048944-30613761.jpg?uid=P147264344&ga=GA1.1.591335944.1732282521&semt=ais_hybrid&w=740',
          },
        ],
      },
      {
        id: 1,
        profileImageUrl:
          'https://img.freepik.com/premium-photo/meet-digital-avatar-young-chinese-male-with-gentle-smile-youthful-charm_1283595-13860.jpg?uid=P147264344&ga=GA1.1.591335944.1732282521&semt=ais_hybrid&w=740',
        username: '김지훈',
        rating: 5,
        averageRating: 4.8,
        reviews: 9,
        comment:
          '이 쿠키는 언제 먹어도 좋네요. 간단하게 차와 함께 먹기 좋고, 너무 달지 않아 부담 없이 즐길 수 있어요. 지인들에게도 추천하고 싶어요!',
        images: [
          {
            id: 3,
            imageUrl:
              'https://img.freepik.com/premium-photo/classic-new-york-cheesecake-with-dollop-whipped-cream_1105327-2532.jpg?uid=P147264344&ga=GA1.1.591335944.1732282521&semt=ais_hybrid&w=740',
          },
          {
            id: 4,
            imageUrl:
              'https://img.freepik.com/premium-photo/high-angle-view-multi-colored-macaroons-plate-against-pink-background_1048944-18686605.jpg?uid=P147264344&ga=GA1.1.591335944.1732282521&semt=ais_hybrid&w=740',
          },
          {
            id: 5,
            imageUrl:
              'https://img.freepik.com/premium-photo/high-angle-view-dessert-table_1048944-24493384.jpg?uid=P147264344&ga=GA1.1.591335944.1732282521&semt=ais_hybrid&w=740',
          },
        ],
      },
      {
        id: 2,
        profileImageUrl:
          'https://img.freepik.com/premium-photo/international-literacy-day-poster-with-stack-books-education-concept_1252118-10162.jpg?uid=P147264344&ga=GA1.1.591335944.1732282521&semt=ais_hybrid&w=740',
        username: '김상은',
        rating: 4,
        averageRating: 4.9,
        reviews: 16,
        comment:
          '쿠키 자체는 정말 맛있었는데, 다양한 맛들이 있었으면 좋겠어요. 여러 가지 맛을 시도해보고 싶은 분들에게는 조금 아쉬운 부분이 있을 것 같아요.',
        images: [
          {
            id: 6,
            imageUrl:
              'https://img.freepik.com/premium-photo/pieces-fresh-brownie-white-background-delicious-chocolate-pie_781325-6222.jpg?uid=P147264344&ga=GA1.1.591335944.1732282521&semt=ais_hybrid&w=740',
          },
          {
            id: 7,
            imageUrl:
              'https://img.freepik.com/premium-photo/tart-with-fresh-berries_72772-9692.jpg?uid=P147264344&ga=GA1.1.591335944.1732282521&semt=ais_hybrid&w=740',
          },
        ],
      },
    ],
  },
};

export default MOCK_REVIEWS;
