import { envConfig } from "./utils/env";
import { SocketManager } from "./modules/socket";
envConfig("../.env");

function start() {
  const socketManager = new SocketManager();
}

start();
