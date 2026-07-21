const { createServer } = require("http");
const { appendFileSync } = require("fs");
const { join } = require("path");
const next = require("next");

const port = parseInt(process.env.PORT || "3000", 10);
const hostname = "0.0.0.0";
const dev = process.env.NODE_ENV !== "production";
const startupLog = join(__dirname, "startup-error.log");

function logStartupError(error) {
  const message = [
    `[${new Date().toISOString()}] Startup failed`,
    error?.stack || error?.message || String(error),
    "",
  ].join("\n");

  console.error(message);
  appendFileSync(startupLog, message);
}

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      handle(req, res);
    }).listen(port, hostname, () => {
      console.log(`Ready on http://${hostname}:${port}`);
    });
  })
  .catch((error) => {
    logStartupError(error);
    process.exit(1);
  });
