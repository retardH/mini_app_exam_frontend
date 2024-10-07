import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { GlobalStateProvider } from "./context/GlobalStateContext.tsx";
import AppRoutes from "./routes/index.tsx";
import { AppContextProvider } from "./context/AppContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalStateProvider>
      <AppContextProvider>
        <AppRoutes />
      </AppContextProvider>
    </GlobalStateProvider>
  </StrictMode>
);
