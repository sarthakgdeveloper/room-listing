import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { Room } from "../types/room";
import { fetchRooms } from "../utils/fetchRooms";
import { debounce } from "../utils/debounce";

const ITEMS_PER_PAGE = 10;

interface RoomContextType {
  rooms: Room[];
  loading: boolean;
  error: boolean;
  hasMore: boolean;
  loadMoreRef: React.RefObject<HTMLDivElement>;
}

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export const RoomProvider = ({ children }: { children: ReactNode }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(1);
  const observerRef = useRef<HTMLDivElement>(null);

  const loadingRef = useRef(loading);
  loadingRef.current = loading;
  const hasMoreRef = useRef(hasMore);
  hasMoreRef.current = hasMore;

  const initialLoadCalled = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const loadRooms = useCallback(async (page: number) => {
    // Abort any previous ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    setLoading(true);
    try {
      const response = await fetchRooms(page, ITEMS_PER_PAGE, signal);
      if (signal.aborted) return;
      setRooms((prev) => [...prev, ...response.data]);
      setHasMore(response.hasMore);
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setError(true);
      }
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }
  }, []);

  const debouncedLoadMore = useRef(
    debounce(() => {
      if (hasMoreRef.current && !loadingRef.current) {
        pageRef.current += 1;
        loadRooms(pageRef.current);
      }
    }, 300)
  ).current;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          debouncedLoadMore();
        }
      },
      { threshold: 0.5 }
    );

    const currentObserverRef = observerRef.current;
    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, [debouncedLoadMore, loading]);

  useEffect(() => {
    if (initialLoadCalled.current) {
      return;
    }
    initialLoadCalled.current = true;
    loadRooms(pageRef.current);

    return () => {
      if (abortControllerRef.current && !initialLoadCalled.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [loadRooms]);

  const value = {
    rooms,
    loading,
    error,
    hasMore,
    loadMoreRef: observerRef,
  };

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
};

export const useRooms = () => {
  const context = useContext(RoomContext);
  if (context === undefined) {
    throw new Error("useRooms must be used within a RoomProvider");
  }
  return context;
};
