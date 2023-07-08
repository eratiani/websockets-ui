import { startWebSocket } from "./servers/index";

export const WS_PORT = 3000;

const processExitEvents = ["SIGINT", "SIGTERM", "SIGQUIT", "uncaughtException"];

const wsServer = startWebSocket(WS_PORT);

const handleSignal = (signal: string, code: number) => {
  console.log("Closing HTTP and WebSocket servers...");
  console.log(`Got ${signal} signal with code ${code}.`);

  wsServer.clients.forEach((client) => {
    client.close();
  });

  wsServer.close();
  process.exit(code);
};
processExitEvents.forEach((event) => {
  process.on(event, handleSignal);
});
