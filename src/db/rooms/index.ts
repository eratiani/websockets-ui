import { IRoomPlayers } from "./interface";
export const roomsDB = {
  rooms: new Map() as Map<number, IRoomPlayers[]>,
  createRoom(user: IRoomPlayers): number {
    const roomId = Date.now();
    const roomUsers = [user] as IRoomPlayers[];
    this.rooms.set(roomId, roomUsers);
    return roomId;
  },

  removeRoom(roomId: number) {
    if (this.rooms.get(roomId)) this.rooms.delete(roomId);
  },
};
