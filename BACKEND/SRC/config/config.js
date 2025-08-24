export const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use HTTPS in production
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Allow cross-site in production
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    // Remove domain restriction for production
}