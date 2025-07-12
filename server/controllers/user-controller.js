const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user-model");

const registerUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required().min(6),
});

const loginUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required().min(6),
});

const generateJwtToken = (getId) => {
  return jwt.sign({ getId }, process.env.JWT_SECRET_KET, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

const handleRegister = async (req, res) => {
  const { name, email, password } = req.body;
  const { error } = registerUserSchema.validate({ name, email, password });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    const isExsitingUser = await User.findOne({ email });

    if (isExsitingUser) {
      return res.status(400).json({
        success: false,
        message: "User email already exists ! try with diffrent email.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newlyCreatedUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (newlyCreatedUser) {
      const token = generateJwtToken(newlyCreatedUser._id);

      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });
    }

    res.status(201).json({
      success: true,
      message: "User register successfully",
      userData: {
        name: newlyCreatedUser.name,
        email: newlyCreatedUser.email,
        _id: newlyCreatedUser._id,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went worng! please try again.",
    });
  }
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  const { error } = loginUserSchema.validate({ email, password });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    const getUser = await User.findOne({ email });

    if (!getUser) {
      return res.status(400).json({
        success: false,
        message: "User email doesn't exists ! try with diffrent email.",
      });
    }

    const checkAuth = await bcrypt.compare(password, getUser.password);

    if (!checkAuth) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password.",
      });
    }

    const token = generateJwtToken(getUser._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res.status(200).json({
      success: true,
      message: "User Logged in successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went worng! please try again.",
    });
  }
};

const handleLogOut = (req, res) => {
  res.cookie("token", "", {
    withCredentials: true,
    httpOnly: false,
  });

  res.status(200).json({
    success: true,
    message: "Loggged out successfully.",
  });
};

module.exports = { handleRegister, handleLogin, handleLogOut };
