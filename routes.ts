/**
 * Array of public routes. No authentication is required to access these routes.
 * @type {string[]}
 */
export const publicRoutes = [
  "/p/:path*", // Public pet pages and sub-routes
];

/**
 * Array of authentication routes. Will redirect to DEFAULT_LOGIN_REDIRECT page if user is authenticated.
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/verify-email",
  "/auth/error",
  "/auth/reset",
  "/auth/reset-password",
  "/auth/create-pass",
  "/auth/new-password",
];

/**
 * Prefix for api authentication route
 * Routes that starts with this prefix are used for authentication purposes.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Default redirect page after login.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/home";
