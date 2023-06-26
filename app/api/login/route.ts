import { User, getUsersDB } from "@/utils";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { id, password }: User = await request.json();
  const parseUsersJSON = getUsersDB();

  const findUserInfo = parseUsersJSON.find((user) => {
    return user.id === id && user.password === password;
  });

  if (findUserInfo) {
    const token = jwt.sign({ email: findUserInfo.id }, "blue_ant", {
      expiresIn: "1h",
    });

    return NextResponse.json({ token }, { status: 200 });
  }

  return NextResponse.json("유저를 찾을 수 없습니다.", { status: 404 });
}
