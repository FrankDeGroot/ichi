import { serveDir } from "@std/http/file-server";
import Clients from "./clients.ts";

const clients = new Clients();

Deno.serve(async (request) => {
  try {
    console.debug(request.url);
    if (request.headers.get("upgrade")?.toLowerCase() === "websocket") {
      const { socket, response } = Deno.upgradeWebSocket(request);
      clients.connect(socket);
      return response;
    }
    return await serveDir(request, {
      fsRoot: "web",
    });
  } catch (e: unknown) {
    if (e instanceof Error) console.error(e.message);
    return new Response(undefined, {
      status: 500,
    });
  }
});
