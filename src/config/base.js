const isProd = process.env.NEXT_PUBLIC_NODE_ENV === "production";
const appTitle = process.env.NEXT_PUBLIC_TITLE;
const baseURLProd = process.env.NEXT_PUBLIC_API_BASE_URL_PROD;
const baseURLDev = process.env.NEXT_PUBLIC_API_BASE_URL_DEV;
// const cryptojsSecretKey = process.env.NEXT_PUBLIC_CRYPTOJS_SECRET_KEY;

const baseConfig = {
  isProd,
  appTitle,
  // cryptojsSecretKey,
};

const devConfig = { ...baseConfig, baseURL: baseURLDev };
const prodConfig = { ...baseConfig, baseURL: baseURLProd };

const config = isProd ? prodConfig : devConfig;

export default config;
