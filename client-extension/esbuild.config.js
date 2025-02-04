import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["src/content.ts", "popup.ts"],
    bundle: true,
    platform: "node",
    target: "node16",
    sourcemap: true,
    outdir: "dist/"
  })
  .then(() => {
    console.log("Build completed!");
  })
  .catch((error) => {
    console.error("Build failed:", error);
    process.exit(1);
  });
