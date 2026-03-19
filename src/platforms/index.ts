import { Platform } from "../types/index.js";
import { HackerNewsPlatform } from "./hackernews.js";
import { RedditPlatform } from "./reddit.js";
import { TwitterPlatform } from "./twitter.js";
import { DiscordPlatform } from "./discord.js";
import { McpGlamaPlatform } from "./mcp-glama.js";
import { McpSoPlatform } from "./mcp-so.js";
import { ComfyUIRegistryPlatform } from "./comfyui-registry.js";

export const ALL_PLATFORMS: Platform[] = [
  new HackerNewsPlatform(),
  new RedditPlatform(),
  new TwitterPlatform(),
  new DiscordPlatform(),
  new McpGlamaPlatform(),
  new McpSoPlatform(),
  new ComfyUIRegistryPlatform(),
];

export function getPlatform(id: string): Platform | undefined {
  return ALL_PLATFORMS.find((p) => p.id === id);
}
