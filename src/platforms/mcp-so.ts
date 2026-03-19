import { Platform, Post, PostResult } from "../types/index.js";

/**
 * Submit MCP server to mcp.so registry.
 */
export class McpSoPlatform implements Platform {
  id = "mcp-so" as const;
  name = "mcp.so (MCP Registry)";

  async validate(): Promise<void> {
    // TODO: determine auth requirements for mcp.so submissions
  }

  async post(post: Post): Promise<PostResult> {
    const p = { ...post, ...post.overrides?.["mcp-so"] };

    // TODO: implement mcp.so submission
    return {
      platform: this.id,
      success: false,
      error: "Not yet implemented",
    };
  }
}
