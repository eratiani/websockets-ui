import { usersDB } from "../db/users";
import { roomsDB } from "../db/rooms";
import { WebSocket, Server as WebSocketServer } from "ws";
import { IUser } from "../db/users/interface";
import updateRoom from "./updateRoom";

export default function createRoom(wss: WebSocketServer, userID: number) {
  for (const room of roomsDB.rooms.values()) {
    if (room.some((i) => i.index === userID)) return;
  }
  const thisUser = usersDB.getPlayerById(userID) as IUser;
  roomsDB.createRoom({
    name: thisUser.name,
    index: thisUser.currentId,
  });
  wss.clients.forEach((e: WebSocket) => e.send(JSON.stringify(updateRoom())));
}
