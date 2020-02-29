import { Request } from "express";
import { message, notification } from "antd";
import { Database, User } from "../types";

export const displaySuccessNotification = (
  message: string,
  description?: string
) => {
  return notification["success"]({
    message,
    description,
    placement: "topLeft",
    style: {
      marginTop: 50
    }
  });
};

export const displayErrorMessage = (error: string) => {
  return message.error(error);
};

export const authorize = async (
  db: Database,
  req: Request
): Promise<User | null> => {
  const token = req.get("X-CSRF-TOKEN");
  const viewer = await db.users.findOne({
    _id: req.signedCookies.viewer,
    token
  });

  return viewer;
};
