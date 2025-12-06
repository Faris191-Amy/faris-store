import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, readFile } from "fs/promises";
import path from "path";

// مكتبات لازم تتبندل مع السيرفر
const allowlist = [
  "@google/generative-ai",
  "axios",
  "connect-pg-simple",
  "cors",
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "express-session",
  "jsonwebtoken",
  "memorystore",
  "multer",
  "nanoid",
  "nodemailer",
  "openai",
  "passport",
  "passport-local",
  "pg",
  "stripe",
  "uuid",
  "ws",
  "xlsx",
  "zod",
  "zod-validation-error",
];

async function buildAll() {
  // حذف مجلد dist
  await rm("dist", { recursive: true, force: true });

  console.log("\n==============================");
  console.log("🚀 Building client (Vite)...");
  console.log("==============================\n");

  // تشغيل build للعميل مع تحديد root = client
  await viteBuild({
    configFile: path.resolve("vite.config.ts"),
  });

  console.log("\n==============================");
  console.log("🛠 Building server (esbuild)...");
  console.log("==============================\n");

  // قراءة dependencies
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];

  // external = كل المكتبات غير الموجودة في allowlist
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  await esbuild({
    entryPoints: ["server/index.ts"], // ← تأكد إن الملف موجود
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: externals,
    logLevel: "info",
  });

  console.log("\n==============================");
  console.log("✔ Build completed successfully!");
  console.log("==============================\n");
}

buildAll().catch((err) => {
  console.error("❌ Build failed:");
  console.error(err);
  process.exit(1);
});
