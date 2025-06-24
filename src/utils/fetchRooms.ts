import { Room } from "../types/room";

interface PaginatedResponse {
  data: Room[];
  totalPages: number;
  currentPage: number;
  hasMore: boolean;
}

export async function fetchRooms(
  page: number = 1,
  limit: number = 10,
  signal?: AbortSignal
): Promise<PaginatedResponse> {
  const res = await fetch("/sample.json", { signal });
  if (res.status === 499) {
    // Client closed request
    console.log("Fetch aborted by client");
    return { data: [], totalPages: 0, currentPage: page, hasMore: false };
  }
  const data = await res.json();

  const allRooms =
    data.rooms_by_serial_no?.[0]?.rooms
      ?.map((room: any, roomIdx: number) => {
        const videoUrl = room.properties?.video_url?.med;
        const roomImages = room.properties.room_images?.[0].image_urls;

        const variants = room.variants
          .map((variant: any, variantIdx: number) => {
            const meal =
              variant.display_properties?.find(
                (p: any) => p.name === "meals_included"
              )?.value || "";
            const bedType =
              variant.display_properties?.find(
                (p: any) => p.name === "bed_type"
              )?.value || "";
            const maxAdultsStr =
              variant.display_properties?.find(
                (p: any) => p.name === "adult_occupancy"
              )?.value || "";
            const cancellation =
              variant.cancellation_info?.free_cancellation_info;

            const original = variant.total_price?.total_price_rounded || 0;
            const discounted =
              variant.total_price?.discounted_price_rounded || 0;
            const discountPercent =
              original && discounted
                ? Math.round(((original - discounted) / original) * 100)
                : 0;

            return {
              id: `${variant.variant_id}_${variantIdx}`,
              variantName: variant.name,
              meal,
              bedType,
              maxAdults: maxAdultsStr,
              cancellationPolicy: cancellation,
              price: {
                original,
                discounted,
                discountPercent,
              },
            };
          })
          .filter(Boolean);

        if (variants.length === 0) {
          return null;
        }

        return {
          id: `${room.room_type_code}_${roomIdx}`,
          roomName: room.name,
          video_url: videoUrl || undefined,
          room_images: roomImages,
          variants: variants,
        };
      })
      .filter(Boolean) ?? [];

  // Calculate pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedRooms = allRooms.slice(startIndex, endIndex);
  const totalPages = Math.ceil(allRooms.length / limit);

  // Artificial delay to simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    data: paginatedRooms,
    totalPages,
    currentPage: page,
    hasMore: page < totalPages,
  };
}
