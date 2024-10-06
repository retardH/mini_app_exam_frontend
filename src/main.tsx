import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { GlobalStateProvider } from "./context/GlobalStateContext.tsx";
import AppRoutes from "./routes/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalStateProvider>
      <AppRoutes />
    </GlobalStateProvider>
  </StrictMode>
);
