import express from "express";
import {
  getAllUsers,
  getMyProfile,
  login,
  logout,
  register,
} from "../controllers/users.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new", register);

router.post("/login", login);

router.get("/logout", logout);

// router.route("/userId/:id").get(getUserDetails).put(updateUser).delete(deleetUser).post(deleetUser)
//? dynamic getting id using url and findurl input id in database
router.get("/me",isAuthenticated, getMyProfile);

export default router;