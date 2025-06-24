import React from "react";
import RoomListPage from "./pages/RoomListPage";
import { RoomProvider } from "./context/RoomContext";
import ErrorBoundary from "./components/ErrorBoundary";

// Hey Sarthak this side, who developed this App, I really enjoyed completing this assignment
// point I would like to add
// I tried adding virtualization to the RoomListPage, but due to time constraint,
// I was stucked to deliver this feature,
// as it requires to add dynamic height to each roomcard items
// which was the tricky part in the give time frame

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
