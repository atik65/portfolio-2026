"use client";

import React from "react";
import { AppProgressProvider as ProgressProvider } from "@bprogress/next";
import SmoothScroller from "./SmoothScroller";

const CustomRootProvider = ({ children }) => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <ProgressProvider
        height="3px"
        color="#1DB954"
        options={{ showSpinner: false }}
        shallowRouting
      >
        <SmoothScroller>{children}</SmoothScroller>
      </ProgressProvider>
    </div>
  );
};

export default CustomRootProvider;
