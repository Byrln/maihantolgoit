const { spawnSync } = require("child_process");
const { rmSync } = require("fs");
const { resolve } = require("path");

process.env.NEXT_PRIVATE_BUILD_WORKER_COUNT ||= "1";

const projectRoot = process.cwd();
const staleDevTypes = resolve(projectRoot, ".next", "dev");

if (staleDevTypes.startsWith(projectRoot)) {
  rmSync(staleDevTypes, { force: true, recursive: true });
}

const result = spawnSync("next", ["build", "--webpack"], {
  env: process.env,
  shell: true,
  stdio: "inherit",
});

process.exit(result.status ?? 1);
