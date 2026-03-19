export type PlatformId =
  | "hackernews"
  | "reddit"
  | "twitter"
  | "discord"
  | "mcp-glama"
  | "mcp-so"
  | "comfyui-registry";

export interface Post {
  /** Short title (used by HN, Reddit, registries) */
  title: string;
  /** URL to the project/content being shared */
  url: string;
  /** Body text / description */
  body: string;
  /** Tags/keywords for platforms that support them */
  tags?: string[];
  /** Platform-specific overrides */
  overrides?: Partial<Record<PlatformId, Partial<Post>>>;
}

export interface PostResult {
  platform: PlatformId;
  success: boolean;
  /** URL of the created post, if available */
  postUrl?: string;
  error?: string;
}

export interface PlatformConfig {
  enabled: boolean;
  [key: string]: unknown;
}

export interface Platform {
  id: PlatformId;
  name: string;
  /** Validate that required config/credentials are present */
  validate(): Promise<void>;
  /** Submit a post to this platform */
  post(post: Post): Promise<PostResult>;
}
