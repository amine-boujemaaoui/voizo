import { clerkClient } from "@clerk/nextjs/server";
import { StreamChat } from "stream-chat";

export async function POST(req: Request) {
  console.log(`[/api/register] ...`);
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
  if (!apiKey) {
    console.error("Stream API key not found");
    return Response.error();
  }

  const serverClient = StreamChat.getInstance(
    apiKey,
    process.env.STREAM_SECRET_KEY
  );
  const body = await req.json();
  console.log(`[/api/register] body: ${JSON.stringify(body)}]`);

  const userId = body?.userId;
  const mail = body?.email;

  if (!userId || !mail) {
    return Response.error();
  }

  await serverClient.upsertUser({
    id: userId,
    role: "user",
    name: mail,
    image: `https://getstream.io/random_png/?id=${userId}&name=${mail}`,
  });

  const params = {
    publicMetadata: {
      streamRegistered: true,
    },
  };
  const updatedUser = await clerkClient.users.updateUser(userId, params);
  console.log(`[/api/register] updatedUser: ${JSON.stringify(updatedUser)}`);
  const response = {
    userId: userId,
    userName: mail,
  };

  return Response.json(response);
}
