import { getCookie, removeCookie } from "@/lib/cookies";

export const authCookieStorage = {
  getItem: (name) => {
    // Check if backend's isAuthenticated cookie exists
    const isAuth = getCookie("isSignedIn");

    console.log("🔍 Cookie value:", isAuth);
    console.log("🔍 Cookie type:", typeof isAuth);

    if (isAuth === "true" || isAuth === true) {
      console.log("✅ Returning authenticated state");
      // Return zustand persist format with state and version
      const storedValue = JSON.stringify({
        state: { isAuthenticated: true },
        version: 0,
      });
      console.log("🔍 Returning:", storedValue);
      return storedValue;
    }
    console.log("❌ Returning null (not authenticated)");
    return null;
  },

  setItem: (name, value, options) => {
    // Backend manages the isAuthenticated cookie
    // No need to set it from frontend
  },

  removeItem: (name, options) => {
    removeCookie("isSignedIn", options);
  },
};
