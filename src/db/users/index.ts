import { IUser } from "./interface";

export const usersDB = {
  users: [] as IUser[],
  getPlayerByName(name: string) {
    return this.users.find((user: IUser) => user.name === name) || false;
  },
  getPlayerById(id: number): IUser | false {
    return this.users.find((user: IUser) => user.currentId === id) || false;
  },
  addPlayer(name: string, id: number, password: string): void {
    const player = { name, currentId: id, password };
    this.users.push(player);
  },
  exitPlayer(id: number): void {
    const user = this.getPlayerById(id);
    if (!user) return;
    user.currentId = -1;
  },
  updateId(name: string, newId: number): void {
    const user = this.getPlayerByName(name);
    if (!user) return;
    user.currentId = newId;
  },
};
