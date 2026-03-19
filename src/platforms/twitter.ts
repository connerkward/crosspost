import { Platform, Post, PostResult } from "../types/index.js";

/**
 * Twitter/X posting via API v2.
 * Requires Twitter API credentials (OAuth 1.0a user context).
 */
export class TwitterPlatform implements Platform {
  id = "twitter" as const;
  name = "Twitter";

  async validate(): Promise<void> {
    const required = [
      "TWITTER_API_KEY",
      "TWITTER_API_SECRET",
      "TWITTER_ACCESS_TOKEN",
      "TWITTER_ACCESS_SECRET",
    ];
    const missing = required.filter((k) => !process.env[k]);
    if (missing.length) throw new Error(`Missing: ${missing.join(", ")}`);
  }

  async post(post: Post): Promise<PostResult> {
    const p = { ...post, ...post.overrides?.twitter };

    // Twitter is text-based, compose a tweet from title + url + body
    const tweet = `${p.title}\n\n${p.url}`;

    // TODO: implement Twitter API v2 POST /2/tweets
    return {
      platform: this.id,
      success: false,
      error: "Not yet implemented",
    };
  }
}
