import { useEffect, useState } from "react";
import { StreamChat, TokenOrProvider, User } from "stream-chat";

export type UseClientOptions = {
  apiKey: string;
  user: User;
  TokenOrProvider: TokenOrProvider;
};

export const useClient = ({
  apiKey,
  user,
  TokenOrProvider,
}: UseClientOptions): StreamChat | undefined => {
  const [chatClient, setChatClient] = useState<StreamChat>();

  useEffect(() => {
    const client = new StreamChat(apiKey);
    let didUserConnectInterrupt = false;

    const connectionPromise = client
      .connectUser(user, TokenOrProvider)
      .then(() => {
        if (!didUserConnectInterrupt) setChatClient(client);
      });

    return () => {
      didUserConnectInterrupt = true;
      setChatClient(undefined);
      connectionPromise
        .then(() => {
          client.disconnectUser();
        })
        .then(() => {
          console.log("User disconnected");
        });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey, user.id, TokenOrProvider]);

  return chatClient;
};
