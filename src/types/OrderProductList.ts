export interface OrderProductListProps {
  products: {
    id: number;
    imageUrl: string;
    productName: string;
    option: string;
    price: number;
  }[];
}
