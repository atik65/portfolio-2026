import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authCookieStorage } from "./authCookieStorage";
import { getCookie } from "@/lib/cookies";

const useAuthStore = create((set) => ({
  isAuthenticated: getCookie("isSignedIn") ? true : false,

  setIsAuthenticated: (authStatus) =>
    set(() => {
      const signedIn = getCookie("isSignedIn") ? "true" : "false";
      return { isAuthenticated: authStatus || signedIn === "true" };
    }),

  login: () => set({ isAuthenticated: true }),

  logout: () => set({ isAuthenticated: false }),
}));
export default useAuthStore;

// export const useAuthStore = create(
//   persist(
//     (set) => ({
//       isAuthenticated: false,

//       login: () => set({ isAuthenticated: true }),

//       logout: () => set({ isAuthenticated: false }),
//     }),
//     {
//       name: "isSignedIn",
//       storage: authCookieStorage,
//       skipHydration: true, // Skip SSR hydration
//       onRehydrateStorage: () => (state) => {
//         console.log("🔄 Rehydrated state:", state);
//       },
//     }
//   )
// );

// // Manually hydrate on client side only
// if (typeof window !== "undefined") {
//   useAuthStore.persist.rehydrate();
// }
