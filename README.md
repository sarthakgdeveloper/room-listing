# Unravel Room Listing

This is a single-page application built with React that displays a list of hotel rooms and their variants. It's designed to be performant and user-friendly, featuring infinite scrolling, lazy-loaded media, and a clean, responsive interface.

## Tech Stack

- **Framework**: [React](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: React Context with `useReducer`
- **Deployment**: [Netlify](https://www.netlify.com/)

## Features

- **Infinite Scroll**: Rooms are loaded dynamically as the user scrolls, providing a seamless browsing experience.
- **Dynamic Media Player**: The app features a `MediaViewer` component that:
  - Plays videos automatically when they enter the viewport and pauses them when they leave.
  - Displays an image carousel for rooms that don't have a video.
  - Lazy-loads images with a stylish blur-up effect for better perceived performance.
- **Expandable Room Variants**: Each room card can be expanded to show all available variants (e.g., different meal plans, bed types).
- **Robust Error Handling**: An `ErrorBoundary` component wraps the application to catch runtime errors and display a fallback UI, preventing the entire app from crashing.
- **Responsive Design**: The layout is fully responsive and works well on both desktop and mobile devices.

## Project Structure

The project follows a standard React application structure:

```
/src
|-- /components     # Reusable UI components (RoomCard, MediaViewer, ErrorBoundary, etc.)
|-- /context        # Global state management (RoomContext)
|-- /hooks          # (Not used currently, but available for custom hooks)
|-- /pages          # Main application pages (RoomListPage)
|-- /types          # TypeScript type definitions (room.d.ts)
|-- /utils          # Utility functions (fetchRooms, debounce)
|-- App.tsx         # Main application component
|-- main.tsx        # Application entry point
```

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20 or higher is recommended)
- [npm](https://www.npmjs.com/)

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/sarthakgdeveloper/room-listing.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd room-listing
    ```
3.  Install NPM packages:
    ```sh
    npm install
    ```

### Running the Development Server

To start the local development server, run:

```sh
npm run dev
```

The application will be available at `http://localhost:5173`.

## Building for Production

To create a production-ready build of the application, run:

```sh
npm run build
```

This command will generate a `dist` folder containing the optimized and minified static files.

## Deployment

This project is pre-configured for deployment on [Netlify](https://www.netlify.com/). The `netlify.toml` file in the root directory contains the necessary build settings and redirect rules for a single-page application.

To deploy:

1.  Push your code to a GitHub, GitLab, or Bitbucket repository.
2.  In the Netlify dashboard, select "Add new site" -> "Import an existing project".
3.  Connect your Git provider and select your repository.
4.  Netlify will automatically detect the `netlify.toml` file and configure the build settings.
5.  Click "Deploy site".
