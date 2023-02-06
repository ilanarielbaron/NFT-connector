import { Request, Response } from "express";

const TWITTER_URL = "https://api.twitter.com/2/";

export const getTwitterAuthToken = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;

    if (!code)
      return res.status(401).json({
        status: "fail",
        message: "Code is needed",
      });

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        cors: "no-cors",
      },
      body: new URLSearchParams({
        code,
        grant_type: "authorization_code",
        client_id: process.env.TWITTER_CLIENT_ID ?? "",
        redirect_uri: process.env.ORIGIN ?? "",
        code_verifier: "challenge",
      }),
    };

    const url = `${TWITTER_URL}oauth2/token`;
    const response = await fetch(url, requestOptions).then((data) =>
      data.json()
    );
    console.log(response);
    if (!response["access_token"])
      return res.status(401).json({
        status: "fail",
        message: "Access token failed",
      });

    return res.status(200).json({
      status: "success",
      data: {
        token: response["access_token"],
      },
    });
  } catch (err) {
    return res.status(409).json({
      status: "fail",
      message: "Error generating the auth token",
    });
  }
};

export const fetchFollowed = async (req: Request, res: Response) => {
  const { token } = req.body;

  if (!token)
    return res.status(401).json({
      status: "fail",
      message: "Token is needed",
    });

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let url = `${TWITTER_URL}users/me`;

  try {
    const response = await fetch(url, requestOptions).then((data) =>
      data.json()
    );
    if (!response?.data?.id)
      return res.status(401).json({
        status: "fail",
        message: "Error fetching from Twitter",
      });

    url = `${TWITTER_URL}users/${response.data.id}/following`;

    const followingResponse = await fetch(url, requestOptions).then((data) =>
      data.json()
    );

    const following =
      followingResponse?.data.map((follow: { id: string }) => follow.id) ?? [];

    return res.status(200).json({
      status: "success",
      data: {
        following,
        userId: response.data.id,
      },
    });
  } catch (err) {
    return res.status(409).json({
      status: "fail",
      message: "Error fetching from Twitter",
    });
  }
};
