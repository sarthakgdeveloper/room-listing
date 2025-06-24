import React from "react";
import RoomListPage from "./pages/RoomListPage";
import { RoomProvider } from "./context/RoomContext";
import ErrorBoundary from "./components/ErrorBoundary";

// Hey Sarthak this side, I really enjoyed completing this assignment
// point I would like to add
// I tried adding virtualization to the RoomListPage, but due to time constraint,
// I was stucked to deliver this feature,
// as it requires to add dynamic height to each roomcard items
// which was the tricky part in the give time frame

// Main entry point of the application
// Wraps the app in an error boundary and provides room data context
function App() {
  return (
    // ErrorBoundary catches any errors in the component tree and displays a fallback UI
    <ErrorBoundary>
      {/* RoomProvider supplies room data and infinite scroll logic to its children */}
      <RoomProvider>
        <RoomListPage />
      </RoomProvider>
    </ErrorBoundary>
  );
}

export default App;
