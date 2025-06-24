import { Room, Variant } from "../types/room";

interface PaginatedResponse {
  data: Room[];
  totalPages: number;
  currentPage: number;
  hasMore: boolean;
}

const transformVariants = (variants: any[]): Variant[] => {
  return variants
    .map((variant: any, variantIdx: number) => {
      const displayProperties = variant.display_properties || [];
      const totalPrice = variant.total_price || {};

      const meal =
        displayProperties.find((p: any) => p.name === "meals_included")
          ?.value || "";
      const bedType =
        displayProperties.find((p: any) => p.name === "bed_type")?.value || "";
      const maxAdults =
        displayProperties.find((p: any) => p.name === "adult_occupancy")
          ?.value || "";
      const cancellationPolicy =
        variant.cancellation_info?.free_cancellation_info || "Not specified";

      const original = totalPrice.total_price_rounded || 0;
      const discounted = totalPrice.discounted_price_rounded || 0;
      const discountPercent =
        original && discounted
          ? Math.round(((original - discounted) / original) * 100)
          : 0;

      return {
        id: `${variant.variant_id}_${variantIdx}`,
        variantName: variant.name,
        meal,
        bedType,
        maxAdults,
        cancellationPolicy,
        price: {
          original,
          discounted,
          discountPercent,
        },
      };
    })
    .filter((v) => v.variantName); // Ensure variant has a name
};

const transformRooms = (apiRooms: any[]): Room[] => {
  return apiRooms
    .map((room: any, roomIdx: number): Room | null => {
      const properties = room.properties || {};
      const videoUrl = properties.video_url?.med;
      const roomImages = properties.room_images?.[0]?.image_urls;

      const variants = transformVariants(room.variants || []);

      if (variants.length === 0) {
        return null;
      }

      const newRoom: Room = {
        id: `${room.room_type_code}_${roomIdx}`,
        roomName: room.name,
        video_url: videoUrl,
        room_images: roomImages,
        variants: variants,
      };
      return newRoom;
    })
    .filter((room): room is Room => room !== null);
};

export async function fetchRooms(
  page: number = 1,
  limit: number = 10,
  signal?: AbortSignal
): Promise<PaginatedResponse> {
  try {
    const res = await fetch("/sample.json", { signal });
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }
    const data = await res.json();

    const allRooms = transformRooms(data.rooms_by_serial_no?.[0]?.rooms || []);

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
  } catch (error: any) {
    if (error.name === "AbortError") {
      console.log("Fetch aborted by client");
      return { data: [], totalPages: 0, currentPage: page, hasMore: false };
    }
    console.error("Failed to fetch rooms:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}
