const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const userAuthVerification = async (req, res) => {
  const token = req.cookies.token;
 console.log("Token",token);
  if (!token) {
    return res.json({
      success: false,
      message: "Token is not available or Invalid token",
    });
  }

  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KET);
      const userInfo = await User.findById(decodedToken.getId);

      if (userInfo) {
        return res.status(200).json({
          success: true,
          userInfo:userr,
        });
      }
    } catch (error) {
      console.error("Auth error",error);
      return res.status(401).json({
        success: false,
        message: "Token is not available or Invalid token",
      });
    }
  }
};

module.exports = { userAuthVerification };
