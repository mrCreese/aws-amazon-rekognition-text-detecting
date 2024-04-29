import { protocol, server } from "./express/app.js";

const APP_LISTEN_PORT = process.env.NODE_PORT || 8010;

//? http o https in app.js
server.listen(APP_LISTEN_PORT, () => {
  console.log(
    `Connesione http${
      protocol.includes("https") ? "s" : ""
    } sulla porta: ${APP_LISTEN_PORT}`
  );
});
