
import { cookieOptions } from "../config/config.js";
import { registerUser, loginUser } from "../services/auth.service.js";
import warpAsync from "../utils/tryCatchWrapper.js";
export const register_user = warpAsync(async (req, res) => {
    const { name, email, password } = req.body;
    const { token, user } = await registerUser(name, email, password);
    req.user = user;
    res.cookie("accessToken", token, cookieOptions);
    res.status(200).json({ message: "User registered successfully", token, user });
});
export const login_user = warpAsync(async (req, res) => {
    const { email, password } = req.body;
    const { token, user } = await loginUser(email, password);
    req.user = user;

    console.log("Setting cookie with token:", token);
    console.log("Cookie options:", cookieOptions);

    res.cookie("accessToken", token, cookieOptions);
    res.status(200).json({ message: "User logged in successfully", token, user });
});

export const logout_user = warpAsync(async (req, res) => {
    // Clear the access token cookie
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    });

    res.status(200).json({ message: "User logged out successfully" });
});