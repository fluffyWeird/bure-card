// utils/cookieOptions.ts

type CookieOptions = {
  httpOnly: boolean;
  secure: boolean; // true in production
    sameSite: "lax" | "strict" | "none";
    maxAge: number; // in milliseconds
};
export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // true in production
  sameSite: "lax", // or "strict" or "none" if cross-site
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};
