import { Platform, Post, PostResult } from "../types/index.js";

/**
 * HN submission via the Firebase-based API.
 * Requires HN credentials (username/password) since there's no official API for posting.
 * Uses the form submission endpoint.
 */
export class HackerNewsPlatform implements Platform {
  id = "hackernews" as const;
  name = "Hacker News";

  async validate(): Promise<void> {
    if (!process.env.HN_USERNAME || !process.env.HN_PASSWORD) {
      throw new Error("HN_USERNAME and HN_PASSWORD required");
    }
  }

  async post(post: Post): Promise<PostResult> {
    const p = { ...post, ...post.overrides?.hackernews };

    // TODO: implement HN form submission
    // HN has no public POST API — requires cookie-based auth via /login then /submit
    return {
      platform: this.id,
      success: false,
      error: "Not yet implemented",
    };
  }
}
