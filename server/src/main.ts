import { envConfig } from "./utils/env";
import { SocketManager } from "./modules/socket";
envConfig("../.env");

process.on("uncaughtException", function(err) {
  console.log("Caught exception: " + err);
});

function start() {
  const socketManager = new SocketManager();
}

start();
