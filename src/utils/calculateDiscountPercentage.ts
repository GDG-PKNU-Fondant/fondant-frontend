const calculateDiscountPercentage = (
  price: number,
  discountPrice: number,
): number => Math.floor(((price - discountPrice) / price) * 100);

export default calculateDiscountPercentage;
