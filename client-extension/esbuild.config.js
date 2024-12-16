import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["src/content.ts"], // Entry point of your project
    bundle: true,                  // Bundles all dependencies
    platform: "node",              // Target Node.js environment
    target: "node16",              // Specify Node.js version
    outfile: "dist/content.js",      // Output file
    sourcemap: true,               // Generate sourcemaps
  })
  .then(() => {
    console.log("Build completed!");
  })
  .catch((error) => {
    console.error("Build failed:", error);
    process.exit(1);
  });
