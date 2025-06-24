import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./main.scss";
import { GameDataProvider } from "./providers/GameDataProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GameDataProvider>
      <App />
    </GameDataProvider>
  </StrictMode>
);
