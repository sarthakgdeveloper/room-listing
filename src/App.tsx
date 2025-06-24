import React from "react";
import RoomListPage from "./pages/RoomListPage";
import { RoomProvider } from "./context/RoomContext";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <RoomProvider>
        <RoomListPage />
      </RoomProvider>
    </ErrorBoundary>
  );
}

export default App;
