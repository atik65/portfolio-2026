import React from "react";
import { getLocale } from "next-intl/server";
import fetcher from "@/lib/fetcher";

// {{base_url_dev}}/api/base/cms/sections?module_names=hero_section,aboute_us,bb&language_code=ar

const CmsSectionWrapper = async ({ moduleName, children }) => {
  const locale = await getLocale();

  const { data, error } = await fetcher("/api/base/cms/sections", {
    params: { module_names: moduleName, language_code: locale },
    revalidate: 60,
  });

  console.log("CmsSectionWrapper data:", data);
  console.log("CmsSectionWrapper error:", error);

  return (
    <div>
      {/* {error && <p>Error loading content: {error}</p>}
      {!data && <p>Loading...</p>} */}
      {/* {data && children(data?.data[moduleName])} */}
      {/* {data && children(data?.data[moduleName])} */}
      {children({
        data,
        error,
        content: data?.data[moduleName],
        loading: !data && !error,
        
      })}
    </div>
  );
};

export default CmsSectionWrapper;

// useage example in a Next.js server component

// import CmsSectionWrapper from "@/wrappers/CmsSectionWrapper";

//   <CmsSectionWrapper moduleName="hero_section">
//     {(content) => (
//       <div>
//         <h1>{content.title}</h1>
//         <p>{content.description}</p>
//       </div>
//     )}
//   </CmsSectionWrapper>
