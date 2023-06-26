import { User, getUsersDB } from "@/insertcourse/utils";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const loginHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { id, password }: User = req.body;
  const parseUsersJSON = getUsersDB();

  const findUserInfo = parseUsersJSON.find((user) => {
    return user.id === id && user.password === password;
  });

  if (findUserInfo) {
    const token = jwt.sign({ email: findUserInfo.id }, "blue_ant", {
      expiresIn: "1h",
    });

    return res.status(200).json({ token });
  }

  //유저가 없을 때
  return res.status(404).json("Can't Find Current User");
};

export default loginHandler;
