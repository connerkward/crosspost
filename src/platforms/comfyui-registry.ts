import { Platform, Post, PostResult } from "../types/index.js";

/**
 * Submit custom node to ComfyUI Registry.
 * https://registry.comfy.org
 */
export class ComfyUIRegistryPlatform implements Platform {
  id = "comfyui-registry" as const;
  name = "ComfyUI Registry";

  async validate(): Promise<void> {
    // TODO: determine auth — likely API key or GitHub-based
  }

  async post(post: Post): Promise<PostResult> {
    const p = { ...post, ...post.overrides?.["comfyui-registry"] };

    // TODO: implement ComfyUI registry submission
    // comfy-cli publish or API
    return {
      platform: this.id,
      success: false,
      error: "Not yet implemented",
    };
  }
}
