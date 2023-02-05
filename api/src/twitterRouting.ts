import express from "express";
import {
  getTwitterAuthToken,
  fetchFollowed,
} from "./controllers/twitterController";

const router = express.Router();

router.route("/authToken").post(getTwitterAuthToken);
router.route("/fetchFollowed").post(fetchFollowed);

export default router;
