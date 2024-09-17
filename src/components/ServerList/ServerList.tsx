import { Server } from "@/models/Server";
import { v4 as uuid } from "uuid";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function ServerList(): JSX.Element {
  const [activeServer, setActiveServer] = useState<Server | undefined>(
    undefined
  );
  const servers: Server[] = [
    {
      id: "1",
      name: "Bonobo",
      image:
        "https://images.unsplash.com/photo-1445583934509-4ad5ffe6ef08?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "2",
      name: "Cp2i",
      image: undefined,
    },
    {
      id: "3",
      name: "Ff14",
      image:
        "https://images.unsplash.com/photo-1610812387871-806d3db9f5aa?q=80&w=1940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  function checkIfURL(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  return (
    <div className='bg-dark-gray h-full flex flex-col items-center'>
      {servers.map((server, index) => (
        <button
          key={server.id}
          onClick={() => setActiveServer(server)}
          className={cn(
            "p-1",
            index === 0 && "pt-6",
            "flex items-center justify-center w-full relative rounded-2xl",
            "transition-all ease-in-out duration-200",
            "before:transition-all before:ease-in-out before:duration-200",
            "before:absolute before:content-[''] before:block before:bg-primary before:rounded-2xl",
            "before:h-0 before:w-0 before:-left-2",
            "hover:before:h-6 hover:before:w-2 hover:before:-left-1",
            server.id === activeServer?.id &&
              "before:h-8 before:w-2 before:-left-1 hover:before:h-8"
          )}>
          <Avatar className='h-[50px] w-[50px]'>
            {server.image && checkIfURL(server.image) ? (
              <AvatarImage
                src={server.image}
                alt={server.name}
                className={cn(
                  "bg-gray-600 hover:rounded-2xl duration-200",
                  server.id === activeServer?.id && "rounded-2xl"
                )}
              />
            ) : (
              <AvatarFallback
                className={cn(
                  "bg-gray-600 hover:rounded-2xl duration-200",
                  server.id === activeServer?.id && "rounded-2xl"
                )}>
                {server.name.charAt(0)}
              </AvatarFallback>
            )}
          </Avatar>
        </button>
      ))}
    </div>
  );
}
