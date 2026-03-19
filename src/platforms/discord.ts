import { Platform, Post, PostResult } from "../types/index.js";

/**
 * Discord posting via webhook.
 * Each target channel needs a webhook URL configured.
 */
export class DiscordPlatform implements Platform {
  id = "discord" as const;
  name = "Discord";

  async validate(): Promise<void> {
    if (!process.env.DISCORD_WEBHOOK_URL) {
      throw new Error("DISCORD_WEBHOOK_URL required");
    }
  }

  async post(post: Post): Promise<PostResult> {
    const p = { ...post, ...post.overrides?.discord };
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL!;

    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [
            {
              title: p.title,
              url: p.url,
              description: p.body,
            },
          ],
        }),
      });

      if (!res.ok) {
        return {
          platform: this.id,
          success: false,
          error: `Discord webhook returned ${res.status}`,
        };
      }

      return { platform: this.id, success: true };
    } catch (e: any) {
      return { platform: this.id, success: false, error: e.message };
    }
  }
}
