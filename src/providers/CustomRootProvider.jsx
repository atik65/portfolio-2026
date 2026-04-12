"use client";

import { SnackbarProvider } from "notistack";
import React from "react";
import { AppProgressProvider as ProgressProvider } from "@bprogress/next";
import { queryClientInstance } from "@/lib/queryInstance";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import UpcomingEventGlobalModal from "@/components/shared/UpcomingEventGlobalModal";
import ScrollToTop from "@/components/shared/ScrollToTop";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const CustomRootProvider = ({ children }) => {
  React.useEffect(() => {
    // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    window.scrollTo(0, 0);
  }, []);

  const [queryClient] = React.useState(queryClientInstance);

  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        {/* <AuthProvider> */}
        <SnackbarProvider />

        <ProgressProvider
          height="3px"
          color="#006A4E"
          options={{ showSpinner: false }}
          shallowRouting
        >
          {/* <SmoothScroller> */}
          {children}
          {/* </SmoothScroller> */}

          {/* Global upcoming events modal */}
          <UpcomingEventGlobalModal />

          {/* scroll to top */}
          <ScrollToTop />
          <ReactQueryDevtools initialIsOpen={false} />
        </ProgressProvider>
        {/* </AuthProvider> */}
      </NuqsAdapter>
    </QueryClientProvider>
  );
};

export default CustomRootProvider;
