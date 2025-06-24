export interface Variant {
  id: string;
  variantName: string;
  meal: string;
  bedType: string;
  maxAdults: string;
  cancellationPolicy: string;
  price: {
    original: number;
    discounted: number;
    discountPercent: number;
  };
}

export interface Room {
  id: string;
  roomName: string;
  video_url?: string;
  room_images?: string[];
  variants: Variant[];
}
