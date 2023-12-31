import { User, getUsersDB } from "@/utils";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { id, password }: User = await request.json();
  const parsedUserData = getUsersDB();

  const findUserData = parsedUserData.find((existUser) => {
    return existUser.id === id && existUser.password === password;
  });

  if (findUserData) {
    const token = jwt.sign({ email: findUserData.id }, "insert", {
      expiresIn: "1h",
    });

    return NextResponse.json({ token }, { status: 200 });
  }

  return NextResponse.json("유저를 찾을 수 없습니다.", { status: 404 });
}
