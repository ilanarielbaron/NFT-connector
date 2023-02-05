import express from "express";
import {
  generateRandomNumber,
  generateToken,
  verify,
} from "./controllers/authenticationController";

const router = express.Router();

router.route("/").post(generateToken).get(generateRandomNumber);
router.route("/verify").get(verify);

export default router;
