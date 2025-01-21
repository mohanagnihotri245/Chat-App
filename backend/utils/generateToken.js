import jwt from "jsonwebtoken";

const generateTokenAndSetCookies = (userID, res) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT secret is not defined in environment variables.");
    }

    const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    res.cookie("jwt", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "development", // Only set secure in production
    });
  } catch (error) {
    console.error("Error generating token or setting cookie:", error.message);
    throw error;
  }
};

export default generateTokenAndSetCookies;
