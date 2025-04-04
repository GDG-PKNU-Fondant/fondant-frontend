export default interface Review {
  id: number;
  profileImageUrl: string;
  username: string;
  rating: number;
  averageRating: number;
  reviews: number;
  comment: string;
  images: { id: number; imageUrl: string }[];
}
