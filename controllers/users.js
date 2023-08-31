import { User } from "../models/users.js";
import bcrypt from "bcrypt";
import { sendCookies } from "../utils/features.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).catch((e) => {
      console.log("erere", e);
    });
    res.json({
      success: true,
      users: users,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("Invalid Email or Password", 401));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or Password", 401));
    sendCookies(user, res, `Welcome Back ${user.name}`, 201);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User already exists", 401));

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      user = await User.create({ name, email, password: hashedPassword });

      sendCookies(user, res, "Registerred Successfullly", 201);
    } catch (error) {
      console.error("Error during registration:", error);
      next(new ErrorHandler("Registration failed", 500));
    }
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.gourav,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV == "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV == "Development" ? false : true,
      })
      .json({
        success: true,
        user: req.gourav,
      });
  } catch (error) {
    next(error);
  }
};
