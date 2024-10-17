"use client";

import { Channel, Socket } from "phoenix";
import { createContext, useContext, useEffect, useState } from "react";

const WebSocketContext = createContext<Socket | null>(null);

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
export default function WebSocketContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = new Socket("http://localhost:4000/socket", {});
    socket.connect();

    setSocket(socket);
  }, []);
  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
}

export const useAppChannel = (id: string) => {
  const [appChannel, setAppChannel] = useState<Channel | null>(null);
  const socket = useWebSocket();
  useEffect(() => {
    const channel = socket?.channel(`app_id:${id}`);
    if (channel != null) {
      setAppChannel(channel);
    }
  }, [socket, id]);

  return appChannel;
};

export const useDeploymentChannel = (id: string) => {
  const [deploymentChannel, setDeploymentChannel] = useState<Channel | null>(
    null
  );

  const socket = useWebSocket();
  useEffect(() => {
    const channel = socket?.channel(`deployment:${id}`);

    channel
      ?.join(10_000)
      .receive("ok", () => {
        console.log("joined successfully");
      })
      .receive("error", () => {
        console.log("error when joining");
      })
      .receive("timeout", (response) => {
        console.log("timeout", response);
      });
    if (channel != null) {
      setDeploymentChannel(channel);
    }
  }, [socket, id]);

  return [deploymentChannel];
};
