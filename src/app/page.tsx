"use client";

import { useClerk } from "@clerk/nextjs";
import { useCallback, useEffect, useState } from "react";
import { User } from "stream-chat";
import { LoadingIndicator } from "stream-chat-react";

type HomeState = {
  apiKey: string;
  user: User;
  token: string;
};

export default function Home() {
  const [homeState, setHomeState] = useState<HomeState | undefined>();
  const { user: clerkUser } = useClerk();
  const registerUser = useCallback(async () => {
    const userId = clerkUser?.id;
    const userMail = clerkUser?.primaryEmailAddress?.emailAddress;
    if (userId && userMail) {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId, email: userMail }),
      });
      if (response.ok) {
        const responseBody = await response.json();
        return responseBody;
      }
    }
  }, [clerkUser]);

  async function getUserToken(userId: string, userName: string) {
    const response = await fetch("/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userId }),
    });
    if (response.ok) {
      const responseBody = await response.json();
      const token = responseBody.token;
      if (!token) {
        console.error("Token not found");
      }
      const user: User = {
        id: userId,
        name: userName,
        iamge: `https://getstream.io/random_png/?id=${userId}&name=${userName}`,
      };
      const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
      if (apiKey)
        setHomeState({
          apiKey: apiKey,
          user: user,
          token: token,
        });
      return { user, token };
    }
  }

  useEffect(() => {
    if (
      clerkUser?.id &&
      clerkUser?.primaryEmailAddress?.emailAddress &&
      !clerkUser.publicMetadata?.streamRegistered
    ) {
      registerUser().then(() => {
        getUserToken(
          clerkUser?.id,
          clerkUser?.primaryEmailAddress?.emailAddress || "Unknown"
        );
      });
    } else {
      if (clerkUser?.id) {
        getUserToken(
          clerkUser?.id,
          clerkUser?.primaryEmailAddress?.emailAddress || "Unknown"
        );
      }
    }
  }, [registerUser, clerkUser]);

  if (!homeState) {
    return <LoadingIndicator />;
  }
  return (
    <div>
      <h1>Hello, world!</h1>
    </div>
  );
}
