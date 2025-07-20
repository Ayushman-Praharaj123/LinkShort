export const cookieOptions = {
    httpOnly: false, // Temporarily set to false for debugging
    secure: false, // Set to false for localhost
    sameSite: "lax",
    maxAge : 1000 * 60 * 60 * 24 * 7, // 1 week
    domain: "localhost", // Explicitly set domain
}