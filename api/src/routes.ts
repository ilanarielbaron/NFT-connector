import express from "express";
import {
  getUserByAddress,
  updateUser
} from "./controllers/userController";

const router = express.Router();

router.route("/:address").get(getUserByAddress).patch(updateUser);

export default router;
