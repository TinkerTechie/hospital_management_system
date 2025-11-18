import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const auth = req.headers.get("authorization");

    if (!auth) {
      return new Response(JSON.stringify({ error: "No token provided" }), {
        status: 401,
      });
    }

    const token = auth.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return new Response(JSON.stringify({ message: "Token OK", decoded }), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Invalid token" }), {
      status: 400,
    });
  }
}
