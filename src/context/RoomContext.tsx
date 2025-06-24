import React, {
  createContext,
  useContext,
  useReducer,
  useRef,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { Room } from "../types/room";
import { fetchRooms } from "../utils/fetchRooms";
import { debounce } from "../utils/debounce";

const ITEMS_PER_PAGE = 10;

interface State {
  rooms: Room[];
  loading: boolean;
  error: boolean;
  hasMore: boolean;
  page: number;
}

type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: { rooms: Room[]; hasMore: boolean } }
  | { type: "FETCH_FAILURE" }
  | { type: "LOAD_MORE" };

const initialState: State = {
  rooms: [],
  loading: false,
  error: false,
  hasMore: true,
  page: 1,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: false };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        rooms: [...state.rooms, ...action.payload.rooms],
        hasMore: action.payload.hasMore,
      };
    case "FETCH_FAILURE":
      return { ...state, loading: false, error: true };
    case "LOAD_MORE":
      return { ...state, page: state.page + 1 };
    default:
      return state;
  }
};

interface RoomContextType {
  rooms: Room[];
  loading: boolean;
  error: boolean;
  hasMore: boolean;
  loadMoreRef: React.RefObject<HTMLDivElement>;
}

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export const RoomProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const observerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const loadRooms = useCallback(async (page: number, signal: AbortSignal) => {
    dispatch({ type: "FETCH_START" });
    try {
      const response = await fetchRooms(page, ITEMS_PER_PAGE, signal);
      if (!signal.aborted) {
        dispatch({
          type: "FETCH_SUCCESS",
          payload: { rooms: response.data, hasMore: response.hasMore },
        });
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        dispatch({ type: "FETCH_FAILURE" });
      }
    }
  }, []);

  const debouncedLoadMore = useRef(
    debounce(() => {
      if (state.hasMore && !state.loading) {
        dispatch({ type: "LOAD_MORE" });
      }
    }, 300)
  ).current;

  useEffect(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    loadRooms(state.page, abortControllerRef.current.signal);

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [state.page, loadRooms]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !state.loading) {
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
  }, [debouncedLoadMore, state.loading]);

  const value = {
    rooms: state.rooms,
    loading: state.loading,
    error: state.error,
    hasMore: state.hasMore,
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
