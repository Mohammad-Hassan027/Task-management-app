const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const userAuthVerification = async (req, res) => {
  const token =
    req.cookies.token ||
    (req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : null);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token is not available or invalid.",
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userInfo = await User.findById(decodedToken.id); // Adjust 'id' as per your payload

    if (!userInfo) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      userInfo: userInfo,
      message: "User authenticated successfully.",
    });
  } catch (error) {
    console.error("Auth error", error);
    return res.status(401).json({
      success: false,
      message: "Invalid token.",
    });
  }
};

module.exports = { userAuthVerification };
