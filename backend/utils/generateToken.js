import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = async(userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });
    await res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
        httpOnly: true, // Helps prevent XSS attacks
        sameSite: 'none', // Required for cross-origin cookies
        secure: true, // Cookies are only sent over HTTPS in production
    });
};

export default generateTokenAndSetCookie;
