require("dotenv").config();
import { Request, Response } from "express";
import config from "config";
import jwt, { JwtPayload } from "jsonwebtoken";

export const generateRandomNumber = async (req: Request, res: Response) => {
  let d = new Date().getTime(),
    d2 =
      (typeof performance !== "undefined" &&
        performance.now &&
        performance.now() * 1000) ||
      0;
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    let r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c == "x" ? r : (r & 0x7) | 0x8).toString(16);
  });

  return res.status(200).json({
    status: "success",
    data: {
      uuid,
    },
  });
};

export const generateToken = async (req: Request, res: Response) => {
  const { sign } = req.body;
  if (!sign)
    return res.status(401).json({
      status: "fail",
      message: "Sign is needed",
    });

  const token = jwt.sign({ sign }, config.get("jwtSecretKey"), {
    expiresIn: "8 hours",
  });

  return res.status(200).json({
    status: "success",
    data: {
      token,
    },
  });
};

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const verify = async (req: Request, res: Response) => {
  try {
    const token = req
      .header("Authorization")
      ?.replace('Bearer "', "")
      .replace('"', "");

    if (!token)
      return res.status(401).json({
        status: "fail",
        message: "Token not found",
      });

    const decoded = jwt.verify(token, config.get("jwtSecretKey"));

    if (decoded)
      return res.status(200).json({
        status: "success",
        data: {
          token,
        },
      });
  } catch (err) {
    return res.status(409).json({
      status: "fail",
      message: "Token no valid",
    });
  }
};
