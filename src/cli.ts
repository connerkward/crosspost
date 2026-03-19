import { readFileSync } from "fs";
import { crosspost } from "./crosspost.js";
import { Post, PlatformId } from "./types/index.js";

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes("--help")) {
    console.log(`Usage: crosspost <post.json> [--platforms=hn,reddit,...] [--dry-run]`);
    console.log(`\nPost JSON format:`);
    console.log(`  { "title": "...", "url": "...", "body": "...", "tags": [...] }`);
    process.exit(0);
  }

  const file = args[0];
  const post: Post = JSON.parse(readFileSync(file, "utf-8"));

  const platformsArg = args.find((a) => a.startsWith("--platforms="));
  const platforms = platformsArg
    ? (platformsArg.split("=")[1].split(",") as PlatformId[])
    : undefined;

  const dryRun = args.includes("--dry-run");

  console.log(`Cross-posting: "${post.title}"`);
  if (dryRun) console.log("(dry run)\n");

  const results = await crosspost(post, { platforms, dryRun });

  for (const r of results) {
    const status = r.success ? "✓" : "✗";
    const detail = r.postUrl || r.error || "";
    console.log(`  ${status} ${r.platform}: ${detail}`);
  }

  const failed = results.filter((r) => !r.success);
  if (failed.length) {
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
