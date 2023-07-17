import { WebSocket, Server as WebSocketServer } from "ws";

import { logInUser } from "../commands/commands";
import { startHttpServer } from "./index";
import createRoom from "../commands/createRoom";
import updateRoom from "../commands/updateRoom";
import { roomsDB } from "../db/rooms";
import { usersDB } from "../db/users";
export interface WebSocketWithId extends WebSocket {
  id: number;
}
export const startWebSocket = (port: number) => {
  const wsServer: WebSocketServer = new WebSocket.Server({
    server: startHttpServer(port, () => {}),
  });

  console.log(`Started WebSocket server on the ${port} port.`);

  wsServer.on("error", console.error);
  wsServer.on("connection", function connection(ws: WebSocketWithId) {
    ws.on("message", function incoming(message: string) {
      try {
        const mes = JSON.parse(message);
        console.log(mes.type);
        switch (mes.type) {
          case "reg":
            logInUser(mes.data, ws, ws.id);
            break;
          case "create_room":
            createRoom(wsServer, ws.id);
            break;
          case "add_user_to_room":
            break;
          case "add_ships":
            break;
          case "attack":
            break;
          case "randomAttack":
            break;
          case "single_play":
            break;
          default:
            console.log("Unknown message:", mes.type);
            break;
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
    ws.on("close", function () {
      for (const [key, value] of roomsDB.rooms) {
        if (value.some((e) => e.index === ws.id)) {
          roomsDB.removeRoom(key);
          wsServer.clients.forEach((e: WebSocket) =>
            e.send(JSON.stringify(updateRoom()))
          );
          break;
        }
      }
      usersDB.exitPlayer(ws.id);
    });
  });
  return wsServer;
};
