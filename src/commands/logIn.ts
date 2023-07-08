import { WebSocket } from "ws";
import { usersDB } from "../db/users/index";

function reg(
  ws: WebSocket,
  name: string,
  index: number,
  error = false,
  errorText = ""
) {
  const response = {
    type: "reg",
    data: JSON.stringify({ name, index, error, errorText }),
    id: 0,
  };
  ws.send(JSON.stringify(response));
}

export default function logInUser(data: string, ws: WebSocket, userId: number) {
  const { name, password } = JSON.parse(data);
  const isSign = usersDB.getPlayerByName(name);
  if (isSign) {
    if (password === isSign.password) {
      if (isSign.currentId > 0) {
        reg(ws, name, -1, true, "Player with this name already exists");
      } else {
        usersDB.updateId(name, userId);
        reg(ws, name, userId);
      }
    } else {
      reg(ws, name, -1, true, "Incorrect password");
    }
  } else {
    usersDB.addPlayer(name, userId, password);
    reg(ws, name, userId);
  }
}
