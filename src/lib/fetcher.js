import config from "@/config/base";

/**
 * Server-side fetcher for Next.js App Router
 * Uses native fetch with caching and revalidation support
 */

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/server";

const BASE_URL = config.baseURL || "/server";

/**
 * @typedef {Object} FetcherOptions
 * @property {'GET'|'POST'|'PUT'|'PATCH'|'DELETE'} [method='GET'] - HTTP method
 * @property {Object} [body] - Request body (automatically stringified for JSON)
 * @property {Object} [params] - URL search parameters
 * @property {Object} [headers] - Additional headers
 * @property {number|false} [revalidate] - Revalidation time in seconds, false to disable caching
 * @property {string[]} [tags] - Cache tags for on-demand revalidation
 * @property {'force-cache'|'no-store'|'no-cache'|'default'} [cache] - Cache strategy
 * @property {'cors'|'no-cors'|'same-origin'} [mode] - Request mode
 * @property {'include'|'same-origin'|'omit'} [credentials] - Credentials mode
 */

/**
 * @typedef {Object} FetcherResponse
 * @property {any} data - Response data
 * @property {boolean} success - Whether the request was successful
 * @property {string|null} error - Error message if any
 * @property {number} status - HTTP status code
 */

/**
 * Build URL with search parameters
 * @param {string} endpoint - API endpoint
 * @param {Object} params - URL search parameters
 * @returns {string} Full URL with parameters
 */
function buildUrl(endpoint, params = {}) {
  const url = new URL(
    endpoint,
    BASE_URL.startsWith("http")
      ? BASE_URL
      : `https://placeholder.com${BASE_URL}`,
  );

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      if (Array.isArray(value)) {
        value.forEach((v) => url.searchParams.append(key, v));
      } else {
        url.searchParams.append(key, String(value));
      }
    }
  });

  // Return proper URL based on BASE_URL type
  if (BASE_URL.startsWith("http")) {
    return url.toString();
  }
  return `${BASE_URL}${endpoint}${url.search}`;
}

/**
 * Server-side fetcher function with Next.js caching support
 * @param {string} endpoint - API endpoint (e.g., '/api/users')
 * @param {FetcherOptions} [options={}] - Fetch options
 * @returns {Promise<FetcherResponse>} Response object
 *
 * @example
 * // Basic GET request with caching
 * const { data, error } = await fetcher('/api/users');
 *
 * @example
 * // GET with parameters and revalidation
 * const { data } = await fetcher('/api/posts', {
 *   params: { page: 1, limit: 10 },
 *   revalidate: 60, // Revalidate every 60 seconds
 * });
 *
 * @example
 * // POST request (no caching by default)
 * const { data, success } = await fetcher('/api/users', {
 *   method: 'POST',
 *   body: { name: 'John', email: 'john@example.com' },
 * });
 *
 * @example
 * // With cache tags for on-demand revalidation
 * const { data } = await fetcher('/api/posts', {
 *   tags: ['posts', 'all-posts'],
 *   revalidate: 3600,
 * });
 *
 * @example
 * // Disable caching entirely
 * const { data } = await fetcher('/api/realtime-data', {
 *   cache: 'no-store',
 * });
 */
export async function fetcher(endpoint, options = {}) {
  const {
    method = "GET",
    body,
    params,
    headers = {},
    revalidate,
    tags,
    cache,
    mode,
    credentials = "include",
  } = options;

  try {
    const url = buildUrl(endpoint, params);

    console.log("[Fetcher] Request URL:", url);

    // Build fetch options
    const fetchOptions = {
      method,
      credentials,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...headers,
      },
    };

    // Add body for non-GET requests
    if (body && method !== "GET") {
      fetchOptions.body = JSON.stringify(body);
    }

    // Add mode if specified
    if (mode) {
      fetchOptions.mode = mode;
    }

    // Configure Next.js caching
    // For mutations (POST, PUT, PATCH, DELETE), default to no caching
    const isMutation = ["POST", "PUT", "PATCH", "DELETE"].includes(method);

    if (cache) {
      fetchOptions.cache = cache;
    } else if (isMutation) {
      fetchOptions.cache = "no-store";
    }

    // Add Next.js specific options
    fetchOptions.next = {};

    if (revalidate !== undefined) {
      fetchOptions.next.revalidate = revalidate;
    }

    if (tags && tags.length > 0) {
      fetchOptions.next.tags = tags;
    }

    // Remove empty next object
    if (Object.keys(fetchOptions.next).length === 0) {
      delete fetchOptions.next;
    }

    const response = await fetch(url, fetchOptions);

    // Handle different response types
    const contentType = response.headers.get("content-type");
    let data;

    if (contentType?.includes("application/json")) {
      data = await response.json();
    } else if (contentType?.includes("text/")) {
      data = await response.text();
    } else {
      data = await response.blob();
    }

    if (!response.ok) {
      return {
        data: null,
        success: false,
        error: data?.message || data?.error || `HTTP Error: ${response.status}`,
        status: response.status,
      };
    }

    return {
      data,
      success: true,
      error: null,
      status: response.status,
    };
  } catch (error) {
    console.error(`[Fetcher Error] ${endpoint}:`, error);

    return {
      data: null,
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
      status: 500,
    };
  }
}

/**
 * Shorthand for GET requests
 * @param {string} endpoint - API endpoint
 * @param {Omit<FetcherOptions, 'method'>} [options={}] - Fetch options
 * @returns {Promise<FetcherResponse>}
 */
export const get = (endpoint, options = {}) =>
  fetcher(endpoint, { ...options, method: "GET" });

/**
 * Shorthand for POST requests
 * @param {string} endpoint - API endpoint
 * @param {Object} [body] - Request body
 * @param {Omit<FetcherOptions, 'method'|'body'>} [options={}] - Fetch options
 * @returns {Promise<FetcherResponse>}
 */
export const post = (endpoint, body, options = {}) =>
  fetcher(endpoint, { ...options, method: "POST", body });

/**
 * Shorthand for PUT requests
 * @param {string} endpoint - API endpoint
 * @param {Object} [body] - Request body
 * @param {Omit<FetcherOptions, 'method'|'body'>} [options={}] - Fetch options
 * @returns {Promise<FetcherResponse>}
 */
export const put = (endpoint, body, options = {}) =>
  fetcher(endpoint, { ...options, method: "PUT", body });

/**
 * Shorthand for PATCH requests
 * @param {string} endpoint - API endpoint
 * @param {Object} [body] - Request body
 * @param {Omit<FetcherOptions, 'method'|'body'>} [options={}] - Fetch options
 * @returns {Promise<FetcherResponse>}
 */
export const patch = (endpoint, body, options = {}) =>
  fetcher(endpoint, { ...options, method: "PATCH", body });

/**
 * Shorthand for DELETE requests
 * @param {string} endpoint - API endpoint
 * @param {Omit<FetcherOptions, 'method'>} [options={}] - Fetch options
 * @returns {Promise<FetcherResponse>}
 */
export const del = (endpoint, options = {}) =>
  fetcher(endpoint, { ...options, method: "DELETE" });

export default fetcher;

// useage example in a Next.js server component

// example of directly using fetcher in a server component for a get request

// import { fetcher } from "@/lib/fetcher";

//   const { data, error } = await fetcher("/api/users", {
//     params: { page: 1, limit: 10 },
//     revalidate: 60,
//   });

// import { get } from "@/lib/fetcher";

//   const { data, error } = await get("/api/users", {
//     params: { page: 1, limit: 10 },
//     revalidate: 60,
//   });

// usage example in a Next.js API route

// import { post } from "@/lib/fetcher";

//     const { data, error } = await post("/api/users", req.body);
