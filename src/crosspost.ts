import { Post, PostResult, PlatformId } from "./types/index.js";
import { ALL_PLATFORMS, getPlatform } from "./platforms/index.js";

export interface CrosspostOptions {
  /** Which platforms to post to. If omitted, posts to all enabled platforms. */
  platforms?: PlatformId[];
  /** Dry run — validate only, don't actually post */
  dryRun?: boolean;
}

export async function crosspost(
  post: Post,
  options: CrosspostOptions = {}
): Promise<PostResult[]> {
  const targets = options.platforms
    ? options.platforms.map((id) => {
        const p = getPlatform(id);
        if (!p) throw new Error(`Unknown platform: ${id}`);
        return p;
      })
    : ALL_PLATFORMS;

  const results: PostResult[] = [];

  for (const platform of targets) {
    try {
      await platform.validate();

      if (options.dryRun) {
        results.push({
          platform: platform.id,
          success: true,
          postUrl: "(dry run)",
        });
        continue;
      }

      const result = await platform.post(post);
      results.push(result);
    } catch (e: any) {
      results.push({
        platform: platform.id,
        success: false,
        error: e.message,
      });
    }
  }

  return results;
}
