#!/usr/bin/env node

require("esbuild")
  .build({
    logLevel: "info",
    entryPoints: ["src/content.js", "src/popup.js"],
    bundle: true,
    minify: true,
    outdir: "public/build",
  })
  .catch(() => process.exit(1));
