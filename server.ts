import { serveDir } from "@std/http/file-server";
import Clients from "./clients.ts";

const clients = new Clients();

Deno.serve(async (request) => {
    try {
        console.log(request);
        return request.headers.get("upgrade")?.toLowerCase() === "websocket"
            ? clients.upgrade(request)
            : await serveDir(request, {
                fsRoot: "web",
            });
    } catch (e) {
        console.error(e);
        return new Response(undefined, {
            status: 500,
        });
    }
});
