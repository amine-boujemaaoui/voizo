import { StreamChat } from "stream-chat";

export async function POST(req: Request) {
  console.log(`[/api/token] ...`);
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
  if (!apiKey) {
    return Response.error();
  }

  const serverClient = StreamChat.getInstance(
    apiKey,
    process.env.STREAM_SECRET_KEY
  );

  const body = await req.json();
  console.log(`[/api/token] body: ${JSON.stringify(body)}`);

  const userId = body?.userId;
  if (!userId) {
    return Response.error();
  }

  const token = serverClient.createToken(userId);

  const response = {
    userId: userId,
    token: token,
  };
  console.log(`[/api/token] token: ${response.token}`);
  return Response.json(response);
}
