import WebSocket, { WebSocketServer } from "ws";
export const startWebSocket = (port: number): WebSocket.Server => {
  const wsServer = new WebSocketServer({ port });

  console.log(`Started WebSocket server on the ${port} port.`);

  wsServer.on("error", console.error);

  return wsServer;
};
