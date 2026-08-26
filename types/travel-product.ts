export type TravelProductCategory = "호텔" | "리조트" | "펜션" | "게스트하우스";

export type TravelProduct = {
  _id: string;
  name: string;
  location: string;
  category: TravelProductCategory;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
};
