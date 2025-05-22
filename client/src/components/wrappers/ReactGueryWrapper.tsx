import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
type props = {
  children: React.ReactNode;
};
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});
const ReactGueryWraper = ({ children }: props) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactGueryWraper;
