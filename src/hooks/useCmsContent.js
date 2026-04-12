"use client";

import useApi from "./useApi";
import { useLocale } from "next-intl";

const endpoint = "/api/base/cms";

const cmsApi = {
  section: (module_names, language_code) => ({
    endpoint,
    path: `/sections?module_names=${module_names}&language_code=${language_code}`,
    method: "post",
  }),
};

const useCmsContent = (moduleName) => {
  const locale = useLocale();

  const { data, isLoading, error } = useApi({
    api: cmsApi.section(moduleName, locale),
    cacheKey: ["cms", moduleName, locale],
  });

  return {
    content: data || null,
    isLoading,
    error,
  };
};

export default useCmsContent;
