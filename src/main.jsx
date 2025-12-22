import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { AnnounceProvider } from "./context/AnnounceProvider.jsx";
import { FilterProvider } from "./context/FilterContext.jsx";
import { SettingProvider } from "./context/SettingContext.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AnnounceProvider>
        <FilterProvider>
          <SettingProvider>
            <App />
          </SettingProvider>
        </FilterProvider>
      </AnnounceProvider>
    </QueryClientProvider>
  </StrictMode>
);
