const MOCK_CART = {
  markets: [
    {
      id: 0,
      name: '채린이가 만든 시리얼',
      selected: false,
      items: [
        {
          id: 0,
          name: '직접 만든 시리얼',
          basePrice: 7000,
          thumbnailUrl:
            'https://images.unsplash.com/photo-1622711321771-4a00d2bc0350?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          quantity: 3,
          selected: false,
          arrivalDate: new Date(),
          additionalOptions: [
            {
              id: 0,
              name: '민트 초콜릿 시리얼',
              additionalPrice: 0,
              quantity: 1,
            },
            {
              id: 1,
              name: '얼그레이 초콜릿 시리얼',
              additionalPrice: 0,
              quantity: 2,
            },
            {
              id: 2,
              name: '딸기 초콜릿 시리얼',
              additionalPrice: 1200,
              quantity: 2,
            },
          ],
        },
        {
          id: 1,
          name: '직접 만든 그릭 요거트',
          basePrice: 6000,
          thumbnailUrl:
            'https://img.freepik.com/free-photo/organic-yogurt-bowl-with-oats-table_23-2148529400.jpg?t=st=1740007981~exp=1740011581~hmac=1c88a292b6d9c4a30674cfdefcff68a6b417052fa8e5c9ce4e4caf4a6ecea4a3&w=2000',
          quantity: 2,
          selected: false,
          arrivalDate: new Date(),
          additionalOptions: [
            {
              id: 0,
              name: '플레인 그릭 요거트',
              additionalPrice: 0,
              quantity: 1,
            },
          ],
        },
      ],
      freeDeliveryLimit: 20000,
    },
    {
      id: 1,
      name: '상윤이네 쿠키',
      selected: false,
      items: [
        {
          id: 0,
          name: '바삭바삭 쿠키 (6개입)',
          basePrice: 20000,
          thumbnailUrl:
            'https://images.unsplash.com/photo-1618384836169-8471703f1eaf?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          quantity: 2,
          selected: false,
          arrivalDate: new Date(),
        },
      ],
      freeDeliveryLimit: 30000,
    },
  ],
};

export default MOCK_CART;
