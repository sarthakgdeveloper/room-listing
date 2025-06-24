import React from "react";
import RoomListPage from "./pages/RoomListPage";
import { RoomProvider } from "./context/RoomContext";

function App() {
  return (
    <RoomProvider>
      <RoomListPage />
    </RoomProvider>
  );
}

export default App;
