import express from "express";
import {
  createUser,
  finishRegistration,
  getUserByAddress,
  updateUser
} from "./controllers/userController";

const router = express.Router();

router.route("/:address").get(getUserByAddress).patch(updateUser);
router.route("/").post(createUser).patch(updateUser);
router.route("/finishRegistration").post(finishRegistration);

export default router;
