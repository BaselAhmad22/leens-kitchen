import http from "node:http";
import { request as httpRequest } from "node:http";

const port = Number(process.env.PORT || 8080);

function pickTarget(req) {
  const url = String(req.url || "");
  // Admin is mounted at /studio (Next.js basePath)
  if (url === "/studio" || url.startsWith("/studio/") || url.startsWith("/studio?")) {
    return { host: "127.0.0.1", port: 3001 };
  }
  return { host: "127.0.0.1", port: 3000 };
}

function proxy(req, res) {
  const target = pickTarget(req);
  const headers = { ...req.headers, host: `${target.host}:${target.port}` };

  const upstream = httpRequest(
    {
      hostname: target.host,
      port: target.port,
      path: req.url,
      method: req.method,
      headers,
    },
    (upRes) => {
      res.writeHead(upRes.statusCode || 502, upRes.headers);
      upRes.pipe(res);
    },
  );

  upstream.on("error", (err) => {
    console.error("upstream error", err.message);
    if (!res.headersSent) {
      res.writeHead(502, { "Content-Type": "text/plain" });
      res.end("Bad gateway");
    } else {
      res.end();
    }
  });

  req.pipe(upstream);
}

const server = http.createServer(proxy);
server.listen(port, "0.0.0.0", () => {
  console.log(`Leens edge proxy on :${port}`);
});
