import { Server } from "@/models/Server";
import { v4 as uuid } from "uuid";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";

export default function ServerList(): JSX.Element {
  const servers: Server[] = [
    {
      id: uuid(),
      name: "Bonobo",
      image:
        "https://images.unsplash.com/photo-1445583934509-4ad5ffe6ef08?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: uuid(),
      name: "Cp2i",
      image: undefined,
    },
    {
      id: uuid(),
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
          onClick={() => console.log(server.name)}
          className={cn("p-1", index === 0 && "pt-6")}>
          <Avatar className='h-[50px] w-[50px]'>
            {server.image && checkIfURL(server.image) ? (
              <AvatarImage
                src={server.image}
                alt={server.name}
                className='bg-gray-600 hover:rounded-2xl duration-200'
              />
            ) : (
              <AvatarFallback className='bg-gray-600 hover:rounded-2xl duration-200'>
                {server.name.charAt(0)}
              </AvatarFallback>
            )}
          </Avatar>
        </button>
      ))}
    </div>
  );
}
