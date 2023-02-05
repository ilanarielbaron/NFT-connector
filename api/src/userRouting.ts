import express from "express";
import {
  createUser,
  getUserByAddress,
  updateUser
} from "./controllers/userController";

const router = express.Router();

router.route("/:address").get(getUserByAddress).patch(updateUser);
router.route("/").post(createUser).patch(updateUser);

export default router;
