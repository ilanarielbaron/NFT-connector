import { Request, Response } from "express";
import { User } from "../models/users";

/** Get user by public address */
export async function getUserByAddress(req: Request, res: Response) {
  try {
    const { address } = req.params;
    if (!address)
      return res.status(401).json({
        status: "fail",
        message: "Error getting the user",
      });

    const user = await User.findOne({ publicAddress: address });

    return res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error: unknown) {
    return res.status(409).json({
      status: "fail",
      message: "Error getting the user",
    });
  }
}

/** Create a new user */
export async function createUser(req: Request, res: Response) {
  try {
    const { publicAddress } = req.body;
    if (!publicAddress)
      return res.status(401).json({
        status: "fail",
        message: "Public address is needed",
      });

    const user = new User({
      publicAddress,
      isRegistered: false,
    });

    await user.save();

    return res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error: unknown) {
    return res.status(409).json({
      status: "fail",
      message: "Error getting the user",
    });
  }
}

/** Update user */
export async function updateUser(req: Request, res: Response) {
  try {
    const params: Partial<IUser> = req.body.user;

    if (!params.publicAddress)
      return res.status(401).json({
        status: "fail",
        message: "Public address is needed",
      });

    const userRecord = await User.findOne({
      publicAddress: params.publicAddress,
    });

    if (!userRecord)
      return res.status(401).json({
        status: "fail",
        message: "Error finding the user",
      });

    //TODO: improve this
    userRecord.twitterFollowed =
      params.twitterFollowed ?? userRecord.twitterFollowed;
    userRecord.twitterUser = params.twitterUser ?? userRecord.twitterUser;
    userRecord.twitterVerified =
    params.twitterVerified !== undefined ? params.twitterVerified : userRecord.twitterVerified;
    userRecord.publicAddress = params.publicAddress ?? userRecord.publicAddress;
    userRecord.isRegistered = params.isRegistered ?? userRecord.isRegistered;
    userRecord.answers = params.answers || userRecord.answers;

    await userRecord.save();

    return res.status(200).json({
      status: "success",
      data: {
        user: userRecord,
      },
    });
  } catch (error: unknown) {
    return res.status(409).json({
      status: "fail",
      message: "Error getting the user",
    });
  }
}

/** register user */
export async function finishRegistration(req: Request, res: Response) {
  try {
    const {answers, publicAddress} = req.body.user;

    if (!publicAddress)
      return res.status(401).json({
        status: "fail",
        message: "Public address is needed",
      });

    const userRecord = await User.findOne({
      publicAddress: publicAddress,
    });

    if (!userRecord)
      return res.status(401).json({
        status: "fail",
        message: "Error finding the user",
      });

    //TODO: improve this
    userRecord.isRegistered = true;
    userRecord.answers = answers ?? [];

    await userRecord.save();

    return res.status(200).json({
      status: "success",
      data: {
        user: userRecord,
      },
    });
  } catch (error: unknown) {
    return res.status(409).json({
      status: "fail",
      message: "Error getting the user",
    });
  }
}
