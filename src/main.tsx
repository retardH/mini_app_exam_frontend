import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GlobalStateProvider } from "./context/GlobalStateContext.tsx";
import AppRoutes from "./routes/index.tsx";
import { AppContextProvider } from "./context/AppContext.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalStateProvider>
      <AppContextProvider>
        <AppRoutes />
      </AppContextProvider>
    </GlobalStateProvider>
  </StrictMode>
);
