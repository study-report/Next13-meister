import { User, getUsersDB } from "@/utils";
import fs from "fs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { id, password }: User = await request.json();

  if (!id || !password) {
    return NextResponse.json("데이터가 부족합니다.", { status: 500 });
  }

  const parsedUserData = getUsersDB();

  const isAlreadyExists = parsedUserData.find((existUser) => {
    return existUser.id === id;
  });

  if (isAlreadyExists) {
    return NextResponse.json("이미 존재하는 유저입니다.", { status: 400 });
  }

  fs.writeFileSync(
    "public/no-edit/users.json",
    JSON.stringify([...parsedUserData, { id, password }], null, 4)
  );

  return NextResponse.json("회원가입에 성공했습니다.", { status: 200 });
}
