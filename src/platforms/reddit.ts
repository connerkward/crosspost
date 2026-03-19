import { Platform, Post, PostResult } from "../types/index.js";

/**
 * Reddit submission via OAuth API.
 * Requires a Reddit app (script type) for OAuth credentials.
 */
export class RedditPlatform implements Platform {
  id = "reddit" as const;
  name = "Reddit";

  async validate(): Promise<void> {
    const required = [
      "REDDIT_CLIENT_ID",
      "REDDIT_CLIENT_SECRET",
      "REDDIT_USERNAME",
      "REDDIT_PASSWORD",
    ];
    const missing = required.filter((k) => !process.env[k]);
    if (missing.length) throw new Error(`Missing: ${missing.join(", ")}`);
  }

  async post(post: Post): Promise<PostResult> {
    const p = { ...post, ...post.overrides?.reddit };
    const subreddit = (p as any).subreddit;
    if (!subreddit) {
      return {
        platform: this.id,
        success: false,
        error: "subreddit required in overrides",
      };
    }

    // TODO: implement Reddit OAuth + /api/submit
    return {
      platform: this.id,
      success: false,
      error: "Not yet implemented",
    };
  }
}
