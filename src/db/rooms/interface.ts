export interface IRoomPlayers {
  name: string;
  index: number;
}
export interface IRoom {
  roomId: number;
  roomUsers: IRoomPlayers[];
}
