import  prisma  from "../../../lib/prisma";

import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return new Response(JSON.stringify({ error: "Invalid password" }), { status: 401 });
    }

    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Login failed" }), { status: 500 });
  }
}
