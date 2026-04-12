// import useAuthStore from "@/store/useAuthStore";
import axiosInstance from "./axiosInstance";
import { removeCookie } from "./cookies";

export default async function logout() {
  // const { setIsAuthenticated } = useAuthStore();
  try {
    await axiosInstance({
      api: {
        method: "get",
        endpoint: "/api/user/auth",
        path: "/logout",
      },
    });

    // Update auth state
    // setIsAuthenticated(false);
  } catch (error) {
    console.error("Logout API error:", error);
  } finally {
    removeCookie("signedIn");
    // removeCookie("user_profile");
    window.location.href = "/login";
  }
}
