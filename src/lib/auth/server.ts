import { createNeonAuth } from "@neon/auth/next/server";

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required for Managed Neon Auth.`);
  }
  return value;
}

export const auth = createNeonAuth({
  baseUrl: requiredEnv("NEON_AUTH_BASE_URL"),
  cookies: {
    secret: requiredEnv("NEON_AUTH_COOKIE_SECRET"),
  },
});
