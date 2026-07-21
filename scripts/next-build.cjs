const { spawnSync } = require("child_process");

process.env.NEXT_PRIVATE_BUILD_WORKER_COUNT ||= "1";

const result = spawnSync("next", ["build", "--webpack"], {
  env: process.env,
  shell: true,
  stdio: "inherit",
});

process.exit(result.status ?? 1);
