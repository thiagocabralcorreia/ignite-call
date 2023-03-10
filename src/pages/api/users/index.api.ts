import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "nookies";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    // only for user register
    return res.status(405).end();
  }

  const { name, username } = req.body;

  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (userExists) {
    return res.status(400).json({
      message: "Username already taken.",
    });
  }

  const user = await prisma.user.create({
    data: {
      // id
      // created_at
      name,
      username,
    },
  });

  // cookie in header
  // cookie name: @ignitecall:userId | cookie value: user.id
  setCookie({ res }, "@ignitecall:userId", user.id, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  return res.status(201).json(user);
}
