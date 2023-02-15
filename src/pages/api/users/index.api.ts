import type { NextApiRequest, NextApiResponse } from "next";
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

  const user = await prisma.user.create({
    data: {
      // id
      // created_at
      name,
      username,
    },
  });

  return res.status(201).json(user);
}
