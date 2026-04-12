import useApi from "./useApi";

const useProfile = (enabled = true) => {
  const { data: profileData, isLoading: isLoadingProfile } = useApi({
    api: {
      method: "get",
      endpoint: "/api/user/profile",
      path: "/show",
    },
    cacheKey: "userProfile",
    trigger: enabled,
    // staleTime: null,
  });

  const userProfile = profileData?.data || {};

  return { data: userProfile, isLoading: isLoadingProfile };
};

export default useProfile;
