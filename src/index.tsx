import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RoutesWrapper } from "./router/RouteWrapper";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import GlobalContextProvider from "./state/GlobalContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      retryDelay: 2000,
      staleTime: 300000,
    },
  },
});
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalContextProvider>
        <RoutesWrapper />
      </GlobalContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
