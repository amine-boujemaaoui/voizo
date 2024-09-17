import { useClient } from "@/hooks/useClient";
import { HomeState } from "@/types/HomeState";
import {
  Channel,
  ChannelList,
  Chat,
  MessageInput,
  MessageList,
  Window,
} from "stream-chat-react";
import "stream-chat-react/dist/css/index.css";

export default function MyChat({ apiKey, user, token }: HomeState) {
  const chatClient = useClient({ apiKey, user, TokenOrProvider: token });

  if (!chatClient) {
    return <div>Error, please try again.</div>;
  }

  return (
    <Chat client={chatClient}>
      <section className='flex h-screen w-screen layout'>
        <ChannelList />
        <Channel>
          <Window>
            <MessageList />
            <MessageInput />
          </Window>
        </Channel>
      </section>
    </Chat>
  );
}
