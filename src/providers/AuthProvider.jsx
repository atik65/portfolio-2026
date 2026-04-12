"use client";

import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import useProfile from "@/hooks/useProfile";
import { getCookie } from "@/lib/cookies";

const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const queryClient = useQueryClient();

  // Check authentication on mount
  React.useEffect(() => {
    const authToken = getCookie("auth_token");
    setIsAuthenticated(!!authToken);
  }, []);

  // Always call useProfile but only fetch when authenticated
  const { data: userProfile, isLoading: isLoadingProfile } =
    useProfile(isAuthenticated);

  // Method to set authenticated state (call after login)
  const setAuthenticated = React.useCallback(
    (value) => {
      setIsAuthenticated(value);
      if (!value) {
        // Clear profile cache on logout
        queryClient.removeQueries({ queryKey: ["userProfile"] });
      } else {
        // Force refetch profile when logging in
        queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      }
    },
    [queryClient]
  );

  const value = React.useMemo(
    () => ({
      isAuthenticated,
      userProfile,
      isLoadingProfile,
      setAuthenticated,
    }),
    [isAuthenticated, userProfile, isLoadingProfile, setAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
