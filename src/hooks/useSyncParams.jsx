"use client";

import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function useSyncParams() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Convert searchParams to a plain object for easier access
  const params = useMemo(() => {
    const paramsObject = {};
    searchParams.forEach((value, key) => {
      paramsObject[key] = value;
    });
    return paramsObject;
  }, [searchParams]);

  const updateParams = useCallback(
    (newParams) => {
      console.log("Updating params: ", newParams);

      // Create URLSearchParams from current params
      const updatedParams = new URLSearchParams(searchParams.toString());

      // Update or remove parameters
      Object.entries(newParams).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") {
          // Remove parameter if value is null, undefined, or empty string
          updatedParams.delete(key);
        } else {
          // Set parameter with properly encoded value
          updatedParams.set(key, String(value));
        }
      });

      // Build the new URL
      const queryString = updatedParams.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

      // Navigate with replace to avoid filling browser history
      router.replace(newUrl, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  return {
    params,
    updateParams,
  };
}

// basic usage example:

// const { updateParams } = useSyncParams();

// updateParams({
//   email: "test@example.com",
//   type: "register",
//   page: null, // removes 'page' from URL
// });
